import type { Metadata } from "next";
import PlannerSpecializationsClient from "@/components/planner/PlannerSpecializationsClient";

export const metadata: Metadata = {
  title: "Design preview: Planner theme | Specializations Guide",
  robots: { index: false, follow: false },
};

export default function SpecializationsGuidePreviewPage() {
  return <PlannerSpecializationsClient />;
}
