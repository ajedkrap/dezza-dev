"use client";

import HeroSection from "../organisms/HeroSection";
import IntroSection from "../organisms/IntroSection";
import CareerSection from "../organisms/CareerSection";
import ProjectsSection from "../organisms/ProjectsSection";
import TechStackSection from "../organisms/TechStackSection";
import ContactSection from "../organisms/ContactSection";
import type { Experience, Project } from "@/types/content";

interface HomePageProps {
  experiences: Experience[];
  projects: Project[];
}

const HomePage = ({ experiences, projects }: HomePageProps) => {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <IntroSection />
      <CareerSection experiences={experiences} />
      <ProjectsSection projects={projects} />
      <TechStackSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;
