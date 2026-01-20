---
phase: 04-integrations
plan: 02
subsystem: analytics
tags: [plausible, analytics, conversion-tracking, intersection-observer]

# Dependency graph
requires:
  - phase: 04-01
    provides: Calendly lazy-load integration with postMessage support
  - phase: 03-03
    provides: Contact section with Calendly CTA
provides:
  - Plausible analytics script in head
  - Section visibility tracking
  - Calendly conversion funnel (popup_opened -> booking_confirmed)
  - TypeScript declarations for window.plausible
affects: [05-polish]

# Tech tracking
tech-stack:
  added: [plausible]
  patterns: [intersection-observer-once, message-origin-validation]

key-files:
  created:
    - src/scripts/analytics.ts
  modified:
    - src/layouts/BaseLayout.astro
    - src/env.d.ts
    - src/components/sections/Contact.astro

key-decisions:
  - "IntersectionObserver unobserves after first view to prevent duplicate events"
  - "Calendly postMessage origin validated for security"
  - "Analytics auto-initializes on import"

patterns-established:
  - "IntersectionObserver single-fire: observe + unobserve on trigger"
  - "postMessage origin validation: check e.origin before processing"

# Metrics
duration: 3min
completed: 2026-01-20
---

# Phase 4 Plan 2: Plausible Analytics Summary

**Privacy-first analytics with section tracking, popup events, and Calendly booking conversion funnel**

## Performance

- **Duration:** 3 min
- **Started:** 2026-01-20T14:44:00Z
- **Completed:** 2026-01-20T14:47:00Z
- **Tasks:** 3
- **Files modified:** 4

## Accomplishments

- Plausible script loads on every page (privacy-first, no cookies)
- Section visibility tracking fires once per section via IntersectionObserver
- Calendly conversion funnel: popup_opened -> date_time_selected -> booking_confirmed
- TypeScript declarations for window.plausible with full options support

## Task Commits

Each task was committed atomically:

1. **Task 1: Add Plausible script to BaseLayout and type declarations** - `963ca16` (feat)
2. **Task 2: Create analytics script with section tracking and Calendly conversion listener** - `7a4fc5c` (feat)
3. **Task 3: Wire analytics to Contact section and track popup_opened event** - `e6f311b` (feat)

## Files Created/Modified

- `src/scripts/analytics.ts` - Analytics module with section tracking and Calendly conversion events
- `src/layouts/BaseLayout.astro` - Added Plausible script tag in head
- `src/env.d.ts` - Added plausible() type declaration to Window interface
- `src/components/sections/Contact.astro` - Import analytics module, track popup_opened with locale

## Decisions Made

- **IntersectionObserver unobserves after first view** - Prevents duplicate section_viewed events as users scroll back and forth
- **Calendly postMessage origin validation** - Security check ensures only messages from calendly.com are processed
- **Analytics auto-initializes on import** - Simplifies usage - just import the module
- **Optional chaining for plausible calls** - Uses `window.plausible?.()` to handle cases where Plausible doesn't load (localhost, ad blockers)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

**External services require manual configuration.** See [04-USER-SETUP.md](./04-USER-SETUP.md) for:
- Plausible Dashboard: Add whiteboard.co domain
- Create custom event goals: booking_confirmed, popup_opened, section_viewed, date_time_selected

## Next Phase Readiness

- Analytics fully integrated, ready for Phase 05 polish
- Conversion funnel will track: page view -> section views -> popup opened -> date/time selected -> booking confirmed
- No blockers

---
*Phase: 04-integrations*
*Completed: 2026-01-20*
