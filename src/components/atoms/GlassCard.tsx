"use client";

import { cn } from "@/lib/utils";
import { useRefraction } from "@/hooks/useRefraction";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "nav" | "badge" | "input";
  hoverGlow?: boolean;
  shimmer?: boolean;
  refract?: boolean;
  children: React.ReactNode;
}

const GlassCard = (props: GlassCardProps) => {
  const {
    variant = "default",
    hoverGlow = false,
    shimmer = false,
    refract = false,
    className,
    children,
    ...otherProps
  } = props;
  const refractionRef = useRefraction();

  const variants = {
    default: "glass-panel",
    nav: "glass-nav",
    badge: "glass-badge",
    input: "glass-input",
  };

  return (
    <div
      ref={refract ? refractionRef : undefined}
      className={cn(
        variants[variant],
        hoverGlow &&
          "transition-all duration-300 hover:border-accent-purple/30 hover:shadow-[0_0_15px_rgba(124,58,237,0.15),0_0_30px_rgba(224,64,251,0.08),inset_0_0_0_1px_rgba(124,58,237,0.1)] hover:-translate-y-0.5",
        shimmer && "glass-shimmer",
        refract && "glass-refract",
        className,
      )}
      {...otherProps}
    >
      {children}
    </div>
  );
};

export default GlassCard;
