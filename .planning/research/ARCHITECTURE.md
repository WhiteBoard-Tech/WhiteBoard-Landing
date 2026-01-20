# Architecture Patterns

**Domain:** High-performance bilingual landing page
**Project:** Whiteboard Venture Tech Partner Landing
**Researched:** 2026-01-20
**Overall Confidence:** HIGH (verified with official docs + multiple sources)

---

## Executive Summary

A bilingual landing page for a tech venture studio requires: static site generation for performance, URL-based i18n routing for SEO, component-based architecture for maintainability, and lazy-loaded Calendly integration for conversion. The architecture prioritizes Core Web Vitals (LCP < 2.5s, CLS < 0.1, INP < 200ms) while maintaining clean component boundaries.

---

## Recommended Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         BUILD TIME (SSG)                            │
│  ┌───────────────┐    ┌───────────────┐    ┌───────────────┐       │
│  │ /es/page.tsx  │    │ /en/page.tsx  │    │  Static HTML  │       │
│  │ (Spanish)     │───▶│ (English)     │───▶│  /out folder  │       │
│  └───────────────┘    └───────────────┘    └───────────────┘       │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         RUNTIME (CDN)                               │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │                     Edge / CDN Layer                          │ │
│  │  • Locale detection (Accept-Language header)                  │ │
│  │  • Static asset serving                                       │ │
│  │  • Cache headers (max-age: 31536000 for assets)              │ │
│  └───────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    CLIENT (Hydration Minimal)                       │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐     │
│  │ Language Toggle │  │ Calendly Popup  │  │ Analytics       │     │
│  │ (client)        │  │ (lazy, on-demand)│  │ (defer)         │     │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Component Architecture

### Component Hierarchy

```
app/
├── [locale]/                    # Dynamic segment for i18n
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Landing page
│   └── not-found.tsx           # 404 page (localized)
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Logo + LanguageToggle + Nav
│   │   ├── Footer.tsx          # Links + Legal + Socials
│   │   └── LanguageToggle.tsx  # ES/EN switcher (client)
│   ├── sections/
│   │   ├── Hero.tsx            # Main value prop + CTA
│   │   ├── Services.tsx        # What Whiteboard does
│   │   ├── Portfolio.tsx       # Past work / logos
│   │   ├── Team.tsx            # Key people (optional)
│   │   └── Contact.tsx         # CTA + Calendly trigger
│   ├── ui/
│   │   ├── Button.tsx          # Geometric, minimal style
│   │   ├── Card.tsx            # Service/portfolio cards
│   │   └── Container.tsx       # Max-width wrapper
│   └── integrations/
│       ├── CalendlyPopup.tsx   # Lazy-loaded Calendly (client)
│       └── Analytics.tsx       # GA4 / privacy-first (client)
├── i18n/
│   ├── routing.ts              # next-intl routing config
│   ├── navigation.ts           # Locale-aware Link, useRouter
│   └── request.ts              # Server-side locale handling
├── messages/
│   ├── en.json                 # English translations
│   └── es.json                 # Spanish translations
└── public/
    ├── fonts/                  # Self-hosted WOFF2 fonts
    └── images/                 # Optimized static images
```

### Component Boundaries

| Component | Type | Responsibility | Dependencies |
|-----------|------|----------------|--------------|
| `[locale]/layout.tsx` | Server | Locale provider, metadata, fonts | i18n/routing |
| `[locale]/page.tsx` | Server | Page composition, static params | All sections |
| `Header` | Server | Logo, navigation links | LanguageToggle |
| `LanguageToggle` | Client | Language switching UI | i18n/navigation |
| `Hero` | Server | Value proposition, primary CTA | Button |
| `Services` | Server | Service offerings grid | Card |
| `Portfolio` | Server | Client logos, case studies | next/image |
| `Contact` | Server | Secondary CTA container | CalendlyPopup |
| `CalendlyPopup` | Client | Calendly widget (lazy) | Calendly SDK |
| `Footer` | Server | Links, legal, socials | LanguageToggle |
| `Analytics` | Client | Event tracking | GA4 / Plausible |

