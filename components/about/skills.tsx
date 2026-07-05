import type { ReactNode } from "react";

import { portfolioContent } from "@/lib/portfolio-content";

const SKILL_GROUPS = portfolioContent.skillGroups;

export function Skills(): ReactNode {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-foreground text-[15px] font-semibold tracking-tight">
        Competences
      </h3>
      <div className="border-foreground/5 bg-foreground/2 dark:bg-foreground/5 rounded-4xl border p-4 sm:p-5">
        <div className="grid gap-5">
          {SKILL_GROUPS.map((group) => (
            <div key={group.label} className="flex flex-col gap-3">
              <p className="text-foreground/45 text-[13px] font-semibold tracking-[0.14em] uppercase">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="border-foreground/8 bg-background text-foreground/85 rounded-full border px-4 py-2 text-[14px] tracking-tight sm:text-[15px]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
