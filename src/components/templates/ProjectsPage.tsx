"use client";

import { motion } from "motion/react";
import GlassCard from "@/components/atoms/GlassCard";
import GlassBadge from "@/components/atoms/GlassBadge";
import SectionHeading from "@/components/molecules/SectionHeading";
import { projects } from "@/data/project";
import { useTranslations } from "next-intl";
import { FaGooglePlay, FaAppStoreIos } from "react-icons/fa";
import Image from "next/image";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const ProjectsPage = () => {
  const t = useTranslations("sections");
  const tProj = useTranslations("projectsPage");
  const tData = useTranslations("data.projects");

  return (
    <div className="mx-auto max-w-5xl px-6 py-20 pb-32 md:px-12 lg:px-24">
      <motion.div {...fadeUp}>
        <SectionHeading title={t("projects")} subtitle={t("projectsSubtitle")} />
        <p className="mt-4 max-w-2xl text-sm text-muted-foreground leading-relaxed">
          {tProj("intro")}
        </p>
      </motion.div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <motion.div key={project.key} {...fadeUp}>
            <GlassCard refract hoverGlow className="group flex h-full flex-col p-6">
              <div className="flex items-start gap-4">
                {project.logo && (
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl transition-all duration-300 saturate-[.25] brightness-75 group-hover:saturate-100 group-hover:brightness-100 group-hover:rotate-[4deg] group-hover:scale-110"
                    style={{ backgroundColor: project.logoBg }}
                  >
                    <Image
                      src={project.logo}
                      alt={project.title}
                      width={project.logoSize ?? 40}
                      height={project.logoSize ?? 40}
                      className="object-contain"
                    />
                  </div>
                )}
                <div>
                  <p className="text-xs font-mono text-accent-magenta">
                    {project.company}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-foreground">
                    {project.title}
                  </h3>
                </div>
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {tData(`${project.key}.description`)}
              </p>

              <ul className="mt-4 space-y-1">
                {(tData.raw(`${project.key}.details`) as string[]).map((detail, i) => (
                  <li
                    key={i}
                    className="text-sm text-muted-foreground before:mr-2 before:content-['▹'] before:text-accent-purple"
                  >
                    {detail}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-4">
                <p className="mb-2 text-xs text-muted-foreground/80">
                  {tData(`${project.key}.platform`)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <GlassBadge key={tech} color="purple">
                      {tech}
                    </GlassBadge>
                  ))}
                </div>
                {project.links && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.links.playStore && (
                      <a
                        href={project.links.playStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-foreground transition-all hover:border-accent-cyan/30 hover:text-accent-cyan"
                      >
                        <FaGooglePlay size={12} />
                        Google Play
                      </a>
                    )}
                    {project.links.appStore && (
                      <a
                        href={project.links.appStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-foreground transition-all hover:border-accent-cyan/30 hover:text-accent-cyan"
                      >
                        <FaAppStoreIos size={14} />
                        App Store
                      </a>
                    )}
                  </div>
                )}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
