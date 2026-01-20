# Phase 1: Foundation - Research

**Researched:** 2026-01-20
**Domain:** Astro 5, Tailwind CSS v4, i18n routing, font optimization
**Confidence:** HIGH

## Summary

This research covers the technical foundation for a bilingual (English/Spanish) landing page built with Astro 5 and Tailwind CSS v4. The stack is well-documented and current best practices are established.

Key findings:
- Astro 5 provides built-in i18n routing with `prefixDefaultLocale: true` for `/en/` and `/es/` URL patterns
- Tailwind CSS v4 uses a CSS-first `@theme` directive for design tokens, replacing the JavaScript config
- Font loading should use `font-display: optional` with preload for zero CLS, or `font-display: swap` with early delivery
- Self-hosting fonts via Fontsource is the recommended approach (no external network requests)

**Primary recommendation:** Use Astro's native i18n routing with TypeScript-based translation utilities, Tailwind v4's CSS-first `@theme` for design tokens, and self-hosted Inter font (via Fontsource) for a premium tech aesthetic with zero CLS.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro | 5.x | Static site framework | Zero-JS by default, built-in i18n, TypeScript support |
| Tailwind CSS | 4.x | Utility CSS framework | CSS-first config, design tokens as CSS variables |
| @tailwindcss/vite | 4.x | Vite integration | Official Astro integration method for Tailwind v4 |
| TypeScript | 5.x | Type safety | Built-in Astro support, component props typing |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @fontsource-variable/inter | latest | Self-hosted Inter font | Body text, UI elements |
| @fontsource/space-grotesk | latest | Self-hosted Space Grotesk | Headlines, display text (if desired) |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Self-hosted fonts | Google Fonts CDN | Self-hosted is faster (no external connection), GDPR-compliant |
| TypeScript ui.ts | JSON translation files | JSON requires more setup; TypeScript gives type safety |
| Inter | Satoshi, Neue Montreal | Inter is more widely available, excellent variable font support |

**Installation:**
```bash
npm create astro@latest -- --template basics
npm install tailwindcss @tailwindcss/vite
npm install @fontsource-variable/inter
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/          # Reusable Astro components
│   ├── ui/              # Base UI components (Button, Card, etc.)
│   └── sections/        # Page section components
├── layouts/             # Page layouts (BaseLayout.astro)
├── pages/               # File-based routing
│   ├── index.astro      # Root redirect (required by Astro)
│   ├── en/              # English pages
│   │   └── index.astro
│   └── es/              # Spanish pages
│       └── index.astro
├── i18n/                # Internationalization utilities
│   ├── ui.ts            # Translation strings
│   └── utils.ts         # Translation helper functions
├── styles/              # Global styles
│   └── global.css       # Tailwind imports and @theme
└── assets/              # Processed assets (images)

public/
└── fonts/               # Self-hosted font files (if not using Fontsource)
```

### Pattern 1: Astro i18n Configuration
**What:** URL-based locale routing with prefix for all languages
**When to use:** When both `/en/` and `/es/` URLs are required (no bare root URLs)
**Example:**
```typescript
// astro.config.mjs
// Source: https://docs.astro.build/en/guides/internationalization/
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
```

### Pattern 2: Translation System with TypeScript
**What:** Type-safe translation strings with fallback behavior
**When to use:** For all UI text that needs translation
**Example:**
```typescript
// src/i18n/ui.ts
// Source: https://docs.astro.build/en/recipes/i18n/
export const languages = {
  en: "English",
  es: "Espanol",
};

export const defaultLang = "en";

export const ui = {
  en: {
    "site.title": "Whiteboard",
    "site.description": "We build tech equity partnerships",
    "nav.home": "Home",
    "cta.schedule": "Schedule a Call",
  },
  es: {
    "site.title": "Whiteboard",
    "site.description": "Construimos asociaciones de capital tecnologico",
    "nav.home": "Inicio",
    "cta.schedule": "Agendar una Llamada",
  },
} as const;

// src/i18n/utils.ts
import { ui, defaultLang } from "./ui";

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}
```

