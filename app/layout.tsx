import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Great_Vibes, Inter } from "next/font/google";
import { ClientProviders } from "@/components/layout/client-providers";
import { SketchFilters } from "@/components/ui/sketch-border";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const signature = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-signature",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nzali — Painter & Pencil Artist",
  description:
    "A private portfolio of graphite, pigment, and shadow. Contemporary fine art by Nzali.",
};

export const viewport: Viewport = {
  themeColor: "#FAF7F2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} ${signature.variable} bg-velvet`}>
      <body className="min-h-dvh bg-velvet font-body">
        <ClientProviders>
          <SketchFilters />
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
