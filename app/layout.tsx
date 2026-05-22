import type { Metadata } from "next";
import { Syne, Outfit } from "next/font/google";
import Script from "next/script";
import CookieBanner from "@/components/CookieBanner";
import "./globals.css";

const GA_ID = "G-H027E3MZYE";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Klarlinje — Meditasjonsretreat nær Oslo | Son Spa, Høsten 2026",
  description:
    "Sekulært, evidensbasert retreat på Son Spa, 40 min sør for Oslo. For høytfungerende voksne som vil ha ro som faktisk virker. Meld deg på ventelisten.",
  keywords: [
    "retreat Oslo",
    "meditasjonsretreater Norge",
    "retreat nær Oslo",
    "mindfulness retreat Oslo",
    "Son Spa retreat",
    "sekulær meditasjon",
    "helgeretreater Oslo",
    "evidensbasert retreat",
    "retreat 2026",
    "meditasjon Oslo",
  ],
  openGraph: {
    title: "Klarlinje — Meditasjonsretreat nær Oslo",
    description:
      "Sekulært, evidensbasert retreat på Son Spa, 40 min sør for Oslo. For høytfungerende voksne. Venteliste åpen.",
    type: "website",
    locale: "nb_NO",
    url: "https://klarlinje.no",
    siteName: "Klarlinje",
  },
  alternates: {
    canonical: "https://klarlinje.no",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nb" className={`${syne.variable} ${outfit.variable}`}>
      <head>
        {/* Google Consent Mode v2 — må kjøre FØR gtag.js laster */}
        <Script
          id="consent-mode-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                analytics_storage: 'denied',
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                wait_for_update: 500
              });
            `,
          }}
        />
        {/* GA4 — laster asynkront etter hydration */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script
          id="ga4-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
