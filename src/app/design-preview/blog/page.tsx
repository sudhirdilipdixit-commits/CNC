import type { Metadata } from "next";
import PlannerBlogIndexClient from "@/components/planner/PlannerBlogIndexClient";

export const metadata: Metadata = {
  title: "Design preview: Planner theme | Blog",
  robots: { index: false, follow: false },
};

export default function BlogPreviewPage() {
  return <PlannerBlogIndexClient />;
}
