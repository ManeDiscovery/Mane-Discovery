import type { Metadata } from "next";
import { Outfit, Lora } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import AuthProvider from "@/components/AuthProvider";
import GlobalNav from "@/components/GlobalNav";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mane Discovery | 21-Day Somatic Nervous System Reset",
  description: "Stop fighting your body. Learn the 'Secret of the Horse' and join Maria's equestrian-inspired 21-Day somatics journey to expand capacity, regulate, and safely exit survival mode.",
  keywords: ["nervous system reset", "somatic healing", "equine therapy", "polyvagal theory", "Mane Discovery", "trauma healing", "regulate nervous system", "burnout recovery"],
  authors: [{ name: "Maria", url: "https://mane-discovery.vercel.app" }],
  creator: "Mane Discovery",
  openGraph: {
    title: "Mane Discovery | The 21-Day Nervous System Reset",
    description: "A horse-inspired 21-day somatic journey to slow down, reconnect, and shift permanently out of survival mode.",
    url: "https://mane-discovery.vercel.app",
    siteName: "Mane Discovery",
    images: [{
      url: "https://mane-discovery.vercel.app/hero-horse-landscape.png",
      width: 1200,
      height: 630,
      alt: "A peaceful horse resting in an open field, symbolizing nervous system regulation."
    }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mane Discovery",
    description: "A horse-inspired 21-day somatic journey to slow down, reconnect, and shift permanently out of survival mode.",
    images: ["https://mane-discovery.vercel.app/hero-horse-landscape.png"],
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${lora.variable} antialiased selection:bg-rose-300 selection:text-sage-900`}
      >
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center">
          <AuthProvider>
            {children}
            <GlobalNav />
          </AuthProvider>
          <Analytics />
        </div>
      </body>
    </html>
  );
}
