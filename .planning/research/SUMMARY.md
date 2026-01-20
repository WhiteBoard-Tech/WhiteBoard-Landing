# Project Research Summary

**Project:** Whiteboard Landing Page
**Domain:** B2B Landing Page for Venture Tech Partner / Tech Studio (LatAm)
**Researched:** 2026-01-20
**Confidence:** HIGH

## Executive Summary

This is a high-conversion bilingual landing page for a LatAm tech studio targeting startup founders. The recommended approach is **Astro + Tailwind CSS** for maximum performance with minimal JavaScript. Astro's zero-JS-by-default architecture, built-in i18n routing, and island architecture make it ideal for this use case. The site will serve pre-rendered static HTML from a CDN with only the Calendly widget hydrating on demand.

The primary conversion goal is scheduling a call via Calendly. Research strongly indicates: single CTA discipline, sub-2.5s LCP, and proper bilingual implementation from day one. Without portfolio or case studies to show (new company), trust-building relies on team credentials, process transparency, and equity model explanation.

Key risks are performance degradation from Calendly integration, i18n technical debt from hardcoded strings, and conversion loss from CTA sprawl. All are preventable with proper architecture from Phase 1.

## Key Findings

### Recommended Stack

Astro is the clear winner over Next.js for this project. Landing pages need content delivery, not hydration overhead. Astro ships ~40% faster with ~90% less JavaScript than comparable Next.js setups.

**Core technologies:**
- **Astro 5.16+**: Static site framework with zero-JS default and native i18n routing
- **Tailwind CSS 4.1+**: Utility-first styling with 100x faster incremental builds
- **TypeScript 5.5**: Type safety across components and translations
- **react-calendly 4.x**: Official React component for Calendly embed with event listeners
- **Plausible Analytics**: GDPR-compliant, cookieless analytics (~1KB script)
- **Vercel**: Zero-config deployment with global CDN and built-in analytics

