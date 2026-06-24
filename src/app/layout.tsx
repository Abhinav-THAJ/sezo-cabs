import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const sora = Sora({ variable: "--font-sora", subsets: ["latin"], display: "swap" });

const SITE_URL = "https://www.sezocabz.com";
const SITE_NAME = "Sezo Cabz";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sezo Cabz | Premium Kerala Cab & Tour Packages",
    template: "%s | Sezo Cabz",
  },
  description:
    "Kerala's #1 premium cab & tour service. Airport transfers, local rides, outstation travel & handcrafted Kerala tour packages — Munnar, Alappuzha, Wayanad & more. Book instantly via WhatsApp.",
  keywords: [
    "Kerala cab service", "Kerala tour packages", "Munnar tour", "Alappuzha houseboat",
    "Kochi airport taxi", "Sezo Cabz", "Kerala travel", "premium cab Kerala",
    "honeymoon package Kerala", "Wayanad tour", "Thekkady safari", "Kovalam beach tour",
    "outstation cab Kerala", "airport transfer Kochi",
  ],
  authors: [{ name: "Sezo Cabz", url: SITE_URL }],
  creator: "Sezo Cabz",
  publisher: "Sezo Cabz",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Sezo Cabz | Premium Kerala Cab & Tour Packages",
    description:
      "Kerala's #1 premium cab & tour service. Airport transfers, local rides & handcrafted Kerala tour packages. Book instantly via WhatsApp.",
    images: [{ url: "/images/hero_kerala.png", width: 1200, height: 630, alt: "Sezo Cabz — Premium Kerala Travel" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sezo Cabz | Premium Kerala Cab & Tour Packages",
    description: "Kerala's #1 premium cab & tour service. Airport transfers, local rides & curated tour packages.",
    images: ["/images/hero_kerala.png"],
  },
  category: "travel",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Sezo Cabz",
  description:
    "Premium cab and tour package service in Kerala, India. Offering airport transfers, local rides, outstation travel, and curated Kerala tour packages.",
  url: SITE_URL,
  telephone: "+917306338989",
  email: "info@sezocabz.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "VIP Road, Kochi Airport Area",
    addressLocality: "Kochi",
    addressRegion: "Kerala",
    postalCode: "683111",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: 9.9312, longitude: 76.2673 },
  areaServed: [
    { "@type": "State", name: "Kerala" },
    { "@type": "City", name: "Kochi" },
    { "@type": "City", name: "Munnar" },
    { "@type": "City", name: "Alappuzha" },
    { "@type": "City", name: "Wayanad" },
    { "@type": "City", name: "Wayanad" },
  ],
  priceRange: "₹₹",
  openingHours: "Mo-Su 00:00-23:59",
  sameAs: [],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Kerala Tour Packages & Cab Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Airport Transfer Kerala" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Honeymoon Package Kerala" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Munnar Alappuzha Tour" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Complete Kerala Tour" } },
    ],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} h-full antialiased`}>
      <head>
        <meta name="theme-color" content="#d4af37" />
        <link rel="canonical" href={SITE_URL} />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#f9f9f9] text-gray-900">
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <WhatsAppButton />
        </SmoothScroll>
      </body>
    </html>
  );
}

