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
  title: "KINN THAI Restaurant | Authentic Thai Cuisine in West Lafayette, IN",
  description: "Experience authentic Thai flavors at KINN THAI Restaurant in West Lafayette, Indiana. Fresh ingredients, traditional recipes, and warm hospitality. Open daily 12PM-10PM.",
  keywords: "Thai restaurant West Lafayette, Thai food Indiana, Purdue Thai restaurant, authentic Thai cuisine, Pad Thai, Thai curry, Thai noodles, Asian restaurant West Lafayette, Thai delivery, Thai takeout",
  openGraph: {
    title: "KINN THAI Restaurant | Best Thai Food in West Lafayette",
    description: "Experience authentic Thai flavors at KINN THAI Restaurant. Fresh ingredients, traditional recipes, and warm hospitality.",
    url: "https://kinnthai.com",
    siteName: "KINN THAI Restaurant",
    images: [
      {
        url: "/assets/landing/icons/manifest.webp",
        width: 1200,
        height: 630,
        alt: "KINN THAI Restaurant",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KINN THAI Restaurant | Authentic Thai Cuisine",
    description: "Experience authentic Thai flavors in West Lafayette, IN. Open daily 12PM-10PM.",
    images: ["/assets/landing/icons/manifest.webp"],
  },
  alternates: {
    canonical: "https://kinnthai.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={krub.variable}>
      <head>
        <link rel="icon" href="/assets/landing/icons/favicon.webp" type="image/webp" sizes="32x32" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#b91c1c" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="geo.region" content="US-IN" />
        <meta name="geo.placename" content="West Lafayette" />
        <meta name="geo.position" content="40.449879;-86.908305" />
        <meta name="ICBM" content="40.449879, -86.908305" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Restaurant",
            "name": "KINN THAI Restaurant",
            "image": "/assets/landing/icons/manifest.webp",
            "description": "Authentic Thai cuisine in West Lafayette, Indiana",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "100 Foundry Drive Ste 17",
              "addressLocality": "West Lafayette",
              "addressRegion": "IN",
              "postalCode": "47906",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 40.449879,
              "longitude": -86.908305
            },
            "telephone": "",
            "email": "kinnthai.group@gmail.com",
            "url": "https://kinnthai.com",
            "openingHours": "Mo-Su 12:00-22:00",
            "servesCuisine": "Thai",
            "priceRange": "$$",
            "acceptsReservations": true
          })
        }} />
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
