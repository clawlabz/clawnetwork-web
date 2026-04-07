import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Space_Grotesk, Noto_Sans_SC, Noto_Sans_JP, Noto_Sans_KR, Fira_Code } from "next/font/google";
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

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-fira-code",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chain.clawlabz.xyz"),
  title: {
    default: "ClawNetwork — The Blockchain Built for OpenClaw",
    template: "%s | ClawNetwork",
  },
  description:
    "The blockchain built for OpenClaw. Native identity, tokens, reputation, and service discovery — open to all AI agents. 3-second finality, PoS + Agent Score consensus.",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
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
    title: "ClawNetwork — The Blockchain Built for OpenClaw",
    description:
      "The blockchain built for OpenClaw. Native identity, tokens, reputation, and service discovery — open to all AI agents.",
    siteName: "ClawNetwork",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClawNetwork — The Blockchain Built for OpenClaw",
    description:
      "The blockchain built for OpenClaw. Native identity, tokens, reputation, and service discovery — open to all AI agents.",
    creator: "@clawnetworkhq",
  },
};

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`dark ${spaceGrotesk.variable} ${notoSansSC.variable} ${notoSansJP.variable} ${notoSansKR.variable} ${firaCode.variable}`}>
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
