import { motion } from "motion/react";
import { techStack } from "@/data/skills";
import { useTranslations } from "next-intl";
import { IconType } from "react-icons";

import { LiaJava } from "react-icons/lia";
import { VscVscode } from "react-icons/vsc";
import {
  SiReact,
  SiExpo,
  SiFlutter,
  SiAndroid,
  SiAndroidstudio,
  SiSwift,
  SiTypescript,
  SiJavascript,
  SiDart,
  SiKotlin,
  SiApple,
  SiJetpackcompose,
  SiGradle,
  SiCocoapods,
  SiApachegroovy,
  SiRedux,
  SiFirebase,
  SiSentry,
  SiFastlane,
  SiGit,
  SiGitlab,
  SiGithub,
  SiBitbucket,
  SiHeroku,
  SiDigitalocean,
  SiFigma,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiGo,
  SiPython,
  SiSpring,
  SiMongodb,
  SiMysql,
  SiRedis,
  SiSequelize,
  SiXcode,
  SiIntellijidea,
  SiJira,
  SiConfluence,
  SiDocker,
  SiEslint,
  SiBabel,
  SiYarn,
  SiPnpm,
  SiBun,
  SiTrello,
  SiClickup,
  SiLinear,
  SiAdobexd,
  SiNotion,
  SiTensorflow,
} from "react-icons/si";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const iconMap: Record<string, IconType> = {
  SiReact,
  SiExpo,
  SiFlutter,
  SiAndroid,
  SiAndroidstudio,
  SiSwift,
  SiTypescript,
  SiJavascript,
  SiDart,
  SiKotlin,
  SiGradle,
  SiCocoapods,
  SiJetpackcompose,
  LiaJava,
  SiApple,
  SiRedux,
  SiFirebase,
  SiSentry,
  SiFastlane,
  SiGit,
  SiGitlab,
  SiGithub,
  SiBitbucket,
  SiHeroku,
  SiDigitalocean,
  SiFigma,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiMongodb,
  SiMysql,
  SiRedis,
  SiSequelize,
  SiXcode,
  SiIntellijidea,
  SiJira,
  SiConfluence,
  SiDocker,
  SiBabel,
  SiYarn,
  SiPnpm,
  SiBun,
  SiEslint,
  SiTrello,
  SiClickup,
  SiLinear,
  SiAdobexd,
  SiNotion,
  VscVscode,
  SiTensorflow,
  SiApachegroovy,
  SiSpring,
  SiGo,
  SiPython,
};

const TechStackSection = () => {
  const t = useTranslations("sections");
  const tStack = useTranslations("data.techStack");
  return (
    <section className="px-6 py-20 md:px-12 lg:px-24">
      <motion.h2
        className="mb-10 text-2xl font-bold text-foreground md:text-3xl"
        {...fadeUp}
      >
        {t("techStack")}
      </motion.h2>

      <div className="space-y-8">
        {techStack.map((group) => (
          <motion.div key={group.key} {...fadeUp}>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-accent-purple">
              {tStack(group.key)}
            </h3>
            <div className="flex flex-wrap gap-3">
              {group.items.map((item) => {
                const Icon = iconMap[item.icon];
                return (
                  <div
                    key={item.name}
                    className="glass-badge flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-foreground transition-colors hover:border-accent-purple/30"
                  >
                    {Icon && (
                      <Icon
                        size={item?.library ? 20 : 16}
                        className="text-accent-cyan"
                      />
                    )}
                    {item.name}
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TechStackSection;
