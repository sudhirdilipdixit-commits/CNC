"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  label: string;
}

export default function LegalToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
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

  return (
    <>
      {/* Desktop sticky sidebar */}
      <nav className="legal-toc" aria-label="Document sections">
        <div className="legal-toc-inner">
          <div className="legal-toc-title">Sections</div>
          <ul className="legal-toc-list">
            {items.map(({ id, label }) => (
              <li key={id}>
                <a href={`#${id}`} className={active === id ? "active" : ""}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <div className="mobile-toc">
        <select
          aria-label="Jump to section"
          onChange={(e) => {
            const el = document.querySelector(e.target.value);
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <option value="">Jump to section…</option>
          {items.map(({ id, label }) => (
            <option key={id} value={`#${id}`}>{label}</option>
          ))}
        </select>
      </div>
    </>
  );
}
