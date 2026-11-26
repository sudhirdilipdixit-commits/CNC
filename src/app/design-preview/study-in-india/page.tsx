import type { Metadata } from "next";
import PlannerStudyInIndiaClient from "@/components/planner/PlannerStudyInIndiaClient";

export const metadata: Metadata = {
  title: "Design preview: Planner theme | Study in India",
  robots: { index: false, follow: false },
};

export default function StudyInIndiaPreviewPage() {
  return <PlannerStudyInIndiaClient />;
}
