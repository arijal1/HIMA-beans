import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/ui/SmoothScroll";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { CursorGlow } from "@/components/ui/CursorGlow";

/* ============================================================
   Fonts
   ============================================================ */
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

/* ============================================================
   SEO Metadata
   ============================================================ */
export const metadata: Metadata = {
  metadataBase: new URL("https://himabeans.com.au"),

  title: {
    default: "HIMA BEANS — Himalayan Coffee, Perfected at Altitude",
    template: "%s | HIMA BEANS",
  },

  description:
    "HIMA BEANS brings the world's highest-grown Nepali specialty coffee to Australia. Single-origin Himalayan coffee beans, sourced above 2,000 m and roasted to perfection. Crafted Above the Clouds.",

  keywords: [
    "Nepali coffee Australia",
    "Himalayan coffee beans",
    "Nepal specialty coffee",
    "premium coffee Australia",
    "single origin Nepal coffee",
    "high altitude coffee",
    "Himalayan single origin",
    "specialty coffee Melbourne",
    "artisan coffee roasters Australia",
    "HIMA BEANS",
  ],

  authors: [{ name: "HIMA BEANS", url: "https://himabeans.com.au" }],
  creator: "HIMA BEANS",
  publisher: "HIMA BEANS",

  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://himabeans.com.au",
    siteName: "HIMA BEANS",
    title: "HIMA BEANS — Himalayan Coffee, Perfected at Altitude",
    description:
      "Single-origin Nepali specialty coffee sourced above 2,000 m in the Himalayas and brought to Australia. Crafted Above the Clouds.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "HIMA BEANS — Crafted Above the Clouds",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "HIMA BEANS — Himalayan Coffee, Perfected at Altitude",
    description:
      "Single-origin Nepali specialty coffee sourced above 2,000 m. Crafted Above the Clouds.",
    images: ["/og-image.jpg"],
    creator: "@himabeans",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },

  manifest: "/site.webmanifest",

  alternates: {
    canonical: "https://himabeans.com.au",
  },
};

/* ============================================================
   Viewport Export
   ============================================================ */
export const viewport: Viewport = {
  themeColor: "#3B2A21",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

/* ============================================================
   Schema.org JSON-LD Structured Data
   ============================================================ */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "HIMA BEANS",
  url: "https://himabeans.com.au",
  logo: "https://himabeans.com.au/logo.png",
  description:
    "HIMA BEANS is an Australian premium coffee brand sourcing single-origin Himalayan coffee beans from Nepal, grown above 2,000 metres altitude.",
  slogan: "Crafted Above the Clouds",
  foundingLocation: {
    "@type": "Place",
    name: "Australia",
  },
  areaServed: "AU",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "hello@himabeans.com.au",
    availableLanguage: ["English"],
  },
  sameAs: [
    "https://instagram.com/himabeans",
    "https://facebook.com/himabeans",
  ],
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "HIMA BEANS Himalayan Single-Origin Coffee",
  brand: {
    "@type": "Brand",
    name: "HIMA BEANS",
  },
  description:
    "Single-origin Nepali specialty coffee beans grown in the Himalayan highlands above 2,000 metres. Naturally processed, hand-picked, and roasted to highlight floral and chocolate notes.",
  category: "Specialty Coffee Beans",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "AUD",
    availability: "https://schema.org/InStock",
    seller: {
      "@type": "Organization",
      name: "HIMA BEANS",
    },
  },
};

/* ============================================================
   Root Layout
   ============================================================ */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-AU"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect for font performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productSchema),
          }}
        />
      </head>

      <body
        className="min-h-dvh flex flex-col relative"
        style={{ backgroundColor: "#F5EFE6" }}
      >
        {/* Loading screen — renders first, unmounts after animation */}
        <LoadingScreen />

        {/* Custom cursor glow — desktop only */}
        <CursorGlow />

        {/* Lenis smooth scroll wrapper */}
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
