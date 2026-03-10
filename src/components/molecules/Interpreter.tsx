"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "../../../i18n/navigation";
import { routing } from "../../../i18n/routing";
import { cn } from "@/lib/utils";

const localeLabels: Record<string, string> = {
  en: "EN",
  id: "ID",
  ja: "JP",
};

const localeNames: Record<string, string> = {
  en: "English",
  id: "Indonesian",
  ja: "Japanese",
};

const Interpreter = ({ className }: { className?: string }) => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    router.push(pathname, { locale: newLocale });
  };

  return (
    <div translate="no" className={cn("flex items-center gap-1", className)}>
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          aria-label={`Switch to ${localeNames[loc]}`}
          className={`rounded-md px-2 py-1 text-xs font-mono transition-colors ${
            locale === loc
              ? "text-accent-purple bg-white/10"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {localeLabels[loc]}
        </button>
      ))}
    </div>
  );
};

export default Interpreter;
