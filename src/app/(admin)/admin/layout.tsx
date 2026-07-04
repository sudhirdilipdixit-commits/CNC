import type { Metadata } from "next";
import { LogoutButton } from "./logout-button";

export const metadata: Metadata = {
  title: "Admin Dashboard | CollegeNCourses",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--ivory)", color: "var(--charcoal)" }}
    >
      {/* Admin Header */}
      <header
        className="sticky top-0 z-50 px-6 py-3 flex items-center justify-between"
        style={{
          background: "var(--navy)",
          color: "var(--ivory)",
          borderBottom: "2px solid var(--yellow)",
        }}
      >
        <div className="flex items-center gap-3">
          <span
            className="text-xs font-bold uppercase tracking-[0.15em]"
            style={{ color: "var(--yellow)" }}
          >
            CNC
          </span>
          <span className="text-base font-semibold">Admin Dashboard</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span className="text-xs" style={{ color: "var(--pale-navy)" }}>
            CollegeNCourses CRM
          </span>
          <LogoutButton />
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8">{children}</div>
    </div>
  );
}
