# Architecture Patterns: Portfolio & Testimonials Integration

**Domain:** Adding social proof sections to existing Astro landing page
**Project:** Whiteboard Landing Page v1.1
**Researched:** 2026-01-20
**Overall Confidence:** HIGH (based on existing codebase patterns)

---

## Executive Summary

The existing Astro architecture provides clear patterns for adding Portfolio and Testimonials sections. Both sections should follow the established component structure: section components in `src/components/sections/`, sub-components for repeated elements, translation keys in `src/i18n/ui.ts`, and placement in both `en/index.astro` and `es/index.astro` page files. The architecture requires zero JavaScript for static content display.

---

## Existing Architecture Analysis

### Current Page Flow

```
Hero         - Value proposition, primary CTA
Services     - What Whiteboard does (4 cards)
Team         - Co-founders (3 members)
EquityModel  - How partnership works (3 value props)
Process      - How it works (3 steps)
Contact      - Final CTA with Calendly popup
```

### Established Patterns

| Pattern | Implementation | Example |
|---------|---------------|---------|
| Section component | `src/components/sections/{Name}.astro` | `Services.astro`, `Team.astro` |
| Sub-component | `src/components/{ItemName}.astro` | `ServiceCard.astro`, `TeamMember.astro` |
| Data array | Array of objects with `key` field | `const services = [{ key: 'ventureLaunch', icon: 'rocket' }]` |
| i18n usage | `t(`section.${item.key}.field`)` | `t('services.ventureLaunch.title')` |
| Section structure | Container + title + grid/content | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` |
| Background alternation | White and gray-50 alternate | Services=white, Team=gray-50, Equity=white |

### Current Component Hierarchy

```
src/
├── components/
│   ├── Hero.astro           # Top-level hero (not in sections/)
│   ├── CTAButton.astro      # Reusable CTA button
│   ├── ServiceCard.astro    # Card for services grid
│   ├── TeamMember.astro     # Card for team grid
│   ├── LanguageSwitcher.astro
│   ├── Logo.astro
│   ├── Footer.astro
│   └── sections/
│       ├── Services.astro   # What We Do
│       ├── Team.astro       # Who We Are
│       ├── EquityModel.astro # How We Partner
│       ├── Process.astro    # How It Works
│       └── Contact.astro    # Final CTA
├── pages/
│   ├── index.astro          # Root redirect
│   ├── en/index.astro       # English page
│   └── es/index.astro       # Spanish page
├── layouts/
│   └── BaseLayout.astro     # HTML wrapper with header/footer
└── i18n/
    ├── ui.ts                # Translation strings
    └── utils.ts             # getLangFromUrl, useTranslations
```

---

## Recommended Architecture for New Sections

### New Components Needed

| Component | Type | Purpose |
|-----------|------|---------|
| `sections/Portfolio.astro` | Section | Container for portfolio/case studies grid |
| `PortfolioCard.astro` | Sub-component | Individual case study card |
| `sections/Testimonials.astro` | Section | Container for logo wall + quotes |
| `TestimonialQuote.astro` | Sub-component | Individual testimonial with expand |
| `LogoWall.astro` | Sub-component | Grid of client logos |

### Component Boundaries

```
src/components/
├── sections/
│   ├── Portfolio.astro      # NEW: Case studies section
│   └── Testimonials.astro   # NEW: Social proof section
├── PortfolioCard.astro      # NEW: Case study card
├── TestimonialQuote.astro   # NEW: Quote with optional expand
└── LogoWall.astro           # NEW: Client logo grid
```

### Integration Points

**1. Page Files (en/index.astro, es/index.astro)**

```astro
---
import BaseLayout from "@layouts/BaseLayout.astro";
import Hero from "@components/Hero.astro";
import Services from "@components/sections/Services.astro";
import Portfolio from "@components/sections/Portfolio.astro";      // NEW
import Team from "@components/sections/Team.astro";
import Testimonials from "@components/sections/Testimonials.astro"; // NEW
import EquityModel from "@components/sections/EquityModel.astro";
import Process from "@components/sections/Process.astro";
import Contact from "@components/sections/Contact.astro";
---

