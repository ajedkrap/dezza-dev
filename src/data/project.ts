export interface StoreLinks {
  playStore?: string;
  appStore?: string;
}

export interface Project {
  key: string;
  title: string;
  company: string;
  techStack: string[];
  links?: StoreLinks;
  logo?: string;
  logoBg?: string;
  logoSize?: number;
}

/** Simplified per-app entry for HomePage grid */
export interface AppEntry {
  name: string;
  company: string;
  logo: string;
  logoBg: string;
  logoSize?: number;
  framework: string[];
  links?: StoreLinks;
}

export const projects: Project[] = [
  {
    key: "operationSupport",
    title: "Operation Support App",
    company: "Transnovasi (Korlantas Polri)",
    techStack: ["React Native", "TypeScript", "Redux Toolkit", "Firebase", "LiveKit", "Expo"],
    logo: "/app-logos/k3i_operation.png",
    logoBg: "#ffffff",
    logoSize: 72,
  },
  {
    key: "publicApp",
    title: "Public App",
    company: "Transnovasi (Korlantas Polri)",
    techStack: ["React Native", "JavaScript", "Firebase", "Redux"],
    links: {
      appStore: "https://apps.apple.com/id/app/k3i-korlantas-polri/id1593426320",
    },
    logo: "/app-logos/k3i_public.png",
    logoBg: "#ffffff",
    logoSize: 60,
  },
  {
    key: "pina",
    title: "PINA Wealth Management",
    company: "PINA",
    techStack: ["React Native", "JavaScript", "OAuth", "Redux"],
    links: {
      playStore: "https://play.google.com/store/apps/details?id=app.pina.id&hl=id",
      appStore: "https://apps.apple.com/id/app/pina/id1591615968",
    },
    logo: "/app-logos/pina.png",
    logoBg: "#fef5b9",
    logoSize: 28,
  },
  {
    key: "tataskola",
    title: "Tataskola",
    company: "Tataskola (subsidiary of Pintek)",
    techStack: ["React Native", "JavaScript", "Figma"],
    logo: "/app-logos/tataskola.png",
    logoBg: "#d2e8f6",
  },
  {
    key: "kuponMakan",
    title: "Kupon Makan",
    company: "PT. Teknologi Kupon Digital",
    techStack: ["Java (Android)", "PHP", "WebView"],
    logo: "/app-logos/kupon_makan.png",
    logoBg: "#ffffff",
  },
  {
    key: "koop",
    title: "Koop",
    company: "PT. Teknologi Kupon Digital",
    techStack: ["Java (Android)", "React Native", "JavaScript", "PHP"],
    logo: "/app-logos/koop.png",
    logoBg: "#ffffff",
  },
];

export const apps: AppEntry[] = [
  {
    name: "Operation Support App",
    company: "Transnovasi",
    logo: "/app-logos/k3i_operation.png",
    logoBg: "#ffffff",
    logoSize: 72,
    framework: ["React Native", "TypeScript", "Expo"],
  },
  {
    name: "Public App",
    company: "Transnovasi",
    logo: "/app-logos/k3i_public.png",
    logoBg: "#ffffff",
    logoSize: 60,
    framework: ["React Native", "JavaScript"],
    links: {
      appStore: "https://apps.apple.com/id/app/k3i-korlantas-polri/id1593426320",
    },
  },
  {
    name: "PINA",
    company: "PINA",
    logo: "/app-logos/pina.png",
    logoBg: "#fef5b9",
    logoSize: 28,
    framework: ["React Native", "JavaScript"],
    links: {
      playStore: "https://play.google.com/store/apps/details?id=app.pina.id&hl=id",
      appStore: "https://apps.apple.com/id/app/pina/id1591615968",
    },
  },
  {
    name: "Tataskola",
    company: "Tataskola",
    logo: "/app-logos/tataskola.png",
    logoBg: "#d2e8f6",
    framework: ["React Native", "JavaScript"],
  },
  {
    name: "Kupon Makan",
    company: "PT. Teknologi Kupon Digital",
    logo: "/app-logos/kupon_makan.png",
    logoBg: "#ffffff",
    framework: ["Java (Android)", "PHP"],
  },
  {
    name: "Koop",
    company: "PT. Teknologi Kupon Digital",
    logo: "/app-logos/koop.png",
    logoBg: "#ffffff",
    framework: ["Java (Android)", "React Native"],
  },
];
