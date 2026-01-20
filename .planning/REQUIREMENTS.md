# Requirements: Whiteboard Landing Page

**Defined:** 2026-01-20
**Core Value:** Convert qualified startup founders into scheduled calls

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Foundation

- [x] **FOUN-01**: Astro project with TypeScript configured
- [x] **FOUN-02**: Tailwind CSS v4 integrated with design tokens
- [x] **FOUN-03**: URL-based i18n routing (`/en/`, `/es/`)
- [x] **FOUN-04**: Translation system with JSON files per locale
- [x] **FOUN-05**: Font loading optimized (swap, preload, no CLS)
- [x] **FOUN-06**: Mobile-first responsive foundation
- [x] **FOUN-07**: Design system matching brand (black/white/gray, geometric)

### Hero & Conversion

- [x] **HERO-01**: Hero section with clear value proposition visible in 3-5 seconds
- [x] **HERO-02**: Primary CTA "Schedule a Call" with specific duration displayed
- [x] **HERO-03**: Secondary CTA path for not-ready visitors (video overview or similar)
- [x] **HERO-04**: Hero fully translated in both languages
- [x] **HERO-05**: Hero image/graphics optimized (no lazy load, fetchpriority high)

### Content Sections

- [x] **CONT-01**: What We Do / Services section explaining productized offerings
- [x] **CONT-02**: Team/Credentials section with 4 founders and their roles
- [x] **CONT-03**: Equity Model Explainer visual explaining partnership model
- [x] **CONT-04**: Process Section showing Discovery -> Build -> Scale flow
- [x] **CONT-05**: All content sections fully translated in both languages
- [x] **CONT-06**: Contact/CTA section with Calendly trigger

### Layout & Navigation

- [x] **LAYO-01**: Header with logo and language toggle
- [x] **LAYO-02**: Footer with basic links and copyright
- [x] **LAYO-03**: Smooth scroll navigation between sections
- [x] **LAYO-04**: Minimal navigation (single-CTA discipline)

### Integrations

- [x] **INTG-01**: Calendly popup widget (lazy-loaded on click)
- [x] **INTG-02**: Plausible Analytics integration
- [x] **INTG-03**: Conversion tracking for Calendly bookings (postMessage listener)
- [x] **INTG-04**: Calendly language matches page locale

### Performance & Deployment

- [x] **PERF-01**: LCP < 2.5 seconds
- [x] **PERF-02**: CLS < 0.1
- [x] **PERF-03**: Lighthouse score > 90
- [x] **PERF-04**: Static export to Vercel
- [x] **PERF-05**: Production deployment live

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Enhanced Conversion

- **CONV-01**: Sticky CTA that appears after scrolling past hero
- **CONV-02**: Interactive assessment ("Is Equity Partnership Right for You?")
- **CONV-03**: A/B testing framework for headlines and CTAs

### Rich Media

- **MEDI-01**: Video introduction from founder
- **MEDI-02**: Animated equity model explainer

### Personalization

- **PERS-01**: Visitor segment personalization
- **PERS-02**: Industry-specific messaging variants

## Out of Scope

| Feature | Reason |
|---------|--------|
| Portfolio/case studies | No ventures to showcase yet |
| Blog/content marketing | Not needed for v1 lead generation |
| User accounts/login | Purely lead generation site |
| Pricing page | Equity model is deal-specific |
| Backend/database | Static site, no dynamic content |
| Google Analytics | GDPR concerns, requires cookie banner |
| Next.js | Overkill for static content, Astro preferred |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUN-01 | Phase 1 | Complete |
| FOUN-02 | Phase 1 | Complete |
| FOUN-03 | Phase 1 | Complete |
| FOUN-04 | Phase 1 | Complete |
| FOUN-05 | Phase 1 | Complete |
| FOUN-06 | Phase 1 | Complete |
| FOUN-07 | Phase 1 | Complete |
| LAYO-01 | Phase 2 | Complete |
| LAYO-02 | Phase 2 | Complete |
| LAYO-03 | Phase 2 | Complete |
| LAYO-04 | Phase 2 | Complete |
| HERO-01 | Phase 2 | Complete |
| HERO-02 | Phase 2 | Complete |
| HERO-03 | Phase 2 | Complete |
| HERO-04 | Phase 2 | Complete |
| HERO-05 | Phase 2 | Complete |
| CONT-01 | Phase 3 | Complete |
| CONT-02 | Phase 3 | Complete |
| CONT-03 | Phase 3 | Complete |
| CONT-04 | Phase 3 | Complete |
| CONT-05 | Phase 3 | Complete |
| CONT-06 | Phase 3 | Complete |
| INTG-01 | Phase 4 | Complete |
| INTG-02 | Phase 4 | Complete |
| INTG-03 | Phase 4 | Complete |
| INTG-04 | Phase 4 | Complete |
| PERF-01 | Phase 5 | Complete |
| PERF-02 | Phase 5 | Complete |
| PERF-03 | Phase 5 | Complete |
| PERF-04 | Phase 5 | Complete |
| PERF-05 | Phase 5 | Complete |

**Coverage:**
- v1 requirements: 31 total
- Mapped to phases: 31
- Unmapped: 0

---
*Requirements defined: 2026-01-20*
*Last updated: 2026-01-20 - All v1 requirements complete*
