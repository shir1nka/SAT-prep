import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://sat-prep-said.vercel.app"),
  title: {
    default: "SAT Prep",
    template: "%s | SAT Prep",
  },
  description:
    "Short lessons and practice questions for the SAT. English and math, with Desmos steps for the math questions.",
  keywords: ["SAT", "practice", "questions", "exam prep", "education"],
  authors: [{ name: "SAT Prep" }],
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
    url: "https://sat-prep-said.vercel.app",
    siteName: "SAT Prep",
    title: "SAT Prep",
    description: "Short lessons and practice questions for the SAT.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SAT Prep",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SAT Prep",
    description: "Short lessons and practice questions for the SAT.",
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
      en: "https://sat-prep-said.vercel.app",
      ru: "https://sat-prep-said.vercel.app?lang=ru",
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
      className="h-full antialiased scroll-smooth dark"
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
        <meta name="theme-color" content="#0a0a0c" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors">
        <Providers>
          <div className="relative z-10 flex flex-1 flex-col">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
