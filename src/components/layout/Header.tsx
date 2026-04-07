"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/lib/i18n/navigation";
import { Menu, X, Globe, Github, ChevronDown } from "lucide-react";
import { GITHUB_URL } from "@/lib/constants";

const LOCALES = [
  { code: "en", label: "English" },
  { code: "zh", label: "中文" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" },
  { code: "ru", label: "Русский" },
  { code: "tr", label: "Türkçe" },
  { code: "es", label: "Español" },
  { code: "pt", label: "Português" },
  { code: "hi", label: "हिन्दी" },
  { code: "id", label: "Indonesia" },
  { code: "vi", label: "Tiếng Việt" },
  { code: "fr", label: "Français" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function switchLocale(code: string) {
    if (code !== locale) {
      router.replace(pathname, { locale: code });
    }
    setLangOpen(false);
  }

  const navItems = [
    { href: "/#ecosystem", label: t("ecosystem") },
    { href: "/#features", label: t("features") },
    { href: "/#tokenomics", label: t("tokenomics") },
    { href: "/#roadmap", label: t("roadmap") },
    { href: "/run-node", label: t("runNode") },
    { href: "/nodes", label: t("nodes") },
    { href: "/wallet", label: t("wallet") },
    { href: "/docs/quickstart", label: t("docs") },
    { href: "/developers", label: t("developers") },
    { href: "/about", label: t("about") },
  ];

  return (
    <header
      className={`fixed top-0 z-50 w-full border-0 transition-all duration-500 ${
        scrolled
          ? "bg-bg-dark/20 backdrop-blur-sm shadow-[0_1px_0_rgba(255,255,255,0.05)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2" aria-label="ClawNetwork Home">
          <Image src="/logo.svg" alt="ClawNetwork" width={32} height={32} className="rounded-md" />
          <span className="text-lg font-bold tracking-tight">
            <span style={{ color: "#fff" }}>Claw</span>
            <span style={{ color: "#F96706" }}>Network</span>
          </span>
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

        <div className="flex items-center gap-2">
          {/* GitHub icon */}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hidden sm:flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition-colors hover:text-primary"
          >
            <Github className="h-[18px] w-[18px]" />
          </a>

          {/* Language dropdown */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              aria-label="Switch language"
              className="flex h-9 items-center gap-1 rounded-lg px-2 text-text-secondary transition-colors hover:text-primary"
            >
              <Globe className="h-[18px] w-[18px]" />
              <ChevronDown
                className={`h-3 w-3 transition-transform ${langOpen ? "rotate-180" : ""}`}
              />
            </button>

            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-44 max-h-80 overflow-y-auto overflow-hidden rounded-lg border border-border-dark bg-surface-dark shadow-xl shadow-black/30">
                {LOCALES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => switchLocale(l.code)}
                    className={`flex w-full items-center gap-2 px-4 py-2.5 text-sm transition-colors hover:bg-primary/5 ${
                      l.code === locale
                        ? "text-primary bg-primary/10"
                        : "text-text-secondary"
                    }`}
                  >
                    {l.label}
                    {l.code === locale && (
                      <span className="ml-auto text-[10px] text-primary/60">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="text-text-secondary md:hidden"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
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
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 py-3 text-sm font-medium text-text-secondary transition-colors hover:text-primary"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
        </nav>
      )}
    </header>
  );
}
