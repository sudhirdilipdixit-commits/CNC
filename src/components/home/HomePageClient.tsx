"use client";

import { useState, useCallback } from "react";
import HeroSection from "./HeroSection";
import PromiseSection from "./PromiseSection";
import PathSection from "./PathSection";
import ProgrammesSection from "./ProgrammesSection";
import WhyUsSection from "./WhyUsSection";
import HowItWorksSection from "./HowItWorksSection";
import TrustStripSection from "./TrustStripSection";
import BlogSection from "./BlogSection";
import FAQSection from "./FAQSection";
import CTABand from "./CTABand";
import PageBuilder from "./PageBuilder";
import LeadModal from "@/components/forms/LeadModal";

interface HomePageClientProps {
  cmsData?: Record<string, unknown> | null;
}

export default function HomePageClient({ cmsData }: HomePageClientProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState("home");

  const openLeadForm = useCallback((source = "home") => {
    setModalSource(source);
    setModalOpen(true);
  }, []);

  const sections = cmsData?.sections as Array<Record<string, unknown>> | undefined;

  return (
    <>
      {sections?.length ? (
        <PageBuilder sections={sections as never} onOpenLeadForm={openLeadForm} />
      ) : (
        <>
          <HeroSection onOpenLeadForm={() => openLeadForm("hero")} />
          <PromiseSection />
          <PathSection />
          <ProgrammesSection onOpenLeadForm={() => openLeadForm("programmes")} />
          <WhyUsSection />
          <HowItWorksSection />
          <TrustStripSection />
          <BlogSection />
          <FAQSection />
          <CTABand onOpenLeadForm={() => openLeadForm("cta-band")} />
        </>
      )}

      <LeadModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        source={modalSource}
      />
    </>
  );
}
