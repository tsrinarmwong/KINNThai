import type { Metadata } from "next";
import { Krub } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const krub = Krub({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-krub",
});

export const metadata: Metadata = {
  title: "KINN THAI Restaurant",
  description: "Authentic Thai cuisine in a warm and welcoming atmosphere",
  keywords: "Thai restaurant, Thai food, authentic Thai cuisine, restaurant, dining, KINN THAI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={krub.variable}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#b91c1c" />
        <meta property="og:title" content="KINN THAI Restaurant" />
        <meta property="og:description" content="Authentic Thai cuisine in a warm and welcoming atmosphere." />
        <meta property="og:image" content="/assets/landing/icons/manifest.webp" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="KINN THAI Restaurant" />
        <meta name="twitter:description" content="Authentic Thai cuisine in a warm and welcoming atmosphere." />
        <meta name="twitter:image" content="/assets/landing/icons/manifest.webp" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-G9CG44L4YT"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-G9CG44L4YT');
            `,
          }}
        />
      </head>
      <body className="min-h-screen font-sans">
        <main>
          {children}
        </main>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
