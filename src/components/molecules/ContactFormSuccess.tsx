"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { FiGithub, FiLinkedin, FiRotateCcw } from "react-icons/fi";
import { useTranslations } from "next-intl";
import { personal } from "@/data/personal";

type Props = {
  onSendAnother: () => void;
};

const ContactFormSuccess = ({ onSendAnother }: Props) => {
  const t = useTranslations("form");
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col items-center py-6 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 12 }}
        className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full"
        style={{
          background: "linear-gradient(135deg, #06B6D4 0%, #7C3AED 100%)",
          boxShadow:
            "0 0 32px rgba(34,211,238,0.5), 0 0 64px rgba(124,58,237,0.3), inset 0 1px 0 rgba(255,255,255,0.3)",
        }}
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <motion.path
            d="M4 12.5l5 5L20 6.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.4, duration: 0.4, ease: "easeOut" }}
          />
        </svg>
      </motion.div>

      <motion.h3
        ref={headingRef}
        tabIndex={-1}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.3 }}
        className="bg-synthwave bg-clip-text text-xl font-bold text-transparent outline-none"
        role="status"
      >
        {t("successHeading")}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.3 }}
        className="mt-2 max-w-xs text-sm text-muted-foreground"
      >
        {t("successSubtitle")}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.3 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-3"
      >
        <a
          href={personal.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg border border-accent-purple/30 bg-accent-purple/5 px-4 py-2 text-xs font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-accent-purple/60 hover:bg-accent-purple/10 hover:shadow-[0_0_16px_rgba(124,58,237,0.3)]"
        >
          <FiLinkedin size={14} /> LinkedIn
        </a>
        <a
          href={personal.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg border border-accent-cyan/30 bg-accent-cyan/5 px-4 py-2 text-xs font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-accent-cyan/60 hover:bg-accent-cyan/10 hover:shadow-[0_0_16px_rgba(6,182,212,0.3)]"
        >
          <FiGithub size={14} /> GitHub
        </a>
        <button
          type="button"
          onClick={onSendAnother}
          className="flex items-center gap-2 rounded-lg border border-foreground/15 bg-foreground/5 px-4 py-2 text-xs font-medium text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-foreground/30 hover:text-foreground"
        >
          <FiRotateCcw size={14} /> {t("sendAnother")}
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ContactFormSuccess;
