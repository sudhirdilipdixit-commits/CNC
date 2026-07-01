"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  label: string;
}

export default function BlogSidebarClient({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const [form, setForm] = useState({ name: "", mobile: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (items.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || form.name.trim().length < 2) {
      setError("Please enter your name.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(form.mobile)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          mobile: form.mobile,
          source: "blog-sidebar",
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
    <aside className="bp-sidebar" aria-label="Table of contents and enquiry form">
      <div className="bp-sidebar-inner">

        {items.length > 0 && (
          <>
            <div className="bp-toc-title">In this article</div>
            <ul className="bp-toc-list">
              {items.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={active === id ? "bp-toc-link bp-toc-active" : "bp-toc-link"}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Lead form */}
        <div className="bp-form-wrap">
          <p style={{ fontSize: 12, color: "var(--grey)", marginBottom: 12, lineHeight: 1.5 }}>
            Get expert guidance — speak with a counsellor today.
          </p>
          <form onSubmit={handleSubmit} noValidate>
            <div style={{ marginBottom: 10 }}>
              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="bp-input"
              />
            </div>
            <div style={{ marginBottom: 10 }}>
              <input
                type="tel"
                placeholder="Mobile number"
                value={form.mobile}
                onChange={(e) => setForm((f) => ({ ...f, mobile: e.target.value }))}
                className="bp-input"
              />
            </div>
            {error && (
              <div style={{ fontSize: 12, color: "#B83A2A", marginBottom: 8 }}>{error}</div>
            )}
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", fontSize: 13, padding: "9px 16px", minHeight: 40 }}
              disabled={submitting}
            >
              {submitting ? "Sending…" : "Talk to a Counsellor"}
            </button>
          </form>
        </div>

      </div>
    </aside>
  );
}
