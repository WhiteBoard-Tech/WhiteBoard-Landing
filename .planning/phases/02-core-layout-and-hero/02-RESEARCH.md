# Phase 2: Core Layout and Hero - Research

**Researched:** 2026-01-20
**Domain:** Astro components, hero sections, i18n layouts, image optimization, CRO copy
**Confidence:** HIGH

## Summary

This phase delivers the site shell (header, footer, navigation) and the primary conversion point (hero section). The research covers six key areas: Astro hero section patterns with i18n, smooth scroll navigation, logo integration, secondary CTA design, LCP optimization for hero images, and copy patterns for Whiteboard's equity-for-product model.

The existing foundation (Astro 5.16.11, Tailwind v4, URL-based i18n with `/en/` and `/es/` routing, TypeScript translations in `ui.ts`) provides a solid base. The key implementation challenges are: (1) handling Spanish text expansion without layout breakage, (2) achieving optimal LCP with hero graphics, and (3) creating a CTA hierarchy that maintains single-CTA discipline while providing a secondary path.

**Primary recommendation:** Build the hero as an Astro component using flexible layouts (CSS Grid/Flexbox with `min-content`/`auto` sizing) to accommodate Spanish text expansion, use the `<Image />` component with `priority` attribute for hero graphics, and design the secondary CTA as a text link or ghost button visually subordinate to the primary CTA.

## Standard Stack

The established libraries/tools for this phase:

### Core (Already Installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro | 5.16.11 | Static site framework | Zero-JS-by-default, built-in i18n, Image component |
| Tailwind CSS | 4.1.18 | Styling | CSS-first config already set up in global.css |
| @fontsource-variable/inter | 5.2.8 | Typography | Already loaded, variable weights for hierarchy |

### No Additional Libraries Needed
This phase requires no additional npm packages. Astro 5's built-in features cover all requirements:
- `astro:assets` for image optimization (built-in)
- CSS `scroll-behavior: smooth` for navigation (native CSS)
- Existing i18n utilities in `src/i18n/utils.ts`

**Installation:** None required.

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/
│   ├── Header.astro          # Full header with logo + nav
│   ├── Footer.astro          # Footer with links + copyright
│   ├── Hero.astro            # Hero section component
│   ├── Logo.astro            # Inline SVG logo component
│   ├── LanguageSwitcher.astro # (existing)
│   └── CTAButton.astro       # Reusable CTA with variants
├── layouts/
│   └── BaseLayout.astro      # Update with new header/footer
├── i18n/
│   ├── ui.ts                 # Add hero translations
│   └── utils.ts              # (existing)
├── assets/
│   └── images/
│       └── hero-graphic.webp # Optimized hero image
└── pages/
    ├── en/index.astro        # Update with Hero
    └── es/index.astro        # Update with Hero
```

### Pattern 1: Inline SVG Logo Component
**What:** Create a dedicated Logo.astro component with the SVG inlined for full styling control and accessibility.
**When to use:** Always for the primary logo - it's used once per page and benefits from CSS customization.
**Example:**
```astro
---
// src/components/Logo.astro
interface Props {
  class?: string;
  size?: 'sm' | 'md' | 'lg';
}

const { class: className = '', size = 'md' } = Astro.props;

const sizes = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
};
---

<svg
  class:list={[sizes[size], className]}
  viewBox="0 0 40 40"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  role="img"
  aria-labelledby="logo-title"
>
  <title id="logo-title">Whiteboard</title>
  <!-- Angular W mark with wing-like geometry -->
  <path
    d="M4 8L12 32L20 16L28 32L36 8"
    stroke="currentColor"
    stroke-width="3"
    stroke-linecap="round"
    stroke-linejoin="round"
    fill="none"
  />
</svg>
```
**Source:** [Creating Accessible SVGs - Deque](https://www.deque.com/blog/creating-accessible-svgs/)

### Pattern 2: Flexible Hero Layout for i18n Text Expansion
**What:** Use CSS Grid with `minmax()` and flexible sizing to handle Spanish text that can be 20-30% longer than English.
**When to use:** All hero sections with translated content.
**Example:**
```astro
---
// src/components/Hero.astro
import { Image } from 'astro:assets';
import { getLangFromUrl, useTranslations } from '@i18n/utils';
import CTAButton from './CTAButton.astro';

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
---

