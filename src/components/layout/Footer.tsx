import Image from "next/image";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col footer-brand">
            <a href="/" className="logo" aria-label="CollegeNCourses">
              <Image
                src="/logo.webp"
                alt="CollegeNCourses logo"
                width={160}
                height={36}
                style={{ height: 36, width: "auto" }}
              />
            </a>
            <div className="footer-tagline">Compare. Choose. Begin.</div>
            <div className="footer-address">
              DNYANAL EDUCON PRIVATE LIMITED<br />
              Pune, Maharashtra, India<br />
              <a href="tel:+917350460393" style={{ color: "var(--yellow)" }}>+91 7350 460 393</a><br />
              <a href="mailto:info@collegencourses.com" style={{ color: "var(--yellow)" }}>info@collegencourses.com</a>
            </div>
            <div className="footer-social">
              <a href="https://www.facebook.com/CollegeNCourses/" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/collegencourses/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="18" cy="6" r="1" fill="currentColor" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/college-n-courses/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Programmes</h4>
            <ul className="footer-list">
              <li><a href="#">Online MBA</a></li>
              <li><a href="#">Distance MBA</a></li>
              <li><a href="#">Executive MBA</a></li>
              <li><a href="#">Design Programmes</a></li>
              <li><a href="#">Compare on Portal</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Specializations</h4>
            <ul className="footer-list">
              <li><a href="#">Marketing</a></li>
              <li><a href="#">Finance</a></li>
              <li><a href="#">HR</a></li>
              <li><a href="#">Operations</a></li>
              <li><a href="#">IT &amp; Project Management</a></li>
              <li><a href="#">Healthcare</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>About &amp; Legal</h4>
            <ul className="footer-list">
              <li><a href="/about">About Us</a></li>
              <li><a href="/counselling">Counselling</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="/top-10-distance-mba-universities-colleges-north-zone/">University LP</a></li>
              <li><a href="/top-distance-mba-business-management">Course LP</a></li>
              <li><a href="/privacy-policy">Privacy Policy</a></li>
              <li><a href="/terms-conditions">Terms &amp; Conditions</a></li>
              <li><a href="/cookie-policy">Cookie Policy</a></li>
              <li><a href="/grievances">Grievances</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          &copy; 2026 DNYANAL EDUCON PRIVATE LIMITED. All Rights Reserved.<br />
          All university and institute logos are trademarks of their respective owners.
        </div>
      </div>
    </footer>
  );
}
