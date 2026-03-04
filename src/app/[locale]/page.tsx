import type { Metadata } from "next";
import HomePage from "@/components/templates/HomePage";

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

export default function Home() {
  return <HomePage />;
}
