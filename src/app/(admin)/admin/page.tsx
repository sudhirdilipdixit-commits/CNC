import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin | CollegeNCourses" };

export default function AdminPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl mb-2" style={{ color: "var(--navy)" }}>
        Dashboard
      </h1>
      <p className="mb-8 text-sm" style={{ color: "var(--grey)" }}>
        Welcome to the CollegeNCourses CRM.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/admin/leads"
          className="rounded-lg p-6 flex flex-col gap-2 transition-[box-shadow] hover:shadow-md"
          style={{ background: "var(--white)", border: "1px solid var(--mist)" }}
        >
          <span className="text-3xl font-bold font-serif" style={{ color: "var(--navy)" }}>
            Leads
          </span>
          <span className="text-sm" style={{ color: "var(--grey)" }}>
            View, search, filter, and export all enquiries
          </span>
          <span
            className="text-sm font-semibold mt-2"
            style={{ color: "var(--yellow)" }}
          >
            Open Leads →
          </span>
        </Link>
      </div>
    </div>
  );
}
