---
phase: 02
plan: 02
name: hero-section-and-index-pages
completed: 2026-01-20
duration: 12 min

subsystem: ui-components
tags: [astro, hero, lcp-optimization, i18n, responsive, cta]

dependency_graph:
  requires:
    - 01-foundation (base layout, i18n utilities, Tailwind config)
    - 02-01 (CTAButton component, hero translation keys, Footer)
  provides:
    - Hero section with headline, subheadline, dual CTAs
    - LCP-optimized hero image with fetchpriority="high"
    - Complete English and Spanish index pages
    - Placeholder hero graphic (to be replaced with brand assets)
  affects:
    - Future hero image replacement (placeholder SVG in place)
    - Contact section (primary CTA links to #contact)
    - Video section (secondary CTA links to #video)

tech_stack:
  added: []
  patterns:
    - fetchpriority="high" for LCP-critical images
    - loading="eager" + decoding="async" for above-fold images
    - Flexible text containers for i18n text expansion
    - Grid layout with responsive column switch

key_files:
  created:
    - src/assets/images/hero-placeholder.svg
    - public/images/hero-placeholder.svg
    - src/components/Hero.astro
  modified:
    - src/pages/en/index.astro
    - src/pages/es/index.astro

decisions:
  - id: native-img-for-fetchpriority
    description: Used native <img> tag instead of Astro Image component
    rationale: Required for fetchpriority="high" attribute support for LCP optimization
  - id: secondary-cta-text-link
    description: Secondary CTA is text link with play icon, not button
    rationale: Visual hierarchy - primary CTA (button) dominates, secondary is lower commitment
  - id: hero-placeholder-svg
    description: Minimal geometric SVG placeholder for hero graphic
    rationale: Will be replaced with actual brand graphics; aligns with black/white/gray palette

metrics:
  tasks_completed: 5
  tasks_total: 5
  commits: 4
---

# Phase 02 Plan 02: Hero Section and Index Pages Summary

**One-liner:** Responsive hero section with "Your Tech Co-Founder" headline, dual CTA hierarchy (Book a Call button + Watch video link), LCP-optimized image loading, and full EN/ES translation support.

## What Was Built

### Hero Placeholder Graphic (src/assets/images/hero-placeholder.svg)
- Minimal SVG with abstract partnership visual (overlapping circles)
- Black/white/gray palette matching brand guidelines
- Connection point emphasizing partnership concept
- Copied to public/images/ for static serving

### Hero Component (src/components/Hero.astro)
- Full-height section (min-h-[calc(100vh-4rem)])
- Two-column grid layout on desktop, stacked on mobile
- Responsive typography scaling (4xl to 6xl)
- Primary CTA: Black "Book a 30-min Call" button linking to #contact
- Secondary CTA: Gray "Watch How It Works" text link with play icon linking to #video
- LCP-optimized image with fetchpriority="high" and loading="eager"
- Flexible containers handling Spanish text expansion without breaking

### Index Pages Updated
- English (/en/index.astro): Clean import of BaseLayout + Hero
- Spanish (/es/index.astro): Same structure, Hero auto-detects language from URL

## Commits

| Hash | Description |
|------|-------------|
| f65e287 | feat(02-02): create placeholder hero graphic |
| 4000c70 | feat(02-02): create Hero component with LCP-optimized image |
| 2c8e800 | feat(02-02): update English index page with Hero component |
| e79edc9 | feat(02-02): update Spanish index page with Hero component |

## Deviations from Plan

None - plan executed exactly as written.

## Verification Results

| Check | Status |
|-------|--------|
| hero-placeholder.svg exists in src/assets/images/ | PASS |
| Hero.astro imports CTAButton and uses t('hero.*') translations | PASS |
| Hero has primary CTA (button) and secondary CTA (text link) | PASS |
| Hero image uses fetchpriority="high" for LCP optimization | PASS |
| Hero image uses loading="eager" (not lazy) | PASS |
| en/index.astro imports and renders Hero component | PASS |
| es/index.astro imports and renders Hero component | PASS |
| Visual inspection: both languages render correctly | PASS (user approved) |

## User Notes

User approved visual verification with note: "We'll work on improving the logo last."

## Next Phase Readiness

Phase 02 complete. Ready for Phase 03:
- Hero section delivering value proposition above the fold
- Primary CTA targets #contact (needs contact section)
- Secondary CTA targets #video (needs video embed section)
- Layout foundation solid for adding more sections
- No blockers identified
