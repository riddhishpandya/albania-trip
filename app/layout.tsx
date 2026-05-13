import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "leaflet/dist/leaflet.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"]
});

export const viewport: Viewport = {
  themeColor: "#17201b",
  initialScale: 1,
  width: "device-width"
};

export const metadata: Metadata = {
  title: "Albania 2026 Trip Hub",
  description: "Itinerary, logistics, stays, ideas, and travel notes for Albania 2026."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
