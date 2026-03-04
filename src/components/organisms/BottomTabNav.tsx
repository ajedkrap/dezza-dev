"use client";

import { Link, usePathname } from "../../../i18n/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Home, User, Briefcase, FolderOpen, Mail } from "lucide-react";
import { colorMap } from "@/lib/theme";
import { useRefraction } from "@/hooks/useRefraction";

const BottomTabNav = () => {
  const pathname = usePathname();
  const t = useTranslations("nav");
  const refractionRef = useRefraction();

  const navItems = [
    { href: "/about", label: t("about-mobile"), icon: User, color: "accent-cyan" },
    {
      href: "/experience",
      label: t("experience"),
      icon: Briefcase,
      color: "accent-magenta",
    },
    {
      href: "/",
      label: t("home"),
      icon: Home,
      isCenter: true,
      color: "accent-purple",
    },
    {
      href: "/projects",
      label: t("projects"),
      icon: FolderOpen,
      color: "accent-orange",
    },
    { href: "/contact", label: t("contact"), icon: Mail, color: "accent-blue" },
  ];

  return (
    <nav ref={refractionRef} className="glass-nav glass-refract fixed bottom-4 left-4 right-4 z-50 flex items-end justify-around px-2 py-2 rounded-2xl">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const isCenter = "isCenter" in item && item.isCenter;

        if (isCenter) {
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              className={cn(
                "flex flex-col items-center justify-center -mt-6 h-14 w-14 rounded-full bg-accent-purple/20 border border-accent-purple/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple/50",
                isActive
                  ? "bg-accent-purple/30 shadow-[0_0_20px_rgba(124,58,237,0.3)]"
                  : "hover:bg-accent-purple/25",
              )}
            >
              <item.icon
                size={24}
                className={cn(
                  "text-accent-purple",
                  isActive && "drop-shadow-[0_0_8px_rgba(124,58,237,0.6)]",
                )}
              />
            </Link>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 px-3 py-1.5 text-[10px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple/50 focus-visible:rounded-md",
              isActive ? colorMap[item.color].text : "text-muted-foreground",
            )}
          >
            <item.icon
              size={20}
              className={cn(isActive && colorMap[item.color].glow)}
            />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomTabNav;
