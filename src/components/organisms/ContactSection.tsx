import { personal } from "@/data/personal";
import { motion } from "motion/react";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { useTranslations } from "next-intl";
import GlassCard from "../atoms/GlassCard";
import ContactForm from "../molecules/ContactForm";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const ContactSection = () => {
  const t = useTranslations("sections");

  return (
    <section className="flex min-h-screen flex-col justify-center px-6 py-20 pb-32 md:px-12 lg:px-24">
      <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
        {/* Left — heading + social links */}
        <motion.div className="flex-1" {...fadeUp}>
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            {t("getInTouch")}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {t("getInTouchDescription")}
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <FiGithub size={16} /> GitHub
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <FiLinkedin size={16} /> LinkedIn
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <FiMail size={16} /> {personal.email}
            </a>
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.div className="max-w-lg flex-1" {...fadeUp}>
          <GlassCard hoverGlow className="p-6">
            <ContactForm />
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
