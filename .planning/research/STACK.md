# Technology Stack

**Project:** Whiteboard Landing Page (LatAm Venture Tech Partner)
**Researched:** 2026-01-20
**Overall Confidence:** HIGH

---

## Executive Summary

For a high-conversion, bilingual landing page with Calendly integration, **Astro** is the clear choice over Next.js. The project requirements (static content, minimal interactivity, performance-critical) align perfectly with Astro's architecture: zero JavaScript by default, excellent Core Web Vitals, and native i18n support.

The stack prioritizes:
- **Performance**: Sub-3s load times via static HTML + minimal JS
- **Conversion**: Clean analytics + session replay for optimization
- **Simplicity**: No backend complexity, pure JAMstack
- **Compliance**: GDPR-friendly analytics for LatAm + EU reach

---

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Confidence |
|------------|---------|---------|------------|
| **Astro** | ^5.16+ (or ^6.0 when stable) | Static site framework | HIGH |
| **TypeScript** | ^5.5 | Type safety | HIGH |
| **Vite** | ^6.0 | Build tooling (included with Astro) | HIGH |

**Why Astro over Next.js:**

1. **Performance**: Astro ships ~40% faster with ~90% less JavaScript than comparable Next.js setups ([Aalpha](https://www.aalpha.net/blog/astro-vs-nextjs-comparison/), [Contentful](https://www.contentful.com/blog/astro-next-js-compared/))
2. **Zero JS by default**: Landing pages need content, not hydration overhead
3. **Built-in i18n**: Native routing for `/es/` and `/en/` without additional libraries
4. **Island architecture**: Calendly widget hydrates independently, rest stays static
5. **Simpler mental model**: No SSR/SSG/ISR decisions for a static marketing site

**What NOT to use:**
- **Next.js**: Overkill for static content. Adds bundle bloat from hydration logic even on static routes. Reserve for apps needing dynamic data, authentication, or server components.
- **Gatsby**: Ecosystem has contracted. Build times and plugin ecosystem lag behind Astro.
- **Pure HTML/CSS**: Loses TypeScript benefits, i18n tooling, and component reusability.

### Styling

| Technology | Version | Purpose | Confidence |
|------------|---------|---------|------------|
| **Tailwind CSS** | ^4.1+ | Utility-first styling | HIGH |

**Why Tailwind CSS v4:**

1. **Performance**: Full builds 5x faster, incremental builds 100x faster (microseconds) ([Tailwind Blog](https://tailwindcss.com/blog/tailwindcss-v4))
2. **Modern CSS**: Built on cascade layers, `@property`, `color-mix()`
3. **Zero config**: Automatic content detection, no `tailwind.config.js` needed
4. **First-party Vite plugin**: Tight integration with Astro's build system
5. **Perfect for bold/minimal**: Easy to implement black/white/gray geometric design

**What NOT to use:**
- **CSS-in-JS (styled-components, Emotion)**: Adds runtime overhead, breaks Astro's zero-JS default
- **CSS Modules**: More boilerplate, less utility for rapid iteration
- **Sass/Less**: Unnecessary complexity when Tailwind handles design tokens

**Browser Support Note:** Tailwind v4 requires Safari 16.4+, Chrome 111+, Firefox 128+. For older browser support, use Tailwind v3.4.

### Internationalization (i18n)

| Technology | Version | Purpose | Confidence |
|------------|---------|---------|------------|
| **Astro i18n (built-in)** | Native | Route-based locale handling | HIGH |
| **Custom UI translations** | - | Simple JSON/TS translation files | HIGH |

**Configuration:**
```typescript
// astro.config.mjs
export default defineConfig({
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: false // /about (en), /es/about (es)
    }
  }
});
```

**Why built-in i18n:**

1. **Native support**: Astro 5+ has robust i18n routing built-in ([Astro Docs](https://docs.astro.build/en/guides/internationalization/))
2. **URL structure**: Clean `/es/` prefix for Spanish, no prefix for English
3. **Helper functions**: `getRelativeLocaleUrl()` for programmatic links
4. **Browser detection**: `Astro.preferredLocale` for automatic language detection
5. **No extra dependencies**: Simpler than next-intl or react-i18next

**What NOT to use:**
- **next-intl**: Next.js-specific, not compatible with Astro
- **i18next**: Heavyweight for static site with 2 languages
- **Separate codebases**: Maintenance nightmare, defeats purpose of framework

**File Structure:**
```
src/pages/
  index.astro          # English homepage
  es/index.astro       # Spanish homepage
src/i18n/
  ui.ts                # Translation strings
  utils.ts             # Helper functions
```

### Analytics & Tracking

| Technology | Version | Purpose | Confidence |
|------------|---------|---------|------------|
| **Plausible Analytics** | Cloud | Privacy-first web analytics | HIGH |
| **Vercel Analytics** | Built-in | Performance + Web Vitals | MEDIUM |

**Why Plausible:**

1. **GDPR compliant by default**: No cookie banner required, no personal data collected ([Plausible](https://plausible.io))
2. **EU-hosted**: All traffic routes through EU servers - important for LatAm/EU reach
3. **Lightweight**: ~1KB script vs Google Analytics bloat
4. **Goal tracking**: Track Calendly button clicks, form submissions
5. **Simple pricing**: $9/month for <10K pageviews (perfect for landing page)

**Why NOT Google Analytics:**
- GDPR compliance issues: Multiple EU DPAs have ruled GA violates privacy regulations ([Matomo](https://matomo.org/blog/2026/01/privacy-regulations-changes-2026-analytics/))
- Requires cookie consent banner (friction before user even sees content)
- Heavy script impacts Core Web Vitals
- Data goes to Google, not you

**Alternative (Budget/Self-hosted):**
| Technology | Purpose | When to Use |
|------------|---------|-------------|
| **Umami** | Self-hosted analytics | If you want free + data ownership |

Umami is fully open-source with free cloud tier (1M events/month) ([Umami](https://umami.is)). Uses Postgres, ~2KB script.

### CRO / Session Recording (Optional - Phase 2)

| Technology | Purpose | Confidence |
|------------|---------|------------|
| **Microsoft Clarity** | Free heatmaps + session replay | HIGH |
| **PostHog** | All-in-one product analytics | MEDIUM |

**Why Microsoft Clarity:**

1. **Completely free**: No traffic limits, no hidden costs ([Microsoft Clarity](https://clarity.microsoft.com))
2. **Heatmaps + recordings**: See exactly where users click, scroll, drop off
3. **AI-powered insights**: Copilot summarizes issues automatically
4. **GDPR compliant**: Microsoft handles compliance
5. **Lightweight**: Minimal performance impact

**Why NOT Hotjar:**
- Expensive at scale (session limits on free tier)
- Clarity offers equivalent features for free

**PostHog Alternative:** If you want A/B testing, feature flags, and analytics in one platform. Free tier: 5,000 replays, 1M events/month ([PostHog](https://posthog.com)).

### Calendly Integration

| Technology | Version | Purpose | Confidence |
|------------|---------|---------|------------|
| **react-calendly** | ^4.x | React component for Calendly embed | HIGH |
| **@astrojs/react** | ^4.x | React integration for Astro | HIGH |

**Implementation:**
```tsx
// src/components/BookingWidget.tsx
import { InlineWidget, useCalendlyEventListener } from "react-calendly";

export default function BookingWidget() {
  useCalendlyEventListener({
    onEventScheduled: (e) => {
      // Track conversion in Plausible
      window.plausible?.("Calendly Booking", {
        props: { eventType: e.data.payload.event_type.name }
      });
    }
  });

  return (
    <InlineWidget
      url="https://calendly.com/whiteboard/30min"
      styles={{ height: "700px" }}
    />
  );
}
```

**Usage in Astro:**
```astro
---
import BookingWidget from "../components/BookingWidget";
---
<BookingWidget client:visible />
```

**Why react-calendly:**
- Official React components ([npm](https://www.npmjs.com/package/react-calendly))
- Event listeners for conversion tracking
- Multiple embed styles (inline, popup, widget)
- Type-safe with TypeScript

**Alternative (Simpler):**
For basic embed without conversion tracking, use vanilla Calendly script:
```html
<div class="calendly-inline-widget" data-url="https://calendly.com/whiteboard/30min"></div>
<script src="https://assets.calendly.com/assets/external/widget.js" async></script>
```

### Form Handling (Contact/Lead Capture)

| Technology | Purpose | Confidence |
|------------|---------|------------|
| **Web3Forms** | Form backend (free tier) | HIGH |

**Why Web3Forms:**

1. **No backend required**: Perfect for static site ([Web3Forms](https://web3forms.com))
2. **Free tier**: 250 submissions/month (sufficient for landing page)
3. **Direct to email**: Submissions go straight to inbox
4. **Spam protection**: Built-in honeypot + reCAPTCHA optional
5. **Simple setup**: Just add form action URL

**Implementation:**
```html
<form action="https://api.web3forms.com/submit" method="POST">
  <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY" />
  <input type="text" name="name" required />
  <input type="email" name="email" required />
  <textarea name="message"></textarea>
  <button type="submit">Send</button>
</form>
```

**Alternatives:**
| Service | When to Use |
|---------|-------------|
| **Formspree** | Need file uploads, more integrations |
| **Netlify Forms** | Already on Netlify hosting |

### Hosting & Deployment

| Technology | Purpose | Confidence |
|------------|---------|------------|
| **Vercel** | Static hosting + edge CDN | HIGH |

**Why Vercel:**

1. **Zero config for Astro**: Auto-detects and optimizes ([Vercel Docs](https://vercel.com/docs/frameworks/frontend/astro))
2. **Global edge network**: Fast loads worldwide (critical for LatAm)
3. **Built-in analytics**: Web Vitals monitoring included
4. **Preview deployments**: Every PR gets a preview URL
5. **Free tier sufficient**: 100GB bandwidth for static landing page

**Configuration:**
```javascript
// astro.config.mjs
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";

export default defineConfig({
  output: "static",
  adapter: vercel({
    webAnalytics: { enabled: true }
  })
});
```

**What NOT to use:**
- **Vercel SSR adapter**: Unnecessary for static landing page
- **AWS/GCP**: Overkill complexity for single landing page

**Alternatives:**
| Platform | When to Use |
|----------|-------------|
| **Cloudflare Pages** | Need unlimited bandwidth (free), global edge |
| **Netlify** | Prefer Netlify Forms, simpler dashboard |

**Note:** Vercel free tier prohibits commercial use. If this becomes revenue-generating beyond lead capture, consider Cloudflare Pages (unlimited bandwidth, commercial allowed) or Vercel Pro.

---

## v1.1 Stack Additions: Portfolio and Testimonials

**Key Finding: No new dependencies required.**

The existing stack (Astro 5.x, Tailwind CSS v4, TypeScript) provides all capabilities needed for portfolio and testimonials sections.

### Portfolio Section Stack

| Need | Solution | Library Required |
|------|----------|------------------|
| Project images | Astro `<Image />` component | None (built-in) |
| Responsive images | Astro layout prop | None (built-in) |
| Image optimization | Astro assets pipeline | None (built-in) |
| Grid layout | Tailwind CSS grid utilities | None (existing) |
| Hover effects | Tailwind CSS filter/transition | None (existing) |

**Implementation:**
```astro
---
import { Image } from 'astro:assets';
import projectImage from '../assets/images/portfolio/project-1.png';
---

<Image
  src={projectImage}
  alt="Project description"
  class="w-full h-auto"
/>
```

### Logo Wall Stack

| Need | Solution | Library Required |
|------|----------|------------------|
| Client logos | Astro `<Image />` component | None (built-in) |
| Grayscale effect | Tailwind `grayscale` utility | None (existing) |
| Color on hover | Tailwind `hover:grayscale-0` | None (existing) |
| Smooth transition | Tailwind `transition duration-300` | None (existing) |

**Implementation:**
```astro
<img
  src={logo.src}
  alt={logo.alt}
  class="grayscale hover:grayscale-0 transition duration-300"
/>
```

### Expandable Testimonials Stack

| Need | Solution | Library Required |
|------|----------|------------------|
| Expand/collapse | HTML `<details>`/`<summary>` | None (native HTML) |
| Exclusive accordion | `name` attribute on details | None (native HTML) |
| Smooth animation | CSS Grid `grid-template-rows` | None (CSS-only) |
| Accessible by default | Native details semantics | None (built-in a11y) |

**Implementation:**
```astro
<details name="testimonials" class="group">
  <summary class="cursor-pointer">
    "{testimonial.shortQuote}..."
  </summary>
  <div class="overflow-hidden">
    <p>{testimonial.fullQuote}</p>
  </div>
</details>
```

**Why native `<details>` over JavaScript accordion:**
- Zero JavaScript shipped to client (Astro philosophy)
- Built-in accessibility (keyboard navigation, ARIA)
- Browser-native exclusive accordion via `name` attribute (2025+ browser support)
- CSS-animatable with modern techniques
- No hydration cost

### What NOT to Add for v1.1

#### Do NOT add: Carousel/slider library

| Library | Why NOT |
|---------|---------|
| Swiper | Portfolio carousels have poor UX and conversion metrics |
| Splide | Users prefer grid layouts where all items are visible |
| Embla | Static grids outperform carousels for portfolios |

**Research finding:** "A grid of thumbs is far more effective to show a portfolio than a carousel. Carousels remove content from view, which kills conversion."

**Alternative:** Use a responsive CSS grid showing 2-4 portfolio items.

#### Do NOT add: Animation library

| Library | Why NOT |
|---------|---------|
| Framer Motion | Requires React, breaks Astro zero-JS model |
| GSAP | Overkill for simple hover/transition effects |
| AOS | Adds unnecessary JS for scroll animations |

**Alternative:** Tailwind CSS v4 provides all needed utilities for transitions and hover effects.

#### Do NOT add: Image optimization library

| Library | Why NOT |
|---------|---------|
| Sharp (standalone) | Astro already uses Sharp internally |
| @unpic/astro | Astro's built-in Image handles this |

**Alternative:** Use Astro's built-in `<Image />` and `<Picture />` components.

#### Do NOT add: Testimonial widget/embed

| Service | Why NOT |
|---------|---------|
| Trustpilot widget | Adds external JS, privacy concerns |
| Review.io embed | External dependency, styling mismatch |

**Alternative:** Static testimonials in the i18n translation file.

---

## Complete Dependency List

### Production Dependencies
```bash
npm install astro @astrojs/react @astrojs/tailwind react react-dom react-calendly
```

### Dev Dependencies
```bash
npm install -D typescript @types/react @types/react-dom tailwindcss
```

### External Services (No npm packages)
- Plausible Analytics (script tag)
- Microsoft Clarity (script tag)
- Web3Forms (form action URL)
- Vercel (deployment platform)

---

## Version Pinning Strategy

| Package | Pin Strategy | Reason |
|---------|--------------|--------|
| `astro` | `^5.16` | Minor updates safe, major may break |
| `tailwindcss` | `^4.1` | v4 is stable, auto-updates fine |
| `react` | `^19.0` | Needed for react-calendly |
| `react-calendly` | `^4.0` | Check changelog before major updates |

---

## Anti-Patterns to Avoid

### 1. Over-engineering

**DON'T:**
- Add Redux/Zustand for state management (landing page has no state)
- Use a headless CMS for 2 pages of content
- Add authentication/user accounts
- Build a custom booking system instead of Calendly

**DO:**
- Keep content in `.astro` files directly
- Use Calendly's proven booking flow
- Focus engineering time on conversion optimization

### 2. Performance Killers

**DON'T:**
- Import full icon libraries (use individual SVGs)
- Add hero video that autoplays
- Use CSS-in-JS runtime
- Load fonts from Google Fonts (self-host instead)

**DO:**
- Inline critical CSS
- Lazy load below-fold images
- Use `client:visible` for Calendly widget
- Preload hero image

### 3. Analytics Overload

**DON'T:**
- Add Google Analytics + Hotjar + Mixpanel + Heap
- Track every micro-interaction
- Require cookie consent for basic analytics

**DO:**
- Start with Plausible (privacy-first, lightweight)
- Add Clarity later if you need heatmaps
- Track 3-5 key conversions (CTA clicks, form submit, booking complete)

---

## File Structure for v1.1 Content

```
src/
  assets/
    images/
      portfolio/           # NEW: Project screenshots
        project-1.png
        project-2.png
      logos/               # NEW: Client/partner logos
        client-1.svg       # Prefer SVG for logos
        client-2.svg
  components/
    sections/
      Portfolio.astro      # NEW: Portfolio grid section
      Testimonials.astro   # NEW: Testimonials section
    PortfolioCard.astro    # NEW: Individual portfolio item
    TestimonialCard.astro  # NEW: Individual testimonial
  i18n/
    ui.ts                  # ADD: portfolio.*, testimonials.* keys
```

---

## Sources

### HIGH Confidence (Official Documentation)
- [Astro Images Guide](https://docs.astro.build/en/guides/images/) - Built-in image optimization
- [Astro Assets API](https://docs.astro.build/en/reference/modules/astro-assets/) - Image component reference
- [Tailwind CSS Grayscale](https://tailwindcss.com/docs/filter-grayscale) - Filter utilities
- [Tailwind CSS Transitions](https://tailwindcss.com/docs/transition-property) - Transition utilities
- [Astro Documentation - i18n](https://docs.astro.build/en/guides/internationalization/)
- [Astro Documentation - Vercel Deployment](https://docs.astro.build/en/guides/deploy/vercel/)
- [Tailwind CSS v4 Blog Post](https://tailwindcss.com/blog/tailwindcss-v4)
- [Calendly React Guide](https://help.calendly.com/hc/en-us/articles/31644195810199-How-to-embed-Calendly-in-a-React-app)

### MEDIUM Confidence (Verified Cross-Sources)
- [MDN - Exclusive Accordions](https://developer.mozilla.org/en-US/blog/html-details-exclusive-accordions/) - Native HTML accordion with `name` attribute
- [Chrome for Developers - Exclusive Accordion](https://developer.chrome.com/docs/css-ui/exclusive-accordion) - Browser support
- [CXL - Image Sliders](https://cxl.com/blog/dont-use-automatic-image-sliders-or-carousels/) - Why carousels hurt conversion
- [VWO - Image Slider Alternatives](https://vwo.com/blog/image-slider-alternatives/) - Portfolio grid best practices
- [UX Planet - Testimonial Best Practices](https://uxplanet.org/15-testimonial-examples-and-best-practices-for-your-website-9f5dd3efab5a) - Testimonial design patterns

### LOW Confidence (Single Source / Unverified)
- Specific version numbers should be verified at install time via npm

---

## Quick Start

```bash
# Create new Astro project
npm create astro@latest whiteboard-landing

# Add integrations
npx astro add react tailwind vercel

# Install Calendly
npm install react-calendly

# Configure i18n in astro.config.mjs
# Add Plausible script to Layout
# Deploy to Vercel
```
