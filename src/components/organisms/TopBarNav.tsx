"use client";

import { Link, usePathname } from "../../../i18n/navigation";
import { cn } from "@/lib/utils";
import { Home, User, Briefcase, FolderOpen, Mail } from "lucide-react";
import Image from "next/image";
import Interpreter from "../molecules/Interpreter";
import { useTranslations } from "next-intl";
import { colorMap } from "@/lib/theme";
import { useRefraction } from "@/hooks/useRefraction";

const TopBarNav = () => {
  const pathname = usePathname();
  const t = useTranslations("nav");
  const refractionRef = useRefraction();

  const navItems = [
    { href: "/", label: t("home"), icon: Home, color: "accent-purple" },
    { href: "/about", label: t("about"), icon: User, color: "accent-cyan" },
    {
      href: "/experience",
      label: t("experience"),
      icon: Briefcase,
      color: "accent-magenta",
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
    <nav ref={refractionRef} className="fixed top-4 left-4 right-4 z-50 mx-auto max-w-4xl glass-nav glass-refract flex items-center justify-between px-4 py-2 rounded-full">
      <Link href="/" className="shrink-0 px-2">
        <Image src="/logo/logo.svg" alt="PDJ" width={40} height={20} className="h-5 w-auto" />
      </Link>

      <div className="flex items-center gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple/50",
                isActive
                  ? `${colorMap[item.color].text} bg-white/5`
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5",
              )}
            >
              <item.icon
                size={16}
                className={cn(
                  "shrink-0",
                  isActive && colorMap[item.color].glow,
                )}
              />
              <span className="hidden xl:inline">{item.label}</span>
            </Link>
          );
        })}
      </div>
      <Interpreter />

    </nav>
  );
};

export default TopBarNav;
