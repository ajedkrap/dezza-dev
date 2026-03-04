"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { FiFileText, FiChevronDown } from "react-icons/fi";
import GlassCard from "@/components/atoms/GlassCard";
import { cn } from "@/lib/utils";

interface TimelineItemProps {
  date: string;
  title: string;
  company: string;
  description: string;
  bullets: string[];
  techStack?: string[];
  pdf?: string;
  pdfLabel?: string;
  className?: string;
}

const TimelineItem = (props: TimelineItemProps) => {
  const { date, title, company, description, bullets, pdf, pdfLabel, className } = props;
  const [showPdf, setShowPdf] = useState(false);

  return (
    <motion.div
      className={cn("relative flex gap-6", className)}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Timeline dot and line */}
      <div className="flex flex-col items-center">
        <div className="h-3 w-3 rounded-full bg-accent-purple shadow-[0_0_10px_rgba(124,58,237,0.5),0_0_20px_rgba(124,58,237,0.3)]" />
        <div className="w-px flex-1 bg-accent-purple/20 shadow-[0_0_6px_rgba(124,58,237,0.2)]" />
      </div>

      {/* Content */}
      <GlassCard hoverGlow shimmer className="mb-8 flex-1 p-6">
        <span className="text-xs font-mono text-accent-cyan">{date}</span>
        <h3 className="mt-1 text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-accent-magenta">{company}</p>
        <p className="mt-3 text-sm text-muted-foreground">{description}</p>

        <ul className="mt-3 space-y-1">
          {bullets.map((bullet, i) => (
            <li
              key={i}
              className="text-sm text-muted-foreground before:mr-2 before:content-['▹'] before:text-accent-purple"
            >
              {bullet}
            </li>
          ))}
        </ul>

        {pdf && (
          <div className="mt-4">
            <button
              onClick={() => setShowPdf(!showPdf)}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-foreground transition-all hover:border-accent-purple/30 hover:text-accent-purple cursor-pointer"
            >
              <FiFileText size={12} />
              {pdfLabel ?? "Case Study"}
              <FiChevronDown
                size={12}
                className={cn(
                  "transition-transform duration-200",
                  showPdf && "rotate-180"
                )}
              />
            </button>

            <motion.div
              initial={false}
              animate={{
                height: showPdf ? "70vh" : 0,
                opacity: showPdf ? 1 : 0,
                marginTop: showPdf ? 12 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden rounded-md border border-white/5"
            >
              {showPdf && (
                <iframe
                  src={pdf}
                  title={`${company} case study`}
                  className="h-full w-full"
                  style={{ minHeight: "70vh" }}
                />
              )}
            </motion.div>
          </div>
        )}
      </GlassCard>
    </motion.div>
  );
};

export default TimelineItem;
