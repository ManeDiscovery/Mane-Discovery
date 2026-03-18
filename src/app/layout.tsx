import type { Metadata } from "next";
import { Outfit, Lora } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mane Discovery | Nervous System Reset",
  description: "A 21-Day Nervous System Reset App using the Mane Discovery process.",
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
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
