import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { ContactCard } from "@/components/contact/contact-card";
import { FadeIn } from "@/components/ui/motion-primitives";
import { createMetadata } from "@/lib/metadata";
import { portfolioContent } from "@/lib/portfolio-content";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = portfolioContent.projects.find((p) => p.id === id);
  if (!project) return createMetadata({ title: "Projet introuvable", path: "/projects" });

  return createMetadata({
    title: project.name,
    description: project.impact,
    path: `/projects/${id}`,
  });
}

export default async function ProjectDetailPage({ params }: Props): Promise<ReactNode> {
  const { id } = await params;
  const project = portfolioContent.projects.find((p) => p.id === id);

  if (!project) notFound();

  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-275 px-6 pt-44 pb-16 sm:px-10 sm:pt-56 sm:pb-20">
        <FadeIn delay={0.5}>
          <Link
            href="/projects"
            className="text-foreground/55 hover:text-foreground focus-ring mb-8 inline-flex items-center gap-2 text-[14px] font-medium tracking-tight transition-colors sm:mb-10"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Retour aux projets
          </Link>

          <div className="border-foreground/5 bg-foreground/1.5 dark:bg-foreground/3 rounded-4xl border p-6 sm:p-8">
            <header className="flex flex-col gap-4 pb-6 sm:gap-5 sm:pb-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="border-foreground/8 text-foreground/60 rounded-full border px-3 py-1 text-[12px] font-medium tracking-tight">
                  {project.status}
                </span>
                {project.categories.map((cat) => (
                  <span
                    key={cat}
                    className="bg-foreground/5 text-foreground/60 rounded-full px-3 py-1 text-[12px] font-medium tracking-tight"
                  >
                    {cat}
                  </span>
                ))}
              </div>
              <h1 className="text-foreground font-serif text-[2.25rem] leading-[1.05] font-medium tracking-tight sm:text-[2.75rem] lg:text-[3.25rem]">
                {project.name}
              </h1>
              <p className="text-foreground/55 text-[17px] leading-normal font-medium tracking-tight sm:text-[18px]">
                {project.type}
              </p>
            </header>

            <div className="border-foreground/8 flex flex-col gap-8 border-t pt-6 sm:gap-10 sm:pt-8">
              <div>
                <h2 className="text-foreground text-[15px] font-semibold tracking-tight">
                  Impact
                </h2>
                <p className="text-foreground/70 mt-2 text-[16px] leading-[1.6] tracking-tight sm:text-[17px]">
                  {project.impact}
                </p>
              </div>

              <div>
                <h2 className="text-foreground text-[15px] font-semibold tracking-tight">
                  Points clés
                </h2>
                <ul className="text-foreground/70 mt-2 flex flex-col gap-2 text-[15px] leading-normal tracking-tight sm:text-[16px]">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex gap-2">
                      <span
                        aria-hidden="true"
                        className="bg-foreground/35 mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                      />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-foreground text-[15px] font-semibold tracking-tight">
                  Stack technique
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="bg-foreground/5 text-foreground/65 rounded-full px-3 py-1 text-[13px] font-medium tracking-tight"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <ContactCard />
      <div className="h-12 sm:h-16" />
    </main>
  );
}
