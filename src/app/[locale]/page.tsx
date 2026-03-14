import { Hero } from "@/components/landing/Hero";
import { Stats } from "@/components/landing/Stats";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Ecosystem } from "@/components/landing/Ecosystem";
import { Tokenomics } from "@/components/landing/Tokenomics";
import { Roadmap } from "@/components/landing/Roadmap";
import { CTA } from "@/components/landing/CTA";
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
    <>
      <Hero />
      <Suspense fallback={<StatsFallback />}>
        <Stats />
      </Suspense>
      <Features />
      <HowItWorks />
      <Ecosystem />
      <Tokenomics />
      <Roadmap />
      <CTA />
    </>
  );
}
