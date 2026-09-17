import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  ExternalLink,
  Gamepad2,
  Globe2,
  LayoutTemplate,
  MapPinned,
  Radar,
  Sparkles,
  Sprout,
  Truck,
} from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import Link from "next/link";

import { FadeIn } from "@/components/ui/motion-primitives";
import {
  portfolioContent,
  type PortfolioProject,
} from "@/lib/portfolio-content";

const PROJECT_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  poulpi: Building2,
  coursecircuit: MapPinned,
  frontalierpro: Globe2,
  pickup: Truck,
  "homelab-teach": Sparkles,
  "terre-0": Sprout,
  leonida: Gamepad2,
  "job-aggregator": BriefcaseBusiness,
  "memecoin-intelligence": Radar,
  wireframes: LayoutTemplate,
};

export type ProjectsProps = {
  withHeadline?: boolean;
  viewMoreVisible?: boolean;
};

export function Projects({
  withHeadline = false,
  viewMoreVisible = false,
}: ProjectsProps): ReactNode {
  const items = viewMoreVisible
    ? portfolioContent.projects.slice(0, 4)
    : portfolioContent.projects;

  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
        {withHeadline ? (
          <FadeIn className="flex flex-col items-center gap-5 pt-12 pb-10 text-center sm:pt-20 sm:pb-14">
            <h2 className="text-foreground font-serif text-[2.5rem] leading-[1.05] font-medium tracking-tight md:text-[3rem] lg:text-[3.5rem]">
              Projets sélectionnés
            </h2>
            <p className="text-foreground/65 max-w-[33ch] text-[18px] leading-[1.45] tracking-tight sm:text-[20px]">
              Des produits construits pour apprendre vite, tester un marché et
              transformer des problèmes réels en interfaces exploitables.
            </p>
          </FadeIn>
        ) : null}

        <div className="columns-1 gap-6 md:columns-2 md:gap-7">
          {items.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {viewMoreVisible ? (
          <div className="mt-12 flex justify-center sm:mt-16">
            <Link
              href="/projects"
              className="border-foreground/8 focus-ring group bg-background text-foreground hover:bg-foreground/5 inline-flex cursor-pointer items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-medium transition-colors"
            >
              Tous les projets
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: PortfolioProject;
  index: number;
}): ReactNode {
  const Icon = PROJECT_ICONS[project.id] ?? Sparkles;

  return (
    <FadeIn
      delay={Math.min(index * 0.06, 0.3)}
      className="mb-6 break-inside-avoid md:mb-7"
    >
      <article className="project-card border-foreground/8 bg-background hover:border-foreground/15 relative flex min-h-[27rem] flex-col gap-5 rounded-3xl border p-5 transition-colors sm:p-6">
        <header className="relative flex items-start justify-between gap-3">
          <span className="border-foreground/10 bg-background inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border">
            <Icon className="text-foreground h-3.5 w-3.5" aria-hidden="true" />
          </span>
          <span className="border-foreground/8 text-foreground/60 rounded-full border px-3 py-1 text-[12px] font-medium tracking-tight">
            {project.status}
          </span>
        </header>

        <div className="relative flex flex-1 flex-col gap-4">
          <h3 className="text-foreground text-[20px] leading-[1.2] font-medium tracking-tight sm:text-[22px]">
            {project.name}
          </h3>
          <p className="text-foreground/50 text-[14px] leading-normal font-medium tracking-tight">
            {project.type}
          </p>
          <p className="text-foreground/68 text-[14px] leading-normal tracking-tight sm:text-[15px]">
            {project.impact}
          </p>

          <ul className="text-foreground/62 flex flex-col gap-2 text-[13px] leading-normal tracking-tight">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-2">
                <span
                  aria-hidden="true"
                  className="bg-foreground/35 mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        <footer className="border-foreground/8 relative flex flex-col gap-3 border-t pt-4">
          <div className="flex flex-wrap gap-2">
            {project.categories.map((category) => (
              <span
                key={category}
                className="bg-foreground/5 text-foreground/60 rounded-full px-3 py-1 text-[12px] font-medium tracking-tight"
              >
                {category}
              </span>
            ))}
          </div>

          <p className="text-foreground/45 text-[12px] leading-normal tracking-tight">
            {project.stack.join(" / ")}
          </p>

          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring text-foreground/70 hover:text-foreground relative z-20 inline-flex w-fit items-center gap-1.5 text-[12px] font-medium tracking-tight transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              {project.url.replace(/^https?:\/\/(www\.)?/, "")}
            </a>
          ) : null}
        </footer>

        <Link
          href={`/projects/${project.id}`}
          aria-label={`Voir le détail du projet ${project.name}`}
          className="focus-ring absolute inset-0 z-10 rounded-3xl"
        />
      </article>
    </FadeIn>
  );
}
