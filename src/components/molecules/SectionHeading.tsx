import { cn } from "@/lib/utils";
import GradientBar from "@/components/atoms/GradientBar";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const SectionHeading = (props: SectionHeadingProps) => {
  const { title, subtitle, className } = props;

  return (
    <div className={cn("space-y-2", className)}>
      <h2 className="text-2xl font-semibold text-foreground md:text-3xl [text-shadow:0_0_30px_rgba(124,58,237,0.15)]">
        {title}
      </h2>
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      <GradientBar size="sm" className="w-10" />
    </div>
  );
};

export default SectionHeading;
