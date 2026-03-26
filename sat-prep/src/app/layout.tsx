import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),
  title: {
    default: "SAT Practice Platform | Master SAT Questions",
    template: "%s | SAT Prep",
  },
  description:
    "Master SAT questions with our comprehensive practice platform. Track your progress, analyze mistakes, and improve your score with bilingual RU/EN support.",
  keywords: ["SAT", "practice", "questions", "exam prep", "education"],
  authors: [{ name: "SAT Prep Team" }],
  creator: "SAT Prep",
  publisher: "SAT Prep",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXTAUTH_URL || "http://localhost:3000",
    siteName: "SAT Practice Platform",
    title: "SAT Practice Platform | Master SAT Questions",
    description: "Comprehensive SAT practice platform with analytics and tracking",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SAT Practice Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SAT Practice Platform",
    description: "Master SAT questions with our comprehensive practice platform",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  alternates: {
    languages: {
      en: process.env.NEXTAUTH_URL || "http://localhost:3000",
      ru: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}?lang=ru`,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased scroll-smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="min-h-full flex flex-col bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-50 transition-colors">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
