#!/usr/bin/env node
/**
 * WordPress → Sanity Blog Migration Script
 *
 * Usage:
 *   1. Export your WordPress posts: WP Admin → Tools → Export → Posts → Download
 *   2. Install deps (one-time):  npm install fast-xml-parser @sanity/client
 *   3. Run:  node scripts/migrate-wordpress.mjs path/to/wordpress-export.xml
 *
 * Reads credentials from .env.local automatically.
 * Safe to re-run — existing slugs are skipped.
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { createClient } from "@sanity/client";
import { XMLParser } from "fast-xml-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ─── Load .env.local ──────────────────────────────────────────────────────────
try {
  const env = readFileSync(resolve(__dirname, "../.env.local"), "utf8");
  for (const line of env.split("\n")) {
    const m = line.match(/^([^#=\s][^=]*)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "");
  }
} catch { /* .env.local optional if env vars already set */ }

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token     = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error("❌ Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN");
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2024-01-01", useCdn: false });

// ─── CLI arg ──────────────────────────────────────────────────────────────────
const xmlFile = process.argv[2];
if (!xmlFile) {
  console.error("Usage: node scripts/migrate-wordpress.mjs path/to/export.xml");
  process.exit(1);
}

const xml = readFileSync(resolve(process.cwd(), xmlFile), "utf8");

// ─── Parse XML ────────────────────────────────────────────────────────────────
const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  cdataPropName: "__cdata",
  textNodeName: "#text",
  isArray: (name) => ["item", "category", "wp:postmeta"].includes(name),
});

const parsed = parser.parse(xml);
const allItems = parsed?.rss?.channel?.item ?? [];

// Build attachment map: wp:post_id → url (for featured images)
const attachments = {};
for (const item of allItems) {
  if (getStr(item, "wp:post_type") === "attachment") {
    const id = getStr(item, "wp:post_id");
    const url = getStr(item, "guid") || getStr(item, "link");
    if (id && url) attachments[id] = url;
  }
}

const posts = allItems.filter(
  (i) => getStr(i, "wp:post_type") === "post" && getStr(i, "wp:status") === "publish"
);

console.log(`\n📋 Found ${posts.length} published posts\n${"─".repeat(50)}`);

// ─── Helpers ──────────────────────────────────────────────────────────────────
let _key = 0;
const genKey = () => `k${++_key}`;

function getStr(obj, key) {
  const val = obj?.[key];
  if (!val) return "";
  if (typeof val === "string") return val;
  if (typeof val === "object") return val.__cdata ?? val["#text"] ?? String(val) ?? "";
  return String(val);
}

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function getMeta(post, metaKey) {
  const metas = Array.isArray(post["wp:postmeta"]) ? post["wp:postmeta"] : [];
  const m = metas.find((x) => getStr(x, "wp:meta_key") === metaKey);
  return m ? getStr(m, "wp:meta_value") : null;
}

