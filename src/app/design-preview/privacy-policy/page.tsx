import type { Metadata } from "next";
import PlannerPrivacyPolicyClient from "@/components/planner/PlannerPrivacyPolicyClient";

export const metadata: Metadata = {
  title: "Design preview: Planner theme | Privacy Policy",
  robots: { index: false, follow: false },
};

export default function PrivacyPolicyPreviewPage() {
  return <PlannerPrivacyPolicyClient />;
}
