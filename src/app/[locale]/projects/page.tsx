import type { Metadata } from "next";
import ProjectsPage from "@/components/templates/ProjectsPage";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Mobile applications built by Dezza Rizqi — from national police operations to fintech and education platforms.",
  openGraph: {
    title: "Projects | Dezza Rizqi",
    description:
      "Mobile applications — from national police operations to fintech and education platforms.",
  },
};

const Projects = () => {
  return <ProjectsPage />;
};

export default Projects;
