"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface HeaderProps {
  onOpenLeadForm: () => void;
}

const CHEVRON = (
  <svg className="nav-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const NAV_ITEMS = [
  {
    label: "Study in India",
    href: "/study-in-india",
    children: [
      { label: "Online MBA", href: "/online-mba" },
      { label: "Distance MBA", href: "#" },
      { label: "Executive MBA", href: "#" },
      { label: "Regular MBA", href: "#" },
      { label: "Design Programmes", href: "#" },
      { label: "Specializations Guide", href: "#" },
      { label: "Universities and Courses", href: "#" },
    ],
  },
  {
    label: "Study Abroad",
    href: "/study-abroad",
    children: [
      { label: "By Destination", href: "/study-abroad/by-destination" },
      { label: "By Programme", href: "/study-abroad/by-programme" },
      { label: "Profile Evaluation", href: "/study-abroad/profile-evaluation" },
      { label: "Test Prep", href: "/study-abroad/test-prep" },
      { label: "Education Loans Abroad", href: "/study-abroad/loans" },
      { label: "Scholarships", href: "/study-abroad/scholarships" },
      { label: "Visa Guides", href: "/study-abroad/visa-guides" },
      { label: "Cost Calculator", href: "/study-abroad/cost-calculator" },
      { label: "Universities and Courses Abroad", href: "#" },
    ],
  },
  {
    label: "AI Counsellor",
    href: "#",
  },
  {
    label: "Resources",
    href: null,
    children: [
      { label: "Blog", href: "/blog" },
      { label: "Guides", href: "#" },
      { label: "Tools and Calculator", href: "#" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact-us" },
];

export default function Header({ onOpenLeadForm }: HeaderProps) {
  const headerRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMobileSub, setOpenMobileSub] = useState<string | null>(null);
  const pathname = usePathname();

  const isActive = (href: string | null) => {
    if (!href || href === "#" || href.startsWith("/#")) return false;
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const onScroll = () => el.classList.toggle("scrolled", window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    setOpenMobileSub(null);
    document.body.style.overflow = "";
  };

  const toggleMenu = () => {
    const next = !menuOpen;
    setMenuOpen(next);
    if (!next) setOpenMobileSub(null);
    document.body.style.overflow = next ? "hidden" : "";
  };

  const toggleMobileSub = (label: string) =>
    setOpenMobileSub(prev => (prev === label ? null : label));

  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>

      <header ref={headerRef} className="site-header" id="siteHeader">
        <div className="container header-inner">
          <a href="/" className="logo" aria-label="CollegeNCourses Home">
            <Image src="/logo.webp" alt="CollegeNCourses logo" width={360} height={90} priority style={{ height: "100%", width: "auto" }} />
          </a>

          {/* Desktop nav */}
          <nav className="primary-nav" aria-label="Primary">
            {NAV_ITEMS.map(item => {
              if (item.children) {
                return (
                  <div key={item.label} className="nav-has-dropdown">
                    {item.href ? (
                      <a href={item.href} className={`nav-dropdown-label${isActive(item.href) ? " cur" : ""}`}>
                        {item.label} {CHEVRON}
                      </a>
                    ) : (
                      <span className="nav-dropdown-label">
                        {item.label} {CHEVRON}
                      </span>
                    )}
                    <div className="nav-dropdown" role="menu">
                      {item.children.map(child => (
                        <a key={child.label} href={child.href} role="menuitem" className={isActive(child.href) ? "cur" : ""}>
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </div>
                );
              }
              return (
                <a
                  key={item.label}
                  href={item.href ?? "#"}
                  className={isActive(item.href) ? "cur" : ""}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="header-cta-group">
            <button type="button" className="btn btn-primary btn-pill" onClick={onOpenLeadForm}>
              Get Free Counselling
            </button>
            <button
              type="button"
              className="nav-toggle"
              aria-controls="mobileMenu"
              aria-expanded={menuOpen}
              aria-label="Toggle menu"
              onClick={toggleMenu}
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`mobile-menu${menuOpen ? " open" : ""}`} id="mobileMenu" aria-hidden={!menuOpen}>
          {NAV_ITEMS.map(item => {
            if (item.children) {
              const isOpen = openMobileSub === item.label;
              return (
                <div key={item.label}>
                  <button
                    type="button"
                    className="mobile-submenu-toggle"
                    onClick={() => toggleMobileSub(item.label)}
                    aria-expanded={isOpen}
                  >
                    {item.label}
                    <svg className={`nav-chevron${isOpen ? " open" : ""}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="mobile-submenu">
                      {item.children.map(child => (
                        <a key={child.label} href={child.href} onClick={closeMenu}>
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <a key={item.label} href={item.href ?? "#"} onClick={closeMenu}>
                {item.label}
              </a>
            );
          })}
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => { closeMenu(); onOpenLeadForm(); }}
          >
            Get Free Counselling
          </button>
        </div>
      </header>
    </>
  );
}
