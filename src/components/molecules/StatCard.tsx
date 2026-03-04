"use client";

import GlassCard from "@/components/atoms/GlassCard";
import { cn } from "@/lib/utils";

interface StatCardProps {
  value: string;
  label: string;
  className?: string;
}

const StatCard = (props: StatCardProps) => {
  const { value, label, className } = props;
  return (
    <GlassCard hoverGlow className={cn("p-6 text-center", className)}>
      <p className="text-3xl font-bold text-synthwave">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </GlassCard>
  );
};

export default StatCard;
