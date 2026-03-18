import { Hero } from "@/components/landing/Hero";
import GlobalScene from "@/components/landing/GlobalScene";
import { Stats } from "@/components/landing/Stats";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Ecosystem } from "@/components/landing/Ecosystem";
import { Tokenomics } from "@/components/landing/Tokenomics";
import { Roadmap } from "@/components/landing/Roadmap";
import { CTA } from "@/components/landing/CTA";
import ScrollReveal from "@/components/landing/ScrollReveal";
import { Suspense } from "react";

export const revalidate = 60;

function StatsFallback() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 border-y border-border-dark bg-surface-dark/30">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex flex-col items-center md:items-start">
            <div className="h-12 w-24 animate-pulse rounded bg-surface-dark mb-2" />
            <div className="h-3 w-16 animate-pulse rounded bg-surface-dark mb-1" />
            <div className="h-3 w-32 animate-pulse rounded bg-surface-dark" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="relative z-0">
      <Suspense fallback={null}>
        <GlobalScene />
      </Suspense>
      <Hero />
      <Suspense fallback={<StatsFallback />}>
        <Stats />
      </Suspense>
      <ScrollReveal>
        <Features />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <HowItWorks />
      </ScrollReveal>
      <ScrollReveal>
        <Ecosystem />
      </ScrollReveal>
      <ScrollReveal direction="scale">
        <Tokenomics />
      </ScrollReveal>
      <ScrollReveal>
        <Roadmap />
      </ScrollReveal>
      <ScrollReveal direction="scale">
        <CTA />
      </ScrollReveal>
    </main>
  );
}