### Pattern 3: Tailwind v4 Design Tokens
**What:** CSS-first design token configuration using @theme directive
**When to use:** For all brand colors, typography, spacing
**Example:**
```css
/* src/styles/global.css */
/* Source: https://tailwindcss.com/docs/theme */
@import "tailwindcss";

@theme {
  /* Brand Colors - Black/White/Gray only */
  --color-*: initial;
  --color-white: #FFFFFF;
  --color-black: #000000;
  --color-gray-50: #FAFAFA;
  --color-gray-100: #F5F5F5;
  --color-gray-200: #E5E5E5;
  --color-gray-300: #D4D4D4;
  --color-gray-400: #A3A3A3;
  --color-gray-500: #737373;
  --color-gray-600: #525252;
  --color-gray-700: #404040;
  --color-gray-800: #262626;
  --color-gray-900: #171717;
  --color-gray-950: #0A0A0A;

  /* Typography - Premium Tech */
  --font-sans: "Inter Variable", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Inter Variable", ui-sans-serif, system-ui, sans-serif;

  /* Font Sizes - Bold scale for premium feel */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 3rem;
  --text-6xl: 3.75rem;

  /* Spacing - 4px base */
  --spacing: 0.25rem;

  /* Border Radius - Geometric/minimal */
  --radius-none: 0;
  --radius-sm: 0.125rem;
  --radius-DEFAULT: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
}
```

### Pattern 4: Font Loading with Zero CLS
**What:** Self-hosted variable font with optimized loading
**When to use:** Always - critical for Core Web Vitals
**Example:**
```astro
---
// src/layouts/BaseLayout.astro
import "@fontsource-variable/inter";
import "../styles/global.css";

const { lang } = Astro.props;
---
<!DOCTYPE html>
<html lang={lang}>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="preload"
      href="/_astro/inter-latin-wght-normal.woff2"
      as="font"
      type="font/woff2"
      crossorigin
    />
    <style>
      /* Prevent FOUT/FOIT with font-display */
      @font-face {
        font-family: "Inter Variable";
        font-display: optional;
      }
    </style>
  </head>
  <body class="font-sans antialiased bg-white text-black">
    <slot />
  </body>
</html>
```

### Anti-Patterns to Avoid
- **Using @astrojs/tailwind integration:** Deprecated for Tailwind v4. Use @tailwindcss/vite directly.
- **Using @apply in component styles:** Requires @reference import in v4. Prefer inline utility classes.
- **Google Fonts CDN:** Creates external dependency, potential GDPR issues, slower than self-hosted.
- **Manual locale detection from headers:** Use URL-based routing for static sites.
- **Double language prefixes in links:** Don't combine `getRelativeLocaleUrl()` with existing locale paths.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Font loading optimization | Custom font loader | Fontsource + preload | Handles subsetting, formats, loading states |
| i18n routing | Manual path parsing | Astro's built-in i18n | Handles redirects, locale detection, helpers |
| Translation fallbacks | Custom fallback logic | useTranslations helper | Type-safe, handles missing keys |
| CSS design tokens | Custom CSS variables | Tailwind @theme | Generates utilities, maintains consistency |
| Responsive breakpoints | Custom media queries | Tailwind's mobile-first | Consistent, well-tested defaults |

**Key insight:** Astro 5 and Tailwind v4 provide comprehensive built-in solutions. Custom implementations add maintenance burden without benefit.

## Common Pitfalls

### Pitfall 1: @apply Breaks in Component Styles (Tailwind v4)
**What goes wrong:** "Cannot apply unknown utility class" error in `.astro` component `<style>` blocks
**Why it happens:** Tailwind v4 changed how @apply resolves utility classes across files
**How to avoid:**
1. Prefer inline utility classes: `class="bg-black text-white"` instead of `@apply`
2. If @apply needed, add `@reference "../styles/global.css";` at top of style block
**Warning signs:** Build errors mentioning "unknown utility class"