### Server vs Client Component Strategy

**Server Components (Default):**
- All section components (Hero, Services, Portfolio, Contact)
- Layout components (Header, Footer)
- Static content rendering
- No JavaScript shipped to client

**Client Components (Explicit `'use client'`):**
- `LanguageToggle` - Needs `useRouter` for navigation
- `CalendlyPopup` - Loads Calendly SDK on interaction
- `Analytics` - Event handlers for tracking

**Rationale:** Minimize client-side JavaScript. Only components requiring interactivity are client components. This maximizes SSG benefits and Core Web Vitals scores.

---

## Data Flow

### Translation Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                      BUILD TIME                                     │
│                                                                     │
│  messages/en.json ─┐                                                │
│                    ├─▶ next-intl ─▶ Static HTML with translations   │
│  messages/es.json ─┘      │                                        │
│                           │                                        │
│              ┌────────────┴────────────┐                          │
│              │                         │                          │
│              ▼                         ▼                          │
│       /en/index.html            /es/index.html                    │
│       (English content)          (Spanish content)                 │
└─────────────────────────────────────────────────────────────────────┘
```

### Language Switching Flow

```
User clicks "ES" toggle
        │
        ▼
LanguageToggle (client component)
        │
        ├─▶ useRouter().replace() with new locale
        │
        ▼
