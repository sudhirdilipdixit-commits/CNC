import type { Metadata } from "next";
import PlannerAboutClient from "@/components/planner/PlannerAboutClient";

export const metadata: Metadata = {
  title: "Design preview: Planner theme | About",
  robots: { index: false, follow: false },
};

export default function AboutPreviewPage() {
  return <PlannerAboutClient />;
}
