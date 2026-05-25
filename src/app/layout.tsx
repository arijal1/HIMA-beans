import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

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
    default: "HIMA BEANS — Himalayan Coffee, Crafted Above the Clouds",
    template: "%s | HIMA BEANS",
  },

  description:
    "HIMA BEANS sources single-origin specialty coffee from high-altitude Himalayan farms in Nepal — roasted in Melbourne and delivered across Australia. Crafted Above the Clouds.",

  keywords: [
    "Nepali coffee Australia",
    "Himalayan coffee beans",
    "Nepal specialty coffee",
    "premium coffee Australia",
    "single origin Nepal coffee",
    "high altitude coffee",
    "specialty coffee Melbourne",
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
    title: "HIMA BEANS — Himalayan Coffee, Crafted Above the Clouds",
    description:
      "Single-origin Nepali specialty coffee from 2,000m+ altitude in the Himalayas, brought to Australia.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "HIMA BEANS" }],
  },

  twitter: {
    card: "summary_large_image",
    title: "HIMA BEANS — Himalayan Coffee, Crafted Above the Clouds",
    description: "Single-origin Nepali specialty coffee from 2,000m+. Crafted Above the Clouds.",
    images: ["/og-image.jpg"],
    creator: "@himabeans",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
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
  alternates: { canonical: "https://himabeans.com.au" },
};

/* ============================================================
   Viewport
   ============================================================ */
export const viewport: Viewport = {
  themeColor: "#0F1710",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

/* ============================================================
   Schema.org JSON-LD
   ============================================================ */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "HIMA BEANS",
  url: "https://himabeans.com.au",
  logo: "https://himabeans.com.au/logo.png",
  description:
    "Australian premium coffee brand sourcing single-origin Himalayan beans from Nepal, grown above 2,000m altitude.",
  slogan: "Crafted Above the Clouds",
  areaServed: "AU",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "hello@himabeans.com.au",
    availableLanguage: ["English"],
  },
  sameAs: ["https://instagram.com/himabeans", "https://facebook.com/himabeans"],
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "HIMA BEANS Himalayan Single-Origin Coffee",
  brand: { "@type": "Brand", name: "HIMA BEANS" },
  description:
    "Single-origin Nepali specialty coffee beans grown in the Himalayan highlands above 2,000m. Hand-picked, naturally processed, roasted in Melbourne.",
  category: "Specialty Coffee Beans",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "AUD",
    availability: "https://schema.org/InStock",
    seller: { "@type": "Organization", name: "HIMA BEANS" },
  },
};

/* ============================================================
   Root Layout — native scroll, no Lenis/GSAP
   ============================================================ */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-AU"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      </head>

      <body
        className="min-h-dvh flex flex-col relative"
        style={{ backgroundColor: "#F3EFE6" }}
      >
        {children}
      </body>
    </html>
  );
}