Browser navigation to /es/* (pre-built static page)
        │
        ▼
CDN serves pre-rendered Spanish HTML (no server processing)
```

### Calendly Integration Flow

```
Page loads (no Calendly script)
        │
        ▼
User clicks "Schedule a Call" button
        │
        ▼
CalendlyPopup component:
  1. Dynamically imports Calendly SDK
  2. Calls Calendly.initPopupWidget()
  3. Opens popup overlay
        │
        ▼
User completes booking in Calendly iframe
        │
        ▼
Calendly fires postMessage event
        │
        ▼
CalendlyPopup listens, fires analytics event
```

### Analytics Flow

```
Page loads
        │
        ▼
Analytics component (deferred script)
        │
        ├─▶ Checks for consent (if GDPR required)
        │
        ▼
pageview event fires
        │
        ▼
User interactions:
  - CTA clicks → trackEvent('cta_click', {location: 'hero'})
  - Language switch → trackEvent('language_change', {to: 'es'})
  - Calendly open → trackEvent('calendly_open')
  - Calendly complete → trackEvent('calendly_scheduled')
```

---

## i18n Architecture

### Recommended Pattern: URL-Based Routing with next-intl

**Confidence: HIGH** (verified with [next-intl official docs](https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing))

```
URL Structure:
  /en          → English homepage
  /es          → Spanish homepage
  /en/about    → English about (if needed)
  /es/about    → Spanish about (if needed)
```

**Why URL-based over cookie/detection:**
1. **SEO:** Search engines index both language versions separately
2. **Shareability:** URLs can be shared in correct language
3. **SSG Compatible:** Each locale generates its own static HTML
4. **No JavaScript Required:** Works without client hydration

### Configuration

**i18n/routing.ts:**
```typescript
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'es'],
  defaultLocale: 'es',  // LatAm audience primary
  localePrefix: 'always'  // /es and /en always in URL
});
```

**middleware.ts (or proxy.ts in Next.js 16+):**
```typescript
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(en|es)/:path*']
};
```

### Static Generation with i18n

**[locale]/page.tsx:**
```typescript
import { setRequestLocale } from 'next-intl/server';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }];
}

export default async function HomePage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  setRequestLocale(locale);  // Required for static rendering

  return (
    <>
      <Hero />
      <Services />
      <Portfolio />
      <Contact />
    </>
  );
}
```

### Translation File Structure

**messages/en.json:**
```json
{
  "Hero": {
    "headline": "Build What Matters",
    "subheadline": "We partner with founders to build category-defining tech companies in Latin America",
    "cta": "Schedule a Call"
  },
  "Services": {
    "title": "What We Do",
    "items": [...]
  }
}
```

**messages/es.json:**
```json
{
  "Hero": {
    "headline": "Construye Lo Que Importa",
    "subheadline": "Nos asociamos con fundadores para construir empresas tecnologicas que definen categorias en America Latina",
    "cta": "Agenda una Llamada"
  }
}
```

---

## Rendering Strategy

### Static Site Generation (SSG)

**Confidence: HIGH** (verified with [Next.js official docs](https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation))

**Recommendation:** Full SSG with static export

**Rationale:**
- No dynamic content (no user accounts, no real-time data)
- Maximum performance (HTML served from CDN edge)
- Simplest deployment (any static host)
- Best Core Web Vitals scores

**next.config.js:**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Full static export
  images: {
    unoptimized: true  // Required for static export
    // OR use a third-party image CDN
  }
};
```

### Alternative: Vercel Deployment

If deploying to Vercel, can keep dynamic image optimization:

```javascript
const nextConfig = {
  // No 'output: export' - Vercel handles this
  images: {
    formats: ['image/avif', 'image/webp'],
  }
};
```

---

## Image Optimization Strategy

### Approach Overview

| Scenario | Strategy |
|----------|----------|
| Static export to any host | Pre-optimize images at build, use `unoptimized: true` |
| Vercel deployment | Use Next.js Image with automatic optimization |
| Either | Self-host optimized WebP/AVIF with explicit dimensions |

### Component Pattern

```typescript
// For hero image (LCP candidate)
<Image
  src="/images/hero.webp"
  alt="Whiteboard team collaborating"
  width={1200}
  height={630}
  priority  // Preload, no lazy loading
  sizes="100vw"
  className="..."
/>

// For below-fold images
<Image
  src="/images/portfolio-1.webp"
  alt="Portfolio project screenshot"
  width={600}
  height={400}
  // Default: lazy loading
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."  // Tiny base64
/>
```

### Pre-Optimization Workflow (Static Export)

```bash
# At build time, optimize images to multiple sizes
# Use sharp or squoosh CLI

# Generate:
# - hero.webp (1200w, 800w, 400w)
# - portfolio-1.webp (600w, 300w)
# - team-member.webp (200w, 100w)
```

### Responsive Image Pattern

```typescript
// Manual srcSet for static export
<picture>
  <source
    srcSet="/images/hero-400.webp 400w, /images/hero-800.webp 800w, /images/hero-1200.webp 1200w"
    sizes="100vw"
    type="image/webp"
  />
  <img
    src="/images/hero-800.jpg"
    alt="Hero image"
    width={1200}
    height={630}
  />
</picture>
```

---

## Font Loading Strategy

### Recommended Approach

**Confidence: HIGH** (verified with multiple authoritative sources)

**Strategy:** Self-hosted WOFF2 + `font-display: swap` + preload critical fonts

### Implementation

**app/[locale]/layout.tsx:**
```typescript
import { Geist, Geist_Mono } from 'next/font/google';
// OR self-hosted:
import localFont from 'next/font/local';

const geist = localFont({
  src: [
    { path: '../public/fonts/Geist-Regular.woff2', weight: '400' },
    { path: '../public/fonts/Geist-Medium.woff2', weight: '500' },
    { path: '../public/fonts/Geist-Bold.woff2', weight: '700' },
  ],
  display: 'swap',  // Prevents FOIT
  preload: true,
  variable: '--font-geist',
});
```

### Fallback Matching

**global.css:**
```css
:root {
  --font-geist: 'Geist', ui-sans-serif, system-ui, sans-serif;
}

/* Minimize CLS with size-adjust */
@font-face {
  font-family: 'Geist Fallback';
  src: local('Arial');
  size-adjust: 100.5%;
  ascent-override: 95%;
  descent-override: 22%;
  line-gap-override: 0%;
}
```

### Font Subset (If Using Non-Latin Characters)

For Spanish, standard Latin subset is sufficient. No additional subsetting needed.

---

## Calendly Integration Architecture

### Recommended Pattern: Lazy-Loaded Popup Widget

**Confidence: HIGH** (verified with [Calendly community](https://community.calendly.com/how-do-i-40/how-to-embed-calendly-on-my-website-without-slowing-down-page-load-times-3039) and [optimization guides](https://www.corewebvitals.io/pagespeed/speed-up-calendly-integration))

**Why Popup over Inline:**
- **Performance:** No Calendly scripts load on initial page load
- **CLS:** No layout shifts from iframe resizing
- **Focus:** Clear call-to-action, not buried in page content
- **Mobile:** Better UX than scrolling inline embed

### Component Implementation

**components/integrations/CalendlyPopup.tsx:**
```typescript
'use client';

