---
phase: 04-integrations
plan: 01
subsystem: ui
tags: [calendly, lazy-loading, i18n, performance]

# Dependency graph
requires:
  - phase: 03-content-sections
    provides: Contact section with Calendly CTA button
provides:
  - Lazy-loaded Calendly widget (60KB+ saved on initial load)
  - Locale-aware Calendly popup (EN/ES support)
  - Type declarations for Calendly global
affects: [04-02-analytics, 05-polish]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Lazy-load pattern: facade module with load-on-demand"
    - "Data attribute locale passing: data-calendly-locale"

key-files:
  created:
    - src/scripts/calendly.ts
    - src/env.d.ts
  modified:
    - src/layouts/BaseLayout.astro
    - src/components/sections/Contact.astro
    - tsconfig.json

key-decisions:
  - "Facade pattern for lazy-loading: single Promise prevents duplicate loads"
  - "Type declarations in env.d.ts for Window.Calendly global"
  - "@scripts path alias added for clean imports"

patterns-established:
  - "Lazy-load pattern: loadX() returns Promise, caches result, prevents duplicate loads"
  - "Data attribute locale: pass server-side locale to client-side scripts via data-*"

# Metrics
duration: 4min
completed: 2026-01-20
---

# Phase 4 Plan 1: Calendly Lazy-Load Summary

**Lazy-loaded Calendly widget with locale support, removing 60KB+ from initial page load**

## Performance

- **Duration:** 4 min
- **Started:** 2026-01-20T14:41:00Z
- **Completed:** 2026-01-20T14:45:00Z
- **Tasks:** 3
- **Files modified:** 5

## Accomplishments

- Created calendly.ts facade module with loadCalendly() and openCalendlyPopup() functions
- Removed eager Calendly script/CSS loading from BaseLayout head
- Updated Contact CTA to lazy-load Calendly on click with locale parameter
- Added Window.Calendly type declarations for TypeScript support

## Task Commits

Each task was committed atomically:

1. **Task 1: Create Calendly lazy-load script and add type declarations** - `9a200f8` (feat)
2. **Task 2: Remove eager Calendly loading from BaseLayout** - `7232e02` (perf)
3. **Task 3: Update Contact section with lazy-load CTA** - `02cfa13` (feat)

## Files Created/Modified

- `src/scripts/calendly.ts` - Lazy-load facade with loadCalendly() and openCalendlyPopup()
- `src/env.d.ts` - Window.Calendly type declaration for TypeScript
- `tsconfig.json` - Added @scripts/* path alias
- `src/layouts/BaseLayout.astro` - Removed Calendly widget.css and widget.js from head
- `src/components/sections/Contact.astro` - Added lazy-load click handler with locale support

## Decisions Made

- **Facade pattern with Promise caching:** Single `calendlyLoading` Promise prevents duplicate script loads if user clicks rapidly
- **Type declarations in env.d.ts:** Standard Astro location for global type augmentations
- **@scripts path alias:** Added to tsconfig.json for clean imports from components

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Added @scripts path alias to tsconfig.json**
- **Found during:** Task 1 (Creating calendly.ts)
- **Issue:** Plan specified `@scripts/calendly` import but path alias didn't exist
- **Fix:** Added `"@scripts/*": ["src/scripts/*"]` to tsconfig.json paths
- **Files modified:** tsconfig.json
- **Verification:** TypeScript compiles without errors
- **Committed in:** 9a200f8 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Essential for imports to work. No scope creep.

## Issues Encountered

None - plan executed smoothly after path alias fix.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Calendly integration complete with lazy-loading and i18n
- Ready for analytics integration (04-02)
- Placeholder Calendly URL still needs replacement before launch (documented in STATE.md)

---
*Phase: 04-integrations*
*Completed: 2026-01-20*
