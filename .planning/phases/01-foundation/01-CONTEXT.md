# Phase 1: Foundation - Context

**Gathered:** 2026-01-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Establish the technical architecture that all content builds upon: Astro project with i18n routing (`/en/`, `/es/`), design system tokens, and performance foundations. The placeholder page must demonstrate working i18n and responsive design before any real content is added.

</domain>

<decisions>
## Implementation Decisions

### Deployment Context
- Site runs locally for testing and demonstration
- No production deployment configuration needed in this phase
- Development server must work reliably for demos

### Claude's Discretion
All foundation choices delegated to Claude, guided by brand identity:

**Typography:**
- Font selection that captures "bold, minimal, premium tech" feel
- Heading scale and body text sizing
- Font loading strategy for zero CLS

**Spacing & Layout:**
- Spacing scale (4px, 8px base or similar)
- Visual density appropriate for premium tech brand
- Mobile-first breakpoint strategy

**Design Tokens:**
- Color token naming convention
- Token organization in Tailwind config
- Consistent application of brand palette

**i18n Structure:**
- Translation file organization
- Missing translation fallback behavior
- Language switcher state management

</decisions>

<specifics>
## Brand Guidelines (from PROJECT.md)

These inform all discretionary choices:

- **Logo:** Angular "W" mark with wing-like geometry
- **Palette:** Pure black (#000000), white (#FFFFFF), grays only
- **Aesthetic:** Bold, minimal, premium tech feel
- **Personality:** Confident, direct, builder-focused
- **Key message tone:** "No vendemos horas; construimos activos"

Typography and spacing should reinforce: confident, direct, premium.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-foundation*
*Context gathered: 2026-01-20*
