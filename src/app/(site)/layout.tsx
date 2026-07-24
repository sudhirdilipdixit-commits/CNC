"use client";

import { useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBar from "@/components/layout/MobileBar";
import LeadModal from "@/components/forms/LeadModal";
import PopupManager from "@/components/forms/PopupManager";

// Suppressed on Contact and Thank You pages per brand spec.
const MOBILE_BAR_HIDDEN_PATHS = ["/contact-us", "/thank-you"];

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState("site");
  const pathname = usePathname();
  const hideMobileBar = MOBILE_BAR_HIDDEN_PATHS.some(
    (p) => pathname === p || pathname === `${p}/`
  );

  const openLeadForm = useCallback((source = "site") => {
    setModalSource(source);
    setModalOpen(true);
  }, []);

  const closeLeadForm = useCallback(() => setModalOpen(false), []);

  return (
    <>
      <Header onOpenLeadForm={() => openLeadForm("header")} />
      <main id="main" className={hideMobileBar ? "" : "pb-[var(--mobile-bar-h)] lg:pb-0"}>
        {children}
      </main>
      <Footer />
      {!hideMobileBar && <MobileBar onOpenLeadForm={() => openLeadForm("mobile-bar")} />}
      <LeadModal open={modalOpen} onClose={closeLeadForm} source={modalSource} />
      <PopupManager onOpenLeadForm={openLeadForm} />
    </>
  );
}
