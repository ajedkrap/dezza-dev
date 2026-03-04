import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { FiChevronDown, FiDownload } from "react-icons/fi";
import { useTypewriter } from "@/hooks/useTypewriter";
import { getStorageUrl } from "@/lib/supabase";

const nameVariants = [
  "Dezza Rizqi",
  "or, Deja...",
  "or, デジャ...",
  "or, 데자...",
  "or, Deca...",
  "or, ديجا...",
  "or, ДЕЖА...",
  "or, เดจา...",
  "or, 01100100 01100101 01101010 01100001...",
];

const HeroSection = () => {
  const tHero = useTranslations("hero");
  const tPersonal = useTranslations("data.personal");
  const typedName = useTypewriter({
    words: nameVariants,
    typeSpeed: 80,
    deleteSpeed: 50,
    pauseDuration: 1800,
  });

  const scrollToIntro = () => {
    document.getElementById("intro")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-8 px-6">
      {/* Name block — column layout */}
      <div className="flex w-full max-w-3xl flex-col gap-3">
        {/* Top line — lightsaber: stretched neon blade + fast sweep + color transition */}
        <motion.div
          className="hero-line-lightsaber w-full"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
        />

        {/* "hi, my name is" + line */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span className="shrink-0 text-s font-mono uppercase tracking-widest text-foreground">
            {tHero("greeting")}
          </span>
          <div className="hero-line-lightsaber flex-1 min-w-0" />
        </motion.div>

        {/* Big typewriter name */}
        <motion.h1
          className="text-4xl font-bold text-synthwave md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {typedName}
          <span className="text-accent-purple animate">|</span>
        </motion.h1>

        {/* Title — flex-end */}
        <motion.p
          className="self-end text-lg text-muted-foreground md:text-xl"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {tPersonal("title")}
        </motion.p>
      </div>

      {/* CTAs */}
      <motion.div
        className="flex items-center gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <button
          onClick={scrollToIntro}
          className="flex animate-bounce items-center gap-2 rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:border-accent-purple/30 hover:shadow-[0_0_16px_rgba(124,58,237,0.2)]"
        >
          <FiChevronDown size={16} />
          {tHero("scrollDown")}
        </button>

        <span className="text-sm text-muted-foreground">{tHero("or")}</span>

        <a
          href={getStorageUrl("cv/CV-Dezza-Rizqi-2026.pdf")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-xl bg-synthwave px-5 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-[0_0_20px_rgba(124,58,237,0.3)]"
        >
          <FiDownload size={16} />
          {tHero("downloadCV")}
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