<BaseLayout>
  <Hero />
  <Services />
  <Portfolio />      <!-- NEW: After Services -->
  <Team />
  <Testimonials />   <!-- NEW: After Team -->
  <EquityModel />
  <Process />
  <Contact />
</BaseLayout>
```

**2. Translation File (i18n/ui.ts)**

New keys needed in both `en` and `es` objects:

```typescript
// Portfolio section
"portfolio.title": "Our Work",
"portfolio.subtitle": "Companies we've helped build",
"portfolio.project1.name": "Company Name",
"portfolio.project1.category": "FinTech",
"portfolio.project1.description": "Brief description of what we built",
"portfolio.project1.result": "2x revenue in 6 months",
"portfolio.viewCase": "View Case Study",

// Testimonials section
"testimonials.title": "What Founders Say",
"testimonials.quote1.text": "Full testimonial quote...",
"testimonials.quote1.author": "Founder Name",
"testimonials.quote1.role": "CEO, Company",
"testimonials.readMore": "Read more",
"testimonials.readLess": "Read less",
```

---

## Recommended Page Flow

### Option A: Trust-Building Progression (Recommended)

```
Hero           - Hook + CTA
Services       - What we do
Portfolio      - PROOF we can do it (social proof #1)
Team           - WHO does it
Testimonials   - Others VOUCH for us (social proof #2)
EquityModel    - HOW we partner
Process        - HOW to start
Contact        - Final CTA
```

**Rationale:**
- Portfolio after Services: "Here's what we do, and here's proof"
- Testimonials after Team: "Meet us, and hear from others who worked with us"
- Builds credibility progressively before asking for commitment

### Option B: Grouped Social Proof

```
Hero → Services → Team → EquityModel → Process → Portfolio → Testimonials → Contact
```

**Rationale:** All social proof together at end, before final CTA

**Recommendation:** Option A. Progressive trust-building matches the conversion psychology of B2B landing pages.

---

## Component Architecture Details

### Portfolio.astro

**Structure (following Services.astro pattern):**

```astro
---
import { getLangFromUrl, useTranslations } from '@i18n/utils';
import PortfolioCard from '../PortfolioCard.astro';

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);

const projects = [
  { key: 'project1', logo: '/images/portfolio/logo1.svg' },
  { key: 'project2', logo: '/images/portfolio/logo2.svg' },
  { key: 'project3', logo: '/images/portfolio/logo3.svg' },
];
---

<section id="portfolio" class="py-16 sm:py-20 lg:py-24 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-3xl sm:text-4xl font-bold text-black text-center mb-4">
      {t('portfolio.title')}
    </h2>
    <p class="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
      {t('portfolio.subtitle')}
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <PortfolioCard
          name={t(`portfolio.${project.key}.name` as any)}
          category={t(`portfolio.${project.key}.category` as any)}
          description={t(`portfolio.${project.key}.description` as any)}
          result={t(`portfolio.${project.key}.result` as any)}
          logo={project.logo}
        />
      ))}
    </div>
  </div>
</section>
```

**Background:** `bg-gray-50` (following alternation pattern: Services=white, Portfolio=gray-50)

### PortfolioCard.astro

**Structure (following ServiceCard.astro pattern):**

```astro
---
export interface Props {
  name: string;
  category: string;
  description: string;
  result: string;
  logo: string;
}

const { name, category, description, result, logo } = Astro.props;
---

<div class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
  <!-- Company logo -->
  <img
    src={logo}
    alt={name}
    class="h-8 w-auto mb-4"
    loading="lazy"
  />

  <!-- Category badge -->
  <span class="text-xs font-medium text-gray-500 uppercase tracking-wider">
    {category}
  </span>

  <!-- Company name -->
  <h3 class="text-lg font-semibold text-black mt-2 mb-2">
    {name}
  </h3>

  <!-- Description -->
  <p class="text-gray-600 text-sm leading-relaxed mb-4">
    {description}
  </p>

  <!-- Result highlight -->
  <div class="pt-4 border-t border-gray-100">
    <p class="text-sm font-medium text-black">
      {result}
    </p>
  </div>
