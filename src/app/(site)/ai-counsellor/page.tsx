import { sanityFetch } from "@/sanity/lib/client";
import { aiCounsellorProgrammesQuery } from "@/sanity/lib/queries";
import AICounsellorClient from "./AICounsellorClient";

export interface SanityProgramme {
  _id: string;
  courseName: string;
  universityName: string;
  universityLogoUrl: string | null;
  aiMode: string;
  aiFeeBand: string;
  duration: string;
  fees: string;
  nextBatch: string | null;
  accreditations: string[] | null;
  specializations: string[] | null;
  targetProfiles: string[] | null;
  studyHours: string[] | null;
  careerGoals: string[] | null;
  isFeatured: boolean;
}

export default async function AICounsellorPage() {
  const sanityProgrammes = await sanityFetch<SanityProgramme[]>({
    query: aiCounsellorProgrammesQuery,
    revalidate: 3600,
    tags: ["courseCard"],
  });

  return <AICounsellorClient sanityProgrammes={sanityProgrammes ?? []} />;
}
