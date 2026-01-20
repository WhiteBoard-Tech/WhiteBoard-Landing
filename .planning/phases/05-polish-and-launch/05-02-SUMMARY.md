---
phase: 05-polish-and-launch
plan: 02
subsystem: infra
tags: [vercel, deployment, middleware, i18n, edge, caching]

# Dependency graph
requires:
  - phase: 05-01
    provides: Performance optimization and bundle analysis
  - phase: 04
    provides: Plausible Analytics and Calendly integration
provides:
  - Production deployment at Vercel subdomain
  - Accept-Language middleware for automatic locale detection
  - Static asset caching with immutable headers
  - Edge middleware configuration for Astro
affects: []

# Tech tracking
tech-stack:
  added: [@astrojs/vercel]
  patterns: [edge-middleware, accept-language-redirect, static-asset-caching]

key-files:
  created: [src/middleware.ts, vercel.json]
  modified: [astro.config.mjs, package.json]

key-decisions:
  - "Edge middleware for Accept-Language redirect (302 to /en/ or /es/)"
  - "Static assets cached with max-age=31536000, immutable"
  - "Vercel adapter with edgeMiddleware: true for middleware support"

patterns-established:
  - "Accept-Language detection: check for 'es' anywhere in header, default to 'en'"
  - "Root-only redirect: middleware only intercepts / path"

# Metrics
duration: 8 min
completed: 2026-01-20
---

# Phase 5 Plan 2: Vercel Deployment Summary

**Production deployment to Vercel with Accept-Language middleware for automatic locale redirect and static asset caching**

## Performance

- **Duration:** 8 min
- **Started:** 2026-01-20T20:54:00Z
- **Completed:** 2026-01-20T21:02:04Z
- **Tasks:** 3
- **Files modified:** 4

## Accomplishments

- Deployed landing page to Vercel production (https://wb-landing-liard.vercel.app)
- Implemented Accept-Language middleware for automatic locale detection on root URL
- Configured static asset caching with immutable headers for optimal performance
- Verified all production functionality (i18n routing, Calendly popup, Plausible tracking)

## Task Commits

Each task was committed atomically:

1. **Task 1: Configure Vercel adapter and middleware** - `49eea63` (feat)
2. **Task 2: Deploy to Vercel** - `fa71d28` (feat)
3. **Task 3: Verify production deployment** - Human checkpoint (approved)

**Plan metadata:** (this commit)

## Files Created/Modified

- `src/middleware.ts` - Accept-Language detection and redirect logic for root URL
- `vercel.json` - Static asset caching headers (1 year, immutable)
- `astro.config.mjs` - Vercel adapter with edgeMiddleware enabled
- `package.json` - Added @astrojs/vercel dependency

## Decisions Made

- **Edge middleware for redirect:** Using Vercel edge middleware (not Astro middleware) for Accept-Language detection since it runs before static file serving
- **302 redirect:** Temporary redirect used so browsers don't cache redirect permanently
- **Spanish detection:** Check for "es" anywhere in Accept-Language header to catch es, es-ES, es-MX, es-419, etc.
- **Default to English:** If no Spanish preference detected, redirect to /en/

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Fixed .gitignore for Vercel deployment**
- **Found during:** Task 2 (Deploy to Vercel)
- **Issue:** .vercel directory and .env.local needed to be in .gitignore
- **Fix:** Added entries to .gitignore to prevent committing deployment config
- **Files modified:** .gitignore
- **Verification:** Vercel deployment succeeded without exposing secrets
- **Committed in:** fa71d28 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Auto-fix necessary for clean deployment. No scope creep.

## Issues Encountered

None - deployment proceeded smoothly after middleware configuration.

## User Setup Required

**External services require manual configuration.** See [05-USER-SETUP.md](./05-USER-SETUP.md) for:
- Environment variables to add (PUBLIC_CALENDLY_URL)
- Dashboard configuration steps

Note: USER-SETUP.md will be generated with production setup requirements.

## Next Phase Readiness

- Production deployment complete at https://wb-landing-liard.vercel.app
- All verification checks passed (i18n, Calendly, Plausible, mobile, Lighthouse)
- Phase 5 complete - milestone achieved

**Pending post-launch items (from STATE.md):**
- Improve logo design (user requested this be done last)
- Replace Calendly placeholder URL with actual scheduling link
- Configure Plausible dashboard: add whiteboard.co domain, create conversion goals

---
*Phase: 05-polish-and-launch*
*Completed: 2026-01-20*
