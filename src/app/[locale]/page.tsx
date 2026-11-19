import type { Metadata } from "next";
import HomePage from "@/components/templates/HomePage";
import { getExperiences, getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Dezza Rizqi — Fullstack Mobile",
  description:
    "Portfolio of Dezza Rizqi, a Mobile Engineer with 4+ years of experience in React Native, Flutter, and fullstack development.",
  openGraph: {
    title: "Dezza Rizqi — Fullstack Mobile",
    description:
      "Mobile Engineer with 4+ years of experience in React Native, Flutter, and fullstack development.",
  },
};

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [experiences, projects] = await Promise.all([
    getExperiences(locale),
    getProjects(locale),
  ]);
  return (
    <HomePage
      experiences={experiences}
      projects={projects.filter((p) => p.featured)}
    />
  );
}
