export interface Education {
  key: string;
  degreeTitle: string;
  institution: string;
  period: string;
}

export const education: Education[] = [
  {
    key: "binus",
    degreeTitle: "S.Kom",
    institution: "Binus International University",
    period: "2012 — 2019",
  },
];

export interface Certificate {
  name: string;
  issuer: string;
  year: string;
}

export const certificates: Certificate[] = [
  {
    name: "iOS & Swift - The Complete iOS App Development Bootcamp",
    issuer: "Udemy",
    year: "2025",
  },
  {
    name: "The Complete Flutter Development Bootcamp with Dart",
    issuer: "Udemy",
    year: "2023",
  },
  {
    name: "Fullstack Dev & Mobile (React Native, ExpressJS)",
    issuer: "Arkademy",
    year: "2020",
  },
];
