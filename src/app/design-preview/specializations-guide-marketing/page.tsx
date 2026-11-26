import type { Metadata } from "next";
import PlannerMarketingGuideClient from "@/components/planner/PlannerMarketingGuideClient";

export const metadata: Metadata = {
  title: "Design preview: Planner theme | MBA in Marketing Management guide",
  robots: { index: false, follow: false },
};

export default function SpecializationsGuideMarketingPreviewPage() {
  return <PlannerMarketingGuideClient />;
}
