import { motion } from "motion/react";
import { experience } from "@/data/experience";
import { useTranslations } from "next-intl";
import { Link } from "../../../i18n/navigation";
import { FiArrowRight } from "react-icons/fi";
import GlassCard from "../atoms/GlassCard";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const CareerSection = () => {
  const t = useTranslations("sections");
  const tData = useTranslations("data.experience");

  return (
    <section className="px-6 py-20 md:px-12 lg:px-24">
      <div className="mx-auto max-w-3xl">
        <motion.h2
          className="mb-10 text-2xl font-bold text-foreground md:text-3xl"
          {...fadeUp}
        >
          {t("career")}
        </motion.h2>

        <div className="relative ml-4 border-l border-white/10 pl-8">
        {experience.map((exp) => (
          <motion.div
            key={exp.key}
            className="relative mb-10 last:mb-0"
            {...fadeUp}
          >
            {/* Timeline dot */}
            <div className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full border border-accent-purple bg-background" />

            <GlassCard hoverGlow className="p-5">
              <p className="font-mono text-xs text-accent-cyan">{tData(`${exp.key}.date`)}</p>
              <h3 className="mt-1 text-lg font-semibold text-foreground">
                {tData(`${exp.key}.title`)}
              </h3>
              <p className="text-sm text-accent-magenta">{exp.company}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {tData(`${exp.key}.description`)}
              </p>
            </GlassCard>
          </motion.div>
        ))}
        </div>

        <motion.div className="mt-8 text-center" {...fadeUp}>
          <Link
            href="/experience"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent-cyan"
          >
            {t("viewAll")} <FiArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CareerSection;