// ─── HTML → Portable Text ─────────────────────────────────────────────────────
function htmlToBlocks(html) {
  if (!html) return [];

  // Strip WordPress Gutenberg block comments
  html = html.replace(/<!--\s*wp:[^>]*-->/g, "").replace(/<!--\s*\/wp:[^>]*-->/g, "");
  // Normalize line endings & whitespace
  html = html.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  const blocks = [];

  // Regex to match block-level tags
  const blockRe = /<(h[1-6]|p|ul|ol|blockquote|figure|div)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  let lastIndex = 0;
  let m;

  // Reset regex
  blockRe.lastIndex = 0;
  let htmlCopy = html;

  // Process line by line for content between block elements
  const segments = [];
  let cursor = 0;
  const re2 = /<(h[1-6]|p|ul|ol|blockquote|figure)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  let m2;
  while ((m2 = re2.exec(htmlCopy)) !== null) {
    if (m2.index > cursor) {
      segments.push({ type: "raw", content: htmlCopy.slice(cursor, m2.index) });
    }
    segments.push({ type: m2[1].toLowerCase(), content: m2[2], full: m2[0] });
    cursor = m2.index + m2[0].length;
  }
  if (cursor < htmlCopy.length) {
    segments.push({ type: "raw", content: htmlCopy.slice(cursor) });
  }

  for (const seg of segments) {
    if (seg.type === "raw") {
      // Split by double newlines → paragraphs
      const paras = seg.content.split(/\n{2,}/).map((s) => s.trim()).filter(Boolean);
      for (const p of paras) {
        const clean = stripTags(p).trim();
        if (clean) blocks.push(makeBlock("normal", clean));
      }
      continue;
    }

    const tag = seg.type;

    if (/^h[1-6]$/.test(tag)) {
      const text = stripTags(seg.content).trim();
      if (text) blocks.push(makeBlock(tag, text));
    } else if (tag === "p") {
      const { children, markDefs } = parseInline(seg.content);
      if (children.length) blocks.push({ _type: "block", _key: genKey(), style: "normal", children, markDefs });
    } else if (tag === "blockquote") {
      const text = stripTags(seg.content).trim();
      if (text) blocks.push(makeBlock("blockquote", text));
    } else if (tag === "ul" || tag === "ol") {
      const listType = tag === "ul" ? "bullet" : "number";
      const liRe = /<li\b[^>]*>([\s\S]*?)<\/li>/gi;
      let li;
      while ((li = liRe.exec(seg.content)) !== null) {
        const text = stripTags(li[1]).trim();
        if (text) {
          blocks.push({
            _type: "block", _key: genKey(), style: "normal",
            listItem: listType, level: 1,
            children: [{ _type: "span", _key: genKey(), text, marks: [] }],
            markDefs: [],
          });
        }
      }
    } else if (tag === "figure") {
      const imgM = /<img\b[^>]+src="([^"]+)"/i.exec(seg.content);
      if (imgM) blocks.push({ _type: "__wpImg__", _key: genKey(), url: imgM[1] });
    }
  }

  return blocks;
}

function makeBlock(style, text) {
  return {
    _type: "block", _key: genKey(), style,
    children: [{ _type: "span", _key: genKey(), text, marks: [] }],
    markDefs: [],
  };
}

function parseInline(html) {
  const markDefs = [];
  const children = [];

  // Replace <br> with newline
  let text = html.replace(/<br\s*\/?>/gi, "\n");

  // Links → placeholder
  text = text.replace(/<a\b[^>]+href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, inner) => {
    const key = genKey();
    markDefs.push({ _type: "link", _key: key, href });
    const t = stripTags(inner);
    return `\x02LINK:${key}\x03${t}\x04LINK\x03`;
  });

  // Bold
  text = text.replace(/<(?:strong|b)\b[^>]*>([\s\S]*?)<\/(?:strong|b)>/gi, "\x02STRONG\x03$1\x04STRONG\x03");
  // Italic
  text = text.replace(/<(?:em|i)\b[^>]*>([\s\S]*?)<\/(?:em|i)>/gi, "\x02EM\x03$1\x04EM\x03");
  // Strip remaining tags
  text = stripTags(text);

  // Tokenise
  const tokens = text.split(/(\x02[^\x03]+\x03|\x04[^\x03]+\x03)/);
  const activeMarks = [];

  for (const tok of tokens) {
    if (!tok) continue;
    if (tok.startsWith("\x02STRONG")) { activeMarks.push("strong"); continue; }
    if (tok.startsWith("\x04STRONG")) { const i = activeMarks.lastIndexOf("strong"); if (i > -1) activeMarks.splice(i, 1); continue; }
    if (tok.startsWith("\x02EM")) { activeMarks.push("em"); continue; }
    if (tok.startsWith("\x04EM")) { const i = activeMarks.lastIndexOf("em"); if (i > -1) activeMarks.splice(i, 1); continue; }
    if (tok.startsWith("\x02LINK:")) { activeMarks.push(tok.slice(6, -1)); continue; }
    if (tok.startsWith("\x04LINK")) { const i = activeMarks.findLastIndex((m) => markDefs.some((d) => d._key === m)); if (i > -1) activeMarks.splice(i, 1); continue; }
    if (tok.trim()) children.push({ _type: "span", _key: genKey(), text: tok, marks: [...activeMarks] });
  }

  return { children, markDefs };
}

