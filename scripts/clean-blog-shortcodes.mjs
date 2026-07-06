#!/usr/bin/env node
/**
 * clean-blog-shortcodes.mjs
 * One-time script: removes WPBakery / WordPress shortcodes from blog post
 * body blocks already in Sanity (text span level cleanup).
 *
 * Usage:
 *   node scripts/clean-blog-shortcodes.mjs          → dry-run (shows what would change)
 *   node scripts/clean-blog-shortcodes.mjs --apply   → actually patches Sanity
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { createClient } from "@sanity/client";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ─── Load .env.local ──────────────────────────────────────────────────────────
try {
  const env = readFileSync(resolve(__dirname, "../.env.local"), "utf8");
  for (const line of env.split("\n")) {
    const m = line.match(/^([^#=\s][^=]*)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "");
  }
} catch { /* ok if missing */ }

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token     = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error("❌  Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN");
  process.exit(1);
}

const apply = process.argv.includes("--apply");
const client = createClient({ projectId, dataset, token, apiVersion: "2024-01-01", useCdn: false });

// ─── Shortcode cleaner ────────────────────────────────────────────────────────
function cleanText(text) {
  if (!text) return text;
  return text
    // WPBakery opening/closing tags — keep text inside [vc_column_text]
    .replace(/\[vc_[^\]]*\]/g, "")
    .replace(/\[\/vc_[^\]]*\]/g, "")
    // Common WordPress shortcodes
    .replace(/\[gallery[^\]]*\]/g, "")
    .replace(/\[embed[^\]]*\][\s\S]*?\[\/embed\]/g, "")
    .replace(/\[caption[^\]]*\]([\s\S]*?)\[\/caption\]/g, "$1")
    // Self-closing shortcodes  [foo /]
    .replace(/\[[a-z_]+[^\]]*\/\]/g, "")
    // Any remaining [shortcode ...] or [/shortcode] patterns
    .replace(/\[[\/]?[a-z_][a-z0-9_-]*[^\]]*\]/g, "")
    // Collapse triple+ newlines left behind
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function cleanBlocks(blocks) {
  if (!Array.isArray(blocks)) return blocks;
  return blocks.map((block) => {
    if (block._type !== "block" || !Array.isArray(block.children)) return block;
    return {
      ...block,
      children: block.children.map((child) =>
        child._type === "span" && typeof child.text === "string"
          ? { ...child, text: cleanText(child.text) }
          : child
      ),
    };
  }).filter((block) => {
    // Drop blocks that are now empty after cleaning
    if (block._type !== "block") return true;
    const totalText = (block.children ?? []).map((c) => c.text ?? "").join("").trim();
    return totalText.length > 0;
  });
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n${apply ? "🔧 APPLY mode" : "👁  DRY-RUN mode (pass --apply to save changes)"}\n${"─".repeat(56)}`);

  const posts = await client.fetch(
    `*[_type == "blog" && defined(body)]{ _id, title, body }`
  );
  console.log(`Found ${posts.length} blog posts with body content.\n`);

  let patched = 0;
  for (const post of posts) {
    const cleaned = cleanBlocks(post.body);

    // Compare serialised to detect actual change
    const before = JSON.stringify(post.body);
    const after  = JSON.stringify(cleaned);
    if (before === after) continue;

    patched++;
    console.log(`  ${apply ? "✓" : "~"} "${post.title?.slice(0, 60)}" (${post._id})`);

    if (apply) {
      try {
        await client.patch(post._id).set({ body: cleaned }).commit();
      } catch (err) {
        console.warn(`    ⚠  Skipped (${err.message?.slice(0, 80)})`);
        patched--;
      }
    }
  }

  console.log(`\n${"─".repeat(56)}`);
  if (patched === 0) {
    console.log("✅  No shortcode content found — nothing to clean.");
  } else if (apply) {
    console.log(`✅  Patched ${patched} post(s).`);
  } else {
    console.log(`${patched} post(s) would be updated. Run with --apply to save.`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
