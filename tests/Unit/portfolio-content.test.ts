import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";

import { portfolioContent } from "@/lib/portfolio-content";
import { siteConfig } from "@/lib/metadata";

describe("portfolioContent", () => {
  it("contains Tidjan public contact and project data", () => {
    expect(portfolioContent.profile.name).toBe("Tidjan Tokpa");
    expect(portfolioContent.contact.email).toBe("tidjan.tokpa@epitech.eu");
    expect(portfolioContent.links.github).toBe(
      "https://github.com/Scapeternam"
    );
    expect(portfolioContent.media.portraitPhoto).toBe(
      "/tidjan-portrait-photo.jpg"
    );
    expect(portfolioContent.media.portraitIllustration).toBe(
      "/tidjan-portrait-illustration.png"
    );
    expect(portfolioContent.projects.map((project) => project.id)).toEqual([
      "poulpi",
      "coursecircuit",
      "frontalierpro",
      "swisstimate",
      "pickup",
      "homelab-teach",
      "terre-0",
      "leonida",
      "job-aggregator",
      "memecoin-intelligence",
      "wireframes",
    ]);
  });

  it("keeps every CV featured project resolvable", () => {
    const projectIds = new Set(
      portfolioContent.projects.map((project) => project.id)
    );

    for (const id of portfolioContent.cv.featured) {
      expect(projectIds.has(id)).toBe(true);
    }
  });

  it("keeps every project card text within the length of its siblings", () => {
    // Cards grow with their text; past this length one card stands out in the grid.
    const MAX_CARD_TEXT_LENGTH = 400;

    for (const project of portfolioContent.projects) {
      const cardText = [project.type, project.impact, ...project.highlights];
      const length = cardText.reduce((sum, text) => sum + text.length, 0);

      expect(length, project.id).toBeLessThanOrEqual(MAX_CARD_TEXT_LENGTH);
    }
  });

  it("does not expose template placeholders in public content", () => {
    const publicContent = JSON.stringify({ portfolioContent, siteConfig });

    expect(publicContent).not.toMatch(
      /Josh|hello@example|example\.com|yourhandle|Your Name|Dribbble|Loom|Atlas|Rhythm|Groove|Fieldnote|Talkback/
    );
  });

  it("points to existing public portrait assets", () => {
    const publicDir = join(process.cwd(), "public");

    expect(existsSync(join(publicDir, "tidjan-portrait-photo.jpg"))).toBe(true);
    expect(
      existsSync(join(publicDir, "tidjan-portrait-illustration.png"))
    ).toBe(true);
  });
});
