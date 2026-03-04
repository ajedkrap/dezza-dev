"use client";

import HeroSection from "../organisms/HeroSection";
import IntroSection from "../organisms/IntroSection";
import CareerSection from "../organisms/CareerSection";
import ProjectsSection from "../organisms/ProjectsSection";
import TechStackSection from "../organisms/TechStackSection";
import ContactSection from "../organisms/ContactSection";

const HomePage = () => {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <IntroSection />
      <CareerSection />
      <ProjectsSection />
      <TechStackSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;