<section class="min-h-[calc(100vh-4rem)] flex items-center px-4 sm:px-6 lg:px-8 py-12 lg:py-0">
  <div class="max-w-7xl mx-auto w-full">
    <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      <!-- Text content - flexible container -->
      <div class="max-w-xl lg:max-w-none">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-black leading-tight">
          {t('hero.headline')}
        </h1>

        <p class="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed">
          {t('hero.subheadline')}
        </p>

        <div class="mt-10 flex flex-col sm:flex-row gap-4 sm:items-center">
          <!-- Primary CTA -->
          <CTAButton href="#contact" variant="primary">
            {t('hero.cta.primary')}
          </CTAButton>

          <!-- Secondary CTA - visually subordinate -->
          <a
            href="#video"
            class="text-gray-600 hover:text-black transition-colors duration-200 text-sm font-medium inline-flex items-center gap-2"
          >
            <span>{t('hero.cta.secondary')}</span>
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </a>
        </div>
      </div>

      <!-- Hero graphic -->
      <div class="lg:order-last">
        <slot name="graphic" />
      </div>
    </div>
  </div>
</section>
```
**Source:** [web.dev Internationalization](https://web.dev/learn/design/internationalization)

### Pattern 3: CSS-Only Smooth Scroll Navigation
**What:** Use native CSS `scroll-behavior: smooth` with `scroll-margin-top` to account for fixed header.
**When to use:** All anchor link navigation.
**Example:**
```css
/* Already in global.css */
html {
  scroll-behavior: smooth;
}

/* Add to sections that will be scrolled to */
section[id] {
  scroll-margin-top: 5rem; /* 80px to account for fixed header */
}
```
**Source:** [Go Make Things - Smooth scrolling links with only CSS](https://gomakethings.com/smooth-scrolling-links-with-only-css/)

### Pattern 4: CTA Button Hierarchy Component
**What:** Create a reusable CTA component with primary/secondary variants for consistent styling.
**When to use:** All call-to-action buttons across the site.
**Example:**
```astro
---
// src/components/CTAButton.astro
interface Props {
  href: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  class?: string;
}

const { href, variant = 'primary', class: className = '' } = Astro.props;

const baseStyles = 'inline-flex items-center justify-center font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black';

const variants = {
  primary: 'px-8 py-4 text-base text-white bg-black rounded hover:bg-gray-800',
  secondary: 'px-8 py-4 text-base text-black bg-transparent border-2 border-black rounded hover:bg-gray-100',
  ghost: 'px-4 py-2 text-sm text-gray-600 hover:text-black',
};
---

<a href={href} class:list={[baseStyles, variants[variant], className]}>
  <slot />
</a>
```

### Anti-Patterns to Avoid
- **Hardcoded text widths:** Never use fixed `width` or `max-width` on text containers that will be translated. Spanish typically expands 20-30% compared to English.
- **Multiple competing CTAs:** Avoid having more than one visually prominent CTA in the hero. Secondary actions must be clearly subordinate.
- **Lazy loading hero images:** Never use `loading="lazy"` on above-the-fold images - it hurts LCP.
- **JavaScript for smooth scroll:** CSS `scroll-behavior: smooth` has 95%+ browser support and ships zero JavaScript.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image optimization | Manual compression, srcset generation | Astro `<Image />` component | Automatic format conversion, responsive images, CLS prevention |
| Smooth scrolling | JavaScript scroll animation | CSS `scroll-behavior: smooth` | Native, zero-JS, 95%+ browser support |
| Text expansion handling | Fixed containers with overflow | Flexbox/Grid with flexible sizing | Automatic reflow, no manual breakpoints |
| SVG accessibility | Manual ARIA attributes | Inline SVG with `<title>` + `role="img"` | Consistent screen reader support |

**Key insight:** Astro 5's built-in Image component handles responsive images, format conversion (WebP/AVIF), and CLS prevention automatically. There's no need for external image optimization libraries.

## Common Pitfalls

### Pitfall 1: Hero Image Blocking LCP
**What goes wrong:** Hero image loads slowly, causing poor Core Web Vitals scores (LCP > 2.5s).
**Why it happens:** Default lazy loading, missing preload hints, or unoptimized image formats.
**How to avoid:** Use Astro's `<Image />` component with `priority` attribute, which automatically sets `loading="eager"`, `decoding="sync"`, and `fetchpriority="high"`.
**Warning signs:** LCP > 2.5s in Lighthouse, hero image visibly loading after page content.

### Pitfall 2: Spanish Text Breaking Layout
**What goes wrong:** Headlines wrap unexpectedly or overflow containers when language is switched to Spanish.
**Why it happens:** Fixed container widths, insufficient padding, or non-flexible layouts.
**How to avoid:**
- Use `max-w-xl` or similar flexible containers
- Test with Spanish text during development
- Use `leading-tight` or `leading-snug` for headlines to handle multi-line wrapping gracefully
- Plan for 30% text expansion from English to Spanish
**Warning signs:** Text truncation, horizontal scrollbars, inconsistent spacing between languages.

### Pitfall 3: Secondary CTA Competing with Primary
**What goes wrong:** Users experience decision fatigue, primary conversion rate drops.
**Why it happens:** Secondary CTA is styled too prominently (same button style as primary).
**How to avoid:** Secondary CTA should be either:
- A text link (no button styling)
- A ghost/outline button with less visual weight
- Positioned slightly below or after the primary CTA
**Warning signs:** Click rate on secondary CTA approaching or exceeding primary CTA rate.

### Pitfall 4: Fixed Header Covering Scroll Targets
**What goes wrong:** When clicking anchor links, the section title is hidden under the fixed header.
**Why it happens:** Missing `scroll-margin-top` on target sections.
**How to avoid:** Add `scroll-margin-top: 5rem` (or header height + padding) to all `section[id]` elements.
**Warning signs:** Section headings not visible after clicking anchor navigation.

### Pitfall 5: Logo Without Proper Accessibility
**What goes wrong:** Screen readers announce nothing or announce "image" without context.
**Why it happens:** SVG missing `role="img"`, `<title>`, or `aria-labelledby`.
**How to avoid:** Always include `role="img"` and a `<title>` element with unique ID referenced by `aria-labelledby`.
**Warning signs:** Accessibility audits flagging missing alt text, screen reader announcing nothing for logo.

## Code Examples

Verified patterns from official sources:

### Hero Image with Priority Loading
```astro
---
// Source: https://docs.astro.build/en/reference/modules/astro-assets/
import { Image } from 'astro:assets';
import heroImage from '../assets/images/hero-graphic.webp';
---

