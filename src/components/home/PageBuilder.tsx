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

interface Section {
  _type: string;
  _key?: string;
  [key: string]: unknown;
}

interface PageBuilderProps {
  sections: Section[];
  onOpenLeadForm: (source?: string) => void;
}

export default function PageBuilder({ sections, onOpenLeadForm }: PageBuilderProps) {
  return (
    <>
      {sections.map((section, i) => {
        const key = section._key || `${section._type}-${i}`;

        switch (section._type) {
          case "heroBlock":
            return (
              <HeroSection
                key={key}
                onOpenLeadForm={() => onOpenLeadForm("hero")}
                hero={{
                  eyebrow: section.eyebrow as string,
                  headline: section.headline as string,
                  subheadline: section.subheadline as string,
                  primaryCTA: section.primaryCTA as string,
                  secondaryCTA: section.secondaryCTA as string,
                  trustStrip: section.trustStrip as string[],
                }}
              />
            );

          case "promiseBlock":
            return <PromiseSection key={key} />;

          case "pathBlock":
            return <PathSection key={key} />;

          case "programmesBlock":
            return (
              <ProgrammesSection key={key} onOpenLeadForm={() => onOpenLeadForm("programmes")} />
            );

          case "whyUsBlock":
            return <WhyUsSection key={key} />;

          case "aiCounsellorBlock":
            return <AICounsellorSection key={key} />;

          case "howItWorksBlock":
            return <HowItWorksSection key={key} />;

          case "trustStripBlock":
            return <TrustStripSection key={key} />;

          case "blogBlock":
            return (
              <BlogSection
                key={key}
                blogPosts={section.posts as never}
              />
            );

          case "faqBlock":
            return (
              <FAQSection
                key={key}
                faqs={section.faqs as never}
              />
            );

          case "ctaBandBlock":
            return (
              <CTABand key={key} onOpenLeadForm={() => onOpenLeadForm("cta-band")} />
            );

          default:
            return null;
        }
      })}
    </>
  );
}
