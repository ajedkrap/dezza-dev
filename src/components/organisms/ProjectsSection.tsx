import { motion } from "motion/react";
import GlassCard from "../atoms/GlassCard";
import Image from "next/image";
import GlassBadge from "../atoms/GlassBadge";
import { useTranslations } from "next-intl";
import type { Project } from "@/types/content";
import { Link } from "../../../i18n/navigation";
import { FaGooglePlay, FaAppStoreIos } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const ProjectsSection = ({ projects }: { projects: Project[] }) => {
  const t = useTranslations("sections");

  return (
    <section className="px-6 py-20 md:px-12 lg:px-24">
      <motion.h2
        className="mb-10 text-2xl font-bold text-foreground md:text-3xl"
        {...fadeUp}
      >
        {t("projects")}
      </motion.h2>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
        {projects.map((app) => (
          <motion.div key={app.key} {...fadeUp}>
            <GlassCard
              hoverGlow
              className="group flex flex-col items-center gap-3 p-5 text-center"
            >
              {app.logo && (
                <div
                  className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl transition-[filter] duration-300 saturate-[.25] brightness-75 group-hover:saturate-100 group-hover:brightness-100"
                  style={{ backgroundColor: app.logoBg }}
                >
                  <Image
                    src={app.logo}
                    alt={app.shortTitle}
                    width={app.logoSize ?? 40}
                    height={app.logoSize ?? 40}
                    className="object-contain"
                  />
                </div>
              )}
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  {app.shortTitle}
                </h3>
                <p className="text-xs text-muted-foreground">{app.shortCompany}</p>
              </div>
              <div className="flex flex-wrap justify-center gap-1.5">
                {app.shortStack.map((tech) => (
                  <GlassBadge
                    key={tech}
                    color="purple"
                    className="text-[10px] px-2 py-0.5"
                  >
                    {tech}
                  </GlassBadge>
                ))}
              </div>
              {app.links && (
                <div className="flex justify-center gap-2 pt-1">
                  {app.links.playStore && (
                    <a
                      href={app.links.playStore}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${app.shortTitle} on Google Play`}
                      className="text-muted-foreground transition-colors hover:text-accent-cyan"
                    >
                      <FaGooglePlay size={14} />
                    </a>
                  )}
                  {app.links.appStore && (
                    <a
                      href={app.links.appStore}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${app.shortTitle} on App Store`}
                      className="text-muted-foreground transition-colors hover:text-accent-cyan"
                    >
                      <FaAppStoreIos size={16} />
                    </a>
                  )}
                </div>
              )}
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <motion.div className="mt-8 text-center" {...fadeUp}>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent-cyan"
        >
          {t("viewAll")} <FiArrowRight size={14} />
        </Link>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
