# Project Research Summary: v1.1 Milestone

**Project:** Whiteboard Landing Page - Portfolio, Testimonials & Strategic FAQ
**Domain:** B2B Landing Page Enhancement (Social Proof + Objection Handling)
**Researched:** 2026-01-20
**Confidence:** HIGH

## Executive Summary

This v1.1 milestone adds three critical conversion elements to the existing landing page: **Portfolio (venture case studies)**, **Testimonials (founder quotes)**, and **Strategic FAQ (objection handling)**. Research confirms these are table-stakes for B2B landing pages, with testimonials boosting bottom-of-funnel conversions by 34% when placed near CTAs.

The recommended approach leverages the existing Astro + Tailwind CSS architecture with **zero new dependencies**. All sections can be built using native HTML elements (`<details>/<summary>` for accordions), Astro's built-in `<Image />` component for optimization, and Tailwind CSS utilities for styling. The zero-JS philosophy must be preserved - no carousel libraries, no animation frameworks.

Key risks are: (1) unoptimized portfolio images tanking Lighthouse scores, (2) generic testimonials that fail to convert, and (3) FAQ content not addressing the specific objections of skeptical no-tech founders. Client framework requirements from the Framework PDF are specific about copy, CTA wording, and visual direction - these must be followed precisely.

---

## Key Findings

### Stack Additions

**No new dependencies required for v1.1.**

The existing stack handles all needs:
- **Astro `<Image />`**: Built-in image optimization for portfolio/logos
- **Tailwind CSS utilities**: Grayscale filters, hover transitions, grid layouts
- **Native `<details>/<summary>`**: Accessible accordions for FAQ and expandable testimonials
- **Existing i18n system**: Add keys to `ui.ts` for EN/ES translations

**What NOT to add:**
- Carousel libraries (Swiper, Splide, Owl) - grids outperform carousels
- Animation libraries (Framer Motion, GSAP) - breaks zero-JS architecture
- Testimonial widgets (Trustpilot embeds) - external dependencies

### Features to Build

**Must Have (v1.1 scope):**
| Feature | Priority | Rationale |
|---------|----------|-----------|
| Portfolio Section (2 ventures) | P0 | Radarum + Alwon case studies prove capability |
| Venture Logo Wall | P0 | Above-fold social proof per client framework |
| Strategic FAQ | P0 | Addresses 4 key objections from Framework PDF |
| Hero Copy Update | P0 | Align with client-approved messaging |
| CTA Wording Update | P0 | "Aplicar para Evaluacion de Venture" + microcopy |

**Should Have (v1.1 stretch):**
| Feature | Priority | Rationale |
|---------|----------|-----------|
| Expandable Testimonials | P1 | 20% interaction rate vs <1% for carousels |
| Visual assets (architecture diagrams) | P1 | Client directive: no stock photos |
| Quote near Contact CTA | P1 | Distributed social proof increases conversion |

**Defer (v1.2+):**
| Feature | Reason |
|---------|--------|
| Video testimonials | Need video assets |
| Case study modals | 2 ventures not enough to warrant |
| Industry filtering | Need 5+ case studies first |

### Architecture Approach

All new sections follow established patterns: section components in `src/components/sections/`, sub-components for repeated elements (cards), translation keys in `src/i18n/ui.ts`. The page flow changes to:

```
Hero (updated copy + venture logos)
  |
Services (unchanged)
  |
Portfolio (NEW - 2 venture cards)
  |
Team (unchanged)
  |
EquityModel (unchanged)
  |
StrategicFAQ (NEW - 4 objection-handling questions)
  |
Process (unchanged)
  |
Contact (add testimonial quote near CTA)
```

**New components:**
1. `sections/Portfolio.astro` - Venture case study grid
2. `PortfolioCard.astro` - Individual venture card
3. `sections/StrategicFAQ.astro` - Accordion for objections
4. `LogoWall.astro` - Grayscale venture logos (Hero placement)

### Critical Pitfalls to Avoid

