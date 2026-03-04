import type { Metadata } from "next";
import ExperiencePage from "@/components/templates/ExperiencePage";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Career timeline of Dezza Rizqi — 4+ years building mobile apps across fintech, government, and education sectors.",
  openGraph: {
    title: "Experience | Dezza Rizqi",
    description:
      "Career timeline — 4+ years building mobile apps across fintech, government, and education sectors.",
  },
};

export default function Experience() {
  return <ExperiencePage />;
}
