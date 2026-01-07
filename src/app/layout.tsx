import type React from "react";
import type { Metadata } from "next";
import { Open_Sans, Work_Sans } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: "Rooli - AI-Powered Social Media Scheduler",
  description:
    "Streamline your social media presence with AI-powered content generation, multi-platform scheduling, and advanced analytics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${workSans.variable} ${openSans.variable} antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.svg" sizes="any" />
      </head>
      <body className="font-sans">
        <ReactQueryProvider>
          <NextTopLoader color="#1f2937" showSpinner={true} />
          <Toaster position="top-right" />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
