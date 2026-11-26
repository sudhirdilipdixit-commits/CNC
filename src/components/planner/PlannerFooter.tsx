export default function PlannerFooter() {
  return (
    <footer>
      <div className="wrap">
        <div className="f-grid">
          <div>
            <h4>CollegeNCourses</h4>
            <p>India&apos;s trusted compass for higher-education decisions. Study in India and Study Abroad, compared honestly.</p>
            <div className="f-social">
              <a href="https://www.facebook.com/CollegeNCourses/" aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M14 22v-9h3l1-4h-4V7c0-1 .6-2 2-2h2V1h-3c-3 0-4.5 2-4.5 4.5V9H8v4h3v9" /></svg></a>
              <a href="https://www.instagram.com/collegencourses/" aria-label="Instagram"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" /></svg></a>
              <a href="https://www.linkedin.com/company/college-n-courses/" aria-label="LinkedIn"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 014 0v4M12 13v4" /></svg></a>
            </div>
          </div>
          <div>
            <h4>Programs</h4>
            <ul>
              <li><a href="/online-mba">Online MBA</a></li>
              <li><a href="/distance-mba">Distance MBA</a></li>
              <li><a href="/executive-mba">Executive MBA</a></li>
              <li><a href="#universities">Universities and Courses</a></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/contact-us">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul>
              <li><a href="/privacy-policy">Privacy Policy</a></li>
              <li><a href="/terms-conditions">Terms &amp; Conditions</a></li>
              <li><a href="/cookie-policy">Cookie Policy</a></li>
              <li><a href="/grievances">Grievances</a></li>
            </ul>
          </div>
        </div>
        <div className="f-word" aria-hidden="true">CollegeNCourses</div>
      </div>
      <div className="f-bottom">
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <span>&copy; 2026 DNYANAL EDUCON PRIVATE LIMITED. All university names and logos belong to their respective owners.</span>
          <a href="tel:+917350460393">+91 7350 460 393</a>
        </div>
      </div>
    </footer>
  );
}
