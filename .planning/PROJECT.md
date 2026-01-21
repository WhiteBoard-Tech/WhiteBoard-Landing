# Whiteboard Landing Page

## What This Is

A high-conversion bilingual landing page for Whiteboard, a Venture Tech Partner / Tech Studio based in LatAm. The page targets startup founders who have strong business vision but lack an A-team tech capability, communicating Whiteboard's equity-for-product model and driving qualified leads to schedule discovery calls via Calendly integration.

## Core Value

Convert qualified startup founders into scheduled calls — the page must clearly communicate "we build your tech for equity" and make booking a call frictionless.

## Requirements

### Validated

- [x] Hero section with compelling headline, subheadline, and primary CTA (schedule call) — v1.0
- [x] Clear value proposition explaining the equity-for-tech model — v1.0
- [x] Productized offerings section (Venture Launch, Venture Scale, AI Enablement, Integrations) — v1.0
- [x] Founder/team credibility section (4 co-founders, their roles) — v1.0
- [x] Equity model visual explainer — v1.0
- [x] Process flow (Discovery, Build, Scale) — v1.0
- [x] Bilingual support (Spanish + English toggle) — v1.0
- [x] Calendly integration for scheduling calls — v1.0
- [x] Mobile-first responsive design — v1.0
- [x] Black/white/gray color palette matching brand identity — v1.0
- [x] Geometric, minimalist design system matching logo aesthetic — v1.0
- [x] Fast page load (LCP < 2.5s, Lighthouse 90+) — v1.0
- [x] Production deployment ready — v1.0

### Active

**Current Milestone: v1.1 Trust Building**

**Goal:** Add social proof sections (portfolio, testimonials) and replace placeholder content to build credibility with startup founders.

**Target features:**
- Portfolio/case studies section with best-practice layout
- Testimonials section with logo wall and expandable quotes
- Replace placeholder team member names
- Replace placeholder Calendly URL with real link
- Replace placeholder hero graphic with final brand asset

### Out of Scope

- Blog/content section — not needed for v1
- Pricing page — equity model is deal-specific
- User accounts/login — purely lead generation
- Complex animations — keep it fast and minimal
- Google Analytics — GDPR concerns, using Plausible instead

## Context

**Current State (v1.0 shipped 2026-01-20):**
- Production URL: https://wb-landing-liard.vercel.app
- Tech stack: Astro, Tailwind CSS v4, TypeScript, Plausible Analytics
- 1,110 LOC across 22 source files
- Lighthouse Performance: 90+ (mobile)

**Brand Identity:**
- Logo: Angular "W" mark with wing-like geometry
- Palette: Pure black (#000000), white (#FFFFFF), grays
- Aesthetic: Bold, minimal, premium tech feel
- Personality: Confident, direct, builder-focused

**Target Audience:**
- Startup founders in LatAm
- Have business vision, market knowledge, commercial execution
- Lack technical co-founder or A-team tech capability
- Looking for a tech partner, not an agency
- Understand equity and willing to share upside

**Key Messages:**
- "No vendemos horas; construimos activos" (We don't sell hours; we build assets)
- Tech partner, not service provider
- Platform-first approach (reusable tech = faster delivery)
- Enterprise quality at startup speed

**Tech Debt (non-blocking):**
- Placeholder hero graphic needs final brand assets
- Team member names are placeholder text
- Calendly URL is placeholder (needs real scheduling link)
- Privacy/Terms pages not created (footer links 404)
- Plausible dashboard not configured (needs domain, goals)

## Constraints

- **Tech stack**: Astro + Tailwind CSS v4 + TypeScript (established)
- **Language**: Spanish and English supported via URL-based routing
- **Performance**: Mobile-first, LCP < 2.5s (achieved)
- **CTA**: Calendly popup integration (implemented)
- **Design**: Black/white/gray brand palette (established)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Bilingual from v1 | LatAm primary market but want international reach | ✓ Good — URL-based i18n works well |
| Schedule call as primary CTA | Higher intent than contact form, lower friction than application | ✓ Good — Calendly popup integration |
| No portfolio section | No ventures to show yet; will add when available | ✓ Good — kept scope focused |
| Astro over Next.js | Zero-JS-by-default, better for static content site | ✓ Good — Lighthouse 90+ achieved |
| Plausible over Google Analytics | GDPR compliance, no cookie banner needed | ✓ Good — privacy-first analytics |
| Tailwind CSS v4 | Modern CSS-first config, better DX | ✓ Good — @theme directive cleaner |
| TypeScript i18n (ui.ts) | Type safety for translations, IDE autocomplete | ✓ Good — caught missing keys at build |
| Lazy-load Calendly | Non-blocking page load, faster LCP | ✓ Good — loads only on CTA click |
| Edge middleware for locale | Accept-Language detection before static serving | ✓ Good — proper 302 redirect flow |

---
*Last updated: 2026-01-20 after v1.1 milestone started*
