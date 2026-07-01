import type { Metadata } from "next";
import { Suspense } from "react";
import ThankYouClient from "./ThankYouClient";

export const metadata: Metadata = {
  title: "Thank You | CollegeNCourses",
  description:
    "Your enquiry has been received. A senior counsellor will call you within 30 minutes during working hours.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "60vh", background: "var(--ivory)" }} />}>
      <ThankYouClient />
    </Suspense>
  );
}
