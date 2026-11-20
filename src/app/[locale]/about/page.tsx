import type { Metadata } from "next";
import AboutPage from "@/components/templates/AboutPage";
import { getAboutContent } from "@/lib/content";

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
  const content = await getAboutContent(locale);
  return <AboutPage {...content} />;
};

export default About;
