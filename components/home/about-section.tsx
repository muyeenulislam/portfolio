import Image from "next/image";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

import { SectionHeading } from "@/components/section-heading";

type AboutSectionProps = {
  summary: string;
  about: ReadonlyArray<string>;
  visual: string;
  githubUrl: string;
  linkedinUrl: string;
};

export function AboutSection({
  summary,
  about,
  visual,
  githubUrl,
  linkedinUrl,
}: AboutSectionProps) {
  return (
    <section id="about" className="anchor-offset section-screen">
      <div className="section-content">
        <SectionHeading
          label="About"
          title="Who I Am"
          description="A quick overview of my approach to engineering, collaboration, and building reliable digital products."
        />
        <div className="grid items-start gap-6 md:grid-cols-[0.95fr_1.05fr]">
          <Image
            src={visual}
            alt="About visual"
            height={800}
            width={400}
            className="h-full w-full rounded-2xl object-cover"
          />

          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-brand-200/85 sm:text-base">
              {summary}
            </p>
            {about.map((line) => (
              <p
                key={line}
                className="text-sm leading-relaxed text-brand-200/80 sm:text-base"
              >
                {line}
              </p>
            ))}
            <div className="pt-2">
              <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-brand-200/70 uppercase">
                Connect
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-200/35 bg-brand-700/20 text-brand-100 transition hover:-translate-y-0.5 hover:bg-brand-700/40"
                >
                  <FaGithub size={"1.125rem"} />
                </a>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-200/35 bg-brand-700/20 text-brand-100 transition hover:-translate-y-0.5 hover:bg-brand-700/40"
                >
                  <FaLinkedinIn size={"1.125rem"} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
