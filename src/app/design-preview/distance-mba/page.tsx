import type { Metadata } from "next";
import PlannerDistanceMBAClient from "@/components/planner/PlannerDistanceMBAClient";

export const metadata: Metadata = {
  title: "Design preview: Planner theme | Top Distance/Online MBA",
  robots: { index: false, follow: false },
};

export default function DistanceMBAPreviewPage() {
  return <PlannerDistanceMBAClient />;
}
