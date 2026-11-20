import type { Metadata } from "next";
import ExperiencePage from "@/components/templates/ExperiencePage";
import { getExperiences } from "@/lib/content";
import { getYearsOfExperience } from "@/data/personal";

export function generateMetadata(): Metadata {
  const years = getYearsOfExperience();
  return {
    title: "Experience",
    description: `Career timeline of Dezza Rizqi — ${years}+ years building mobile apps across fintech, government, and education sectors.`,
    openGraph: {
      title: "Experience | Dezza Rizqi",
      description: `Career timeline — ${years}+ years building mobile apps across fintech, government, and education sectors.`,
    },
  };
}

export default async function Experience({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const experiences = await getExperiences(locale);
  return (
    <ExperiencePage experiences={experiences} years={getYearsOfExperience()} />
  );
}
