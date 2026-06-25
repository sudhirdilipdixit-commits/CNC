"use client";

import { useState, useCallback } from "react";
import HeroSection from "./HeroSection";
import PromiseSection from "./PromiseSection";
import PathSection from "./PathSection";
import ProgrammesSection from "./ProgrammesSection";
import WhyUsSection from "./WhyUsSection";
import AICounsellorSection from "./AICounsellorSection";
import HowItWorksSection from "./HowItWorksSection";
import TrustStripSection from "./TrustStripSection";
import BlogSection from "./BlogSection";
import FAQSection from "./FAQSection";
import CTABand from "./CTABand";
import LeadModal from "@/components/forms/LeadModal";

export default function HomePageClient() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState("home");

  const openLeadForm = useCallback((source = "home") => {
    setModalSource(source);
    setModalOpen(true);
  }, []);

  return (
    <>
      <HeroSection onOpenLeadForm={() => openLeadForm("hero")} />
      <PromiseSection />
      <PathSection />
      <ProgrammesSection onOpenLeadForm={() => openLeadForm("programmes")} />
      <WhyUsSection />
      <AICounsellorSection />
      <HowItWorksSection />
      <TrustStripSection />
      <BlogSection />
      <FAQSection />
      <CTABand onOpenLeadForm={() => openLeadForm("cta-band")} />

      <LeadModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        source={modalSource}
      />
    </>
  );
}
