"use client";

import { motion } from "motion/react";
import { FiGithub, FiLinkedin, FiMail, FiMapPin } from "react-icons/fi";
import GlassCard from "@/components/atoms/GlassCard";
import SectionHeading from "@/components/molecules/SectionHeading";
import ContactForm from "@/components/molecules/ContactForm";
import { personal } from "@/data/personal";
import { useTranslations } from "next-intl";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const ContactPage = () => {
  const t = useTranslations("sections");
  const tContact = useTranslations("contact");
  const tPersonal = useTranslations("data.personal");

  return (
    <div className="mx-auto max-w-5xl px-6 py-20 pb-32 md:px-12 lg:px-24">
      <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
        {/* Left — heading + info */}
        <motion.div className="flex-1" {...fadeUp}>
          <SectionHeading
            title={t("getInTouch")}
            subtitle={t("getInTouchSubtitle")}
          />
          <p className="mt-4 max-w-md text-sm text-muted-foreground leading-relaxed">
            {tContact("intro")}
          </p>

          <div className="mt-8 flex flex-col gap-4">
            <a
              href={`mailto:${personal.email}`}
              className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <FiMail size={18} className="text-accent-cyan" />
              {personal.email}
            </a>
            <span className="flex items-center gap-3 text-sm text-muted-foreground">
              <FiMapPin size={18} className="text-accent-cyan" />
              {tPersonal("location")}
            </span>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <FiGithub size={18} className="text-accent-cyan" />
              GitHub
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <FiLinkedin size={18} className="text-accent-cyan" />
              LinkedIn
            </a>
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.div className="flex-1 max-w-lg" {...fadeUp}>
          <GlassCard refract className="p-8">
            <ContactForm />
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
