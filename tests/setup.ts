import { vi } from "vitest";

// Mock HTMLCanvasElement.getContext pour les composants WebGL
HTMLCanvasElement.prototype.getContext = vi.fn(
  (_contextId: string, _options?: unknown) => null,
) as typeof HTMLCanvasElement.prototype.getContext;

// Mock ResizeObserver
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver;

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock requestAnimationFrame
window.requestAnimationFrame = vi.fn((cb: FrameRequestCallback) => {
  setTimeout(cb, 0);
  return 0;
});

window.cancelAnimationFrame = vi.fn();