import { useCallback, useEffect } from 'react';

interface CalendlyPopupProps {
  url: string;
  prefill?: {
    name?: string;
    email?: string;
  };
  onScheduled?: () => void;
}

export function CalendlyPopup({ url, prefill, onScheduled }: CalendlyPopupProps) {
  const openCalendly = useCallback(async () => {
    // Dynamic import - only loads when user clicks
    const { initPopupWidget, closePopupWidget } = await import('calendly-widget');

    initPopupWidget({
      url: url,
      prefill: prefill,
      pageSettings: {
        backgroundColor: 'ffffff',
        hideEventTypeDetails: false,
        hideLandingPageDetails: false,
        primaryColor: '000000',  // Match black/white theme
        textColor: '000000'
      }
    });
  }, [url, prefill]);

  // Listen for scheduling completion
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data.event === 'calendly.event_scheduled') {
        onScheduled?.();
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onScheduled]);

  return { openCalendly };
}
```

### Usage in Contact Section

```typescript
// components/sections/Contact.tsx
import { CalendlyPopup } from '../integrations/CalendlyPopup';

export function Contact() {
  const t = useTranslations('Contact');
  const calendly = CalendlyPopup({
    url: 'https://calendly.com/whiteboard/30min',
    onScheduled: () => {
      // Fire analytics event
      trackEvent('calendly_scheduled');
    }
  });

  return (
    <section id="contact">
      <h2>{t('title')}</h2>
      <Button onClick={calendly.openCalendly}>
        {t('cta')}
      </Button>
    </section>
  );
}
```

### Alternative: Simple Link

If Calendly popup complexity isn't worth it:

```typescript
<Button asChild>
  <a href="https://calendly.com/whiteboard/30min" target="_blank" rel="noopener">
    {t('cta')}
  </a>
</Button>
```

Trade-off: User leaves site, but zero performance impact.

---

## Analytics Integration Points

### Recommended Stack

| Tool | Purpose | Privacy | Cost |
|------|---------|---------|------|
| **Plausible** (recommended) | Page views, events | GDPR-compliant, cookieless | ~$9/mo |
| **GA4** (alternative) | Full analytics suite | Requires consent banner | Free |
| **Vercel Analytics** (if on Vercel) | Core Web Vitals | Privacy-focused | Free tier |

### Integration Pattern

**components/integrations/Analytics.tsx:**
```typescript
'use client';

import Script from 'next/script';

