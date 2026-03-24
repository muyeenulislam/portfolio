import type { Experience } from "@/data/cvData";

import { GlassCard } from "@/components/GlassCard";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionReveal } from "@/components/SectionReveal";

type ExperienceSectionProps = {
  experiences: ReadonlyArray<Experience>;
};

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="anchor-offset section-screen">
      <div className="section-content">
        <SectionHeading
          label="Experience"
          title="Hands-on Product Engineering"
          description="Recent roles and direct contributions across frontend architecture, backend integration, and performance-focused delivery."
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {experiences.map((experience, index) => (
            <SectionReveal
              key={`${experience.company}-${experience.period}`}
              delay={index * 90}
              className="h-full"
            >
              <GlassCard cardHoverEffect className="flex h-full flex-col">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-brand-100 sm:text-2xl">
                      {experience.role}
                    </h3>
                    <p className="text-brand-200/80">{experience.company}</p>
                  </div>
                  <span className="rounded-full border border-brand-200/25 bg-brand-700/20 px-3 py-1 text-xs font-semibold tracking-wide text-brand-100 uppercase">
                    {experience.period}
                  </span>
                </div>

                <ul className="mt-5 grid gap-2 text-sm leading-relaxed text-brand-200/85 sm:text-base">
                  {experience.responsibilities.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-200/80" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {experience.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-brand-200/20 bg-brand-950/55 px-3 py-1 text-xs font-medium text-brand-200/90"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
