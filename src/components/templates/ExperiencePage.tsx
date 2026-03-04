"use client";

import { motion } from "motion/react";
import SectionHeading from "@/components/molecules/SectionHeading";
import TimelineItem from "@/components/molecules/TimelineItem";
import GlassBadge from "@/components/atoms/GlassBadge";
import { experience } from "@/data/experience";
import { useTranslations } from "next-intl";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const ExperiencePage = () => {
  const t = useTranslations("sections");
  const tExp = useTranslations("experience");
  const tData = useTranslations("data.experience");

  return (
    <div className="mx-auto max-w-5xl px-6 py-20 pb-32 md:px-12 lg:px-24">
      <motion.div {...fadeUp}>
        <SectionHeading
          title={t("careerTimeline")}
          subtitle={t("careerSubtitle")}
        />
        <p className="mt-4 max-w-2xl text-sm text-muted-foreground leading-relaxed">
          {tExp("intro")}
        </p>
      </motion.div>

      {/* Platform filter badges */}
      <motion.div className="mt-8 flex flex-wrap gap-2" {...fadeUp}>
        <GlassBadge color="cyan">React Native</GlassBadge>
        <GlassBadge color="green">Android</GlassBadge>
        <GlassBadge color="white">iOS</GlassBadge>
      </motion.div>

      {/* Timeline */}
      <div className="mt-12">
        {experience.map((exp) => (
          <TimelineItem
            key={exp.key}
            date={tData(`${exp.key}.date`)}
            title={tData(`${exp.key}.title`)}
            company={exp.company}
            description={tData(`${exp.key}.description`)}
            bullets={tData.raw(`${exp.key}.bullets`)}
            techStack={exp.techStack}
            pdf={exp.pdf}
            pdfLabel={tExp("viewCaseStudy")}
          />
        ))}
      </div>
    </div>
  );
};

export default ExperiencePage;
