"use client";

import { Mesh, Program, Renderer, Triangle } from "ogl";
import { useEffect, useRef, type ReactNode } from "react";

import {
  createSupportedWebGLCanvas,
  releaseWebGLContext,
} from "@/lib/webgl-support";

type ColorVector = [number, number, number];

type Uniform<T> = {
  value: T;
};

type LineWavesUniforms = {
  uTime: Uniform<number>;
  uResolution: Uniform<[number, number, number]>;
  uSpeed: Uniform<number>;
  uInnerLines: Uniform<number>;
  uOuterLines: Uniform<number>;
  uWarpIntensity: Uniform<number>;
  uRotation: Uniform<number>;
  uEdgeFadeWidth: Uniform<number>;
  uColorCycleSpeed: Uniform<number>;
  uBrightness: Uniform<number>;
  uColor1: Uniform<ColorVector>;
  uColor2: Uniform<ColorVector>;
  uColor3: Uniform<ColorVector>;
  uMouse: Uniform<Float32Array>;
  uMouseInfluence: Uniform<number>;
  uEnableMouse: Uniform<boolean>;
};

type LineWavesProgram = Program & {
  uniforms: LineWavesUniforms;
};

export type LineWavesProps = {
  className?: string;
  speed?: number;
  innerLineCount?: number;
  outerLineCount?: number;
  warpIntensity?: number;
  rotation?: number;
  edgeFadeWidth?: number;
  colorCycleSpeed?: number;
  brightness?: number;
  color1?: string;
  color2?: string;
  color3?: string;
  enableMouseInteraction?: boolean;
  mouseInfluence?: number;
};

const DEFAULTS = {
  speed: 0.3,
  innerLineCount: 32,
  outerLineCount: 36,
  warpIntensity: 1,
  rotation: -45,
  edgeFadeWidth: 0,
  colorCycleSpeed: 1,
  brightness: 0.2,
  color1: "#ffffff",
  color2: "#ffffff",
  color3: "#ffffff",
  enableMouseInteraction: true,
  mouseInfluence: 2,
} satisfies Required<Omit<LineWavesProps, "className">>;

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uResolution;
uniform float uSpeed;
uniform float uInnerLines;
uniform float uOuterLines;
uniform float uWarpIntensity;
uniform float uRotation;
uniform float uEdgeFadeWidth;
uniform float uColorCycleSpeed;
uniform float uBrightness;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec2 uMouse;
uniform float uMouseInfluence;
uniform bool uEnableMouse;

#define HALF_PI 1.5707963

float hashF(float n) {
  return fract(sin(n * 127.1) * 43758.5453123);
}

float smoothNoise(float x) {
  float i = floor(x);
  float f = fract(x);
  float u = f * f * (3.0 - 2.0 * f);
  return mix(hashF(i), hashF(i + 1.0), u);
}

float displaceA(float coord, float t) {
  float result = sin(coord * 2.123) * 0.2;
  result += sin(coord * 3.234 + t * 4.345) * 0.1;
  result += sin(coord * 0.589 + t * 0.934) * 0.5;
  return result;
}

float displaceB(float coord, float t) {
  float result = sin(coord * 1.345) * 0.3;
  result += sin(coord * 2.734 + t * 3.345) * 0.2;
  result += sin(coord * 0.189 + t * 0.934) * 0.3;
  return result;
}

vec2 rotate2D(vec2 p, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return vec2(p.x * c - p.y * s, p.x * s + p.y * c);
}

