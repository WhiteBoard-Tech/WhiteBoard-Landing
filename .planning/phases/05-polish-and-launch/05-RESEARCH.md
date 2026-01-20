# Phase 5: Polish and Launch - Research

**Researched:** 2026-01-20
**Domain:** Performance optimization (Core Web Vitals) and Vercel deployment
**Confidence:** HIGH

## Summary

This research covers everything needed to optimize the Whiteboard landing page for Core Web Vitals targets (Lighthouse 90+, LCP < 2.5s, CLS < 0.1) and deploy to Vercel. The site is already well-architected with Astro's zero-JS-by-default approach and minimal client-side JavaScript (only Calendly lazy-loading and analytics).

Key findings: The site architecture is already optimized for performance. The main optimization opportunities are image handling (converting hero SVG placeholder to optimized format if real images exist), ensuring explicit dimensions on all media, and verifying font loading. For deployment, Vercel auto-detects Astro and requires no adapter for static sites. Accept-Language redirect needs edge middleware since Astro's `preferredLocale` only works at request time (SSR).

**Primary recommendation:** Focus on measurement first (Lighthouse audit), then targeted fixes for any failing metrics. The site's minimal JavaScript footprint means LCP and CLS are the primary concerns, not INP.

## Standard Stack

The established tools for performance optimization and deployment:

### Core (Already in project)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro | 5.16.11 | Zero-JS static site generator | Built-in image optimization, automatic tree-shaking |
| Tailwind CSS | 4.1.18 | CSS framework | Automatic purging of unused styles |
| @fontsource-variable/inter | 5.2.8 | Self-hosted variable font | Eliminates external font request |

### Performance Analysis (Add for this phase)
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| rollup-plugin-visualizer | 6.0.5 | Bundle analysis | One-time analysis to verify no bloat |
| lighthouse | CLI | Performance auditing | Measure Core Web Vitals |

### Deployment
| Tool | Purpose | Notes |
|------|---------|-------|
| Vercel | Hosting platform | Auto-detects Astro, no adapter needed for static |
| @astrojs/vercel | Vercel adapter | Only needed if using edge middleware for Accept-Language |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Vercel edge middleware | vercel.json redirects | Static redirects can't detect Accept-Language header |
| rollup-plugin-visualizer | Sonda | Sonda is more comprehensive but overkill for this project |
| Lighthouse CLI | PageSpeed Insights web UI | CLI enables CI integration but web UI is simpler for manual checks |

**Installation (if needed):**
```bash
# For bundle analysis (dev dependency, run once)
npm install --save-dev rollup-plugin-visualizer

# For Lighthouse CLI testing
npm install -g lighthouse

# For Accept-Language redirect (only if implementing edge middleware)
npx astro add vercel
```

## Architecture Patterns

### Current Project Structure (Already Optimal)
```
src/
├── components/         # Astro components (zero JS)
├── layouts/            # BaseLayout with optimized head
├── pages/              # /en/ and /es/ routes
├── scripts/            # Minimal JS (calendly.ts, analytics.ts)
├── i18n/               # Translation utilities
└── styles/             # Tailwind CSS entry
public/
├── favicon.svg         # Static assets
└── images/             # Unoptimized images (move to src/assets)
```

### Pattern 1: Astro Image Component for Optimization
**What:** Use `<Image>` or `<Picture>` from `astro:assets` for automatic WebP/AVIF conversion
**When to use:** Any raster image (PNG, JPG) that needs optimization
**Example:**
```astro
---
// Source: https://docs.astro.build/en/guides/images/
import { Image, Picture } from 'astro:assets';
import heroImage from '../assets/hero.png';
---

<!-- Single optimized format -->
<Image src={heroImage} alt="Hero description" />

<!-- Multiple formats with fallback -->
<Picture
  src={heroImage}
  formats={['avif', 'webp']}
  alt="Hero description"
  width={800}
  height={600}
/>
```

