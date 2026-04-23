import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import I18nProvider from "@/components/I18nProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "모바일 심리테스트",
  description: "점수 기반 레벨 판정 심리테스트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <I18nProvider initialLanguage="en">{children}</I18nProvider>
      </body>
    </html>
  );
}
