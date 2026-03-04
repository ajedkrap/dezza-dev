import { motion } from "motion/react";
import { personal } from "@/data/personal";
import { FiMapPin, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { useTranslations } from "next-intl";
import GlassCard from "../atoms/GlassCard";
import AvatarGallery from "../molecules/AvatarGallery";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const IntroSection = () => {
  const t = useTranslations("sections");
  const tPersonal = useTranslations("data.personal");

  return (
    <section
      id="intro"
      className="px-6 py-20 md:px-12 lg:px-24"
    >
      <motion.div {...fadeUp}>
        <GlassCard hoverGlow className="mx-auto max-w-4xl p-8 md:p-10">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-12">
            <AvatarGallery size="lg" />

            {/* Text */}
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                {t("about")}
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground/90 md:text-lg">
                {tPersonal("summary")}
              </p>

              {/* Location + socials */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <FiMapPin className="text-accent-cyan" size={14} />
                  {tPersonal("location")}
                </span>
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 transition-colors hover:text-foreground"
                >
                  <FiGithub size={14} />
                  GitHub
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 transition-colors hover:text-foreground"
                >
                  <FiLinkedin size={14} />
                  LinkedIn
                </a>
                <a
                  href={`mailto:${personal.email}`}
                  className="flex items-center gap-1.5 transition-colors hover:text-foreground"
                >
                  <FiMail size={14} />
                  Email
                </a>
              </div>
            </div>
          </div>

        </GlassCard>
      </motion.div>
    </section>
  );
};

export default IntroSection;
