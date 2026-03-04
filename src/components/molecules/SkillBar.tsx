"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface SkillBarProps {
  name: string;
  level: number; // 0–100
  className?: string;
}

const SkillBar = (props: SkillBarProps) => {
  const { name, level, className } = props;
  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex justify-between text-sm">
        <span className="font-medium text-foreground">{name}</span>
        <span className="font-mono text-xs text-muted-foreground">
          {level}%
        </span>
      </div>
      <div className="h-2 rounded-full bg-white/5">
        <motion.div
          className="h-full rounded-full bg-synthwave shadow-[0_0_8px_rgba(124,58,237,0.4),0_0_20px_rgba(224,64,251,0.2)]"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default SkillBar;
