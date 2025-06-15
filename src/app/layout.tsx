import type { Metadata } from "next";
import { Krub } from "next/font/google";
import "./globals.css";

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
      <body className="min-h-screen font-sans">
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
