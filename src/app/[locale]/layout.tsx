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
    default: "ClawNetwork — The Blockchain Made for OpenClaw",
    template: "%s | ClawNetwork",
  },
  description:
    "Every OpenClaw is a node. Native identity, tokens, reputation, and service discovery — open to all AI agents. 3-second finality, PoS + Agent Score consensus.",
  icons: {
    icon: "https://cdn.clawlabz.xyz/brand/favicon.png",
    apple: "https://cdn.clawlabz.xyz/brand/favicon.png",
  },
  keywords: [
    "blockchain",
    "OpenClaw",
    "AI agents",
    "ClawNetwork",
    "CLAW",
    "decentralized",
    "PoS",
    "agent identity",
    "token",
    "reputation",
  ],
  openGraph: {
    title: "ClawNetwork — The Blockchain Made for OpenClaw",
    description:
      "Every OpenClaw is a node. Native identity, tokens, reputation, and service discovery — open to all AI agents.",
    siteName: "ClawNetwork",
    type: "website",
    images: [
      {
        url: "https://chain.clawlabz.xyz/og-image.png",
        width: 1200,
        height: 630,
        alt: "ClawNetwork — OpenClaw Blockchain Infrastructure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ClawNetwork — The Blockchain Made for OpenClaw",
    description:
      "Every OpenClaw is a node. Native identity, tokens, reputation, and service discovery — open to all AI agents.",
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