### Pattern 2: Explicit Dimensions for CLS Prevention
**What:** Always include width and height attributes on images
**When to use:** Every `<img>` tag, whether native or Astro component
**Example:**
```astro
<!-- Current hero (already correct) -->
<img
  src="/images/hero-placeholder.svg"
  alt="Tech partnership illustration"
  width="400"
  height="300"
  loading="eager"
  fetchpriority="high"
/>
```

### Pattern 3: Static Export with Edge Middleware for i18n
**What:** Use Vercel adapter with edgeMiddleware for Accept-Language detection
**When to use:** When root URL needs to redirect based on browser language
**Example:**
```javascript
// astro.config.mjs
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'static',
  adapter: vercel({
    edgeMiddleware: true,
  }),
  // ... rest of config
});
```

```typescript
// src/middleware.ts
import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);

  // Only redirect root path
  if (url.pathname === '/') {
    const acceptLanguage = context.request.headers.get('accept-language') || '';
    const preferredLocale = acceptLanguage.toLowerCase().includes('es') ? 'es' : 'en';
    return context.redirect(`/${preferredLocale}/`, 302);
  }

  return next();
});
```

### Anti-Patterns to Avoid
- **Lazy-loading LCP image:** The hero image uses `loading="eager"` correctly; never lazy-load above-the-fold images
- **Missing image dimensions:** Causes CLS; always specify width/height
- **Over-optimization:** Stop at Lighthouse 90+; diminishing returns beyond
- **Complex JS frameworks:** The site correctly uses zero client-side framework code

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image optimization | Custom resize/convert scripts | Astro Image component | Handles format negotiation, srcset, responsive sizing |
| CSS purging | Manual class cleanup | Tailwind's built-in purge | Automatic, configured by default |
| Bundle analysis | Manual dependency auditing | rollup-plugin-visualizer | Visual treemap shows exactly what's included |
| Performance measurement | Manual timing code | Lighthouse CLI | Industry-standard metrics, consistent methodology |
| Font optimization | Custom font subsetting | @fontsource-variable | Pre-optimized variable fonts, self-hosted |

**Key insight:** Astro and Tailwind already handle 90% of optimization automatically. The main task is verification, not implementation.

## Common Pitfalls

### Pitfall 1: Images in public/ vs src/assets/
**What goes wrong:** Images in `public/` are served as-is without optimization
**Why it happens:** Developers place images in `public/` for simpler paths
**How to avoid:** Move images to `src/assets/` and import them for Astro optimization
**Warning signs:** Large PNG/JPG files visible in network waterfall

### Pitfall 2: Font Flash (FOUT/FOIT)
**What goes wrong:** Text invisible or flashes during font load, causing CLS
**Why it happens:** Font not preloaded or font-display not set
**How to avoid:** Use `font-display: swap` (Fontsource does this by default) and consider `<link rel="preload">` for critical fonts
**Warning signs:** CLS spikes at page load, text reflow visible

### Pitfall 3: Accept-Language Detection in Static Sites
**What goes wrong:** Browser language preference ignored, users always get default locale
**Why it happens:** Static sites can't read request headers at runtime
**How to avoid:** Use Vercel edge middleware or accept that users may need to switch manually
**Warning signs:** Spanish-speaking users landing on English page

### Pitfall 4: Lighthouse Score Variability
**What goes wrong:** Scores fluctuate between runs, causing confusion
**Why it happens:** Network throttling, CPU throttling, cache state all affect results
**How to avoid:** Run multiple times (3-5), use consistent environment, test in incognito
**Warning signs:** Scores varying by 10+ points between runs

### Pitfall 5: Environment Variables Not Set in Production
**What goes wrong:** Calendly URL hardcoded or broken in production
**Why it happens:** Dev environment differs from production, env vars not configured
**How to avoid:** Use import.meta.env, set vars in Vercel dashboard, verify in preview deploy
**Warning signs:** Calendly popup fails to load in production

## Code Examples

Verified patterns from official sources:

