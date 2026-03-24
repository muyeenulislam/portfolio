import { SectionReveal } from "@/components/SectionReveal";
import { WavyBackground } from "@/components/WavyBackground";

type HeroSectionProps = {
  name: string;
  headline: string;
  cvDownloadUrl: string;
};

export function HeroSection({
  name,
  headline,
  cvDownloadUrl,
}: HeroSectionProps) {
  return (
    <section id="top" className="anchor-offset">
      <SectionReveal>
        <WavyBackground
          containerClassName="h-[100svh] w-full bg-black/40"
          className="mx-auto flex h-full w-full max-w-6xl items-center"
          waveOpacity={0.5}
          blur={14}
          waveWidth={56}
        >
          <div className="mx-auto w-full max-w-4xl">
            <h1 className="max-w-4xl font-heading text-4xl leading-[1.05] font-semibold text-brand-100 sm:text-6xl lg:text-7xl">
              {name}
            </h1>
            <p className="mt-4 text-lg text-brand-200/90 sm:text-2xl">
              {headline}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={cvDownloadUrl}
                download
                className="rounded-full border border-brand-200/35 bg-brand-700/30 px-5 py-2.5 text-sm font-semibold text-brand-100 transition hover:-translate-y-0.5 hover:bg-brand-700/50"
              >
                Download CV
              </a>
              <a
                href="#contact"
                className="rounded-full border border-brand-200/25 px-5 py-2.5 text-sm font-semibold text-brand-100 transition hover:-translate-y-0.5 hover:border-brand-200/55 hover:bg-brand-700/20"
              >
                Hire Me
              </a>
            </div>
          </div>
        </WavyBackground>
      </SectionReveal>
    </section>
  );
}
