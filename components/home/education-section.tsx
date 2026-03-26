import type { Education } from "@/data/cvData";

import { GlassCard } from "@/components/glass-card";
import { SectionHeading } from "@/components/section-heading";

type EducationSectionProps = {
  education: ReadonlyArray<Education>;
};

export function EducationSection({ education }: EducationSectionProps) {
  return (
    <section id="education" className="anchor-offset section-screen">
      <div className="section-content">
        <SectionHeading
          label="Education"
          title="Academic Background"
          description="Formal education milestones supporting the engineering foundation."
        />
        <div className="grid grid-cols-1 gap-4">
          {education.map((item, index) => (
            <GlassCard cardHoverEffect className="h-full" key={index}>
              <h3 className="font-heading text-xl font-semibold text-brand-100">
                {item.institution}
              </h3>
              <p className="mt-2 text-brand-200/90">{item.credential}</p>
              <p className="mt-1 text-sm text-brand-200/70">{item.details}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
