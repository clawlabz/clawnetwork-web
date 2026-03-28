"use client";

import { usePathname } from "next/navigation";
import { Link } from "@/lib/i18n/navigation";
import type { DocMeta } from "@/lib/docs";
import { BookOpen } from "lucide-react";

export function DocsSidebar({ docs }: { docs: DocMeta[] }) {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-border-dark lg:block">
      <nav className="sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto py-8 px-4">
        <div className="flex items-center gap-2 mb-6 px-3">
          <BookOpen className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold uppercase tracking-wider text-text-secondary">Docs</span>
        </div>
        <ul className="space-y-1">
          {docs.map((doc) => {
            const href = `/docs/${doc.slug}`;
            const isActive = pathname.endsWith(href) || pathname.endsWith(`/${doc.slug}`);
            return (
              <li key={doc.slug}>
                <Link
                  href={href}
                  onClick={() => window.scrollTo({ top: 0 })}
                  className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface-dark"
                  }`}
                >
                  {doc.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