### Bundle Analysis Configuration
```javascript
// astro.config.mjs (temporary, remove after analysis)
// Source: https://docs.astro.build/en/recipes/analyze-bundle-size/
import { defineConfig } from 'astro/config';
import { visualizer } from 'rollup-plugin-visualizer';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // ... existing config
  vite: {
    plugins: [
      tailwindcss(),
      visualizer({
        emitFile: true,
        filename: 'stats.html',
      }),
    ],
  },
});
```

### Lighthouse CLI Commands
```bash
# Source: https://github.com/GoogleChrome/lighthouse

# Basic mobile test (simulates slow 4G)
lighthouse https://your-site.vercel.app/en/ --output html --output-path ./lighthouse-en.html

# Desktop test
lighthouse https://your-site.vercel.app/en/ --preset desktop --output html --output-path ./lighthouse-desktop.html

# Headless mode for CI
lighthouse https://your-site.vercel.app/en/ --chrome-flags="--headless" --output json --output-path ./lighthouse.json

# Multiple runs for consistency (pick median)
lighthouse https://your-site.vercel.app/en/ -n 3 --output html
```

### Vercel Configuration for Static Caching
```json
// vercel.json
// Source: https://vercel.com/docs/edge-network/caching
{
  "headers": [
    {
      "source": "/(.*)\\.(?:js|css|woff2|avif|webp)$",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### Environment Variable Pattern
```typescript
// src/scripts/calendly.ts (updated for env vars)
const CALENDLY_URL = import.meta.env.PUBLIC_CALENDLY_URL || 'https://calendly.com/whiteboard-co/30min';

