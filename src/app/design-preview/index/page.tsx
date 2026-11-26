import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design preview: Planner theme",
  robots: { index: false, follow: false },
};

const PAGES = [
  { href: "/design-preview/home", label: "Home" },
  { href: "/design-preview/online-mba", label: "Online MBA" },
  { href: "/design-preview/specializations-guide", label: "Specializations Guide" },
  { href: "/design-preview/about", label: "About" },
  { href: "/design-preview/contact-us", label: "Contact Us" },
  { href: "/design-preview/privacy-policy", label: "Privacy Policy" },
  { href: "/design-preview/blog", label: "Blog" },
  { href: "/design-preview/blog-post", label: "Blog post (Mastering People Data)" },
  { href: "/design-preview/distance-mba", label: "Top Distance/Online MBA" },
];

export default function DesignPreviewIndexPage() {
  return (
    <div style={{ maxWidth: 480, margin: "80px auto", padding: "0 24px", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontSize: 22, marginBottom: 16 }}>Planner-theme prototype pages</h1>
      <p style={{ fontSize: 13, color: "#666", marginBottom: 20 }}>Internal preview index, not linked from the live site.</p>
      <ul style={{ display: "flex", flexDirection: "column", gap: 10, padding: 0, listStyle: "none" }}>
        {PAGES.map((p) => (
          <li key={p.href}>
            <a href={p.href} style={{ color: "#2438F5", fontWeight: 600, textDecoration: "underline" }}>
              {p.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
