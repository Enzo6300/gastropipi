import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "La table d'Hugo — Restaurant Gastronomique",
  description:
    "Découvrez La table d'Hugo, une expérience culinaire d'exception au cœur de Paris. Le Chef Aurélien Marchand sublime les saveurs dans un cadre d'élégance intemporelle.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full grain-overlay overflow-x-hidden">{children}</body>
    </html>
  );
}
