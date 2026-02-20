import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "RankEngine | Autonomous SEO Agent",
  description: "RankEngine is an autonomous AI that monitors your search rankings, fixes issues in real-time, and gets your brand cited inside ChatGPT and Perplexity.",
  openGraph: {
    title: "RankEngine | Autonomous SEO Agent",
    description: "Monitors rankings 24/7, fixes technical issues, and gets you cited in AI answer engines.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "RankEngine | Autonomous SEO Agent",
    description: "Monitors rankings 24/7, fixes technical issues, and gets you cited in AI answer engines.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Placeholder GA4 Script */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans min-h-screen bg-background text-foreground flex flex-col`}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
