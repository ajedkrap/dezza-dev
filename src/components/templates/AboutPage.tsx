"use client";

import { motion } from "motion/react";
import GlassCard from "@/components/atoms/GlassCard";
import GlassBadge from "@/components/atoms/GlassBadge";
import SectionHeading from "@/components/molecules/SectionHeading";
import SkillBar from "@/components/molecules/SkillBar";
import { personal } from "@/data/personal";
import { education, certificates } from "@/data/education";
import { skills } from "@/data/skills";
import { useTranslations } from "next-intl";
import StatCard from "../molecules/StatCard";
import AvatarGallery from "../molecules/AvatarGallery";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const AboutPage = () => {
  const t = useTranslations("sections");
  const tPersonal = useTranslations("data.personal");
  const tSkills = useTranslations("data.skills");
  const tEdu = useTranslations("data.education");

  return (
    <div className="mx-auto max-w-5xl px-6 py-20 pb-32 md:px-12 lg:px-24">
      {/* ── Summary ── */}
      <motion.div {...fadeUp}>
        <SectionHeading title={t("about")} subtitle={t("aboutSubtitle")} />
        <div className="mt-6 flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-10">
          <AvatarGallery size="lg" />
          <p className="max-w-2xl text-base text-muted-foreground leading-relaxed">
            {tPersonal("summary")}
          </p>
        </div>
      </motion.div>

      {/* Stats row */}
      <motion.div
        className="mt-8 flex w-full max-w-2xl justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard value="4+" label={t("yearsExperience")} />
          <StatCard value="6+" label={t("appsShipped")} />
        </div>
      </motion.div>

      {/* ── Skills ── */}
      <section className="mt-16">
        <motion.div {...fadeUp}>
          <SectionHeading title={t("skills")} subtitle={t("skillsSubtitle")} />
        </motion.div>
        <div className="mt-8 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((group) => (
            <motion.div key={group.key} {...fadeUp}>
              <h3 className="mb-4 text-sm font-semibold text-accent-purple uppercase tracking-wider">
                {tSkills(group.key)}
              </h3>
              <div className="space-y-3">
                {group.skills.map((skill) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Education ── */}
      <section className="mt-16">
        <motion.div {...fadeUp}>
          <SectionHeading
            title={t("education")}
            subtitle={t("educationSubtitle")}
          />
        </motion.div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {education.map((edu) => (
            <motion.div key={edu.institution} {...fadeUp}>
              <GlassCard hoverGlow className="p-6">
                <p className="text-xs font-mono text-accent-cyan">
                  {edu.period}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-foreground">
                  {edu.institution}
                </h3>
                <p className="text-sm text-accent-magenta">
                  {tEdu(`${edu.key}.degree`)} — {edu.degreeTitle}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {tEdu(`${edu.key}.field`)}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Certifications ── */}
      <section className="mt-16">
        <motion.div {...fadeUp}>
          <SectionHeading
            title={t("certifications")}
            subtitle={t("certificationsSubtitle")}
          />
        </motion.div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert) => (
            <motion.div key={cert.name} {...fadeUp}>
              <GlassCard hoverGlow className="p-6">
                <p className="text-xs font-mono text-accent-cyan">
                  {cert.year}
                </p>
                <h3 className="mt-2 text-sm font-semibold text-foreground">
                  {cert.name}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {cert.issuer}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Languages ── */}
      <section className="mt-16">
        <motion.div {...fadeUp}>
          <SectionHeading
            title={t("languages")}
            subtitle={t("languagesSubtitle")}
          />
        </motion.div>
        <motion.div className="mt-8 flex flex-wrap gap-3" {...fadeUp}>
          {personal.languageKeys.map((langKey) => (
            <GlassBadge key={langKey} color="cyan">
              {tPersonal(`languages.${langKey}.name`)} — {tPersonal(`languages.${langKey}.level`)}
            </GlassBadge>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default AboutPage;
