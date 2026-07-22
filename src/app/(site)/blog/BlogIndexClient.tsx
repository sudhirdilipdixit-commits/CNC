"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export interface BlogPostCard {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  tag?: string;
  readTime?: string;
  publishedAt?: string;
  author?: string;
  imageUrl?: string;
}

function formatDate(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function MidCaptureForm() {
  const [form, setForm] = useState({ name: "", mobile: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || form.name.trim().length < 2) { setError("Please enter your name."); return; }
    if (!/^[6-9]\d{9}$/.test(form.mobile)) { setError("Enter a valid 10-digit mobile number."); return; }
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          mobile: form.mobile,
          source: "blog-mid-capture",
          landingPage: window.location.href,
          referrer: document.referrer,
          userAgent: navigator.userAgent,
          deviceType: /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop",
        }),
      });
      const json = await res.json();
      if (res.ok) {
        const id = `CNC-2026-${json.id || "XXXXX"}`;
        const firstName = encodeURIComponent(form.name.trim().split(" ")[0]);
        window.location.href = `/thank-you/?id=${encodeURIComponent(id)}&name=${firstName}&source=blog`;
      } else {
        setError(json.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bi-mid-capture">
      <div className="bi-mid-body">
        <h3>Skip the research. Get expert guidance.</h3>
        <p>Speak with a counsellor who knows India&apos;s online MBA landscape. Free. Takes 15 minutes.</p>
      </div>
      <form className="bi-mid-form" onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          placeholder="Your name"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        />
        <input
          type="tel"
          placeholder="Mobile number"
          value={form.mobile}
          onChange={(e) => setForm((f) => ({ ...f, mobile: e.target.value }))}
        />
        {error && <div style={{ fontSize: 12, color: "#B83A2A" }}>{error}</div>}
        <button type="submit" className="btn btn-primary btn-sm" disabled={submitting}>
          {submitting ? "Sending…" : "Talk to a Counsellor"}
        </button>
      </form>
    </div>
  );
}

const INITIAL_COUNT = 9;
const LOAD_BATCH = 6;

export default function BlogIndexClient({
  posts,
  allTags,
}: {
  posts: BlogPostCard[];
  allTags: string[];
}) {
  const [activeTag, setActiveTag] = useState("All posts");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const filtered =
    activeTag === "All posts" ? posts : posts.filter((p) => p.tag === activeTag);
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  function selectTag(tag: string) {
    setActiveTag(tag);
    setVisibleCount(INITIAL_COUNT);
  }

  const chips = ["All posts", ...allTags];

  return (
    <>
      {/* Sticky filter bar */}
      <div className="bi-filter-bar">
        <div className="container">
          <div className="bi-filter-inner" role="group" aria-label="Filter by category">
            {chips.map((chip) => (
              <button
                key={chip}
                className={`bi-chip${activeTag === chip ? " bi-chip-active" : ""}`}
                onClick={() => selectTag(chip)}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="bi-main">
        <div className="container">
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "var(--grey)" }}>
              <p style={{ fontSize: 17 }}>No posts in this category yet. Check back soon.</p>
            </div>
          ) : (
            <div className="bi-grid">
              {visible.flatMap((post, i) => {
                const featured = i === 0 && activeTag === "All posts";
                const card = (
                  <Link
                    key={post._id}
                    href={`/blog/${post.slug}`}
                    className={`bi-card${featured ? " bi-card-featured" : ""}`}
                  >
                    <div
                      className="bi-cover"
                      style={featured ? { aspectRatio: "2/1" } : undefined}
                    >
                      {post.imageUrl ? (
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          fill
                          style={{ objectFit: "cover" }}
                          sizes={featured ? "800px" : "(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"}
                        />
                      ) : (
                        <div className="bi-cover-deco" />
                      )}
                      {post.tag && (
                        <div className="bi-cover-cat">
                          <span className="bi-tag">{post.tag}</span>
                        </div>
                      )}
                      {featured && (
                        <div className="bi-cover-badge">Editor&apos;s Pick</div>
                      )}
                    </div>
                    <div className="bi-card-body">
                      <h3>{post.title}</h3>
                      {post.excerpt && <p className="bi-excerpt">{post.excerpt}</p>}
                      <div className="bi-meta">
                        {post.author && <span>{post.author}</span>}
                        {post.author && post.readTime && <span className="bi-sep">·</span>}
                        {post.readTime && <span>{post.readTime}</span>}
                        {(post.author || post.readTime) && post.publishedAt && (
                          <span className="bi-sep">·</span>
                        )}
                        {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
                      </div>
                      <span className="bi-read-link">
                        Read article{" "}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12h14M13 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                );

                // Insert mid-capture after 6th card if more exist
                if (i === 5 && visible.length > 6) {
                  return [card, <MidCaptureForm key="mid-capture" />];
                }
                return [card];
              })}
            </div>
          )}

          {hasMore && (
            <div className="bi-load-more">
              <p>
                Showing {visible.length} of {filtered.length} articles
              </p>
              <button
                className="btn btn-secondary"
                onClick={() => setVisibleCount((c) => c + LOAD_BATCH)}
              >
                Load {Math.min(LOAD_BATCH, filtered.length - visibleCount)} more articles
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
