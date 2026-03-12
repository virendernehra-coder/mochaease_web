import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import ConditionalLayout from "@/components/ConditionalLayout";
import { GoogleTagManager } from '@next/third-parties/google';
import { getOrganizationSchema, getSoftwareApplicationSchema } from "@/data/structured-data";
import AuthInitializer from "@/components/auth/AuthInitializer";
import AuthGuard from "@/components/auth/AuthGuard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mochaease.com'),
  title: {
    default: "MochaEase | Smart POS & Enterprise Management",
    template: "%s | MochaEase",
  },
  description: "Enterprise-grade POS and inventory management ecosystem for cafes, QSRs, and retail chains. AI forecasting meets offline-first reliability.",
  keywords: ["POS", "Cloud Point of Sale", "Inventory Management", "Cafe Software", "Retail Tech", "Enterprise QSR", "Business Analytics"],
  authors: [{ name: "MochaEase Tech" }],
  creator: "MochaEase",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mochaease.com",
    title: "MochaEase Integration Ecosystem",
    description: "The intelligent operating system for multi-outlet retail and F&B. Predict demand, manage staff, and process offline transactions natively.",
    siteName: "MochaEase",
    images: [{
      url: "/blog/blog_ai_inventory_1773002441722.png",
      width: 1200,
      height: 630,
      alt: "MochaEase Smart POS Ecosystem",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MochaEase | Smart POS & Enterprise Management",
    description: "Enterprise-grade POS and inventory management ecosystem for cafes, QSRs, and retail chains.",
    creator: "@mochaease",
    images: ["/blog/blog_ai_inventory_1773002441722.png"],
  },
  icons: {
    icon: "/icon",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || 'GTM-WMK43WDR'} />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground selection:bg-[#C3EB7A]/30`}
      >
        {/* JSON-LD Structured Data for Google Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getOrganizationSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getSoftwareApplicationSchema()) }}
        />
        <div className="relative flex min-h-screen flex-col">
          <AuthInitializer>
            <AuthGuard>
              <ConditionalLayout>{children}</ConditionalLayout>
            </AuthGuard>
          </AuthInitializer>
        </div>
      </body>
    </html>
  );
}
