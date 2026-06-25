import Link from "next/link";

export default function AICounsellorSection() {
  return (
    <section
      id="ai-counsellor"
      className="relative overflow-hidden py-16 lg:py-24"
      style={{
        background: "linear-gradient(135deg, var(--navy) 0%, var(--navy-dark) 100%)",
        color: "var(--ivory)",
      }}
    >
      <span
        className="absolute -top-1/2 -right-1/10 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(252,204,0,0.1) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="container relative z-10">
        <div className="max-w-[700px] mx-auto text-center">
          <p className="eyebrow eyebrow-light">AI COUNSELLOR · NEW</p>
          <h2
            className="h-display h2 mb-4"
            style={{
              color: "var(--ivory)",
              position: "relative",
              paddingBottom: "12px",
            }}
          >
            Not ready to talk? Let our AI Counsellor recommend three programmes for you.
            <span
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[3px] rounded"
              style={{ background: "var(--yellow)" }}
              aria-hidden="true"
            />
          </h2>
          <p className="text-[17px] mb-6" style={{ color: "var(--pale-navy)" }}>
            Answer six quick questions about your situation, budget, and goals.
            In two minutes, you&apos;ll see three personalised programme
            recommendations with a clear explanation of why each fits. No email
            required to see the results.
          </p>
          <Link href="/ai-counsellor" className="btn btn-primary">
            Start the AI Counsellor
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
          <p className="text-[13px] mt-4" style={{ color: "var(--grey)" }}>
            Built in-house. Uses the same logic our senior counsellors apply to
            every enquiry.
          </p>
        </div>
      </div>
    </section>
  );
}
