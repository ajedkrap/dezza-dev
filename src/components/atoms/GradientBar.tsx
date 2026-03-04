import { cn } from "@/lib/utils";

interface GradientBarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
}

const GradientBar = (props: GradientBarProps) => {
  const { size = "md", className, ...otherProps } = props;

  const sizeMap = {
    sm: "h-0.5",
    md: "h-1",
    lg: "h-1.5",
  };

  return (
    <div
      // className={cn("rounded-full bg-synthwave", sizeMap[size], className)}
      className={cn("rounded-full bg-synthwave shadow-[0_0_8px_rgba(124,58,237,0.4),0_0_20px_rgba(224,64,251,0.2)]", sizeMap[size], className)}
      {...otherProps}
    />
  );
};

export default GradientBar;
