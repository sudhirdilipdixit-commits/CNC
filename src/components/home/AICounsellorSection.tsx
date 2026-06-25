export default function AICounsellorSection() {
  return (
    <section className="section-ai" id="ai-counsellor">
      <div className="container">
        <div className="ai-inner">
          <div className="eyebrow on-dark">AI COUNSELLOR · NEW</div>
          <h2 className="h-display h2">
            Not ready to talk? Let our AI Counsellor recommend three programmes for you.
          </h2>
          <p>
            Answer six quick questions about your situation, budget, and goals. In two minutes,
            you&#39;ll see three personalised programme recommendations with a clear explanation of
            why each fits. No email required to see the results.
          </p>
          <a href="#ai-counsellor" className="btn btn-primary">
            Start the AI Counsellor{" "}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
          <p className="ai-caption">
            Built in-house. Uses the same logic our senior counsellors apply to every enquiry.
          </p>
        </div>
      </div>
    </section>
  );
}
