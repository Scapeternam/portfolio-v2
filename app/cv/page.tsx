"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";

import { portfolioContent, type StackChip } from "@/lib/portfolio-content";

function pillColor(skill: string, chips: readonly StackChip[]): { bg: string; fg: string } {
  const chip = chips.find(
    (c) => c.label.toLowerCase() === skill.toLowerCase()
  );
  if (chip) return { bg: chip.bg, fg: chip.fg };
  return { bg: "#1f1f1f", fg: "#ffffff" };
}

function Pill({ label, chips }: { label: string; chips: readonly StackChip[] }): ReactNode {
  const { bg, fg } = pillColor(label, chips);
  return (
    <span
      className="inline-block rounded-full px-2 py-0.5 text-[10px] font-medium tracking-tight print:text-[8pt] print:px-1.5 print:py-0.5"
      style={{ backgroundColor: bg, color: fg }}
    >
      {label}
    </span>
  );
}

export default function CvPage(): ReactNode {
  const { profile, contact, links, projects, experience, epitechProjects, education, skillGroups, bootcamps, stack, cv } =
    portfolioContent;

  const featuredProjects = projects.filter((p) => cv.featured.includes(p.id));

  return (
    <main id="main-content" className="cv-page flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-275 px-6 pt-44 pb-6 sm:px-10 sm:pt-56 sm:pb-10 print:hidden">
        <Link
          href="/"
          className="text-foreground/55 hover:text-foreground focus-ring inline-flex items-center gap-2 text-[14px] font-medium tracking-tight transition-colors"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Retour
        </Link>
      </div>

      <article className="cv-a4 mx-auto w-full max-w-[210mm] px-6 py-6 sm:px-10 print:px-[12mm] print:py-[8mm]">
        <header className="print:pb-2 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between print:flex-row print:items-start print:justify-between">
            <div>
              <h1 className="text-foreground font-serif text-[2rem] leading-[1.05] font-medium tracking-tight print:text-[22pt]">
                {profile.name}
              </h1>
              <p className="text-foreground/60 mt-1 text-[15px] leading-normal tracking-tight print:text-[11pt] print:mt-0.5">
                {profile.role}
              </p>
              <p className="text-foreground/75 mt-1.5 max-w-[52ch] text-[13px] leading-[1.45] tracking-tight print:text-[9pt] print:mt-1 print:leading-[1.35]">
                {profile.headline}
              </p>
              <p className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px] font-medium tracking-tight print:text-[8.5pt] print:gap-1 print:mt-1.5">
                <span className="bg-foreground/10 text-foreground/80 rounded-full px-2.5 py-0.5 print:bg-[#e5e5e5]">{profile.availability}</span>
                <span className="text-foreground/55">{profile.rhythm}</span>
                <span className="text-foreground/30">·</span>
                <span className="text-foreground/55">{contact.location}</span>
              </p>
            </div>
            <div className="mt-3 flex flex-col gap-0.5 text-[11px] leading-snug tracking-tight text-foreground/55 sm:text-right print:text-[8pt] print:gap-0 print:mt-0">
              <span>{contact.email}</span>
              <span>{contact.phone}</span>
              <span className="break-all">{links.github.replace("https://", "")}</span>
              <span className="break-all">{links.linkedin.replace("https://www.", "")}</span>
            </div>
          </div>
        </header>

        <div className="border-foreground/10 grid gap-5 border-t pt-3 sm:grid-cols-[1fr_2fr] print:grid-cols-[1fr_2.2fr] print:gap-3 print:pt-2">
          <aside className="flex flex-col gap-3.5 print:gap-3">
            <div>
              <h2 className="text-foreground/80 text-[12px] font-semibold uppercase tracking-widest print:text-[9pt] print:tracking-[0.15em]">
                Competences
              </h2>
              <div className="mt-1.5 flex flex-col gap-2.5 print:gap-2 print:mt-1">
                {skillGroups.map((group) => (
                  <div key={group.label}>
                    <p className="text-foreground/45 text-[10px] font-semibold uppercase tracking-wider print:text-[7.5pt]">
                      {group.label}
                    </p>
                    <div className="mt-1 flex flex-wrap gap-1 print:gap-0.5 print:mt-0.5">
                      {group.skills.map((skill) => (
                        <Pill key={skill} label={skill} chips={stack} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-foreground/80 text-[12px] font-semibold uppercase tracking-widest print:text-[9pt] print:tracking-[0.15em]">
                Formation
              </h2>
              <div className="mt-1.5 flex flex-col gap-2 print:gap-1.5 print:mt-1">
                {education.map((edu) => (
                  <div key={`${edu.school}-${edu.period}`}>
                    <p className="text-foreground text-[12px] font-semibold tracking-tight print:text-[9pt]">{edu.school}</p>
                    <p className="text-foreground/55 text-[11px] tracking-tight print:text-[8pt]">{edu.degree}</p>
                    <p className="text-foreground/40 text-[10px] tracking-tight print:text-[7.5pt]">{edu.period}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-foreground/80 text-[12px] font-semibold uppercase tracking-widest print:text-[9pt] print:tracking-[0.15em]">
                Piscines
              </h2>
              <div className="mt-1.5 flex flex-col gap-1 print:gap-0.5 print:mt-1">
                {bootcamps.map((b) => (
                  <p key={b.name} className="text-foreground/60 text-[11px] tracking-tight print:text-[8pt]">
                    <span className="text-foreground/85 font-semibold">{b.name}</span>{" "}
                    <span className="text-foreground/50">— {b.duration} · {b.stack.join(" / ")}</span>
                  </p>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-foreground/80 text-[12px] font-semibold uppercase tracking-widest print:text-[9pt] print:tracking-[0.15em]">
                Langues
              </h2>
              <p className="text-foreground/60 mt-1 text-[11px] tracking-tight print:text-[8pt] print:mt-0.5">
                Francais (natif) · Anglais technique
              </p>
            </div>

            <div>
              <h2 className="text-foreground/80 text-[12px] font-semibold uppercase tracking-widest print:text-[9pt] print:tracking-[0.15em]">
                Interets
              </h2>
              <p className="text-foreground/55 mt-1 text-[11px] leading-relaxed tracking-tight print:text-[8pt] print:mt-0.5">
                Web3 / Solana · Infrastructure self-hosted · Automatisation n8n · IA locale · SaaS et marketplaces
              </p>
            </div>
          </aside>

          <div className="flex flex-col gap-3.5 print:gap-3">
            <div>
              <h2 className="text-foreground/80 text-[12px] font-semibold uppercase tracking-widest print:text-[9pt] print:tracking-[0.15em]">
                Experience
              </h2>
              <div className="mt-1.5 flex flex-col gap-2 print:gap-1.5 print:mt-1">
                {experience.map((exp) => (
                  <div key={`${exp.company}-${exp.period}`} className="print:pb-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-foreground text-[13px] font-semibold tracking-tight print:text-[9.5pt]">{exp.company}</p>
                      <p className="text-foreground/40 shrink-0 text-[10px] tracking-tight print:text-[7.5pt]">{exp.period}</p>
                    </div>
                    <p className="text-foreground/55 mt-0.5 text-[11px] leading-snug tracking-tight print:text-[8pt] print:mt-0">{exp.role}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-foreground/80 text-[12px] font-semibold uppercase tracking-widest print:text-[9pt] print:tracking-[0.15em]">
                Projets selectionnes
              </h2>
              <div className="mt-1.5 flex flex-col gap-2 print:gap-1.5 print:mt-1">
                {featuredProjects.map((p) => (
                  <div key={p.id} className="print:pb-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-foreground text-[13px] font-semibold tracking-tight print:text-[9.5pt]">{p.name}</p>
                      <p className="text-foreground/45 shrink-0 text-[10px] tracking-tight print:text-[7.5pt]">{p.type}</p>
                    </div>
                    <p className="text-foreground/55 mt-1 text-[11px] leading-snug tracking-tight print:text-[8pt] print:mt-0.5">
                      {p.impact}
                    </p>
                    {p.highlights.length > 0 ? (
                      <ul className="mt-1 flex flex-col gap-0.5 print:gap-0 print:mt-0.5">
                        {p.highlights.slice(0, cv.maxBullets).map((h) => (
                          <li key={h} className="text-foreground/50 flex gap-1.5 text-[10px] leading-snug tracking-tight print:text-[8pt] print:gap-1">
                            <span aria-hidden="true" className="bg-foreground/25 mt-1.5 h-1 w-1 shrink-0 rounded-full print:mt-1" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <div className="mt-1.5 flex flex-wrap gap-1 print:gap-0.5 print:mt-1">
                      {p.stack.map((tech) => (
                        <Pill key={tech} label={tech} chips={stack} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {cv.showEpitechProjects ? (
              <div>
                <h2 className="text-foreground/80 text-[12px] font-semibold uppercase tracking-widest print:text-[9pt] print:tracking-[0.15em]">
                  Projets Epitech
                </h2>
                <div className="mt-1.5 flex flex-col gap-1 print:gap-1 print:mt-1">
                  {epitechProjects.slice(0, cv.epitechMax).map((ep) => {
                    const desc = ep.role.includes(" — ") ? ep.role.split(" — ")[1] : ep.role;
                    return (
                      <div key={`${ep.company}-${ep.period}`}>
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-foreground text-[11px] font-semibold tracking-tight print:text-[8pt]">{ep.company}</p>
                          <p className="text-foreground/40 shrink-0 text-[9px] tracking-tight print:text-[7pt]">{ep.period}</p>
                        </div>
                        {desc ? (
                          <p className="text-foreground/45 mt-0.5 text-[10px] leading-snug tracking-tight print:text-[7pt] print:mt-0 print:leading-[1.3]">
                            {desc}
                          </p>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </article>

      <div className="mx-auto w-full max-w-275 px-6 pt-8 pb-12 sm:px-10 sm:pt-10 sm:pb-16 print:hidden">
        <div className="flex justify-center gap-4">
          <button
            type="button"
            onClick={() => window.print()}
            className="border-foreground/8 focus-ring group bg-background text-foreground hover:bg-foreground/5 inline-flex cursor-pointer items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-medium transition-colors"
          >
            <Printer className="h-4 w-4" aria-hidden="true" />
            Imprimer le CV (PDF)
          </button>
        </div>
      </div>
    </main>
  );
}
