import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/json-ld";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Jeeson Franz | Magician & Mentalist in Bangalore",
    template: "%s | Jeeson Franz",
  },
  description: "Jeeson Franz is a dedicated professional magician and mentalist based in Bangalore, India, offering enchanting performances for corporate events, private parties, and stage shows.",
  keywords: ["Magician Bangalore", "Mentalist India", "Corporate Magic Show", "Wedding Magician", "Jeeson Franz", "Mind Reader", "Illusionist"],
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://jeeson.in",
    siteName: "Jeeson Franz",
    title: "Jeeson Franz | Magician & Mentalist",
    description: "Professional magician and mentalist based in Bangalore, India.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jeeson Franz | Magician & Mentalist",
    description: "Professional magician and mentalist based in Bangalore, India.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <JsonLd />
        <Navbar />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}