<Image
  src={heroImage}
  alt="Tech partnership illustration"
  priority
  class="w-full h-auto"
/>
```
The `priority` attribute automatically sets:
- `loading="eager"`
- `decoding="sync"`
- `fetchpriority="high"`

### Translation Strings Structure for Hero
```typescript
// src/i18n/ui.ts - Add these keys
export const ui = {
  en: {
    // ... existing keys

    // Hero section
    'hero.headline': 'Your Tech Co-Founder',
    'hero.subheadline': 'We build your product for equity. No hourly rates. No endless invoices. Just aligned incentives and real outcomes.',
    'hero.cta.primary': 'Book a 30-min Call',
    'hero.cta.secondary': 'Watch How It Works',

    // Footer
    'footer.copyright': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
  },
  es: {
    // ... existing keys

    // Hero section
    'hero.headline': 'Tu Socio Tecnologico',
    'hero.subheadline': 'Construimos tu producto a cambio de equity. Sin tarifas por hora. Sin facturas interminables. Solo incentivos alineados y resultados reales.',
    'hero.cta.primary': 'Agenda una Llamada de 30 min',
    'hero.cta.secondary': 'Mira Como Funciona',

    // Footer
    'footer.copyright': 'Todos los derechos reservados.',
    'footer.privacy': 'Politica de Privacidad',
    'footer.terms': 'Terminos de Servicio',
  },
} as const;
```

### Minimal Footer with Accessibility
```astro
---
// src/components/Footer.astro
import { getLangFromUrl, useTranslations } from '@i18n/utils';

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
const currentYear = new Date().getFullYear();
---

<footer class="border-t border-gray-100 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
      <p class="text-sm text-gray-500">
        &copy; {currentYear} Whiteboard. {t('footer.copyright')}
      </p>

      <nav class="flex gap-6" aria-label="Footer navigation">
        <a
          href={`/${lang}/privacy`}
          class="text-sm text-gray-500 hover:text-black transition-colors"
        >
          {t('footer.privacy')}
        </a>
        <a
          href={`/${lang}/terms`}
          class="text-sm text-gray-500 hover:text-black transition-colors"
        >
          {t('footer.terms')}
        </a>
      </nav>
    </div>
  </div>
</footer>
```

### Updated Header with Logo
```astro
---
// src/components/Header.astro
import Logo from './Logo.astro';
import LanguageSwitcher from './LanguageSwitcher.astro';
import { getLangFromUrl } from '@i18n/utils';

const lang = getLangFromUrl(Astro.url);
---

<header class="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-100">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <a href={`/${lang}/`} class="flex items-center gap-2 group" aria-label="Whiteboard - Home">
        <Logo size="md" class="text-black" />
        <span class="text-xl font-bold tracking-tight text-black">
          Whiteboard
        </span>
      </a>

      <LanguageSwitcher />
    </div>
  </div>