### Pitfall 2: Language Switcher Double-Prefix URLs
**What goes wrong:** URLs become `/en/es/about` instead of `/es/about`
**Why it happens:** Combining `getRelativeLocaleUrl(locale, Astro.url.pathname)` with existing locale prefix
**How to avoid:** Strip existing locale from pathname before generating new URL:
```typescript
function getPathWithoutLocale(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] in ui) segments.shift();
  return "/" + segments.join("/");
}
```
**Warning signs:** URLs with two language codes

### Pitfall 3: Font Loading Causes Layout Shift
**What goes wrong:** Text jumps/resizes when web font loads (CLS > 0)
**Why it happens:** Fallback font metrics differ from web font
**How to avoid:**
1. Use `font-display: optional` (font may not show if late)
2. Or use `font-display: swap` + preload + size-adjust on fallback
3. Self-host fonts to reduce load time
**Warning signs:** Visible text reflow on page load, Lighthouse CLS warnings

### Pitfall 4: Missing Root index.astro
**What goes wrong:** Build fails or routing breaks
**Why it happens:** Astro requires `src/pages/index.astro` even with i18n
**How to avoid:** Keep a minimal index.astro that redirects to default locale (Astro handles this automatically with `redirectToDefaultLocale: true`)
**Warning signs:** 404 on root URL, build errors about missing page

### Pitfall 5: Folder Names Don't Match Locale Config
**What goes wrong:** Pages not generated, 404 errors
**Why it happens:** Folder must be exactly `en/` and `es/` to match locales array
**How to avoid:** Use exact locale codes for folder names
**Warning signs:** Missing pages in build output

## Code Examples

Verified patterns from official sources:

### Complete astro.config.mjs
```typescript
// Source: https://docs.astro.build/en/guides/internationalization/
// Source: https://tailwindcss.com/docs/installation/framework-guides/astro
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
```

### Complete tsconfig.json
```json
// Source: https://docs.astro.build/en/guides/typescript/
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@layouts/*": ["src/layouts/*"],
      "@i18n/*": ["src/i18n/*"]
    }
  }
}
```

### BaseLayout.astro with Font Preload
```astro
---
// Source: https://docs.astro.build/en/guides/fonts/
// Source: https://web.dev/articles/font-best-practices
import "@fontsource-variable/inter";
import "@/styles/global.css";
import { getLangFromUrl, useTranslations } from "@i18n/utils";

interface Props {
  title?: string;
  description?: string;
}

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
const { title = t("site.title"), description = t("site.description") } = Astro.props;
---
<!DOCTYPE html>
<html lang={lang}>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="preconnect" href="/" crossorigin />
  </head>
  <body class="min-h-screen bg-white text-gray-900 font-sans antialiased">
    <slot />
  </body>
</html>
```

### Language Switcher Component
```astro
---
// Source: https://docs.astro.build/en/recipes/i18n/
import { languages, defaultLang } from "@i18n/ui";

const currentLang = Astro.currentLocale || defaultLang;
const currentPath = Astro.url.pathname;

// Strip locale prefix to get base path
function getBasePath(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] && segments[0] in languages) {
    segments.shift();
  }
  return "/" + segments.join("/") || "/";
}

const basePath = getBasePath(currentPath);
---
<nav class="flex gap-2">
  {Object.entries(languages).map(([code, name]) => (
    <a
      href={`/${code}${basePath}`}
      class:list={[
        "px-3 py-1 text-sm font-medium transition-colors",
        currentLang === code
          ? "bg-black text-white"
          : "text-gray-600 hover:text-black"
      ]}
    >
      {code.toUpperCase()}
    </a>
  ))}
</nav>
```

