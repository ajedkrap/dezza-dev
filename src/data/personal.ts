export const personal = {
  name: "Dezza Rizqi",
  email: "rizqidezza@yahoo.com",
  github: "https://github.com/ajedkrap",
  linkedin: "https://linkedin.com/in/rizqidezza",
  languageKeys: ["indonesian", "english", "japanese", "korean"] as const,
  /** First mobile job (year, month 1–12); drives the "N+ years" copy. */
  careerStart: { year: 2020, month: 10 },
};

/** Full years since `personal.careerStart`. */
export function getYearsOfExperience(now = new Date()): number {
  const { year, month } = personal.careerStart;
  const years = now.getFullYear() - year;
  return now.getMonth() + 1 < month ? years - 1 : years;
}
