import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="pt-16 pb-5"
      style={{ background: "var(--navy)", color: "var(--ivory)" }}
    >
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-8">
          {/* Brand */}
          <div>
            <Link href="/" aria-label="CollegeNCourses">
              <span
                className="inline-block px-3 py-2 rounded-md mb-4"
                style={{ background: "var(--ivory)" }}
              >
                <Image
                  src="/logo.webp"
                  alt="CollegeNCourses"
                  width={140}
                  height={36}
                  className="h-9 w-auto"
                />
              </span>
            </Link>
            <p
              className="font-serif italic text-lg mb-4"
              style={{ color: "var(--yellow)" }}
            >
              Compare. Choose. Begin.
            </p>
            <address
              className="not-italic text-sm leading-relaxed"
              style={{ color: "var(--pale-navy)" }}
            >
              DNYANAL EDUCON PRIVATE LIMITED
              <br />
              Pune, Maharashtra, India
              <br />
              <a
                href="tel:+917350460393"
                style={{ color: "var(--yellow)" }}
                className="hover:underline"
              >
                +91 7350 460 393
              </a>
              <br />
              <a
                href="mailto:info@collegencourses.com"
                style={{ color: "var(--yellow)" }}
                className="hover:underline"
              >
                info@collegencourses.com
              </a>
            </address>

            {/* Social */}
            <div className="flex gap-3 mt-4">
              {[
                {
                  label: "Facebook",
                  href: "https://www.facebook.com/CollegeNCourses/",
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                    </svg>
                  ),
                },
                {
                  label: "Instagram",
                  href: "https://www.instagram.com/collegencourses/",
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="18" cy="6" r="1" fill="currentColor" />
                    </svg>
                  ),
                },
                {
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/company/college-n-courses/",
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                    </svg>
                  ),
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    color: "var(--yellow)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "var(--yellow)";
                    (e.currentTarget as HTMLElement).style.color = "var(--navy)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                    (e.currentTarget as HTMLElement).style.color = "var(--yellow)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Programmes */}
          <div>
            <h4
              className="font-serif text-sm uppercase tracking-[0.05em] mb-4 font-normal"
              style={{ color: "var(--yellow)" }}
            >
              Programmes
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Online MBA", href: "/landing/top-online-mba-universities" },
                { label: "Distance MBA", href: "/landing/top-distance-mba-universities" },
                { label: "Executive MBA", href: "/landing/distance-mba-executive-iim" },
                { label: "Compare on Portal", href: "https://portal.collegencourses.com" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-[var(--yellow)]"
                    style={{ color: "var(--pale-navy)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Specializations */}
          <div>
            <h4
              className="font-serif text-sm uppercase tracking-[0.05em] mb-4 font-normal"
              style={{ color: "var(--yellow)" }}
            >
              Specializations
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Marketing", href: "/specializations-guide/marketing" },
                { label: "Finance", href: "/specializations-guide/finance" },
                { label: "HR", href: "/specializations-guide/hr" },
                { label: "Operations", href: "/specializations-guide/operations" },
                { label: "IT & Project Mgmt", href: "/specializations-guide/it" },
                { label: "Healthcare", href: "/specializations-guide/healthcare" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-[var(--yellow)]"
                    style={{ color: "var(--pale-navy)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About & Legal */}
          <div>
            <h4
              className="font-serif text-sm uppercase tracking-[0.05em] mb-4 font-normal"
              style={{ color: "var(--yellow)" }}
            >
              About &amp; Legal
            </h4>
            <ul className="space-y-2">
              {[
                { label: "About Us", href: "/about" },
                { label: "Counselling", href: "/counselling" },
                { label: "Blog", href: "/blogs" },
                { label: "AI Counsellor", href: "/ai-counsellor" },
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms & Conditions", href: "/terms-and-conditions" },
                { label: "Cookie Policy", href: "/cookie-policy" },
                { label: "Grievances", href: "/grievances" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-[var(--yellow)]"
                    style={{ color: "var(--pale-navy)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-12 pt-5 text-xs text-center leading-relaxed"
          style={{
            borderTop: "1px solid rgba(252,204,0,0.2)",
            color: "var(--pale-navy)",
          }}
        >
          © 2026 DNYANAL EDUCON PRIVATE LIMITED. All Rights Reserved.
          <br />
          All university and institute logos are trademarks of their respective
          owners.
        </div>
      </div>
    </footer>
  );
}
