import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import I18nProvider from "@/components/I18nProvider";
import { supportedLanguages, type Language } from "@/lib/i18n";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const savedLanguage = cookieStore.get("app_language")?.value;
  const initialLanguage: Language = supportedLanguages.includes(savedLanguage as Language)
    ? (savedLanguage as Language)
    : "en";

  return (
    <html
      lang={initialLanguage}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <I18nProvider initialLanguage={initialLanguage}>{children}</I18nProvider>
      </body>
    </html>
  );
}
