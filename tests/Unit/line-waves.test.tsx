// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";

import { render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { LineWaves } from "@/components/shaders/line-waves";

const mocks = vi.hoisted(() => ({
  loseContext: vi.fn(),
  render: vi.fn(),
  throwProgram: false,
  matchMediaMatches: false,
}));

vi.mock("ogl", () => {
  class Renderer {
    gl: {
      canvas: HTMLCanvasElement;
      clearColor: ReturnType<typeof vi.fn>;
      drawingBufferWidth: number;
      drawingBufferHeight: number;
      getExtension: ReturnType<typeof vi.fn>;
    };

    constructor() {
      const canvas = document.createElement("canvas");
      this.gl = {
        canvas,
        clearColor: vi.fn(),
        drawingBufferWidth: 320,
        drawingBufferHeight: 180,
        getExtension: vi.fn(() => ({ loseContext: mocks.loseContext })),
      };
    }

    setSize(width: number, height: number): void {
      this.gl.canvas.width = width;
      this.gl.canvas.height = height;
      this.gl.drawingBufferWidth = width;
      this.gl.drawingBufferHeight = height;
    }

    render(): void {
      mocks.render();
    }
  }

  class Program {
    uniforms: Record<string, { value: unknown }>;
    uniformLocations = {};
    vertexShader = {};
    fragmentShader = {};

    constructor(
      _gl: unknown,
      options: { uniforms: Record<string, { value: unknown }> }
    ) {
      if (mocks.throwProgram) {
        throw new Error("Program setup failed");
      }
      this.uniforms = options.uniforms;
    }
  }

  class Mesh {
    constructor(_gl: unknown, _options: unknown) {}
  }

  class Triangle {
    constructor(_gl: unknown) {}
  }

  return { Mesh, Program, Renderer, Triangle };
});

class MockResizeObserver implements ResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "0px";
  readonly thresholds = [];
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
}

describe("LineWaves", () => {
  beforeEach(() => {
    mocks.throwProgram = false;
    mocks.matchMediaMatches = false;
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
      () =>
        ({
          getExtension: vi.fn(() => ({ loseContext: vi.fn() })),
        }) as never
    );
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({ matches: mocks.matchMediaMatches }))
    );
    vi.stubGlobal("ResizeObserver", MockResizeObserver);
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
    vi.stubGlobal(
      "requestAnimationFrame",
      vi.fn(() => 1)
    );
    vi.stubGlobal("cancelAnimationFrame", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  it("renders a decorative container and mounts a WebGL canvas", async () => {
    const { container, unmount } = render(
      <LineWaves className="custom-wave" enableMouseInteraction={false} />
    );

    const wave = container.querySelector(".line-waves-container");
    expect(wave).toHaveAttribute("aria-hidden", "true");
    expect(wave).toHaveClass("custom-wave");

    await waitFor(() => {
      expect(wave?.querySelector("canvas")).toBeInTheDocument();
    });

    unmount();

    expect(mocks.loseContext).toHaveBeenCalledTimes(1);
  });

  it("does not initialize OGL when WebGL is unavailable", () => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
      () => null
    );

    const { container } = render(<LineWaves />);

    expect(container.querySelector("canvas")).not.toBeInTheDocument();
    expect(mocks.render).not.toHaveBeenCalled();
  });

  it("fails closed when shader setup throws", async () => {
    mocks.throwProgram = true;

    const { container } = render(<LineWaves />);

    await waitFor(() => {
      expect(container.querySelector("canvas")).not.toBeInTheDocument();
    });
    expect(mocks.loseContext).toHaveBeenCalledTimes(1);
  });

  it("does not mount a canvas when reduced motion is requested", () => {
    mocks.matchMediaMatches = true;

    const { container } = render(<LineWaves />);

    expect(container.querySelector("canvas")).not.toBeInTheDocument();
    expect(mocks.render).not.toHaveBeenCalled();
  });
});