**What NOT to use:**
- Next.js (overkill for static content)
- Google Analytics (requires cookie banner, GDPR concerns)
- CSS-in-JS (breaks Astro's zero-JS architecture)

### Expected Features

**Must have (table stakes):**
- Clear hero section with value proposition visible in 3-5 seconds
- Primary CTA: "Schedule a Call" with specific duration (reduces friction)
- Mobile-responsive design (80%+ traffic from mobile)
- Fast page load (<2.5s LCP) — critical for SEO and bounce rates
- Trust signals section (team credentials since no portfolio)
- Bilingual support (Spanish/English) with clean URL structure

**Should have (differentiators):**
- Equity model visual explainer (unique positioning)
- Story-driven hero with micro-animations
- Process transparency section (Discovery, Build, Scale phases)
- Sticky CTA that appears after scrolling past hero
- Secondary CTA path for non-ready visitors ("Watch 2-Min Overview")

**Defer (v2+):**
- Interactive assessment tool ("Is Equity Partnership Right for You?")
- Advanced personalization by visitor segment
- Video introduction from founder
- A/B testing framework

### Architecture Approach

Static Site Generation (SSG) with URL-based i18n routing (`/en/`, `/es/`). All section components are server-rendered (no JavaScript shipped). Only three client components: LanguageToggle, CalendlyPopup (lazy-loaded on click), and Analytics (deferred).

**Major components:**
1. **Layout System** — Root layout with locale provider, fonts, metadata
2. **Section Components** — Hero, Services, Team/Credentials, Contact (all server-rendered)
3. **Calendly Integration** — Lazy-loaded popup widget (not inline) to avoid LCP/CLS impact
4. **i18n System** — URL-based routing with JSON translation files per locale

### Critical Pitfalls

1. **Hero image lazy loaded** — Never lazy load above-fold images. Use `fetchpriority="high"` and preload. Failing this causes LCP > 2.5s and SEO penalty.

2. **Calendly tracking failure** — iFrame events don't propagate to your analytics. Implement custom postMessage listener to capture `calendly.event_scheduled` and push to data layer.

3. **Hardcoded strings** — Set up i18n architecture BEFORE any content. No text directly in JSX — not even "Submit" on buttons. Retrofitting is painful.

4. **Multiple competing CTAs** — Single primary CTA above fold. Research shows up to 266% decrease in conversions with competing actions. Remove navigation bar or minimize drastically.

5. **Font loading causing CLS** — Use `font-display: swap` with fallback metrics matching (`size-adjust`, `ascent-override`). Self-host fonts and preload critical headline font only.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Foundation
**Rationale:** i18n architecture and performance foundations must be correct before any content. Dependencies flow from here.
**Delivers:** Working dev server, Astro + Tailwind + TypeScript configured, i18n routing functional, font loading optimized
**Addresses:** Mobile responsiveness, fast page load, professional design system
**Avoids:** Hardcoded strings pitfall, font CLS, render-blocking resources

### Phase 2: Core Layout and Hero
**Rationale:** Site shell and primary conversion point. Hero is the most critical section for bounce/engagement.
**Delivers:** Header, Footer, LanguageToggle, Hero section with CTA
**Uses:** Astro components, Tailwind styling, translation files
**Implements:** Server component architecture, single-CTA discipline
**Avoids:** CTA sprawl, Spanish text expansion breaking layout

### Phase 3: Content Sections
**Rationale:** Can be built in parallel once layout exists. All sections are independent server components.
**Delivers:** Services/What We Do, Team/Credentials, Process/How It Works sections
**Addresses:** Trust signals, service offering clarity, equity model explainer

### Phase 4: Integrations
**Rationale:** Calendly and analytics depend on content sections existing. Contact section contains Calendly trigger.
**Delivers:** Calendly popup integration, Plausible analytics, conversion tracking
**Uses:** react-calendly, postMessage event listener for tracking
**Avoids:** Calendly tracking failure, GTM not published, third-party script bloat

### Phase 5: Polish and Launch
**Rationale:** Optimization requires measuring against complete implementation. Cannot optimize what doesn't exist.
**Delivers:** Image optimization, Lighthouse audit passing (>90), static export, Vercel deployment
**Addresses:** LCP < 2.5s, CLS < 0.1, INP < 200ms
**Avoids:** Performance regressions, missing Core Web Vitals targets

### Phase Ordering Rationale

- **i18n before content** — Routing structure determines file organization; prevents technical debt
- **Hero before other sections** — Primary conversion point, must validate CTA works
- **Content before integrations** — Contact section must exist to hold Calendly trigger
- **Everything before optimization** — Need complete page to measure realistic performance

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 4 (Integrations):** Calendly + Plausible tracking integration is finicky; verify postMessage handling works with current Calendly version

Phases with standard patterns (skip research-phase):
- **Phase 1 (Foundation):** Astro + Tailwind + i18n is well-documented
- **Phase 2 (Layout):** Standard component patterns
- **Phase 3 (Content):** Static content sections, no complexity
- **Phase 5 (Polish):** Standard optimization checklist

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Official Astro/Tailwind docs, multiple comparison articles verified |
| Features | MEDIUM-HIGH | Strong sources but LatAm-specific context is inferred |
| Architecture | HIGH | Official next-intl/Astro docs, verified patterns |
| Pitfalls | HIGH | Official Google Core Web Vitals specs, verified GTM/Calendly docs |

**Overall confidence:** HIGH

### Gaps to Address

- **Exact Astro version:** Verify latest stable at project start (5.16+ or 6.0 if released)
- **Calendly language sync:** Calendly has its own language settings; must match page locale
- **Vercel commercial use:** Free tier prohibits commercial use; evaluate if Cloudflare Pages needed
- **Spanish content expansion:** Test all CTAs with actual Spanish translations during design phase

## Sources

### Primary (HIGH confidence)
- [Astro Documentation - i18n](https://docs.astro.build/en/guides/internationalization/)
- [Astro Documentation - Vercel Deployment](https://docs.astro.build/en/guides/deploy/vercel/)
- [Tailwind CSS v4 Blog](https://tailwindcss.com/blog/tailwindcss-v4)
- [web.dev: Core Web Vitals](https://web.dev/articles/vitals)
- [Google: Managing Multi-Regional Sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)

### Secondary (MEDIUM confidence)
- [Astro vs Next.js - Aalpha](https://www.aalpha.net/blog/astro-vs-nextjs-comparison/)
- [Analytics Mania: Track Calendly with GTM](https://www.analyticsmania.com/post/how-to-track-calendly-with-google-tag-manager-and-google-analytics-4/)
- [LandingPageFlow: CTA Placement Strategies 2026](https://www.landingpageflow.com/post/best-cta-placement-strategies-for-landing-pages)
- [GTmetrix: Don't Lazy Load LCP Image](https://gtmetrix.com/dont-lazy-load-lcp-image.html)

### Tertiary (LOW confidence)
- Specific npm version numbers — verify at install time

---
*Research completed: 2026-01-20*
*Ready for roadmap: yes*
