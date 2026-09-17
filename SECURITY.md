# Security Audit

## 2026-09-02 Addendum - CV PDF asset replacement

Scope: replaced the public CV export at `public/Tidjan-Tokpa-CV.pdf` with the PDF supplied by the user.

- PDF structure: one A4 page, not encrypted, no JavaScript, no form fields.
- Runtime impact: no application code, API route, authentication flow, persistence, cookie, or user-input handling changed.
- Sensitive data exposure: unchanged in application code; the CV intentionally contains public contact/profile data.
- Dependency audit: `bun audit --audit-level high` currently reports 21 high advisories in existing dependencies, including `next`, `postcss`, `browserslist`, `brace-expansion`, `nanoid`, `sharp`, `undici`, and `js-yaml`. This was not introduced by the CV asset replacement and remains to be remediated separately.

Date: 2026-07-05
Scope: React Bits `LineWaves` WebGL background integration and portfolio content personalization.

## Summary

The change adds a decorative client-side WebGL canvas backed by `ogl` and replaces template content with verified public portfolio data for Tidjan Tokpa. It does not add authentication, persistence, forms, server actions, API routes, cookies, or user-submitted data handling.

## OWASP Review

- Injection: Not applicable. No database, shell, server action, or dynamic HTML execution was added.
- Broken authentication: Not applicable. No authentication flow exists in this change.
- Sensitive data exposure: No secrets or environment variables were added. Public contact data is intentional: email, phone, location, GitHub, LinkedIn.
- XML external entities: Not applicable. No XML parsing was added.
- Broken access control: Not applicable. No protected resources or authorization paths were added.
- Security misconfiguration: `turbopack.root` is set in `next.config.ts` to avoid ambiguous workspace-root detection. Unused remote image patterns for Unsplash and Dribbble were removed.
- Cross-site scripting: No `dangerouslySetInnerHTML` or dynamic script injection was added.
- Insecure deserialization: Not applicable. No serialization boundary was added.
- Vulnerable dependencies: `bun audit --audit-level high` initially reported high advisories for `next@16.1.1`. `next` and `eslint-config-next` were updated to `16.2.10`; audit now returns no high vulnerabilities.
- Insufficient logging and monitoring: Not applicable for the decorative client-only shader. Runtime shader failures fail closed by keeping the page background.

## Notes

- `LineWaves` is `aria-hidden` and does not collect or store pointer data.
- WebGL resources are cleaned up on unmount with `WEBGL_lose_context` when available.
- The canvas rendering pauses when the page is hidden or the container is offscreen.
- The global background uses one `LineWaves` canvas for the whole front instead of duplicating section-level canvases.
- `LineWaves` does not mount when `prefers-reduced-motion: reduce` is active.
- Project cards no longer load external mockup assets from Dribbble. The portfolio is text-first until real project screenshots are available.
- Hero portrait images are static local assets provided by the user: no external image host is called at runtime.
- WebGL canvases are preflighted before `ogl.Renderer` is called. If WebGL is unavailable, the portfolio keeps a static visual fallback instead of surfacing a runtime console error.