function stripTags(s) {
  return s
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#8216;/g, "‘")
    .replace(/&#8217;/g, "’")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”");
}

// ─── Image upload ─────────────────────────────────────────────────────────────
async function uploadImage(url, label) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(20_000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const ct = res.headers.get("content-type") || "image/jpeg";
    const filename = url.split("/").pop()?.split("?")[0] || "image.jpg";
    const asset = await client.assets.upload("image", buf, { filename, contentType: ct });
    return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  } catch (e) {
    console.warn(`    ⚠ ${label} upload failed: ${e.message}`);
    return null;
  }
}

// ─── Main migration ───────────────────────────────────────────────────────────
async function migrate() {
  let created = 0, skipped = 0, errors = 0;

  for (let idx = 0; idx < posts.length; idx++) {
    const post = posts[idx];
    const title      = getStr(post, "title");
    const slug       = getStr(post, "wp:post_name") || slugify(title);
    const excerpt    = getStr(post, "description") || getStr(post, "excerpt:encoded") || "";
    const rawContent = getStr(post, "content:encoded");
    const dateStr    = getStr(post, "wp:post_date") || getStr(post, "pubDate");
    const author     = getStr(post, "dc:creator");

    // Tags and categories
    const cats = Array.isArray(post.category) ? post.category : post.category ? [post.category] : [];
    const tag = cats
      .map((c) => c?.["__cdata"] ?? c?.["#text"] ?? "")
      .filter(Boolean)
      .join(", ");

    console.log(`[${idx + 1}/${posts.length}] "${title}"`);

    try {
      // Skip if slug already exists
      const existingId = await client.fetch(
        `*[_type == "blog" && slug.current == $slug][0]._id`,
        { slug }
      );
      if (existingId) {
        console.log(`  ↩  Skipped (already exists)`);
        skipped++;
        continue;
      }

      // Convert body
      let rawBlocks = htmlToBlocks(rawContent);

      // Upload inline images found in body
      const body = [];
      for (const block of rawBlocks) {
        if (block._type === "__wpImg__") {
          console.log(`  🖼  Uploading inline image…`);
          const img = await uploadImage(block.url, "inline image");
          if (img) body.push({ ...img, _key: block._key });
        } else {
          body.push(block);
        }
      }

      // Featured image via _thumbnail_id → attachment map
      let coverImage = null;
      const thumbId = getMeta(post, "_thumbnail_id");
      if (thumbId && attachments[thumbId]) {
        console.log(`  📷 Uploading cover image…`);
        coverImage = await uploadImage(attachments[thumbId], "cover image");
      }

      const doc = {
        _type: "blog",
        title,
        slug: { _type: "slug", current: slug },
        ...(excerpt ? { excerpt } : {}),
        ...(tag ? { tag } : {}),
        ...(author ? { author } : {}),
        ...(dateStr ? { publishedAt: new Date(dateStr).toISOString() } : {}),
        ...(coverImage ? { coverImage } : {}),
        body,
      };

      await client.create(doc);
      console.log(`  ✓  Created`);
      created++;
    } catch (e) {
      console.error(`  ✕  Error: ${e.message}`);
      errors++;
    }
  }

  console.log(`\n${"─".repeat(50)}`);
  console.log(`✅ Done — ${created} created · ${skipped} skipped · ${errors} errors`);
}

migrate().catch((e) => { console.error(e); process.exit(1); });
