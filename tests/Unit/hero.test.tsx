// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";

import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

import { Hero } from "@/components/hero/hero";

vi.mock("@/components/hero/portrait-morph", () => ({
  PortraitMorph: ({
    alt,
    srcA,
    srcB,
  }: {
    alt: string;
    srcA: string;
    srcB: string;
  }): ReactNode => (
    <div aria-label={alt} data-src-a={srcA} data-src-b={srcB} role="img" />
  ),
}));

describe("Hero", () => {
  it("starts the portrait transition with the illustration before the photo", () => {
    render(<Hero />);

    const portrait = screen.getByRole("img", {
      name: "Portrait de Tidjan Tokpa",
    });

    expect(portrait).toHaveAttribute(
      "data-src-a",
      "/tidjan-portrait-illustration.png"
    );
    expect(portrait).toHaveAttribute(
      "data-src-b",
      "/tidjan-portrait-photo.jpg"
    );
  });
});