</div>
```

### Testimonials.astro

**Structure (logo wall + expandable quotes):**

```astro
---
import { getLangFromUrl, useTranslations } from '@i18n/utils';
import LogoWall from '../LogoWall.astro';
import TestimonialQuote from '../TestimonialQuote.astro';

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);

const quotes = [
  { key: 'quote1' },
  { key: 'quote2' },
  { key: 'quote3' },
];

const logos = [
  { name: 'Company 1', src: '/images/logos/logo1.svg' },
  { name: 'Company 2', src: '/images/logos/logo2.svg' },
  // ...
];
---

<section id="testimonials" class="py-16 sm:py-20 lg:py-24 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-3xl sm:text-4xl font-bold text-black text-center mb-12">
      {t('testimonials.title')}
    </h2>

    <!-- Logo wall -->
    <LogoWall logos={logos} />

    <!-- Testimonial quotes -->
    <div class="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {quotes.map((quote) => (
        <TestimonialQuote
          text={t(`testimonials.${quote.key}.text` as any)}
          author={t(`testimonials.${quote.key}.author` as any)}
          role={t(`testimonials.${quote.key}.role` as any)}
        />
      ))}
    </div>
  </div>
</section>
```

**Background:** `bg-white` (Team=gray-50, so Testimonials=white)

### TestimonialQuote.astro

**Two options for expandable quotes:**

**Option A: CSS-only (no JS, recommended for simplicity)**

```astro
---
export interface Props {
  text: string;
  author: string;
  role: string;
}

const { text, author, role } = Astro.props;
const isLong = text.length > 200;
---

<div class="bg-gray-50 rounded-lg p-6">
  <!-- Quote text -->
  <blockquote class="text-gray-700 leading-relaxed mb-4">
    <span class="text-2xl text-gray-300 font-serif">"</span>
    {isLong ? (
      <details>
        <summary class="cursor-pointer">
          {text.slice(0, 150)}...
        </summary>
        <p class="mt-2">{text}</p>
      </details>
    ) : (
      <p>{text}</p>
    )}
  </blockquote>

  <!-- Attribution -->
  <div class="flex items-center">
    <div>
      <p class="font-semibold text-black">{author}</p>
      <p class="text-sm text-gray-500">{role}</p>
    </div>
  </div>
</div>
```

**Option B: With minimal JS for smooth animation**

If smooth expand/collapse animation is required, use `<details>` with CSS transitions or a small inline script. Given the project's zero-JS-by-default philosophy, Option A is recommended.

### LogoWall.astro

```astro
---
export interface Props {
  logos: Array<{ name: string; src: string }>;
}

const { logos } = Astro.props;
---

<div class="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
  {logos.map((logo) => (
    <img
      src={logo.src}
      alt={logo.name}
      class="h-8 w-auto grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
      loading="lazy"
    />
  ))}
