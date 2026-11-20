import type { Metadata } from "next";
import AboutPage from "@/components/templates/AboutPage";
import { getAboutContent, getProjects } from "@/lib/content";
import { getYearsOfExperience } from "@/data/personal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Dezza Rizqi — skills, education, and background as a mobile engineer specializing in React Native and Flutter.",
  openGraph: {
    title: "About | Dezza Rizqi",
    description:
      "Skills, education, and background as a mobile engineer specializing in React Native and Flutter.",
  },
};

const About = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  const [content, projects] = await Promise.all([
    getAboutContent(locale),
    getProjects(locale),
  ]);
  return (
    <AboutPage
      {...content}
      years={getYearsOfExperience()}
      appsShipped={projects.length}
    />
  );
};

export default About;
