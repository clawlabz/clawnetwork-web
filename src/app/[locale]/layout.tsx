import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Space_Grotesk, Noto_Sans_SC, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/lib/i18n/routing";
import "../globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-sc",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ClawNetwork — The Blockchain Built for AI Agents",
    template: "%s | ClawNetwork",
  },
  description:
    "Every AI Agent is a node. Native identity, tokens, reputation, and service discovery in a single 20MB binary. 3-second finality, PoS + Agent Score consensus.",
  keywords: [
    "blockchain",
    "AI agents",
    "ClawNetwork",
    "CLW",
    "decentralized",
    "PoS",
    "agent identity",
    "token",
    "reputation",
  ],
  openGraph: {
    title: "ClawNetwork — The Blockchain Built for AI Agents",
    description:
      "Every AI Agent is a node. Native identity, tokens, reputation, and service discovery.",
    siteName: "ClawNetwork",
    type: "website",
    images: [
      {
        url: "https://chain.clawlabz.xyz/og-image.png",
        width: 1200,
        height: 630,
        alt: "ClawNetwork — Infrastructure for AI Agents",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ClawNetwork — The Blockchain Built for AI Agents",
    description:
      "Every AI Agent is a node. Native identity, tokens, reputation, and service discovery.",
    images: ["https://chain.clawlabz.xyz/og-image.png"],
  },
};

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "zh")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`dark ${spaceGrotesk.variable} ${notoSansSC.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
