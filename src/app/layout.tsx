import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import "./globals.css";

const dmSerifDisplay = DM_Serif_Display({
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-dm-serif",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#243048",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://collegencourses.com"),
  title: {
    default: "CollegeNCourses | Compare Online & Distance MBA Programmes in India 2026-27",
    template: "%s | CollegeNCourses",
  },
  description:
    "Compare Online MBA, Distance MBA, and Executive MBA programmes from 150+ UGC-DEB and AICTE approved universities. Honest counselling, transparent fees, no sales pressure.",
  openGraph: {
    siteName: "CollegeNCourses",
    type: "website",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${dmSerifDisplay.variable} ${inter.variable}`}
    >
      <body className="has-mobile-bar">{children}</body>
    </html>
  );
}
