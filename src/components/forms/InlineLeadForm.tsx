"use client";

import { useLeadForm } from "./useLeadForm";
import LeadFormFields from "./LeadFormFields";

interface InlineLeadFormProps {
  source: string;
  title?: string;
  subtitle?: string;
  submitLabel?: string;
  className?: string;
}

export default function InlineLeadForm({
  source,
  title = "Get Free Guidance",
  subtitle = "Free. Takes 2 minutes.",
  submitLabel = "Get Free Counselling",
  className,
}: InlineLeadFormProps) {
  const form = useLeadForm({ source, active: true });
  const { duplicate, handleSubmit } = form;

  return (
    <div className={`inline-lead-form${className ? ` ${className}` : ""}`}>
      <div className="inline-lead-form-header">
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>

      {duplicate ? (
        <div className="inline-lead-form-success">
          <div className="modal-success-icon" aria-hidden="true">✓</div>
          <p>Your enquiry has already been received. The programme team will be in touch shortly.</p>
        </div>
      ) : (
        <form noValidate onSubmit={handleSubmit} className="inline-lead-form-body">
          <LeadFormFields form={form} submitLabel={submitLabel} />
        </form>
      )}
    </div>
  );
}
