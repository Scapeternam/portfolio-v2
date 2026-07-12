import type { ComponentType, ReactNode } from "react";
import { BriefcaseBusiness, CalendarDays, MapPin } from "lucide-react";

import { HeroCtas } from "./hero-ctas";
import { PortraitMorph } from "./portrait-morph";
import { portfolioContent } from "@/lib/portfolio-content";

export function Hero(): ReactNode {
  const { media, profile } = portfolioContent;

  return (
    <section className="relative w-full overflow-hidden">
      <div className="mx-auto w-full max-w-275 px-6 pt-32 pb-16 sm:px-10 sm:pt-56 sm:pb-32">
        <div className="grid min-w-0 grid-cols-1 items-center gap-8 sm:gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-8">
          <div className="flex w-full max-w-[342px] min-w-0 flex-col gap-4 sm:max-w-none">
            <p className="text-foreground text-[20px] leading-tight font-medium tracking-tight">
              {profile.name}
            </p>

            <h1 className="text-foreground max-w-[11ch] text-[2.35rem] leading-[1.05] font-medium tracking-tight text-balance sm:max-w-none sm:text-[2.75rem] md:text-[2.5rem] lg:text-[3.65rem]">
              {profile.role}
            </h1>

            <p className="text-foreground/65 max-w-full text-[18px] leading-[1.4] tracking-tight sm:max-w-[38ch] sm:text-[22px]">
              {profile.headline}
            </p>

            <div className="flex w-full max-w-[342px] flex-wrap gap-2 pt-1 sm:max-w-full">
              <HeroPill icon={BriefcaseBusiness} label={profile.availability} />
              <HeroPill icon={CalendarDays} label={profile.rhythm} />
              <HeroPill icon={MapPin} label={profile.location} />
            </div>

            <HeroCtas />
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="border-foreground/8 bg-background relative aspect-square w-full max-w-[19rem] overflow-hidden rounded-4xl border p-1.5 shadow-sm sm:max-w-[22rem] md:max-w-105">
              <div className="relative h-full w-full overflow-hidden rounded-[1.6rem]">
                <PortraitMorph
                  srcA={media.portraitIllustration}
                  srcB={media.portraitPhoto}
                  alt={`Portrait de ${profile.name}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroPill({
  icon: Icon,
  label,
}: {
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
}): ReactNode {
  return (
    <span className="border-foreground/8 bg-background text-foreground/75 inline-flex max-w-full items-center gap-2 rounded-xl border px-3 py-2 text-[13px] font-medium tracking-tight shadow-sm">
      <Icon
        className="text-foreground/45 h-4 w-4 shrink-0"
        strokeWidth={2.25}
        aria-hidden="true"
      />
      <span className="min-w-0">{label}</span>
    </span>
  );
}