1. **Unoptimized Images Tank Performance**
   - Use Astro `<Image />` with width/height attributes
   - WebP format, `loading="lazy"` for below-fold
   - Target: maintain Lighthouse 90+ score

2. **Logo Wall JavaScript Carousel**
   - Use CSS-only grid or `transform: translateX()` animation
   - No carousel libraries - they break zero-JS architecture
   - Logos must be visible without JavaScript

3. **Breaking Bilingual Parity**
   - Add ALL new keys to both EN and ES in `ui.ts`
   - Translate venture descriptions (not just copy English)
   - Test complete journey in both languages

4. **FAQ Without Accessibility**
   - Use native `<details>/<summary>` elements
   - Built-in keyboard navigation and ARIA
   - Exclusive accordion via `name` attribute

5. **Generic Testimonials**
   - Require specific outcomes in quotes
   - Full attribution: name, role, company
   - Framework PDF provides the ICP voice to match

---

## Client Framework Integration

### ICP Profile (Critical Context)
The target founder is:
- No-Tech/Semi-Tech with validated idea
- Frustrated with freelancers/agencies
- Skeptical - needs trust signals
- Seeking a partner, not a provider

**Implication:** All copy must address skepticism directly. FAQ must handle objections that arise from past bad experiences.

### Required Copy Changes

**Hero Section:**
```
Headline: "Construimos tu Tecnologia a cambio de Equity."
Subheadline: "Tu Venture Tech Partner."
Body: "Whiteboard actua como tu equipo fundador tecnico (CTO + Squad)..."
```

**CTA Wording (exact):**
```
Primary: "Aplicar para Evaluacion de Venture"
Microcopy: "Solo 3-5 ventures seleccionados por ano"
```

**Services Messaging (4 pillars):**
1. Platform 60% ready
2. Skin in the Game
3. Governance
4. AI-Native

### Portfolio Ventures (exact content)

| Venture | Vertical | Tagline |
|---------|----------|---------|
| Radarum | Fintech/Edtech | "Infraestructura de inversion y datos en tiempo real" |
| Alwon | Retail Tech | "Sistema operativo para micromarkets con IA" |

### Strategic FAQ Questions (exact 4)

| # | Objection | Topic |
|---|-----------|-------|
| 1 | "How does equity work?" | Vesting/SAFE, flexible pure/hybrid models |
| 2 | "Who owns the IP?" | Venture owns product, WB licenses platform |
| 3 | "Can we scale/handover?" | Designed for transition |
| 4 | "How long to MVP?" | 6-10 weeks timeline |

### Visual Direction

**DO:**
- Architecture diagrams
- Admin OS screenshots
- Real product visuals

**DO NOT:**
- Stock photos
- Generic tech imagery
- Placeholder visuals

---

## Implications for Roadmap

### Phase 1: Hero & Logo Wall Update
**Rationale:** Above-fold changes have highest visibility impact. Logo wall provides immediate social proof.
**Delivers:**
- Updated hero copy per framework
- CTA wording change ("Aplicar para Evaluacion de Venture")
- Venture logo wall (Radarum, Alwon) in hero section
**Addresses:** Immediate social proof, copy alignment
**Avoids:** Logo carousel pitfall (use CSS-only)

### Phase 2: Portfolio Section
**Rationale:** Case studies prove capability; must come after logos establish awareness.
**Delivers:**
- Portfolio.astro section component
- PortfolioCard.astro sub-component
- 2 venture cards (Radarum, Alwon)
- Bilingual content in ui.ts
**Uses:** Astro Image for venture screenshots
**Avoids:** Image performance pitfall, missing ES translations

### Phase 3: Strategic FAQ Section
**Rationale:** FAQ addresses objections that arise after seeing portfolio/services.
**Delivers:**
- StrategicFAQ.astro section component
- 4 accordion items with objection-handling content
- Native `<details>/<summary>` implementation
**Addresses:** Equity model, IP ownership, scaling, timeline objections
**Avoids:** Accessibility pitfall (use native HTML)

