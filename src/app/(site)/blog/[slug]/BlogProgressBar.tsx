"use client";

import { useEffect, useState } from "react";

export default function BlogProgressBar() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    function onScroll() {
      const el = document.getElementById("articleBody");
      if (!el) return;
      const elTop = el.getBoundingClientRect().top + window.scrollY;
      const total = el.offsetHeight + elTop - window.innerHeight;
      setPct(Math.min(100, Math.max(0, ((window.scrollY - elTop) / total) * 100)));
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0,
      height: 3, background: "var(--mist)", zIndex: 300, pointerEvents: "none",
    }}>
      <div style={{
        height: "100%", background: "var(--yellow)",
        width: `${pct}%`, transition: "width .1s linear",
      }} />
    </div>
  );
}
