"use client";

import { useState } from "react";

const NAV_ITEMS = [
  {
    label: "Programs",
    href: "/study-in-india",
    children: [
      { label: "Online MBA", href: "/online-mba" },
      { label: "Distance MBA", href: "/distance-mba" },
      { label: "Executive MBA", href: "/executive-mba" },
      { label: "Universities and Courses", href: "#universities" },
    ],
  },
  { label: "Specializations", href: "/specializations-guide" },
  {
    label: "Resources",
    href: null as string | null,
    children: [
      { label: "Blog", href: "/blog" },
      { label: "Tools and Calculator", href: "/resources/tools-and-calculators" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact-us" },
];

interface PlannerHeaderProps {
  primaryCTA?: string;
  onOpenLeadForm: (source?: string) => void;
}

export default function PlannerHeader({ primaryCTA = "Get Free Guidance", onOpenLeadForm }: PlannerHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* TOP BAR */}
      <div className="topbar">
        <div className="wrap">
          <div className="tb-left">
            <a href="tel:+917350460393">+91 7350 460 393</a>
            <a href="mailto:info@collegencourses.com">info@collegencourses.com</a>
          </div>
          <div className="tb-social">
            <a href="https://www.facebook.com/CollegeNCourses/" aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M14 22v-9h3l1-4h-4V7c0-1 .6-2 2-2h2V1h-3c-3 0-4.5 2-4.5 4.5V9H8v4h3v9" /></svg></a>
            <a href="https://www.instagram.com/collegencourses/" aria-label="Instagram"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" /></svg></a>
            <a href="https://www.linkedin.com/company/college-n-courses/" aria-label="LinkedIn"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 014 0v4M12 13v4" /></svg></a>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header>
        <div className="wrap navrow">
          <a href="/" className="logo" aria-label="CollegeNCourses home">
            <img className="logo-img" src="/logo.webp" alt="CollegeNCourses" />
          </a>

          <div className="nav-right">
            <nav aria-label="Primary">
              <ul>
                <li><a href="/">Home</a></li>
                {NAV_ITEMS.map((item) => (
                  <li key={item.label}>
                    {item.children ? (
                      <span className="nav-label">
                        {item.label}
                        <svg className="nav-chevron" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg>
                      </span>
                    ) : (
                      <a href={item.href}>{item.label}</a>
                    )}
                    {item.children && (
                      <div className="nav-drop">
                        {item.children.map((child) => (
                          <a key={child.label} href={child.href}>{child.label}</a>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            <button type="button" className="btn btn-sun btn-sm" onClick={() => onOpenLeadForm("header")}>
              {primaryCTA}
            </button>
            <button
              type="button"
              className="burger"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>

        <div className={`mobile-nav${mobileOpen ? " open" : ""}`}>
          <ul>
            <li><a href="/" onClick={() => setMobileOpen(false)}>Home</a></li>
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                {item.href ? (
                  <a href={item.href} onClick={() => setMobileOpen(false)}>{item.label}</a>
                ) : (
                  <span className="nav-label">{item.label}</span>
                )}
                {item.children && (
                  <div className="nav-drop">
                    {item.children.map((child) => (
                      <a key={child.label} href={child.href} onClick={() => setMobileOpen(false)}>{child.label}</a>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </header>
    </>
  );
}
