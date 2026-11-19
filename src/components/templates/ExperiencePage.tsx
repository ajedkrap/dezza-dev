"use client";

import { motion } from "motion/react";
import SectionHeading from "@/components/molecules/SectionHeading";
import TimelineItem from "@/components/molecules/TimelineItem";
import GlassBadge from "@/components/atoms/GlassBadge";
import { useTranslations } from "next-intl";
import type { Experience } from "@/types/content";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const ExperiencePage = ({ experiences }: { experiences: Experience[] }) => {
  const t = useTranslations("sections");
  const tExp = useTranslations("experience");

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
        {experiences.map((exp) => (
          <TimelineItem
            key={exp.key}
            date={exp.period}
            title={exp.title}
            company={exp.company}
            description={exp.description}
            bullets={exp.bullets}
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
