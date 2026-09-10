import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";
import InstallPrompt from "@/components/InstallPrompt";
import ActivityTracker from "@/components/ActivityTracker";

export const viewport: Viewport = {
  themeColor: "#0b0c10",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "CineSa — AI-Powered Movie Discovery & Streaming Platform",
  description:
    "Experience CineSa: AI-powered movie discovery with natural language search, free YouTube full movie streaming, Hollywood Hindi dubbed blockbusters, and personalized recommendations.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icon.svg" },
      { url: "/icon-192.png", sizes: "192x192" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "CineSa",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-gray-100 min-h-screen flex flex-col antialiased selection:bg-brand-red selection:text-white">
        {/* Invisible Activity & Analytics Tracker */}
        <ActivityTracker />

        {/* Main Desktop & Mobile Header */}
        <Navbar />

        {/* Dynamic Page Content */}
        <main className="flex-1">{children}</main>

        {/* Global Footer with Founder Credits & Contact */}
        <Footer />

        {/* Mobile Persistent Bottom Nav */}
        <MobileNav />

        {/* 1-Click Mobile App Installation Banner */}
        <InstallPrompt />
      </body>
    </html>
  );
}
