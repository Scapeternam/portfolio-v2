import { Education } from "@/components/about/education";
import { Experience } from "@/components/about/experience";
import { Skills } from "@/components/about/skills";
import { Stack } from "@/components/about/stack";
import { ContactCard } from "@/components/contact/contact-card";
import { FadeIn } from "@/components/ui/motion-primitives";
import { createMetadata } from "@/lib/metadata";
import { portfolioContent } from "@/lib/portfolio-content";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "À propos",
  description:
    "Parcours, formation, projets et contact de Tidjan Tokpa, développeur web fullstack en alternance.",
  path: "/about",
});

export default function AboutPage(): ReactNode {
  const { agency, profile, proofPoints } = portfolioContent;

  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-160 px-6 pt-44 pb-16 sm:px-10 sm:pt-56 sm:pb-24">
        <FadeIn delay={0.5}>
          <div className="border-foreground/5 bg-foreground/1.5 dark:bg-foreground/3 rounded-4xl border p-8 sm:p-12">
            <h1 className="text-foreground font-serif text-[1.75rem] font-medium tracking-tight sm:text-[2rem]">
              Je suis{" "}
              <span className="border-foreground/30 border-b pb-0.5">
                {profile.name}
              </span>
              .
            </h1>
            <div className="text-foreground/75 mt-8 space-y-6 text-[17px] leading-[1.7] tracking-tight sm:text-[18px]">
              <p>{profile.summary}</p>
              <p>
                Mon parcours part du terrain: management, rythme opérationnel,
                flux de caisse, priorités mouvantes et responsabilité
                d&apos;équipe. Je m&apos;en sers aujourd&apos;hui pour
                construire des produits qui restent utiles hors demo.
              </p>
              <p>
                {agency.body} Cette logique relie mes projets SaaS,
                marketplaces, IA et opérations terrain autour d&apos;un même
                objectif: apprendre vite en livrant du concret.
              </p>
            </div>

            <div className="border-foreground/8 mt-8 grid gap-6 border-t pt-8 md:grid-cols-2">
              <div>
                <h2 className="text-foreground text-[15px] font-semibold tracking-tight">
                  Preuves
                </h2>
                <ul className="text-foreground/65 mt-4 flex flex-col gap-2 text-[14px] leading-normal tracking-tight">
                  {proofPoints.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span
                        aria-hidden="true"
                        className="bg-foreground/35 mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-foreground text-[15px] font-semibold tracking-tight">
                  Teach Agency / Octopus
                </h2>
                <ul className="text-foreground/65 mt-4 flex flex-col gap-2 text-[14px] leading-normal tracking-tight">
                  {agency.details.map((detail) => (
                    <li key={detail} className="flex gap-2">
                      <span
                        aria-hidden="true"
                        className="bg-foreground/35 mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                      />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="mx-auto w-full max-w-[40rem] px-6 pb-20 sm:px-10 sm:pb-28">
        <FadeIn delay={0.1}>
          <div className="flex flex-col gap-10">
            <Experience />
            <Education />
            <Skills />
            <Stack />
          </div>
        </FadeIn>
      </section>

      <ContactCard />
      <div className="h-12 sm:h-16" />
    </main>
  );
}
