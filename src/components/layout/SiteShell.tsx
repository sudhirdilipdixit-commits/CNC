"use client";

import { useState, useCallback } from "react";
import Header from "./Header";
import Footer from "./Footer";
import MobileBar from "./MobileBar";
import LeadModal from "@/components/forms/LeadModal";
import PopupManager from "@/components/forms/PopupManager";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState("site");

  const openLeadForm = useCallback((source = "site") => {
    setModalSource(source);
    setModalOpen(true);
  }, []);

  const closeLeadForm = useCallback(() => setModalOpen(false), []);

  return (
    <>
      <Header onOpenLeadForm={() => openLeadForm("header")} />
      <main id="main" className="pb-[var(--mobile-bar-h)] lg:pb-0">
        {/* Pass openLeadForm via context — using a simple prop drill approach here */}
        {typeof children === "function"
          ? (children as (fn: typeof openLeadForm) => React.ReactNode)(openLeadForm)
          : children}
      </main>
      <Footer />
      <MobileBar onOpenLeadForm={() => openLeadForm("mobile-bar")} />
      <LeadModal open={modalOpen} onClose={closeLeadForm} source={modalSource} />
      <PopupManager onOpenLeadForm={openLeadForm} />
    </>
  );
}