void main() {
  vec2 coords = gl_FragCoord.xy / uResolution.xy;
  coords = coords * 2.0 - 1.0;
  coords = rotate2D(coords, uRotation);

  float halfT = uTime * uSpeed * 0.5;
  float fullT = uTime * uSpeed;

  float mouseWarp = 0.0;
  if (uEnableMouse) {
    vec2 mPos = rotate2D(uMouse * 2.0 - 1.0, uRotation);
    float mDist = length(coords - mPos);
    mouseWarp = uMouseInfluence * exp(-mDist * mDist * 4.0);
  }

  float warpAx = coords.x + displaceA(coords.y, halfT) * uWarpIntensity + mouseWarp;
  float warpAy = coords.y - displaceA(coords.x * cos(fullT) * 1.235, halfT) * uWarpIntensity;
  float warpBx = coords.x + displaceB(coords.y, halfT) * uWarpIntensity + mouseWarp;
  float warpBy = coords.y - displaceB(coords.x * sin(fullT) * 1.235, halfT) * uWarpIntensity;

  vec2 fieldA = vec2(warpAx, warpAy);
  vec2 fieldB = vec2(warpBx, warpBy);
  vec2 blended = mix(fieldA, fieldB, mix(fieldA, fieldB, 0.5));

  float fadeTop = smoothstep(uEdgeFadeWidth, uEdgeFadeWidth + 0.4, blended.y);
  float fadeBottom = smoothstep(-uEdgeFadeWidth, -(uEdgeFadeWidth + 0.4), blended.y);
  float vMask = 1.0 - max(fadeTop, fadeBottom);

  float tileCount = mix(uOuterLines, uInnerLines, vMask);
  float scaledY = blended.y * tileCount;
  float nY = smoothNoise(abs(scaledY));

  float ridge = pow(
    step(abs(nY - blended.x) * 2.0, HALF_PI) * cos(2.0 * (nY - blended.x)),
    5.0
  );

  float lines = 0.0;
  for (float i = 1.0; i < 3.0; i += 1.0) {
    lines += pow(max(fract(scaledY), fract(-scaledY)), i * 2.0);
  }

  float pattern = vMask * lines;

  float cycleT = fullT * uColorCycleSpeed;
  float rChannel = (pattern + lines * ridge) * (cos(blended.y + cycleT * 0.234) * 0.5 + 1.0);
  float gChannel = (pattern + vMask * ridge) * (sin(blended.x + cycleT * 1.745) * 0.5 + 1.0);
  float bChannel = (pattern + lines * ridge) * (cos(blended.x + cycleT * 0.534) * 0.5 + 1.0);

  vec3 col = (rChannel * uColor1 + gChannel * uColor2 + bChannel * uColor3) * uBrightness;
  float alpha = clamp(length(col), 0.0, 1.0);

  gl_FragColor = vec4(col, alpha);
}
`;

function hexToVec3(hex: string): ColorVector {
  let normalized = hex.trim().replace("#", "");
  if (normalized.length === 3) {
    normalized = normalized
      .split("")
      .map((char) => char + char)
      .join("");
  }

  if (!/^[\da-f]{6}$/i.test(normalized)) {
    return [1, 1, 1];
  }

  return [
    Number.parseInt(normalized.slice(0, 2), 16) / 255,
    Number.parseInt(normalized.slice(2, 4), 16) / 255,
    Number.parseInt(normalized.slice(4, 6), 16) / 255,
  ];
}

function syncUniforms(program: LineWavesProgram, props: LineWavesProps): void {
  const rotation = props.rotation ?? DEFAULTS.rotation;
  const uniforms = program.uniforms;

  uniforms.uSpeed.value = props.speed ?? DEFAULTS.speed;
  uniforms.uInnerLines.value = props.innerLineCount ?? DEFAULTS.innerLineCount;
  uniforms.uOuterLines.value = props.outerLineCount ?? DEFAULTS.outerLineCount;
  uniforms.uWarpIntensity.value = props.warpIntensity ?? DEFAULTS.warpIntensity;
  uniforms.uRotation.value = (rotation * Math.PI) / 180;
  uniforms.uEdgeFadeWidth.value = props.edgeFadeWidth ?? DEFAULTS.edgeFadeWidth;
  uniforms.uColorCycleSpeed.value =
    props.colorCycleSpeed ?? DEFAULTS.colorCycleSpeed;
  uniforms.uBrightness.value = props.brightness ?? DEFAULTS.brightness;
  uniforms.uColor1.value = hexToVec3(props.color1 ?? DEFAULTS.color1);
  uniforms.uColor2.value = hexToVec3(props.color2 ?? DEFAULTS.color2);
  uniforms.uColor3.value = hexToVec3(props.color3 ?? DEFAULTS.color3);
  uniforms.uMouseInfluence.value =
    props.mouseInfluence ?? DEFAULTS.mouseInfluence;
  uniforms.uEnableMouse.value =
    props.enableMouseInteraction ?? DEFAULTS.enableMouseInteraction;
}

export function LineWaves(props: LineWavesProps): ReactNode {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const propsRef = useRef(props);

  useEffect(() => {
    propsRef.current = props;
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const rendererOptions = {
      alpha: true,
      antialias: false,
      powerPreference: "high-performance" as const,
      premultipliedAlpha: false,
    };
    const canvas = createSupportedWebGLCanvas(rendererOptions);
    if (!canvas) return;

    let renderer: Renderer | null = null;
    let gl: Renderer["gl"] | null = null;
    let program: LineWavesProgram | null = null;
    let mesh: Mesh | null = null;

    try {
      renderer = new Renderer({
        canvas,
        dpr: Math.min(window.devicePixelRatio || 1, 1),
        ...rendererOptions,
      });

      gl = renderer.gl;
      canvas.style.display = "block";
      canvas.style.height = "100%";
      canvas.style.width = "100%";
      gl.clearColor(0, 0, 0, 0);

      const geometry = new Triangle(gl);
      const uniforms: LineWavesUniforms = {
        uTime: { value: 0 },
        uResolution: { value: [1, 1, 1] },
        uSpeed: { value: DEFAULTS.speed },
        uInnerLines: { value: DEFAULTS.innerLineCount },
        uOuterLines: { value: DEFAULTS.outerLineCount },
        uWarpIntensity: { value: DEFAULTS.warpIntensity },
        uRotation: { value: (DEFAULTS.rotation * Math.PI) / 180 },
        uEdgeFadeWidth: { value: DEFAULTS.edgeFadeWidth },
        uColorCycleSpeed: { value: DEFAULTS.colorCycleSpeed },
        uBrightness: { value: DEFAULTS.brightness },
        uColor1: { value: hexToVec3(DEFAULTS.color1) },
        uColor2: { value: hexToVec3(DEFAULTS.color2) },
        uColor3: { value: hexToVec3(DEFAULTS.color3) },
        uMouse: { value: new Float32Array([0.5, 0.5]) },
        uMouseInfluence: { value: DEFAULTS.mouseInfluence },
        uEnableMouse: { value: DEFAULTS.enableMouseInteraction },
      };

      program = new Program(gl, {
        vertex: vertexShader,
        fragment: fragmentShader,
        uniforms,
      }) as LineWavesProgram;

      if (!program.uniformLocations) {
        releaseWebGLContext(gl);
        return;
      }

      syncUniforms(program, propsRef.current);

      mesh = new Mesh(gl, { geometry, program });
      container.appendChild(canvas);
    } catch {
      if (canvas.parentElement === container) container.removeChild(canvas);
      releaseWebGLContext(gl);
      return;
    }

    const activeRenderer = renderer;
    const activeGl = gl;
    const activeProgram = program;
    const activeMesh = mesh;
    if (!activeRenderer || !activeGl || !activeProgram || !activeMesh) return;

    const currentMouse: [number, number] = [0.5, 0.5];
    let targetMouse: [number, number] = [0.5, 0.5];
    let visible = document.visibilityState === "visible";
    let onScreen = true;
    let raf = 0;

    const resize = (): void => {
      const width = Math.max(container.offsetWidth, 1);
      const height = Math.max(container.offsetHeight, 1);
      activeRenderer.setSize(width, height);
      activeProgram.uniforms.uResolution.value = [
        activeGl.canvas.width,
        activeGl.canvas.height,
        activeGl.canvas.width / Math.max(activeGl.canvas.height, 1),
      ];
    };

    const handleMouseMove = (event: MouseEvent): void => {
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(rect.width, 1);
      const height = Math.max(rect.height, 1);
      targetMouse = [
        (event.clientX - rect.left) / width,
        1 - (event.clientY - rect.top) / height,
      ];
    };

    const handleMouseLeave = (): void => {
      targetMouse = [0.5, 0.5];
    };

    const handleVisibilityChange = (): void => {
      visible = document.visibilityState === "visible";
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          onScreen = entry.isIntersecting;
        }
      },
      { rootMargin: "100px" }
    );
    intersectionObserver.observe(container);

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    resize();

    const update = (time: number): void => {
      if (visible && onScreen) {
        syncUniforms(activeProgram, propsRef.current);
        activeProgram.uniforms.uTime.value = time * 0.001;

        if (
          propsRef.current.enableMouseInteraction ??
          DEFAULTS.enableMouseInteraction
        ) {
          currentMouse[0] += 0.05 * (targetMouse[0] - currentMouse[0]);
          currentMouse[1] += 0.05 * (targetMouse[1] - currentMouse[1]);
          activeProgram.uniforms.uMouse.value[0] = currentMouse[0];
          activeProgram.uniforms.uMouse.value[1] = currentMouse[1];
        } else {
          activeProgram.uniforms.uMouse.value[0] = 0.5;
          activeProgram.uniforms.uMouse.value[1] = 0.5;
        }

        activeRenderer.render({ scene: activeMesh });
      }

      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      if (canvas.parentElement === container) container.removeChild(canvas);
      releaseWebGLContext(activeGl);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={["line-waves-container", props.className]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

export default LineWaves;
