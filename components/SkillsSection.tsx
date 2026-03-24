import type { SkillGroup } from "@/data/cvData";

import { SectionHeading } from "@/components/SectionHeading";
import { SectionReveal } from "@/components/SectionReveal";

type SkillsSectionProps = {
  groups: ReadonlyArray<SkillGroup>;
};

export function SkillsSection({ groups }: SkillsSectionProps) {
  return (
    <section id="skills" className="anchor-offset section-screen">
      <div className="section-content">
        <SectionHeading
          label="Skills"
          title="Tooling and Technical Breadth"
          description="Technology stack grouped by day-to-day usage across frontend, backend, cloud integrations, and delivery workflows."
        />
        <div className="space-y-3">
          {groups.map((group, index) => (
            <SectionReveal key={group.title} delay={index * 80}>
              <div className="rounded-2xl border border-brand-200/18 bg-[linear-gradient(120deg,rgba(40,90,72,0.2),rgba(9,20,19,0.65))] px-4 py-4 transition hover:border-brand-200/45 sm:px-5">
                <h3 className="font-heading text-lg font-semibold text-brand-100 sm:text-xl">{group.title}</h3>
                <ul className="mt-3 grid gap-2 text-sm text-brand-200/85 sm:grid-cols-2 sm:text-base">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-200/80" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
