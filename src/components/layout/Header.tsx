"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface HeaderProps {
  onOpenLeadForm: () => void;
}

export default function Header({ onOpenLeadForm }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Specializations", href: "/specializations-guide" },
    { label: "Counselling", href: "/counselling" },
    { label: "Programs", href: "/programs" },
    { label: "Resources", href: "/resources" },
    { label: "Blog", href: "/blogs" },
  ];

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
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      <header
        ref={headerRef}
        className={`sticky top-0 z-[100] transition-[border-color] duration-200 ${
          scrolled
            ? "border-b border-[var(--navy-soft)]"
            : "border-b border-transparent"
        }`}
        style={{
          background: "rgba(250,247,242,0.96)",
          backdropFilter: "saturate(180%) blur(8px)",
          WebkitBackdropFilter: "saturate(180%) blur(8px)",
        }}
      >
        <div className="container">
          <div
            className={`flex items-center justify-between gap-4 transition-[height] duration-200 ${
              scrolled ? "h-14" : "h-[72px]"
            }`}
          >
            {/* Logo */}
            <Link href="/" aria-label="CollegeNCourses Home" className="flex-none block h-10">
              <Image
                src="/logo.webp"
                alt="CollegeNCourses"
                width={160}
                height={40}
                className="h-full w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav
              className="hidden lg:flex items-center gap-8 flex-1 justify-center"
              aria-label="Primary"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-[var(--charcoal)] text-[15px] font-medium py-2 transition-colors hover:text-[var(--navy)] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-0.5 after:bg-[var(--yellow)] after:scale-x-0 after:origin-left after:transition-transform hover:after:scale-x-100"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Header CTA */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onOpenLeadForm}
                className="btn btn-primary btn-pill hidden sm:inline-flex"
              >
                Get Free Counselling
              </button>
              {/* Hamburger */}
              <button
                type="button"
                onClick={toggleMenu}
                aria-controls="mobileMenu"
                aria-expanded={menuOpen}
                aria-label="Toggle menu"
                className="lg:hidden flex flex-col gap-[5px] p-2.5 items-center justify-center"
              >
                <span
                  className={`block w-[22px] h-[2px] bg-[var(--navy)] transition-transform duration-200 ${
                    menuOpen ? "translate-y-[7px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block w-[22px] h-[2px] bg-[var(--navy)] transition-opacity duration-200 ${
                    menuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block w-[22px] h-[2px] bg-[var(--navy)] transition-transform duration-200 ${
                    menuOpen ? "-translate-y-[7px] -rotate-45" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          id="mobileMenu"
          aria-hidden={!menuOpen}
          className={`fixed inset-0 top-[var(--header-h)] bg-[var(--ivory)] z-[99] flex flex-col gap-4 px-6 py-8 overflow-y-auto transition-transform duration-200 lg:hidden ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="text-lg font-medium py-3 border-b border-[var(--mist)] text-[var(--navy)]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/about"
            onClick={closeMenu}
            className="text-lg font-medium py-3 border-b border-[var(--mist)] text-[var(--navy)]"
          >
            About
          </Link>
          <Link
            href="/contact"
            onClick={closeMenu}
            className="text-lg font-medium py-3 border-b border-[var(--mist)] text-[var(--navy)]"
          >
            Contact
          </Link>
          <button
            type="button"
            onClick={() => {
              closeMenu();
              onOpenLeadForm();
            }}
            className="btn btn-primary mt-4"
          >
            Get Free Counselling
          </button>
        </div>
      </header>
    </>
  );
}