</div>
```

**Design notes:**
- Grayscale + opacity for subtle, non-distracting appearance
- Hover reveals full color
- Matches black/white/gray brand aesthetic

---

## Data Flow

### Translation Flow (unchanged)

```
ui.ts translations → useTranslations(lang) → t('key') → Static HTML at build
```

### Image Flow

```
/public/images/portfolio/*.svg   → PortfolioCard logo prop
/public/images/logos/*.svg       → LogoWall logos prop
```

**Image recommendations:**
- SVG for logos (scalable, small file size)
- PNG/WebP fallback if SVG not available
- Use `loading="lazy"` for below-fold images
- Explicit width/height or CSS constraints to prevent CLS

---

## Build Order

### Recommended Implementation Sequence

```
1. Portfolio Section (no dependencies beyond existing patterns)
   ├── Create PortfolioCard.astro
   ├── Create sections/Portfolio.astro
   ├── Add translation keys to ui.ts
   ├── Add placeholder images to /public/images/portfolio/
   └── Update en/index.astro and es/index.astro

2. Testimonials Section (no dependencies beyond existing patterns)
   ├── Create LogoWall.astro
   ├── Create TestimonialQuote.astro
   ├── Create sections/Testimonials.astro
   ├── Add translation keys to ui.ts
   ├── Add placeholder logos to /public/images/logos/
   └── Update en/index.astro and es/index.astro

3. Content Population (parallel with above or after)
   ├── Replace placeholder portfolio data
   ├── Replace placeholder testimonial data
   └── Replace placeholder logos with real client logos
```

### Parallel Work Opportunities

- PortfolioCard and TestimonialQuote can be built in parallel
- Both sections can be developed independently
- Translation keys for both can be added in one batch

---

## Integration Checklist

### Files to Create

- [ ] `src/components/PortfolioCard.astro`
- [ ] `src/components/sections/Portfolio.astro`
- [ ] `src/components/LogoWall.astro`
- [ ] `src/components/TestimonialQuote.astro`
- [ ] `src/components/sections/Testimonials.astro`

### Files to Modify

- [ ] `src/i18n/ui.ts` - Add portfolio.* and testimonials.* keys (en + es)
- [ ] `src/pages/en/index.astro` - Import and add Portfolio, Testimonials
- [ ] `src/pages/es/index.astro` - Import and add Portfolio, Testimonials

### Assets to Add

- [ ] `/public/images/portfolio/` - Case study logos (SVG preferred)
- [ ] `/public/images/logos/` - Client logo wall images (SVG preferred)

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Client-Side Data Fetching

**What:** Using fetch or API to load portfolio/testimonials data
**Why bad:** Adds latency, defeats SSG, unnecessary complexity
**Instead:** Static data in component or ui.ts translations

### Anti-Pattern 2: Complex Expand/Collapse JS

**What:** Custom React-like state management for testimonial expansion
**Why bad:** Adds JS bundle size, contrary to zero-JS philosophy
**Instead:** Use native `<details>/<summary>` with CSS styling

### Anti-Pattern 3: External Logo Hosting

**What:** Loading client logos from external CDN or API
**Why bad:** Third-party dependency, potential slow loading, privacy
**Instead:** Self-host logos in `/public/images/logos/`

### Anti-Pattern 4: Breaking Background Alternation

**What:** Using same background color for adjacent sections
**Why bad:** Visual monotony, harder to distinguish sections
**Instead:** Maintain white/gray-50 alternation pattern

---

## Performance Considerations

### Image Optimization

| Image Type | Format | Size | Loading |
|------------|--------|------|---------|
| Client logos | SVG | < 5KB each | lazy |
| Portfolio logos | SVG | < 10KB each | lazy |
| Case study screenshots (if any) | WebP | < 100KB | lazy |

### Section Impact

Both sections are below-fold, so:
- All images can use `loading="lazy"`
- No impact on LCP (hero image remains LCP element)
- Minimal impact on total page weight if logos are SVG

### Zero JavaScript Maintained

Neither section requires JavaScript if:
- Testimonial expansion uses `<details>` element
- No interactive filtering/carousel for portfolio
- Logo hover effects are CSS-only

---

## Sources

### Primary Source (HIGH confidence)
- **Existing codebase analysis:** All patterns derived from `src/components/sections/*.astro` and `src/i18n/ui.ts`

### Astro Patterns (HIGH confidence)
- Astro component composition follows existing project conventions
- No external documentation needed; patterns are established in codebase

---

## Summary for Roadmap Creation

**New components:** 5 (PortfolioCard, Portfolio, LogoWall, TestimonialQuote, Testimonials)

**Modified files:** 3 (ui.ts, en/index.astro, es/index.astro)

**Build order:**
1. Portfolio section (standalone)
2. Testimonials section (standalone)
3. Both can be built in parallel

**Page placement:**
- Portfolio: After Services, before Team
- Testimonials: After Team, before EquityModel

**JavaScript requirement:** None (zero-JS sections)

**Performance impact:** Minimal (SVG logos, lazy loading, below-fold content)
