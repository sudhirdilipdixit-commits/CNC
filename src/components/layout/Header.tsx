"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface HeaderProps {
  onOpenLeadForm: () => void;
}

const PROGRAMMES = [
  { label: "Online MBA",        href: "#" },
  { label: "Distance MBA",      href: "#" },
  { label: "Executive MBA",     href: "#" },
  { label: "Design Programmes", href: "#" },
  { label: "Compare on Portal", href: "#" },
];

const Chevron = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Header({ onOpenLeadForm }: HeaderProps) {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [progOpen,  setProgOpen]  = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#") || href === "#") return false;
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    setProgOpen(false);
    document.body.style.overflow = "";
  };

  const toggleMenu = () => {
    const next = !menuOpen;
    setMenuOpen(next);
    if (!next) setProgOpen(false);
    document.body.style.overflow = next ? "hidden" : "";
  };

  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>

      <header className={`site-header${scrolled ? " scrolled" : ""}`} id="siteHeader">
        <div className="container header-inner">
          <a href="/" className="logo" aria-label="CollegeNCourses Home">
            <Image src="/logo.webp" alt="CollegeNCourses logo" width={160} height={40} priority />
          </a>

          {/* Desktop nav */}
          <nav className="primary-nav" aria-label="Primary">
            <a href="/" className={isActive("/") ? "cur" : ""}>Home</a>

            {/* Programmes dropdown */}
            <div className="nav-has-dropdown">
              <span className="nav-dropdown-label">
                Programmes <Chevron className="nav-chevron" />
              </span>
              <div className="nav-dropdown" role="menu">
                {PROGRAMMES.map(({ label, href }) => (
                  <a key={label} href={href} role="menuitem">{label}</a>
                ))}
              </div>
            </div>

            <a href="/specializations-guide" className={isActive("/specializations-guide") ? "cur" : ""}>Specializations</a>
            <a href="/counselling" className={isActive("/counselling") ? "cur" : ""}>Counselling</a>
            <a href="/resources" className={isActive("/resources") ? "cur" : ""}>Resources</a>
            <a href="/blog" className={isActive("/blog") ? "cur" : ""}>Blogs</a>
            <a href="/contact-us" className={isActive("/contact-us") ? "cur" : ""}>Contact</a>
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
          <a href="/" onClick={closeMenu}>Home</a>

          {/* Programmes accordion */}
          <button
            type="button"
            className="mobile-submenu-toggle"
            aria-expanded={progOpen}
            onClick={() => setProgOpen(p => !p)}
          >
            Programmes
            <Chevron className={`nav-chevron${progOpen ? " open" : ""}`} />
          </button>
          {progOpen && (
            <div className="mobile-submenu">
              {PROGRAMMES.map(({ label, href }) => (
                <a key={label} href={href} onClick={closeMenu}>{label}</a>
              ))}
            </div>
          )}

          <a href="/specializations-guide" onClick={closeMenu}>Specializations</a>
          <a href="/counselling" onClick={closeMenu}>Counselling</a>
          <a href="/resources" onClick={closeMenu}>Resources</a>
          <a href="/blog" onClick={closeMenu}>Blogs</a>
          <a href="/contact-us" onClick={closeMenu}>Contact</a>
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
