"use client";

import { useState, type CSSProperties } from "react";
import LeadModal from "@/components/forms/LeadModal";

export default function LeadCTAButton({
  label,
  source,
  className,
  style,
}: {
  label: string;
  source: string;
  className?: string;
  style?: CSSProperties;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className={className} style={style} onClick={() => setOpen(true)}>
        {label}
      </button>
      <LeadModal open={open} onClose={() => setOpen(false)} source={source} />
    </>
  );
}
