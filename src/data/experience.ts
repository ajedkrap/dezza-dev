import {getStorageUrl} from "@/lib/supabase";

export interface Experience {
  key: string;
  company: string;
  platform: ("android" | "iOS")[];
  framework: string;
  numberOfTeam: number;
  techStack: string[];
  pdf?: string;
}

export const experience: Experience[] = [
  {
    key: "transnovasi",
    company: "Transnovasi (PT. Transnovasi Bangun Persada)",
    platform: ["android", "iOS"],
    framework: "React Native",
    numberOfTeam: 1,
    techStack: [
      "React Native", "Typescript", "Expo", "Turborepo",
      "Redux Toolkit", "Sentry", "Livekit", "Fastlane",
      "Firebase", "VSCode", "Android Studio", "Xcode", "Figma",
    ],
  },
  {
    key: "pina",
    company: "PINA (PT. Pina Aplikasi Bersama)",
    platform: ["android", "iOS"],
    framework: "React Native",
    numberOfTeam: 3,
    techStack: [
      "React Native", "Javascript", "Redux", "Firebase",
      "OAuth", "VSCode", "Android Studio", "Xcode", "Figma",
    ],
    pdf: getStorageUrl("pdfs/works-at-pina.pdf"),
  },
  {
    key: "tataskola",
    company: "Tataskola (Subsidiary of Pintek)",
    platform: ["android", "iOS"],
    framework: "React Native",
    numberOfTeam: 1,
    techStack: ["React Native", "Javascript", "Redux", "Figma"],
    pdf: getStorageUrl("pdfs/works-at-tataskola.pdf"),
  },
  {
    key: "tkd",
    company: "PT. Teknologi Kupon Digital",
    platform: ["android"],
    framework: "Android",
    numberOfTeam: 1,
    techStack: ["Android Native", "WebView", "Java", "PHP", "Figma"],
    pdf: getStorageUrl("pdfs/works-at-tkd.pdf"),
  },
];