export function Analytics() {
  return (
    <>
      {/* Plausible - cookieless, no consent needed */}
      <Script
        defer
        data-domain="whiteboard.vc"
        src="https://plausible.io/js/script.js"
        strategy="afterInteractive"
      />
    </>
  );
}
```

### Event Tracking Points

| Event | Trigger | Data |
|-------|---------|------|
| `pageview` | Page load | `{ locale, page }` |
| `cta_click` | Any CTA button | `{ location: 'hero' | 'nav' | 'footer' }` |
| `language_switch` | Toggle click | `{ from, to }` |
| `calendly_open` | Popup opened | `{}` |
| `calendly_scheduled` | Booking complete | `{}` |
| `external_link` | Outbound click | `{ url }` |

### Custom Event Helper

```typescript
// lib/analytics.ts
export function trackEvent(name: string, props?: Record<string, string>) {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible(name, { props });
  }
}
```

---

## Core Web Vitals Optimization

### Target Metrics

| Metric | Target | Strategy |
|--------|--------|----------|
| **LCP** | < 2.5s | Preload hero image, inline critical CSS, SSG |
| **CLS** | < 0.1 | Explicit image dimensions, font-display: swap, no layout shifts |
| **INP** | < 200ms | Minimal JS, defer non-critical, lazy load Calendly |

### LCP Optimization Checklist

- [ ] Hero image has `priority` prop (or preload link)
- [ ] Critical CSS inlined (Next.js does this automatically)
- [ ] Fonts preloaded
- [ ] No render-blocking JavaScript
- [ ] TTFB < 800ms (CDN deployment)

### CLS Prevention Checklist

- [ ] All images have explicit width/height
- [ ] Font fallback metrics matched
- [ ] No dynamically injected content above fold
- [ ] Calendly in popup (not inline embed)
- [ ] Language toggle doesn't shift layout

### INP Optimization Checklist

- [ ] Calendly SDK loaded only on interaction
- [ ] Analytics script deferred
- [ ] No long JavaScript tasks on main thread
- [ ] Minimal client components

---

## Build Order Dependencies

### Phase Dependency Graph

```
┌─────────────────────────────────────────────────────────────────────┐
│ Phase 1: Foundation                                                 │
│ ┌─────────────┐    ┌─────────────┐    ┌─────────────┐              │
│ │ Next.js     │───▶│ next-intl   │───▶│ Tailwind    │              │
│ │ project init│    │ setup       │    │ config      │              │
│ └─────────────┘    └─────────────┘    └─────────────┘              │
│                                                                     │
│ Outputs: Working dev server, routing, basic styling                 │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│ Phase 2: Core Layout                                                │
│ ┌─────────────┐    ┌─────────────┐    ┌─────────────┐              │
│ │ Root Layout │───▶│ Header      │───▶│ Footer      │              │
│ │ + fonts     │    │ + nav       │    │ + links     │              │
│ └─────────────┘    └─────────────┘    └─────────────┘              │
│                           │                                         │
│                           ▼                                         │
│                    ┌─────────────┐                                  │
│                    │ Language    │                                  │
│                    │ Toggle      │                                  │
│                    └─────────────┘                                  │
│                                                                     │
│ Outputs: Site shell, navigation working in both languages           │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│ Phase 3: Content Sections                                           │
│ ┌─────────────┐    ┌─────────────┐    ┌─────────────┐              │
│ │ Hero        │───▶│ Services    │───▶│ Portfolio   │              │
│ │ section     │    │ section     │    │ section     │              │
│ └─────────────┘    └─────────────┘    └─────────────┘              │
│                                                                     │
│ Outputs: Main page content, translations, responsive design         │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│ Phase 4: Integrations                                               │
│ ┌─────────────┐    ┌─────────────┐    ┌─────────────┐              │
│ │ Contact     │───▶│ Calendly    │───▶│ Analytics   │              │
│ │ section     │    │ popup       │    │ integration │              │
│ └─────────────┘    └─────────────┘    └─────────────┘              │
│                                                                     │
│ Outputs: Booking flow working, events tracked                       │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│ Phase 5: Performance & Polish                                       │
│ ┌─────────────┐    ┌─────────────┐    ┌─────────────┐              │
│ │ Image       │───▶│ Lighthouse  │───▶│ Static      │              │
│ │ optimization│    │ audit       │    │ export      │              │
│ └─────────────┘    └─────────────┘    └─────────────┘              │
│                                                                     │
│ Outputs: < 3s load, passing Core Web Vitals, deployable build       │
└─────────────────────────────────────────────────────────────────────┘
```

### Critical Path

1. **i18n before content** - Routing structure determines file organization
2. **Layout before sections** - Header/Footer needed for all pages
3. **Sections before integrations** - Contact section contains Calendly trigger
4. **Content before performance** - Can't optimize what doesn't exist

### Parallel Work Opportunities

- **Phase 2:** Header and Footer can be built in parallel
- **Phase 3:** All sections can be built in parallel (no dependencies between them)
- **Phase 4:** Calendly and Analytics can be built in parallel

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Inline Calendly Embed

**What:** Embedding Calendly directly in page HTML with iframe
**Why bad:**
- Adds 370ms+ render-blocking time
- Causes CLS from iframe resizing
- Loads external scripts on every page view
**Instead:** Use popup widget, loaded only on user interaction

### Anti-Pattern 2: Client-Side Translation Loading

**What:** Loading translations via API call on page load
**Why bad:**
- Adds network round-trip
- Shows loading state or wrong language briefly
- Defeats SSG benefits
**Instead:** Build separate static pages for each locale

### Anti-Pattern 3: Cookie-Based Language Detection

**What:** Using cookies to remember language preference
**Why bad:**
- SEO: Search engines see one language
- Shareability: Links don't preserve language
- Complexity: Need middleware for every request
**Instead:** URL-based routing with `/en/` and `/es/` prefixes

### Anti-Pattern 4: Large Hero Image Without Priority

**What:** Hero image loads lazily like other images
**Why bad:**
- LCP element loads too late
- Poor Core Web Vitals scores
**Instead:** Add `priority` prop to hero image, preload in `<head>`

### Anti-Pattern 5: Google Fonts CDN Without Preconnect

**What:** Loading fonts from fonts.googleapis.com without optimization
**Why bad:**
- DNS lookup + connection adds latency
- Render-blocking if not properly handled
**Instead:** Self-host fonts OR add preconnect + dns-prefetch hints

### Anti-Pattern 6: All Client Components

**What:** Marking every component with `'use client'`
**Why bad:**
- Ships unnecessary JavaScript
- Loses SSG benefits
- Slower initial load, worse INP
**Instead:** Default to Server Components, client only when needed

---

## Scalability Considerations

| Concern | Current (MVP) | 10K monthly visitors | 100K+ visitors |
|---------|---------------|----------------------|----------------|
| **Hosting** | Any static host | CDN with multiple PoPs | Global CDN (Vercel, Cloudflare) |
| **Images** | Pre-optimized WebP | Image CDN (Cloudinary, imgix) | Same |
| **Analytics** | Plausible | Same | Consider self-hosted |
| **i18n** | 2 locales | Same architecture | Add more locales to array |
| **Content** | Hardcoded JSON | Consider CMS | Headless CMS (Contentful, Sanity) |

For a landing page at this scale, the architecture supports growth without changes. CMS integration is the main upgrade path if content updates become frequent.

---

## Sources

### Official Documentation (HIGH confidence)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Next.js Static Site Generation](https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation)
- [next-intl App Router Setup](https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing)
- [next-intl Routing Configuration](https://next-intl.dev/docs/routing/configuration)

### Verified Community Sources (MEDIUM confidence)
- [Calendly Embed Optimization](https://community.calendly.com/how-do-i-40/how-to-embed-calendly-on-my-website-without-slowing-down-page-load-times-3039)
- [Calendly Embed Options](https://help.calendly.com/hc/en-us/articles/223147027-Embed-options-overview)
- [Core Web Vitals 2026 Guide](https://senorit.de/en/blog/core-web-vitals-2026)
- [Font Loading Strategies](https://www.zachleat.com/web/comprehensive-webfonts)
- [Next.js Image Optimization Guide](https://www.debugbear.com/blog/nextjs-image-optimization)

### Industry Best Practices (MEDIUM confidence)
- [SaaS Landing Page Trends 2026](https://www.saasframe.io/blog/10-saas-landing-page-trends-for-2026-with-real-examples)
- [Static Site Generators Comparison](https://kinsta.com/blog/static-site-generator/)
- [React i18n Patterns](https://www.creolestudios.com/react-i18next-simplifying-internationalization-in-react/)
- [GA4 Privacy Features](https://madhawks.com/blog/mastering-the-new-era-of-web-analytics-a-guide-to-ga4/)
