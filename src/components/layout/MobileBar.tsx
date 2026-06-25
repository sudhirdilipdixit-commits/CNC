"use client";

interface MobileBarProps {
  onOpenLeadForm: () => void;
}

export default function MobileBar({ onOpenLeadForm }: MobileBarProps) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex items-stretch lg:hidden"
      style={{
        background: "var(--white)",
        borderTop: "1px solid var(--mist)",
        boxShadow: "0 -4px 16px rgba(36,48,72,0.08)",
        height: "var(--mobile-bar-h)",
        padding: "8px",
        gap: "8px",
      }}
      aria-label="Quick actions"
    >
      {/* WhatsApp */}
      <a
        href="https://wa.me/917350460393"
        aria-label="Chat on WhatsApp"
        className="inline-flex items-center justify-center rounded-lg flex-none w-12 transition-transform active:scale-95"
        style={{ background: "#25D366", color: "white" }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.2-.2.2-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.4-2.4-1.4-.9-.8-1.4-1.8-1.6-2.1-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2c-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.6.1-.8.4-.3.3-1.1 1.1-1.1 2.6 0 1.5 1.1 3 1.3 3.2.2.2 2.2 3.4 5.3 4.7.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2A10 10 0 002 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.3c1.4.8 3 1.2 4.7 1.2A10 10 0 0022 12 10 10 0 0012 2z" />
        </svg>
      </a>

      {/* Call */}
      <a
        href="tel:+917350460393"
        aria-label="Call us"
        className="inline-flex items-center justify-center rounded-lg flex-none w-12 transition-transform active:scale-95"
        style={{ background: "var(--navy)", color: "var(--yellow)" }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
        >
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.72 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0122 16.92z" />
        </svg>
      </a>

      {/* CTA */}
      <button
        type="button"
        onClick={onOpenLeadForm}
        className="flex-1 inline-flex items-center justify-center rounded-lg font-bold text-sm transition-transform active:scale-95"
        style={{
          background: "var(--yellow)",
          color: "var(--navy)",
          borderTop: "3px solid var(--navy)",
          paddingTop: "10px",
        }}
      >
        Free Counselling
      </button>
    </div>
  );
}
