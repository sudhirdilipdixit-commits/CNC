import { sanityFetch } from "@/sanity/lib/client";
import { resourcesPageQuery } from "@/sanity/lib/queries";
import ResourcesHubClient from "./ResourcesHubClient";

export interface ResourceItem {
  _id: string;
  title: string;
  titleHighlight: string | null;
  coverType: string;
  category: string;
  lastUpdated: string | null;
  pageCount: number | null;
  isInteractiveTool: boolean;
  isFeatured: boolean;
  downloadCount: string | null;
  checklistItems: string[] | null;
  slug: string | null;
  href: string | null;
  order: number | null;
}

export default async function ResourcesPage() {
  const resources = await sanityFetch<ResourceItem[]>({
    query: resourcesPageQuery,
    revalidate: 300,
    tags: ["resourceItem"],
  });

  return <ResourcesHubClient resources={resources ?? []} />;
}
