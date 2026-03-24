import Image from "next/image";

import type { Project } from "@/data/cvData";

import { GlassCard } from "@/components/GlassCard";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionReveal } from "@/components/SectionReveal";

type ProjectsSectionProps = {
  projects: ReadonlyArray<Project>;
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="anchor-offset section-screen">
      <div className="section-content">
        <SectionHeading
          label="Projects"
          title="Selected Builds"
          description="Production and client-facing work focused on usability, speed, and maintainable architecture."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <SectionReveal key={project.name} delay={index * 80} className="h-full">
              <GlassCard className="card-hover flex h-full flex-col overflow-hidden">
                <div className="relative mb-5 h-44 overflow-hidden rounded-2xl border border-brand-200/20">
                  <Image
                    src={project.image}
                    alt={`${project.name} preview`}
                    fill
                    className="object-cover transition duration-700 hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute right-3 top-3 rounded-full border border-brand-200/40 bg-black/45 px-3 py-1 text-xs font-medium text-brand-100 backdrop-blur-md transition hover:bg-brand-700/55"
                  >
                    View Project
                  </a>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-heading text-xl font-semibold text-brand-100 sm:text-2xl">
                    {project.name}
                  </h3>
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-brand-200/80 sm:text-base">
                  {project.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-brand-200/20 bg-brand-500/15 px-3 py-1 text-xs font-semibold text-brand-100"
                    >
                      {item}
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
