"use client";

import { useRef } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import type { Project } from "@/data/cvData";

import { GlassCard } from "@/components/glass-card";
import { SectionHeading } from "@/components/section-heading";
import Link from "next/link";

type ProjectsSectionProps = {
  projects: ReadonlyArray<Project>;
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  function scrollProjects(direction: "left" | "right") {
    const track = trackRef.current;
    if (!track) return;

    const step = track.clientWidth * 0.88;
    track.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  }

  return (
    <section id="projects" className="anchor-offset section-screen">
      <div className="section-content">
        <SectionHeading
          label="Projects"
          title="Selected Builds"
          description="Production and client-facing work focused on usability, speed, and maintainable architecture."
        />
        <div className="mb-4 flex items-center justify-end gap-2">
          <button
            type="button"
            aria-label="Previous projects"
            onClick={() => scrollProjects("left")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-200/25 bg-black/40 text-brand-100 transition hover:bg-brand-700/35"
          >
            <FiChevronLeft size={"1.125rem"} />
          </button>
          <button
            type="button"
            aria-label="Next projects"
            onClick={() => scrollProjects("right")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-200/25 bg-black/40 text-brand-100 transition hover:bg-brand-700/35"
          >
            <FiChevronRight size={"1.125rem"} />
          </button>
        </div>
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((project) => (
            <GlassCard
              key={project.name}
              cardHoverEffect
              className="group snap-start shrink-0 w-[20rem] flex h-120 flex-col overflow-hidden p-4!"
            >
              <div className="relative mb-4 overflow-hidden rounded-2xl border border-brand-200/20">
                <Image
                  src={project.image}
                  alt={`${project.name} preview`}
                  height={200}
                  width={400}
                  className="h-40 w-full object-cover transition duration-350 group-hover:scale-110"
                />
                <Link
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute right-3 top-3 rounded-full border border-brand-200/40 bg-black/45 px-3 py-1 text-xs font-medium text-brand-100 backdrop-blur-md transition hover:bg-brand-700/55"
                >
                  View Project
                </Link>
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
          ))}
        </div>
      </div>
    </section>
  );
}
