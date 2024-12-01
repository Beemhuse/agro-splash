import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "../components/layout/Footer";
import Header from "@/components/layout/Header";
import { Toaster } from "react-hot-toast";
import MainLayout from "@/components/layout/MainLayout";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "agro-Splash",
  description: "At agro-Splash, we believe in the transformative power of technology and innovation in agriculture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen overflow-auto flex-col antialiased`}
      >
        <MainLayout>

        <Toaster />
        <Header />
        {children}
        <Footer />
        </MainLayout>
      </body>
    </html>
  );
}