### Phase 4: Testimonials & Distributed Proof
**Rationale:** Testimonials reinforce trust after objections are addressed.
**Delivers:**
- TestimonialQuote component
- Quote placement near Contact CTA
- Optional: expandable testimonials if content available
**Addresses:** Social proof at decision point
**Avoids:** Generic testimonials, isolated social proof section

### Phase 5: Visual Assets & Polish
**Rationale:** Real screenshots/diagrams per client directive replace any placeholders.
**Delivers:**
- Architecture diagrams
- Admin OS screenshots for ventures
- Lighthouse audit (maintain 90+)
**Avoids:** Stock photo usage, performance regression

### Phase Ordering Rationale

1. **Hero first** - Highest visibility, sets the stage
2. **Portfolio before FAQ** - Show work, then address objections about how you work
3. **FAQ before testimonials** - Answer questions, then provide social proof
4. **Visuals last** - Need real assets from client; polish after content is stable

### Research Flags

**Standard patterns (no additional research needed):**
- Phase 1 (Hero/Logos): CSS grid, existing component patterns
- Phase 2 (Portfolio): Follows Services.astro pattern exactly
- Phase 3 (FAQ): Native `<details>` well-documented
- Phase 4 (Testimonials): Static quotes, no complexity

**Needs attention during implementation:**
- Visual assets: Client must provide architecture diagrams and OS screenshots
- Testimonial content: Need actual founder quotes (may not exist yet)
- ES translations: Venture descriptions need professional translation

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | No changes; existing architecture handles all needs |
| Features | HIGH | Client framework provides exact requirements |
| Architecture | HIGH | Patterns established in v1.0 codebase |
| Pitfalls | HIGH | Verified with official docs, 12 pitfalls documented |

**Overall confidence:** HIGH

### Gaps to Address

| Gap | Resolution |
|-----|------------|
| Visual assets not provided | Request architecture diagrams + OS screenshots from client |
| Testimonial quotes may not exist | Can ship without testimonials; add in v1.2 when available |
| Radarum/Alwon screenshots | Need actual product screenshots, not mockups |
| Spanish venture descriptions | Require professional translation, not machine translation |

---

## Build Priority Checklist

### P0 - Must ship in v1.1
- [ ] Hero copy update (headline, subheadline, body)
- [ ] CTA wording update ("Aplicar para Evaluacion de Venture")
- [ ] Venture logo wall in hero
- [ ] Portfolio section with Radarum + Alwon cards
- [ ] Strategic FAQ with 4 objection-handling questions
- [ ] Bilingual content (EN + ES) for all new sections

### P1 - Should ship if time permits
- [ ] Testimonial quote near Contact CTA
- [ ] Architecture diagrams (depends on client assets)
- [ ] Admin OS screenshots (depends on client assets)

### P2 - Defer to v1.2
- [ ] Expandable testimonial quotes
- [ ] Video testimonials
- [ ] Case study modals

---

## Sources

### Primary (HIGH confidence)
- [Astro Images Guide](https://docs.astro.build/en/guides/images/) - Image optimization
- [MDN - HTML details/summary](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) - Accessible accordions
- [Tailwind CSS Transitions](https://tailwindcss.com/docs/transition-property) - Hover effects

### Client Framework (HIGH confidence)
- Framework (1).pdf - ICP profile, CTA wording, venture details, FAQ topics, visual direction

### Secondary (MEDIUM confidence)
- [CXL - Carousel Research](https://cxl.com/blog/dont-use-automatic-image-sliders-or-carousels/) - Why grids beat carousels
- [Testimonial Hero](https://www.testimonialhero.com/blog/b2b-customer-testimonials) - B2B testimonial best practices

### Existing Research
- .planning/research/STACK.md - No new dependencies confirmed
- .planning/research/v1.1/FEATURES.md - Portfolio + testimonials patterns
- .planning/research/ARCHITECTURE.md - Component structure
- .planning/research/PITFALLS.md - 12 pitfalls documented

---

*Research synthesized: 2026-01-20*
*Ready for roadmap: yes*
*Client framework integrated: yes*
