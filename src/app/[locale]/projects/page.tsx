import type { Metadata } from "next";
import ProjectsPage from "@/components/templates/ProjectsPage";
import { getProjects } from "@/lib/content";

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

const Projects = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  const projects = await getProjects(locale);
  return <ProjectsPage projects={projects} />;
};

export default Projects;
