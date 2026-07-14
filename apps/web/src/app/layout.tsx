import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TRPCProvider } from "@/lib/trpc-provider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Medigetwell — Find Healthcare Providers Near You",
  description: "Find and book appointments with doctors, walk-in clinics, specialists, and healthcare providers near you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-CA" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <TRPCProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </TRPCProvider>
      </body>
    </html>
  );
}
