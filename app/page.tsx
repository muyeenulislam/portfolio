import { AboutSection } from "@/components/AboutSection";
import { BackgroundBeams } from "@/components/BackgroundBeams";
import { ContactSection } from "@/components/ContactSection";
import { EducationSection } from "@/components/EducationSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ScrollTopButton } from "@/components/ScrollTopButton";
import { SkillsSection } from "@/components/SkillsSection";
import { portfolioData } from "@/data/cvData";

export default function Home() {
  const { profile, navItems, experiences, projects, skillGroups, education } =
    portfolioData;
  const githubUrl =
    profile.socials.find((social) => social.label === "GitHub")?.href ?? "#";
  const linkedinUrl =
    profile.socials.find((social) => social.label === "LinkedIn")?.href ?? "#";

  return (
    <div className="relative isolate min-h-screen">
      <Navbar logo={profile.navLogo} navItems={navItems} />
      <HeroSection
        name={profile.name}
        headline={profile.headline}
        cvDownloadUrl={profile.cvDownloadUrl}
      />

      <section className="relative isolate overflow-hidden">
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
            contactVisual={profile.contactVisual}
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
