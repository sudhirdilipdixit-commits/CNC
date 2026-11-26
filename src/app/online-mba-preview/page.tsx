import type { Metadata } from "next";
import PlannerOnlineMBAClient from "@/components/planner/PlannerOnlineMBAClient";

export const metadata: Metadata = {
  title: "Design preview: Planner theme | Online MBA",
  robots: { index: false, follow: false },
};

export default function OnlineMBAPreviewPage() {
  return <PlannerOnlineMBAClient />;
}
