import { cn } from "@/lib/utils";

interface GlassBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: "cyan" | "magenta" | "purple" | "blue" | "green" | "white" | "default";
  children: React.ReactNode;
}

const GlassBadge = (props: GlassBadgeProps) => {
  const { color = "default", className, children, ...otherProps } = props;

  const colorMap = {
    cyan: "text-accent-cyan border-accent-cyan/20",
    magenta: "text-accent-magenta border-accent-magenta/20",
    purple: "text-accent-purple border-accent-purple/20",
    blue: "text-accent-blue border-accent-blue/20",
    green: "text-accent-green border-accent-green/20",
    white: "text-white border-white/10",
    default: "text-foreground border-white/10",
  };

  return (
    <span
      className={cn(
        "glass-badge px-3 py-1 text-xs font-mono font-medium",
        colorMap[color],
        className,
      )}
      {...otherProps}
    >
      {children}
    </span>
  );
};

export default GlassBadge;
