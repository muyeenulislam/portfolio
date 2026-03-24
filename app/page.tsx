import { BackgroundBeams } from "@/components/background-beams";
import { AboutSection } from "@/components/home/about-section";
import { ContactSection } from "@/components/home/contact-section";
import { EducationSection } from "@/components/home/education-section";
import { ExperienceSection } from "@/components/home/experience-section";
import { Footer } from "@/components/home/footer";
import { HeroSection } from "@/components/home/hero-section";
import { Navbar } from "@/components/home/navbar";
import { ProjectsSection } from "@/components/home/projects-section";
import { ScrollTopButton } from "@/components/home/scroll-top-button";
import { SkillsSection } from "@/components/home/skills-section";
import { portfolioData } from "@/data/cvData";

export default function Home() {
  const { profile, navItems, experiences, projects, skillGroups, education } =
    portfolioData;
  const githubUrl =
    profile.socials.find((social) => social.label === "GitHub")?.href ?? "#";
  const linkedinUrl =
    profile.socials.find((social) => social.label === "LinkedIn")?.href ?? "#";

  return (
    <div className="relative min-h-screen">
      <Navbar logo={profile.navLogo} navItems={navItems} />
      <HeroSection
        name={profile.name}
        headline={profile.headline}
        cvDownloadUrl={profile.cvDownloadUrl}
      />

      <section className="relative overflow-hidden">
        <BackgroundBeams className="pointer-events-none fixed inset-0 opacity-55" />
        <main className="relative z-10">
          <AboutSection
            summary={profile.summary}
            about={profile.about}
            visual={profile.heroVisual}
            githubUrl={githubUrl}
            linkedinUrl={linkedinUrl}
          />
          <ExperienceSection experiences={experiences} />
          <ProjectsSection projects={projects} />
          <SkillsSection groups={skillGroups} />
          <EducationSection education={education} />
          <ContactSection
            email={profile.email}
            phone={profile.phone}
            location={profile.location}
            socials={profile.socials}
          />
        </main>

        <div className="relative z-10">
          <Footer
            name={profile.name}
            logo={profile.navLogo}
            navItems={navItems}
            socials={profile.socials}
          />
        </div>
      </section>
      <ScrollTopButton />
    </div>
  );
}
