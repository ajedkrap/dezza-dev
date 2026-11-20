"use client";

import HeroSection from "../organisms/HeroSection";
import IntroSection from "../organisms/IntroSection";
import CareerSection from "../organisms/CareerSection";
import ProjectsSection from "../organisms/ProjectsSection";
import TechStackSection from "../organisms/TechStackSection";
import ContactSection from "../organisms/ContactSection";
import type { Experience, Project, StackGroup } from "@/types/content";

interface HomePageProps {
  experiences: Experience[];
  projects: Project[];
  techStack: StackGroup[];
  years: number;
}

const HomePage = ({ experiences, projects, techStack, years }: HomePageProps) => {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <IntroSection years={years} />
      <CareerSection experiences={experiences} />
      <ProjectsSection projects={projects} />
      <TechStackSection groups={techStack} />
      <ContactSection />
    </div>
  );
};

export default HomePage;
