import type { Metadata } from "next";
import PlannerContactClient from "@/components/planner/PlannerContactClient";

export const metadata: Metadata = {
  title: "Design preview: Planner theme | Contact Us",
  robots: { index: false, follow: false },
};

export default function ContactUsPreviewPage() {
  return <PlannerContactClient />;
}
