// @vitest-environment jsdom
/* eslint-disable @next/next/no-img-element */

import "@testing-library/jest-dom/vitest";

import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { PortraitMorph } from "@/components/hero/portrait-morph";

vi.mock("next/image", () => ({
  default: ({
    alt,
    className,
    src,
  }: {
    alt: string;
    className?: string;
    src: string;
  }) => <img alt={alt} className={className} src={src} />,
}));

vi.mock("ogl", () => ({
  Mesh: vi.fn(),
  Program: vi.fn(),
  Renderer: vi.fn(() => {
    throw new Error("Renderer should not be created without WebGL");
  }),
  Texture: vi.fn(),
  Transform: vi.fn(),
  Triangle: vi.fn(),
}));

describe("PortraitMorph", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("keeps the static portrait visible when WebGL is unavailable", () => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
      () => null
    );

    const { container } = render(
      <PortraitMorph
        srcA="/tidjan-portrait-photo.jpg"
        srcB="/tidjan-portrait-illustration.png"
        alt="Portrait de Tidjan Tokpa"
      />
    );

    expect(screen.getByAltText("Portrait de Tidjan Tokpa")).toHaveAttribute(
      "src",
      "/tidjan-portrait-photo.jpg"
    );
    expect(container.querySelector("canvas")).not.toBeInTheDocument();
  });
});
