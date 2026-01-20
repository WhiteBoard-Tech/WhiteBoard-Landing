---
phase: 02
plan: 01
name: layout-components-and-translations
completed: 2026-01-20
duration: 8 min

subsystem: ui-components
tags: [astro, tailwind, i18n, accessibility, components]

dependency_graph:
  requires:
    - 01-foundation (base layout, i18n utilities, Tailwind config)
  provides:
    - Logo component with accessible SVG
    - CTAButton component with primary/secondary/ghost variants
    - Footer component with translations
    - Hero and footer translation keys in ui.ts
    - Smooth scroll with scroll-margin-top for fixed header
  affects:
    - 02-02 (Hero section will use CTAButton and translations)
    - Future footer pages (privacy, terms - links already point to them)

tech_stack:
  added: []
  patterns:
    - Inline SVG with role="img" and aria-labelledby for accessibility
    - class:list for combining Tailwind classes with props
    - Variant pattern for reusable button styles

key_files:
  created:
    - src/components/Logo.astro
    - src/components/CTAButton.astro
    - src/components/Footer.astro
  modified:
    - src/i18n/ui.ts
    - src/layouts/BaseLayout.astro
    - src/styles/global.css

decisions:
  - id: logo-inline-svg
    description: Logo uses inline SVG for full styling control via currentColor
    rationale: Allows logo color to inherit from text color, simplifies theming
  - id: cta-anchor-element
    description: CTAButton renders as anchor element, not button
    rationale: All CTAs in this site navigate to URLs, anchor is semantically correct
  - id: scroll-margin-80px
    description: scroll-margin-top set to 5rem (80px) for section[id]
    rationale: Matches fixed header height (h-16 = 64px) plus comfortable padding

metrics:
  tasks_completed: 5
  tasks_total: 5
  commits: 5
---

# Phase 02 Plan 01: Layout Components and Translations Summary

**One-liner:** Accessible W mark logo, three-variant CTA button, i18n footer with Privacy/Terms links, and smooth scroll anchor navigation.

## What Was Built

### Logo Component (src/components/Logo.astro)
- Inline SVG rendering angular W mark with wing-like geometry
- Size variants: sm (w-8), md (w-10), lg (w-12)
- Accessibility: role="img", aria-labelledby="logo-title", title element
- Uses currentColor for stroke, allowing text color inheritance

### CTAButton Component (src/components/CTAButton.astro)
- Three variants: primary (solid black), secondary (bordered), ghost (text only)
- Focus ring for keyboard accessibility
- Renders as anchor element for navigation
- Accepts slot content and custom classes

### Footer Component (src/components/Footer.astro)
- Dynamic copyright year
- Privacy Policy and Terms of Service links with i18n paths
- Uses getLangFromUrl and useTranslations for translations
- Accessible nav element with aria-label

### Translation Keys Added
- hero.headline, hero.subheadline, hero.cta.primary, hero.cta.secondary (EN/ES)
- footer.copyright, footer.privacy, footer.terms (EN/ES)

### BaseLayout Updates
- Logo component integrated in header with W mark + "Whiteboard" text
- LanguageSwitcher preserved for i18n toggle
- Footer component replaces placeholder
- scroll-margin-top: 5rem added for anchor navigation

## Commits

| Hash | Description |
|------|-------------|
| 46c536d | feat(02-01): create Logo component with accessible SVG |
| 17fc85e | feat(02-01): create CTAButton component with variants |
| 3b40570 | feat(02-01): add hero and footer translation keys |
| a0579d1 | feat(02-01): create Footer component with translations |
| 1acf381 | feat(02-01): update BaseLayout with Logo, Footer, and smooth scroll |

## Deviations from Plan

None - plan executed exactly as written.

## Verification Results

| Check | Status |
|-------|--------|
| Logo.astro has role="img" and aria-labelledby | PASS |
| CTAButton.astro has primary/secondary/ghost variants | PASS |
| ui.ts contains hero.* and footer.* keys in both en and es | PASS |
| Footer.astro has nav aria-label="Footer navigation" | PASS |
| BaseLayout imports and uses Logo and Footer components | PASS |
| BaseLayout contains LanguageSwitcher component in header | PASS |
| global.css contains html { scroll-behavior: smooth; } | PASS |
| global.css contains section[id] { scroll-margin-top: 5rem; } | PASS |
| npm run build completes without errors | PASS |

## Next Phase Readiness

Ready for Plan 02-02 (Hero Section):
- CTAButton component available with primary/secondary variants
- All hero translation keys in place (headline, subheadline, CTAs)
- Smooth scroll enabled for anchor links
- No blockers identified