### Responsive Mobile-First Pattern
```astro
---
// Source: https://tailwindcss.com/docs/responsive-design
---
<section class="px-4 py-12 md:px-8 md:py-16 lg:px-12 lg:py-24">
  <div class="max-w-4xl mx-auto">
    <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
      <slot name="heading" />
    </h1>
    <p class="mt-4 text-base md:text-lg text-gray-600">
      <slot name="description" />
    </p>
  </div>
</section>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| @astrojs/tailwind integration | @tailwindcss/vite plugin | Tailwind v4 (2024) | Must use Vite plugin directly |
| tailwind.config.js | @theme in CSS | Tailwind v4 (2024) | Config is CSS-first now |
| Google Fonts CDN | Self-hosted via Fontsource | 2022+ (cache partitioning) | Self-hosting universally recommended |
| @tailwind directives | @import "tailwindcss" | Tailwind v4 (2024) | Single import replaces three directives |
| Manual i18n routing | Astro built-in i18n | Astro 4.0 (2023) | Native routing, helpers included |

**Deprecated/outdated:**
- `@astrojs/tailwind`: Not compatible with Tailwind v4, use @tailwindcss/vite
- `@tailwind base/components/utilities`: Replaced by `@import "tailwindcss"`
- `tailwind.config.js` for colors/fonts: Use @theme in CSS instead
- `npx tailwind init`: Not needed for v4, configure in CSS

## Open Questions

Things that couldn't be fully resolved:

1. **Exact Fontsource font file path for preload**
   - What we know: Fontsource bundles fonts into `_astro/` directory at build
   - What's unclear: Exact filename hash varies by build
   - Recommendation: Test after first build to get exact path, or skip explicit preload (Fontsource handles basic optimization)

2. **Optimal font-display for this project**
   - What we know: `optional` = zero CLS but font may not load; `swap` = font always loads but may cause shift
   - What's unclear: How fast fonts will load in demo environment
   - Recommendation: Start with `swap` + preload, measure CLS, switch to `optional` if CLS > 0.1

## Sources

### Primary (HIGH confidence)
- [Astro TypeScript Guide](https://docs.astro.build/en/guides/typescript/) - TypeScript setup, templates, type checking
- [Astro i18n Routing](https://docs.astro.build/en/guides/internationalization/) - Locale configuration, routing options, helpers
- [Astro i18n Recipe](https://docs.astro.build/en/recipes/i18n/) - Translation utilities, useTranslations pattern
- [Tailwind CSS v4 Astro Installation](https://tailwindcss.com/docs/installation/framework-guides/astro) - Vite plugin setup
- [Tailwind CSS Theme Variables](https://tailwindcss.com/docs/theme) - @theme directive, design tokens
- [Astro Fonts Guide](https://docs.astro.build/en/guides/fonts/) - Font loading, Fontsource integration
- [Astro Project Structure](https://docs.astro.build/en/basics/project-structure/) - Directory conventions

### Secondary (MEDIUM confidence)
- [web.dev Font Best Practices](https://web.dev/articles/font-best-practices) - font-display options, preload guidance
- [Fontsource Inter](https://fontsource.org/fonts/inter) - Self-hosting Inter font
- [Tailwind v4 Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide) - @apply changes, migration notes

### Tertiary (LOW confidence)
- [Typography Trends 2026](https://www.fontfabric.com/blog/10-design-trends-shaping-the-visual-typographic-landscape-in-2026/) - Font recommendations for tech brands
- [Astro i18n Pitfalls](https://borjagomez.com/en/blog/i18n-with-astro/) - Community experience with i18n gotchas

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Official documentation verified for all libraries
- Architecture: HIGH - Patterns from official docs, well-established
- i18n routing: HIGH - Native Astro feature with comprehensive docs
- Tailwind v4 setup: HIGH - Official installation guide verified
- Font loading: MEDIUM - Best practices established, exact implementation varies
- Typography choice: MEDIUM - Based on current trends, subjective element

**Research date:** 2026-01-20
**Valid until:** 2026-02-20 (30 days - stable stack, low churn)
