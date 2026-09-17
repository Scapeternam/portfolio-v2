import { ArrowRight, Download } from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { FadeIn } from "@/components/ui/motion-primitives";
import { portfolioContent } from "@/lib/portfolio-content";

export function ProfileCard(): ReactNode {
  const { links, media, profile, proofPoints, stats } = portfolioContent;

  return (
    <section
      aria-labelledby="profile-card-title"
      className="mx-auto w-full max-w-275 px-6 sm:px-10"
    >
      <FadeIn>
        <div className="border-foreground/8 bg-background relative w-full overflow-hidden rounded-4xl border p-1.5 shadow-sm">
          <div className="relative w-full overflow-hidden rounded-[1.6rem]">
            <div className="relative grid gap-8 p-6 sm:p-8 md:grid-cols-[1.15fr_0.85fr] md:items-stretch md:gap-10">
              <div className="flex flex-col gap-5">
                <p className="text-foreground/45 text-[12px] font-semibold tracking-widest uppercase">
                  Profil
                </p>

                <div className="flex items-center gap-4">
                  <div className="border-foreground/8 relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border">
                    <NextImage
                      src={media.portraitPhoto}
                      alt={`Portrait de ${profile.name}`}
                      fill
                      sizes="56px"
                      className="object-cover grayscale"
                    />
                  </div>
                  <div className="min-w-0">
                    <h2
                      id="profile-card-title"
                      className="text-foreground text-[17px] font-medium tracking-tight"
                    >
                      {profile.name}
                    </h2>
                    <p className="text-foreground/55 mt-0.5 text-[13px] leading-snug tracking-tight">
                      {profile.role}
                      <br />
                      {profile.roleSecondary}
                    </p>
                  </div>
                </div>

                <p className="text-foreground/68 max-w-[52ch] text-[15px] leading-[1.6] tracking-tight sm:text-[16px]">
                  {profile.summary}
                </p>

                <ul className="text-foreground/62 flex flex-col gap-2 text-[13px] leading-normal tracking-tight sm:text-[14px]">
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

                <div className="mt-1 flex flex-wrap items-center gap-3">
                  <Link
                    href="/about"
                    className="focus-ring bg-foreground text-background group inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl px-5 text-sm font-medium"
                  >
                    Mon parcours
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                  <Link
                    href={links.cv}
                    download
                    className="border-foreground/8 focus-ring bg-background text-foreground hover:bg-foreground/4 inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border px-5 text-sm font-medium transition-colors"
                  >
                    CV
                    <Download className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              <div className="border-foreground/8 grid grid-cols-2 gap-4 border-t pt-6 sm:gap-5 md:border-t-0 md:border-l md:pt-0 md:pl-10">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-foreground/3 border-foreground/5 flex flex-col justify-center rounded-2xl border p-4"
                  >
                    <p className="text-foreground text-[18px] leading-none font-semibold tracking-tight">
                      {stat.value}
                    </p>
                    <p className="text-foreground/55 mt-2 text-[12px] leading-snug tracking-tight">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
