import type { Metadata } from "next";
import PlannerHomeClient from "@/components/home-preview/PlannerHomeClient";
import { sanityFetch } from "@/sanity/lib/client";
import { homepageQuery } from "@/sanity/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Design preview: Planner theme | CollegeNCourses",
  robots: { index: false, follow: false },
};

export default async function HomePreviewPage() {
  const cmsData = await sanityFetch<Record<string, unknown> | null>({
    query: homepageQuery,
    revalidate: 60,
  });

  return <PlannerHomeClient cmsData={cmsData} />;
}