</header>
```

## Copy Recommendations for Hero Section

Based on Whiteboard's positioning ("no vendemos horas; construimos activos") and CRO principles from the brief:

### Value Proposition Framework (Hormozi Value Equation)
- **Dream Outcome:** Launch your tech product with a real technical co-founder
- **Perceived Likelihood:** We have skin in the game (equity alignment)
- **Time Delay:** Fast - MVP timeline measured in weeks, not months
- **Effort/Sacrifice:** Low - We handle the build, you focus on business

### Headline Options (A/B Test Candidates)

**English:**
1. "Your Tech Co-Founder" (short, direct, relationship-focused)
2. "We Build. You Own." (action-oriented, ownership clear)
3. "Tech Partnership, Not Vendor Lock-In" (differentiator-focused)

**Spanish:**
1. "Tu Socio Tecnologico" (direct translation of #1)
2. "Construimos. Tu Creas." (builds/create play on words)
3. "Tecnologia con Incentivos Alineados" (aligned incentives focus)

### Subheadline Structure
Follow the pattern: **What we do** + **How it's different** + **Why it matters to you**

**English:**
"We build your product for equity. No hourly rates. No endless invoices. Just aligned incentives and real outcomes."

**Spanish:**
"Construimos tu producto a cambio de equity. Sin tarifas por hora. Sin facturas interminables. Solo incentivos alineados y resultados reales."

### Primary CTA Copy
Include specific duration to reduce perceived commitment:
- "Book a 30-min Call" / "Agenda una Llamada de 30 min"
- NOT "Schedule a Call" (too vague, higher perceived commitment)

### Secondary CTA Copy
Lower commitment, builds understanding:
- "Watch How It Works" / "Mira Como Funciona"
- "See Our Process" / "Conoce Nuestro Proceso"

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| JavaScript smooth scroll libraries | CSS `scroll-behavior: smooth` | 2020+ (95%+ support) | Zero JS, native performance |
| Manual image optimization | Astro `<Image />` with `priority` | Astro 3.0+ (2023) | Automatic WebP/AVIF, responsive |
| `@astrojs/tailwind` integration | `@tailwindcss/vite` plugin | Tailwind v4 (2024) | CSS-first config, better performance |
| Separate responsive image libraries | Astro 5.10 responsive images | Jan 2025 | Built-in srcset/sizes generation |

**Deprecated/outdated:**
- `@astrojs/tailwind`: Use `@tailwindcss/vite` directly (already implemented in Phase 1)
- JavaScript smooth scroll libraries: CSS native is sufficient
- External image optimization (Sharp manual usage): Astro Image handles this

## Open Questions

Things that couldn't be fully resolved:

1. **Exact hero graphic/illustration**
   - What we know: Should be optimized WebP/AVIF, above-fold with `priority`
   - What's unclear: The actual visual asset (illustration, abstract graphic, or photo)
   - Recommendation: Create placeholder, design asset separately, optimize before adding

2. **Video for secondary CTA**
   - What we know: Secondary CTA references "Watch How It Works"
   - What's unclear: Whether video exists, hosting solution (YouTube embed, self-hosted, Loom)
   - Recommendation: Link to placeholder anchor initially, add video in later phase

3. **Additional footer links**
   - What we know: Copyright + Privacy Policy + Terms mentioned
   - What's unclear: Whether these pages exist, additional links needed (LinkedIn, etc.)
   - Recommendation: Implement minimal footer now, add links as pages are created

## Sources

### Primary (HIGH confidence)
- [Astro Image and Assets API Reference](https://docs.astro.build/en/reference/modules/astro-assets/) - priority attribute, Image component
- [Astro Images Guide](https://docs.astro.build/en/guides/images/) - responsive images, format support
- [Astro Internationalization Guide](https://docs.astro.build/en/guides/internationalization/) - i18n routing patterns

### Secondary (MEDIUM confidence)
- [Deque - Creating Accessible SVGs](https://www.deque.com/blog/creating-accessible-svgs/) - SVG accessibility patterns
- [Go Make Things - Smooth scrolling with CSS](https://gomakethings.com/smooth-scrolling-links-with-only-css/) - CSS scroll-behavior
- [web.dev - Internationalization](https://web.dev/learn/design/internationalization) - text expansion handling
- [Prismic - Website Hero Section Best Practices](https://prismic.io/blog/website-hero-section) - CTA hierarchy
- [NerdCow - CTA Hierarchy](https://nerdcow.co.uk/blog/cta-hierarchy/) - primary vs secondary CTA design
- [Eleken - Footer UX Patterns](https://www.eleken.co/blog-posts/footer-ux) - minimal footer design

### Tertiary (LOW confidence)
- Whiteboard Playbook PDF - brand voice, equity model messaging (internal document)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All built-in Astro features, no new dependencies
- Architecture patterns: HIGH - Official Astro patterns, verified CSS standards
- Pitfalls: HIGH - Well-documented web performance and i18n issues
- Copy recommendations: MEDIUM - Based on CRO principles + internal playbook, not A/B tested

**Research date:** 2026-01-20
**Valid until:** 2026-02-20 (30 days - stable stack, no breaking changes expected)
