import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { BottomNav } from "@/components/BottomNav";
import { SiteFooter } from "@/components/SiteFooter";
import { baseMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = baseMetadata();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f4ef" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0e10" },
  ],
};

/** Applique le thème avant le premier rendu pour éviter tout flash. */
const themeScript = `(function(){try{var t=localStorage.getItem("stadia.theme");if(!t){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.lang} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800;900&family=Inter:wght@400;500;600&display=swap"
        />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a
          href="#contenu"
          className="sr-only"
          style={{ position: "absolute", top: 8, left: 8 }}
        >
          Aller au contenu
        </a>
        <SiteHeader />
        <main id="contenu" className="page-bottom-space">
          {children}
        </main>
        <SiteFooter />
        <BottomNav />
        {site.analytics.plausibleDomain ? (
          <Script
            defer
            data-domain={site.analytics.plausibleDomain}
            src={site.analytics.plausibleSrc}
          />
        ) : null}
      </body>
    </html>
  );
}
