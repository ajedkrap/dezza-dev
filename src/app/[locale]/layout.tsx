import type { Metadata, Viewport } from "next";
import { Montserrat, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../globals.css";
import GlassNav from "@/components/organisms/GlassNav";
import Gradient from "@/components/atoms/Gradient";
import PageTransition from "@/components/organisms/PageTransition";
import LiquidGlassFilter from "@/components/atoms/LiquidGlassFilter";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://dezza.dev",
  ),
  title: {
    default: "Dezza Rizqi — Fullstack Mobile",
    template: "%s | Dezza Rizqi",
  },
  description:
    "Portfolio of Dezza Rizqi, a Mobile Engineer with 4+ years of experience in React Native, Flutter, and fullstack development.",
  openGraph: {
    type: "website",
    siteName: "Dezza Rizqi — Portfolio",
    locale: "en_US",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "PDJ",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  themeColor: "#09090B",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(){
  var o=Node.prototype.removeChild;
  Node.prototype.removeChild=function(c){
    if(c.parentNode!==this){return c}
    return o.apply(this,arguments)
  };
  var i=Node.prototype.insertBefore;
  Node.prototype.insertBefore=function(n,r){
    if(r&&r.parentNode!==this){return n}
    return i.apply(this,arguments)
  };
})();
`,
          }}
        />
        <link
          rel="preconnect"
          href={process.env.NEXT_PUBLIC_SUPABASE_URL}
        />
      </head>
      <body
        className={`${montserrat.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-accent-purple focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
          >
            Skip to content
          </a>
          <LiquidGlassFilter />
          <Gradient />
          <GlassNav />
          <main
            id="main-content"
            className="relative z-10 min-h-screen pt-0 md:pl-16 lg:pl-0"
          >
            <PageTransition>{children}</PageTransition>
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