export function openCalendlyPopup(locale: string): void {
  const url = `${CALENDLY_URL}?locale=${locale}`;
  window.Calendly.initPopupWidget({ url });
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| FID (First Input Delay) | INP (Interaction to Next Paint) | March 2024 | More comprehensive interactivity metric |
| @astrojs/image integration | Built-in astro:assets | Astro 3.0 (Aug 2023) | No separate package needed |
| Manual WebP conversion | Automatic format negotiation | Astro 3.0+ | Browser gets best supported format |
| AMP for mobile performance | Well-optimized standard HTML | 2024 | AMP no longer provides ranking advantages |
| External Google Fonts | Self-hosted via Fontsource | 2022+ | Eliminates third-party request, better caching |

**Deprecated/outdated:**
- @astrojs/image: Replaced by built-in Image component in astro:assets
- @astrojs/tailwind: Deprecated in favor of @tailwindcss/vite plugin
- FID metric: Replaced by INP as of March 2024

## Browser Testing Coverage

**Recommended testing browsers for LatAm landing page audience:**

| Browser | Platform | Priority | Why |
|---------|----------|----------|-----|
| Chrome | Android | HIGH | ~65% global mobile share, dominant in LatAm |
| Safari | iOS | HIGH | Default on iPhones, significant in urban LatAm |
| Chrome | Desktop | MEDIUM | Largest desktop browser |
| Firefox | Desktop | LOW | ~3% share, useful for CSS debugging |
| Edge | Desktop | LOW | Windows default, rare in LatAm startup audience |

**Testing flow:**
1. Lighthouse in Chrome DevTools (mobile simulation)
2. Real Android device with Chrome
3. Real iOS device with Safari
4. Desktop Chrome quick verification

**Minimum viable coverage:** Chrome mobile + Safari iOS = 95%+ of target audience

## Error Tracking Recommendation

**Recommendation: Skip Sentry for initial launch**

Rationale:
- Simple static landing page with minimal JavaScript
- Only interactive element is Calendly popup (third-party)
- Plausible already tracks key conversion events
- Free Sentry tier (10k events/month) is generous but adds complexity
- Console errors in DevTools are sufficient for launch debugging

**Revisit if:**
- Bounce rate or conversion issues can't be diagnosed with Plausible
- More complex JavaScript features are added
- User reports indicate specific errors

## Uptime Monitoring Recommendation

**Recommendation: Trust Vercel initially, add monitoring if needed**

Rationale:
- Vercel has built-in uptime monitoring on Pro plans
- For free tier: Vercel's status page covers infrastructure
- Simple landing page has minimal failure modes
- Adding UptimeRobot (free tier) is trivial if desired later

**Simple alternative if desired:**
- UptimeRobot free tier: 50 monitors, 5-minute checks
- Monitors: `/en/` and `/es/` routes
- Alert via email

## Critical Path Checklist

Pre-launch verification flow:

### 1. Performance Verification
- [ ] Run `npm run build` successfully
- [ ] Run bundle visualizer, verify no unexpected large dependencies
- [ ] Lighthouse mobile score >= 90
- [ ] LCP < 2.5s (mobile, 4G simulation)
- [ ] CLS < 0.1

### 2. Functionality Verification
- [ ] `/en/` route loads correctly
- [ ] `/es/` route loads correctly
- [ ] Language switcher works
- [ ] All sections render (Hero, Services, Team, Equity Model, Process, Contact)
- [ ] Calendly popup opens with correct locale
- [ ] Plausible tracking fires (check network tab)

### 3. Deployment Verification
- [ ] Push to GitHub triggers Vercel build
- [ ] Preview deployment URL works
- [ ] Environment variables set (if any)
- [ ] Production deployment works
- [ ] Both locale routes accessible

### 4. Real Device Verification
- [ ] Load on real Android phone
- [ ] Load on real iOS phone (if available)
- [ ] Calendly popup works on mobile
- [ ] Text is readable without zooming

## Open Questions

Things that couldn't be fully resolved:

1. **Accept-Language redirect implementation**
   - What we know: Requires Vercel adapter with edge middleware for dynamic detection
   - What's unclear: Whether this adds meaningful complexity vs. just defaulting to /en/
   - Recommendation: Implement if straightforward, otherwise defer (users can switch manually)

2. **Real hero image availability**
   - What we know: Currently using SVG placeholder
   - What's unclear: Whether final image assets exist
   - Recommendation: If raster images will be added, use Astro Image component

3. **Calendly URL environment variable**
   - What we know: Currently hardcoded in calendly.ts
   - What's unclear: Whether different URLs needed for production vs. development
   - Recommendation: Use `PUBLIC_CALENDLY_URL` env var for flexibility

## Sources

### Primary (HIGH confidence)
- [Astro Images Guide](https://docs.astro.build/en/guides/images/) - Image and Picture components, optimization
- [Astro Bundle Analysis Recipe](https://docs.astro.build/en/recipes/analyze-bundle-size/) - rollup-plugin-visualizer setup
- [Astro Vercel Adapter](https://docs.astro.build/en/guides/integrations-guide/vercel/) - Edge middleware, deployment
- [Astro Deploy to Vercel](https://docs.astro.build/en/guides/deploy/vercel/) - Static deployment process
- [Google Lighthouse](https://github.com/GoogleChrome/lighthouse) - CLI usage, headless mode
- [Google Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals) - Official thresholds

### Secondary (MEDIUM confidence)
- [Vercel CDN Cache](https://vercel.com/docs/cdn-cache) - Caching headers configuration
- [Astro i18n Routing](https://docs.astro.build/en/guides/internationalization/) - preferredLocale, middleware
- [Web.dev Vitals](https://web.dev/articles/vitals) - LCP, CLS, INP best practices

### Tertiary (LOW confidence)
- Various blog posts on browser market share and testing coverage
- Community discussions on Sentry vs. no error tracking for simple sites

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Using official Astro and Vercel documentation
- Architecture: HIGH - Site already follows best practices, patterns verified
- Pitfalls: MEDIUM - Based on common issues, not specific to this codebase
- Browser coverage: MEDIUM - Based on general market share data
- Error/uptime monitoring: LOW - Subjective recommendation, can be revised

**Research date:** 2026-01-20
**Valid until:** 60 days (Astro and Vercel are stable, Core Web Vitals thresholds unchanged)
