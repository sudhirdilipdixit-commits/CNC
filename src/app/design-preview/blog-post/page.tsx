import type { Metadata } from "next";
import PlannerBlogPostClient from "@/components/planner/PlannerBlogPostClient";

export const metadata: Metadata = {
  title: "Design preview: Planner theme | Blog post",
  robots: { index: false, follow: false },
};

export default function BlogPostPreviewPage() {
  return <PlannerBlogPostClient />;
}
