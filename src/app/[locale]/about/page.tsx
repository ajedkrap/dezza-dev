import type { Metadata } from "next";
import AboutPage from "@/components/templates/AboutPage";

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

const About = () => {
  return <AboutPage />;
};

export default About;
