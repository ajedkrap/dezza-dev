"use client";

import { Link, usePathname } from "../../../i18n/navigation";
import { cn } from "@/lib/utils";
import { Home, User, Briefcase, FolderOpen, Mail } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Interpreter from "../molecules/Interpreter";
import { colorMap } from "@/lib/theme";
import { useRefraction } from "@/hooks/useRefraction";

const SideBarNav = () => {
  const pathname = usePathname();
  const t = useTranslations("nav");
  const refractionRef = useRefraction();

  const navItems = [
    { href: "/", label: t("home"), icon: Home, color: "accent-purple" },
    { href: "/about", label: t("about"), icon: User, color: "accent-cyan" },
    { href: "/experience", label: t("experience"), icon: Briefcase, color: "accent-magenta" },
    { href: "/projects", label: t("projects"), icon: FolderOpen, color: "accent-orange" },
    { href: "/contact", label: t("contact"), icon: Mail, color: "accent-blue" },
  ];

  return (
    <nav ref={refractionRef} className="glass-nav glass-refract fixed left-0 top-0 z-50 flex h-screen w-16 flex-col items-center gap-2 py-8 transition-all duration-300 hover:w-48 group rounded-none rounded-r-2xl">
      {/* Logo */}
      <Link href="/" className="mb-8 shrink-0">
        <Image src="/logo/logo.svg" alt="PDJ" width={32} height={16} className="h-4 w-auto" />
      </Link>

      {/* Nav items */}
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex w-full items-center gap-3 px-5 py-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple/50 focus-visible:rounded-md",
              isActive
                ? colorMap[item.color].text
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <item.icon
              size={20}
              className={cn(
                "shrink-0",
                isActive && colorMap[item.color].glow,
              )}
            />
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              {item.label}
            </span>
          </Link>
        );
      })}
      <div className="mt-auto pb-4">
        <Interpreter className="flex-col group-hover:flex-row" />
      </div>
    </nav>
  );
};

export default SideBarNav;
