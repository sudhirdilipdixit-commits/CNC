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
            return (
              <PromiseSection
                key={key}
                heading={section.heading as string}
                body={section.body as string}
                pillars={section.pillars as string[]}
              />
            );

          case "pathBlock":
            return (
              <PathSection
                key={key}
                heading={section.heading as string}
                subheading={section.subheading as string}
                cards={section.cards as never}
              />
            );

          case "programmesBlock":
            return (
              <ProgrammesSection
                key={key}
                onOpenLeadForm={() => onOpenLeadForm("programmes")}
                heading={section.heading as string}
                subheading={section.subheading as string}
                featuredCourses={section.featuredCourses as never}
              />
            );

          case "whyUsBlock":
            return (
              <WhyUsSection
                key={key}
                heading={section.heading as string}
                rows={section.rows as never}
              />
            );

          case "howItWorksBlock":
            return (
              <HowItWorksSection
                key={key}
                heading={section.heading as string}
                subheading={section.subheading as string}
                steps={section.steps as never}
              />
            );

          case "trustStripBlock":
            return (
              <TrustStripSection
                key={key}
                caption={section.caption as string}
                badges={section.badges as never}
              />
            );

          case "blogBlock":
            return (
              <BlogSection
                key={key}
                heading={section.heading as string}
                subheading={section.subheading as string}
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
              <CTABand
                key={key}
                onOpenLeadForm={() => onOpenLeadForm("cta-band")}
                heading={section.heading as string}
                subheading={section.subheading as string}
                ctaText={section.ctaText as string}
              />
            );

          default:
            return null;
        }
      })}
    </>
  );
}
