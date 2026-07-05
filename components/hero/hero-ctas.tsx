"use client";

import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { ContactButton } from "@/components/contact/contact-button";
import { portfolioContent } from "@/lib/portfolio-content";

export function HeroCtas(): ReactNode {
  const { links } = portfolioContent;

  return (
    <div className="mt-2 flex w-full max-w-[342px] flex-wrap items-center gap-3 sm:max-w-full">
      <ContactButton />

      <div>
        <Link
          href="/projects"
          className="border-foreground/5 focus-ring group bg-background text-foreground hover:bg-foreground/4 inline-flex cursor-pointer items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-medium shadow-2xl transition-colors"
        >
          Voir les projets
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>

      <div>
        <Link
          href={links.cv}
          download
          className="border-foreground/5 focus-ring bg-background text-foreground hover:bg-foreground/4 inline-flex cursor-pointer items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-medium shadow-2xl transition-colors"
        >
          CV
          <Download className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
