# Production Checklist

Date: 2026-07-05
Scope: React Bits `LineWaves` background integration and portfolio content personalization.

## Performance

- WebGL DPR is capped to `1` to keep GPU cost bounded.
- Rendering pauses when `document.visibilityState` is hidden.
- Rendering pauses when the canvas container is offscreen through `IntersectionObserver`.
- Canvas resizes through `ResizeObserver` instead of polling.
- The front uses one global fixed `LineWaves` canvas instead of separate background canvases per section.
- `LineWaves` does not mount when `prefers-reduced-motion: reduce` is active.
- WebGL effects fail closed when the browser cannot create a WebGL context.
- Project cards are text-first and do not fetch Dribbble/Unsplash mockups.
- `turbopack.root` is set, so the build no longer warns about multiple lockfiles selecting the parent workspace.
- Hero text and portrait card render visible on first paint instead of depending on entrance animation hydration.

## Security

- OWASP review documented in `SECURITY.md`.
- No secrets, credentials, cookies, API routes, or server actions were added.
- No user input is persisted or injected into HTML.
- `next` and `eslint-config-next` are pinned to `16.2.10`; `bun audit --audit-level high` passes.
- Unused remote image host allowlists were removed from `next.config.ts`.

## Monitoring

- Not applicable for this static portfolio feature. There is no server-side runtime added by this change.
- If deployed to Vercel or similar, use platform build logs and client error reporting if the portfolio becomes production-critical.

## Resilience

- If WebGL initialization fails, the component returns without crashing the React tree.
- The page keeps the normal `bg-background` fallback.
- The hero portrait keeps a static local photo if the transition canvas cannot start.
- WebGL context cleanup runs on unmount.

## Documentation

- `PLAN.md` documents architecture, latency budget, steps, and decisions.
- `SECURITY.md` documents the security review.
- `ERRORS.log` documents lint, typecheck, and audit corrections found during the pass.
- README still describes the original template and should be updated before public deployment.

## Infrastructure

- Docker, backups, database migrations, Redis/CDN, and API health checks are not relevant to this static portfolio shader integration.
- CI is not configured in this repository. Before deployment, wire `bun run test`, `bun run typecheck`, `bun run lint`, and `bun run build` into CI.
- Set `NEXT_PUBLIC_SITE_URL` in production so canonical URLs do not fall back to `http://localhost:3000`.
