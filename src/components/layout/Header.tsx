"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface HeaderProps {
  onOpenLeadForm: () => void;
}

export default function Header({ onOpenLeadForm }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = "";
  };

  const toggleMenu = () => {
    const next = !menuOpen;
    setMenuOpen(next);
    document.body.style.overflow = next ? "hidden" : "";
  };

  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>

      <header className={`site-header${scrolled ? " scrolled" : ""}`} id="siteHeader">
        <div className="container header-inner">
          <a href="/" className="logo" aria-label="CollegeNCourses Home">
            <Image
              src="/logo.webp"
              alt="CollegeNCourses logo"
              width={160}
              height={40}
              priority
            />
          </a>

          <nav className="primary-nav" aria-label="Primary">
            <a href="/" className={isActive("/") ? "cur" : ""}>Home</a>
            <a href="/specializations-guide" className={isActive("/specializations-guide") ? "cur" : ""}>Specializations</a>
            <a href="/top-10-distance-mba-universities-colleges-north-zone/" className={isActive("/top-10-distance-mba-universities-colleges-north-zone") ? "cur" : ""}>University LP</a>
            <a href="/top-distance-mba-business-management" className={isActive("/top-distance-mba-business-management") ? "cur" : ""}>Course LP</a>
            <a href="/#resources">Resources</a>
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

        <div
          className={`mobile-menu${menuOpen ? " open" : ""}`}
          id="mobileMenu"
          aria-hidden={!menuOpen}
        >
          <a href="/" onClick={closeMenu}>Home</a>
          <a href="/specializations-guide" onClick={closeMenu}>Specializations</a>
          <a href="/top-10-distance-mba-universities-colleges-north-zone/" onClick={closeMenu}>University LP</a>
          <a href="/top-distance-mba-business-management" onClick={closeMenu}>Course LP</a>
          <a href="/#resources" onClick={closeMenu}>Resources</a>
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
