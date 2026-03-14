"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/lib/i18n/navigation";
import { Menu, X, Globe } from "lucide-react";
import { GITHUB_URL } from "@/lib/constants";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { href: "/#ecosystem", label: t("ecosystem") },
    { href: "/#features", label: t("features") },
    { href: "/#tokenomics", label: t("tokenomics") },
    { href: "/#roadmap", label: t("roadmap") },
    { href: "/docs/quickstart", label: t("docs") },
    { href: "/developers", label: t("developers") },
  ];

  function switchLocale() {
    const nextLocale = pathname.startsWith("/zh") ? "en" : "zh";
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border-dark bg-bg-dark/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight">ClawNetwork</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-text-secondary transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={switchLocale}
            className="flex items-center gap-1 rounded-lg border border-border-dark px-2 py-1.5 text-xs text-text-secondary transition-colors hover:border-primary hover:text-primary"
          >
            <Globe className="h-3.5 w-3.5" />
            EN/ZH
          </button>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-lg border border-border-dark px-4 py-2 text-sm font-semibold transition-colors hover:border-primary hover:text-primary sm:block"
          >
            GitHub
          </a>

          <Link
            href="/docs/quickstart"
            className="hidden rounded-lg bg-primary px-4 py-2 text-sm font-bold text-bg-dark transition-all hover:brightness-110 sm:block"
          >
            {t("getStarted")}
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-text-secondary md:hidden"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-border-dark bg-bg-dark px-6 py-4 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-sm font-medium text-text-secondary transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/docs/quickstart"
            onClick={() => setMobileOpen(false)}
            className="mt-2 block rounded-lg bg-primary px-4 py-3 text-center text-sm font-bold text-bg-dark"
          >
            {t("getStarted")}
          </Link>
        </nav>
      )}
    </header>
  );
}
