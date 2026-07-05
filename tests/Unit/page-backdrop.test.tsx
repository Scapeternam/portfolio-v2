// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";

import { render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { PageBackdrop } from "@/components/layout/page-backdrop";

describe("PageBackdrop", () => {
  beforeEach(() => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
      () => null
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("uses a single fixed full-viewport background layer", () => {
    const { container } = render(<PageBackdrop />);

    const backdrop = container.firstElementChild;

    expect(backdrop).toHaveAttribute("aria-hidden", "true");
    expect(backdrop).toHaveClass("fixed");
    expect(backdrop).toHaveClass("inset-0");
    expect(backdrop).toHaveClass("z-0");
    expect(backdrop).not.toHaveClass("h-225");
  });
});
