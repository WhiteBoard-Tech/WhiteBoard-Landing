# Roadmap: Whiteboard Landing Page

## Overview

This roadmap delivers a high-conversion bilingual landing page for Whiteboard, a LatAm-based Venture Tech Partner. The journey moves from technical foundations (i18n, performance architecture) through the primary conversion point (hero section), content sections that build trust, third-party integrations (Calendly, analytics), and finally optimization and deployment. Each phase delivers a coherent, verifiable capability building toward the core goal: converting qualified startup founders into scheduled discovery calls.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation** - Astro project with i18n routing, design system, and performance foundations
- [x] **Phase 2: Core Layout and Hero** - Site shell, navigation, and primary conversion section
- [x] **Phase 3: Content Sections** - Services, Team, Equity Model, and Process sections
- [ ] **Phase 4: Integrations** - Calendly popup, Plausible analytics, and conversion tracking
- [ ] **Phase 5: Polish and Launch** - Performance optimization, Lighthouse audit, and production deployment

## Phase Details

### Phase 1: Foundation
**Goal**: Establish the technical architecture that all content builds upon - i18n routing, design system, and performance foundations must be correct before any visible content
**Depends on**: Nothing (first phase)
**Requirements**: FOUN-01, FOUN-02, FOUN-03, FOUN-04, FOUN-05, FOUN-06, FOUN-07
**Success Criteria** (what must be TRUE):
  1. Developer can run `npm run dev` and see a styled placeholder page at both `/en/` and `/es/` URLs
  2. Changing locale in URL renders page content in the correct language (placeholder text switches)
  3. Page loads with no layout shift from fonts (CLS = 0 on initial load)
  4. Design tokens (colors, spacing, typography) match brand guidelines and are applied consistently
  5. Page renders correctly on mobile viewport (375px width) without horizontal scroll
**Plans**: 2 plans

Plans:
- [x] 01-01-PLAN.md — Initialize Astro project with TypeScript, Tailwind CSS v4, and Inter font
- [x] 01-02-PLAN.md — Implement i18n routing with bilingual placeholder pages

### Phase 2: Core Layout and Hero
**Goal**: Deliver the site shell and primary conversion point - the hero section where most visitors decide to engage or bounce
**Depends on**: Phase 1
**Requirements**: LAYO-01, LAYO-02, LAYO-03, LAYO-04, HERO-01, HERO-02, HERO-03, HERO-04, HERO-05
**Success Criteria** (what must be TRUE):
  1. User sees header with logo and can toggle between Spanish and English (language persists on toggle)
  2. User understands Whiteboard's value proposition within 5 seconds of landing (headline and subheadline visible above fold)
  3. User sees a clear "Schedule a Call" CTA with specific duration displayed (e.g., "Book a 30-min call")
  4. User has a secondary path if not ready to schedule (visible alternative action)
  5. All hero text displays correctly in both Spanish and English (no broken layouts from text expansion)
**Plans**: 2 plans

Plans:
- [x] 02-01-PLAN.md — Layout components (Logo, CTAButton, Footer) and translations
- [x] 02-02-PLAN.md — Hero section with dual CTAs and index page updates

### Phase 3: Content Sections
**Goal**: Build trust and communicate offerings through content sections that explain what Whiteboard does, who they are, and how they work
**Depends on**: Phase 2
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, CONT-06
**Success Criteria** (what must be TRUE):
  1. User can scroll through Services section and understand the four productized offerings (Venture Launch, Venture Scale, AI Enablement, Integrations)
  2. User sees Team section with 3 co-founders, their names, and their roles
  3. User understands the equity partnership model through a visual explainer (not just text)
  4. User sees the process flow (Discovery, Build, Scale) and understands the engagement journey
  5. All content sections are fully translated and render correctly in both languages
**Plans**: 3 plans

Plans:
- [x] 03-01-PLAN.md — Translations and Services/Team sections
- [x] 03-02-PLAN.md — Equity Model and Process sections
- [x] 03-03-PLAN.md — Contact section with Calendly and index page wiring

### Phase 4: Integrations
**Goal**: Connect third-party services that enable conversion tracking and call scheduling - the actual mechanism for lead capture
**Depends on**: Phase 3
**Requirements**: INTG-01, INTG-02, INTG-03, INTG-04
**Success Criteria** (what must be TRUE):
  1. User clicks "Schedule a Call" CTA and Calendly popup opens (not inline embed, lazy-loaded on click)
  2. Calendly widget displays in the same language as the current page locale
  3. Plausible dashboard shows page views when visiting the site
  4. When user completes a Calendly booking, a conversion event is tracked (verifiable in Plausible)
**Plans**: TBD

Plans:
- [ ] 04-01: TBD

### Phase 5: Polish and Launch
**Goal**: Optimize performance to meet Core Web Vitals targets and deploy to production - the site goes live
**Depends on**: Phase 4
**Requirements**: PERF-01, PERF-02, PERF-03, PERF-04, PERF-05
**Success Criteria** (what must be TRUE):
  1. Lighthouse Performance score is 90 or higher on mobile
  2. LCP (Largest Contentful Paint) is under 2.5 seconds on 4G connection
  3. CLS (Cumulative Layout Shift) is under 0.1
  4. Site is deployed to Vercel and accessible at production URL
  5. Both `/en/` and `/es/` routes work correctly in production with proper caching
**Plans**: TBD

Plans:
- [ ] 05-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 2/2 | Complete | 2026-01-20 |
| 2. Core Layout and Hero | 2/2 | Complete | 2026-01-20 |
| 3. Content Sections | 3/3 | Complete | 2026-01-20 |
| 4. Integrations | 0/TBD | Not started | - |
| 5. Polish and Launch | 0/TBD | Not started | - |

---
*Roadmap created: 2026-01-20*
*Last updated: 2026-01-20*
