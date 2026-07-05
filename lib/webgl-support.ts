type WebGLAttributes = WebGLContextAttributes & {
  powerPreference?: WebGLPowerPreference;
};

type SupportedWebGLContext = WebGLRenderingContext | WebGL2RenderingContext;

export function getSupportedWebGLContext(
  canvas: HTMLCanvasElement,
  attributes?: WebGLAttributes
): SupportedWebGLContext | null {
  return (
    canvas.getContext("webgl2", attributes) ??
    canvas.getContext("webgl", attributes)
  );
}

export function createSupportedWebGLCanvas(
  attributes?: WebGLAttributes
): HTMLCanvasElement | null {
  if (typeof document === "undefined") return null;

  const canvas = document.createElement("canvas");
  return getSupportedWebGLContext(canvas, attributes) ? canvas : null;
}

export function releaseWebGLContext(
  gl: Pick<SupportedWebGLContext, "getExtension"> | null
): void {
  gl?.getExtension("WEBGL_lose_context")?.loseContext();
}
