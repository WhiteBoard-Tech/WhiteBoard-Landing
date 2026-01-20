# Phase 4: Integrations - Research

**Researched:** 2026-01-20
**Domain:** Third-party integrations (Calendly popup, Plausible Analytics, conversion tracking)
**Confidence:** HIGH

## Summary

This phase integrates Calendly scheduling and Plausible Analytics into the existing Astro site. The site already has a basic Calendly popup implemented (loading widget.js in the head), but needs lazy-loading, locale support, and event tracking. Plausible provides built-in scroll depth tracking, eliminating the need for custom implementations.

The key challenge is lazy-loading Calendly's widget.js on click rather than on page load, while still capturing postMessage events for conversion tracking. The native HTML `<dialog>` element provides the recommended approach for accessible popup overlays with backdrop blur.

**Primary recommendation:** Use facade pattern for Calendly (load scripts on click), native `<dialog>` for popup container, and Plausible's built-in features for scroll depth plus custom events for conversion funnel.

## Standard Stack

The established tools for this integration domain:

### Core (Already Decided)
| Tool | Purpose | Why Standard |
|------|---------|--------------|
| Calendly Popup Widget | Scheduling embeds | Industry standard for scheduling, postMessage API for event tracking |
| Plausible Analytics | Privacy-first analytics | GDPR compliant, no cookie banner needed, built-in scroll depth |

### Supporting
| Tool | Purpose | When to Use |
|------|---------|-------------|
| Native `<dialog>` element | Popup container | Accessible modals with built-in Escape key, focus trapping |
| Intersection Observer API | Section visibility tracking | Efficient viewport detection, offloads work from main thread |
| postMessage API | Calendly event capture | Listen for booking confirmations from iframe |

### Not Needed (Built-in)
| Problem | Don't Use | Plausible Provides |
|---------|-----------|-------------------|
| Scroll depth tracking | Custom Intersection Observer | Built-in scroll depth at all percentages (1-100%) |
| Page view tracking | Manual events | Automatic with script installation |

**Installation:**
```bash
# No npm packages needed - all via CDN/script tags
# Calendly: https://assets.calendly.com/assets/external/widget.css
# Calendly: https://assets.calendly.com/assets/external/widget.js
# Plausible: https://plausible.io/js/script.js
```

## Architecture Patterns

### Recommended Structure
```
src/
├── components/
│   └── CalendlyPopup.astro    # Dialog + lazy-load logic
├── scripts/
│   └── analytics.ts           # Plausible custom events, Calendly listener
├── layouts/
│   └── BaseLayout.astro       # Plausible script tag (head)
└── i18n/
    └── utils.ts               # getLangFromUrl (already exists)
```

### Pattern 1: Lazy-Load Scripts on Click (Facade Pattern)

**What:** Don't load Calendly widget.js until user clicks CTA
**When to use:** Third-party widgets that aren't needed on initial load
**Example:**
```typescript
// On button click:
// 1. Show loading state
// 2. Dynamically inject Calendly CSS + JS if not already loaded
// 3. Wait for script to load
// 4. Call Calendly.initPopupWidget()

function loadCalendlyScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.Calendly) {
      resolve();
      return;
    }

    // Load CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    document.head.appendChild(link);

    // Load JS
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Calendly'));
    document.head.appendChild(script);
  });
}
```

### Pattern 2: Calendly with Locale Parameter

**What:** Pass page locale to Calendly URL for translated widget
**When to use:** Multilingual sites
**Example:**
```typescript
// Source: Calendly community documentation
const locale = getLangFromUrl(window.location);
const calendlyUrl = `https://calendly.com/whiteboard-co/30min?locale=${locale}`;

Calendly.initPopupWidget({ url: calendlyUrl });
```

Calendly supports: en, es, fr, de, pt, and more. Falls back gracefully if locale unsupported.

### Pattern 3: PostMessage Event Listener (Secure)

**What:** Listen for Calendly booking events with origin validation
**When to use:** Conversion tracking, triggering actions on booking
**Example:**
```typescript
// Source: Calendly developer documentation + security best practices
function isCalendlyEvent(e: MessageEvent): boolean {
  return e.origin === 'https://calendly.com' &&
         e.data?.event?.startsWith('calendly.');
}

window.addEventListener('message', (e) => {
  if (!isCalendlyEvent(e)) return;

  switch (e.data.event) {
    case 'calendly.event_scheduled':
      // Track conversion
      plausible('booking_confirmed');
      break;
    case 'calendly.date_and_time_selected':
      // Optional: track funnel step
      break;
  }
});
```

**Calendly postMessage event types:**
- `calendly.profile_page_viewed` - Profile page loaded
- `calendly.event_type_viewed` - Event type page viewed
- `calendly.date_and_time_selected` - User picked a time
- `calendly.event_scheduled` - Booking confirmed (key conversion event)

### Pattern 4: Native Dialog for Popup Container

**What:** Use `<dialog>` element with showModal() for accessible popup
**When to use:** Any modal/popup that needs accessibility
**Example:**
```html
<dialog id="calendly-dialog" class="backdrop:bg-black/50 backdrop:backdrop-blur-sm">
  <div class="calendly-container">
    <!-- Calendly inline widget renders here -->
  </div>
  <button type="button" aria-label="Close" onclick="this.closest('dialog').close()">
    X
  </button>
</dialog>
```

```typescript
// Open
const dialog = document.getElementById('calendly-dialog') as HTMLDialogElement;
dialog.showModal(); // Handles: focus trapping, Escape key, aria-modal

// Close on backdrop click
dialog.addEventListener('click', (e) => {
  const rect = dialog.getBoundingClientRect();
  if (e.clientX < rect.left || e.clientX > rect.right ||
      e.clientY < rect.top || e.clientY > rect.bottom) {
    dialog.close();
  }
});
```

### Pattern 5: Plausible Custom Events

**What:** Track custom conversion events with plausible() function
**When to use:** CTA clicks, conversion milestones
**Example:**
```typescript
// Source: Plausible documentation
// Basic event
plausible('popup_opened');

// Event with properties
plausible('cta_click', { props: { location: 'hero' } });

// Non-interactive event (doesn't affect bounce rate)
plausible('section_viewed', { props: { section: 'services' }, interactive: false });
```

### Pattern 6: Section Visibility with Intersection Observer

**What:** Track when sections enter viewport
**When to use:** Engagement analytics, scroll-triggered events
**Example:**
```typescript
// Source: MDN, web.dev best practices
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const section = entry.target.id;
      plausible('section_viewed', {
        props: { section },
        interactive: false
      });

      // Unobserve after firing to prevent duplicate events
      observer.unobserve(entry.target);
    });
  },
  {
    rootMargin: '0px 0px -50% 0px', // Fire when 50% visible
    threshold: 0
  }
);

// Observe all tracked sections
document.querySelectorAll('section[id]').forEach((el) => observer.observe(el));
```

### Anti-Patterns to Avoid

- **Loading Calendly scripts in `<head>` eagerly:** Current implementation loads widget.js on every page load. Move to lazy-load on click.
- **Inline onclick handlers:** Current `onclick="Calendly.initPopupWidget({...})"` is fragile. Use proper event listeners with error handling.
- **Not validating postMessage origin:** Security vulnerability. Always check `e.origin === 'https://calendly.com'`.
- **Custom scroll tracking when Plausible has built-in:** Plausible tracks scroll depth automatically at all percentages.
- **Using custom modal implementation:** Native `<dialog>` handles accessibility automatically.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scroll depth tracking | Custom Intersection Observer for scroll % | Plausible built-in scroll depth | Tracks 1-100%, creates goals in dashboard |
| Accessible popup | Custom div with aria attributes | Native `<dialog>` with showModal() | Focus trapping, Escape key, backdrop built-in |
| Focus trapping | Custom Tab key handler | Native `<dialog>` | Browser handles focus management |
| Booking event detection | Custom iframe polling | Calendly postMessage API | Official supported method |

**Key insight:** Plausible's built-in scroll depth tracking eliminates the need for custom scroll percentage tracking. Focus custom events on: CTA clicks, section visibility, and Calendly conversion funnel.

## Common Pitfalls

### Pitfall 1: Loading Analytics Scripts Eagerly
**What goes wrong:** Calendly widget.js (60KB+) loads on every page even if user never clicks CTA
**Why it happens:** Easiest implementation is `<script>` in head
**How to avoid:** Facade pattern - load on first click, cache for subsequent clicks
**Warning signs:** Large "unused JavaScript" in Lighthouse, slow LCP

### Pitfall 2: Missing Origin Validation on postMessage
**What goes wrong:** Any website can send fake Calendly events to your page
**Why it happens:** Calendly's example code doesn't validate origin
**How to avoid:** Always check `e.origin === 'https://calendly.com'`
**Warning signs:** Security audit flags, unexplained conversion spikes

### Pitfall 3: Backdrop Blur Performance
**What goes wrong:** Janky animations on low-end devices when opening popup
**Why it happens:** `backdrop-filter: blur()` is GPU-intensive
**How to avoid:** Keep blur small (4-8px), test on mobile, consider fallback
**Warning signs:** Dropped frames in DevTools Performance tab

### Pitfall 4: Double-Tracking Events
**What goes wrong:** Same conversion tracked multiple times
**Why it happens:** Not unobserving Intersection Observer, not gating event listeners
**How to avoid:** Call `observer.unobserve()` after tracking, use flags for one-time events
**Warning signs:** Conversion rates > 100%, inflated event counts

### Pitfall 5: Forgetting Plausible Has Built-in Scroll Depth
**What goes wrong:** Building custom scroll tracking that duplicates Plausible's feature
**Why it happens:** Assuming analytics only tracks pageviews
**How to avoid:** Check Plausible docs first - scroll depth is automatic
**Warning signs:** Custom code for something that exists

### Pitfall 6: Calendly Locale Not Matching Page
**What goes wrong:** English Calendly widget on Spanish page
**Why it happens:** Not passing `?locale=` parameter to Calendly URL
**How to avoid:** Extract locale from URL, append to Calendly URL
**Warning signs:** Language mismatch visible in UI

## Code Examples

### Plausible Script Installation (BaseLayout.astro)

```html
<!-- Source: Plausible official documentation -->
<head>
  <!-- Existing head content -->

  <!-- Plausible Analytics - loads async, privacy-friendly -->
  <script
    defer
    data-domain="whiteboard.co"
    src="https://plausible.io/js/script.js"
  ></script>
</head>
```

For local development, use `script.local.js` variant to avoid polluting production data.

### Type Declaration for Plausible

```typescript
// src/env.d.ts or types.d.ts
declare global {
  interface Window {
    plausible: (
      eventName: string,
      options?: {
        props?: Record<string, string | number | boolean>;
        callback?: () => void;
        interactive?: boolean;
      }
    ) => void;
  }
}
```

### Type Declaration for Calendly

```typescript
// src/env.d.ts or types.d.ts
declare global {
  interface Window {
    Calendly: {
      initPopupWidget: (options: { url: string }) => void;
      closePopupWidget: () => void;
    };
  }
}
```

### Complete Lazy-Load Calendly Function

```typescript
// src/scripts/calendly.ts
let calendlyLoaded = false;
let calendlyLoading: Promise<void> | null = null;

export async function loadCalendly(): Promise<void> {
  if (calendlyLoaded) return;
  if (calendlyLoading) return calendlyLoading;

  calendlyLoading = new Promise((resolve, reject) => {
    // Load CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    document.head.appendChild(link);

    // Load JS
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => {
      calendlyLoaded = true;
      resolve();
    };
    script.onerror = () => reject(new Error('Failed to load Calendly widget'));
    document.head.appendChild(script);
  });

  return calendlyLoading;
}

export function openCalendlyPopup(locale: string): void {
  const url = `https://calendly.com/whiteboard-co/30min?locale=${locale}`;
  window.Calendly.initPopupWidget({ url });
}
```

### Calendly Event Listener for Plausible

```typescript
// src/scripts/analytics.ts
function setupCalendlyTracking(): void {
  window.addEventListener('message', (e) => {
    // Security: validate origin
    if (e.origin !== 'https://calendly.com') return;
    if (!e.data?.event?.startsWith('calendly.')) return;

    switch (e.data.event) {
      case 'calendly.event_scheduled':
        window.plausible?.('booking_confirmed');
        break;
      // Optional: track funnel steps
      case 'calendly.date_and_time_selected':
        window.plausible?.('date_time_selected', { interactive: false });
        break;
    }
  });
}
```

### Section Visibility Tracking

```typescript
// src/scripts/analytics.ts
const TRACKED_SECTIONS = ['services', 'team', 'process', 'contact'];

function setupSectionTracking(): void {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const sectionId = entry.target.id;
        window.plausible?.('section_viewed', {
          props: { section: sectionId },
          interactive: false
        });

        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -50% 0px', threshold: 0 }
  );

  TRACKED_SECTIONS.forEach((id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Eagerly load all scripts | Lazy-load on interaction | Best practice since 2020+ | Better Core Web Vitals |
| Custom modal with ARIA | Native `<dialog>` element | Baseline 2022, universal 2024 | Less code, better a11y |
| Custom scroll tracking | Plausible built-in scroll depth | Plausible added 2023+ | No custom code needed |
| Polling iframes for events | postMessage listener | Standard practice | Official Calendly method |

**Current (2026):**
- Native `<dialog>` has universal browser support
- Plausible provides scroll depth tracking out of the box
- Intersection Observer is the standard for visibility detection
- Lazy-loading third-party scripts is expected for good Core Web Vitals

## Open Questions

Things that couldn't be fully resolved:

1. **Exact Calendly locale codes**
   - What we know: Supports en, es, fr, de, pt and more
   - What's unclear: Complete list of supported locale codes
   - Recommendation: Test with `?locale=es` - falls back gracefully if unsupported

2. **Popup widget vs inline widget in dialog**
   - What we know: `initPopupWidget` creates its own overlay; `initInlineWidget` needs a container
   - What's unclear: Whether to use Calendly's popup (less control) or embed inline widget in our `<dialog>` (more control)
   - Recommendation: Use Calendly's `initPopupWidget` for simplicity, unless custom backdrop styling is critical - then use inline widget in our `<dialog>`

3. **Mobile full-screen behavior**
   - What we know: Calendly popup is responsive by default
   - What's unclear: Whether it automatically goes full-screen on mobile
   - Recommendation: Test on mobile devices; may need custom handling if using inline widget in dialog

## Sources

### Primary (HIGH confidence)
- Plausible official documentation - scroll depth, custom events, script installation
- MDN Web Docs - `<dialog>` element, Intersection Observer API, postMessage
- web.dev - Third-party script loading best practices

### Secondary (MEDIUM confidence)
- [Calendly Developer Documentation](https://developer.calendly.com/how-to-display-the-scheduling-page-for-users-of-your-app) - Widget API
- [Calendly Community](https://community.latenode.com/t/how-to-set-calendly-widget-language-dynamically/37902) - Locale parameter via URL
- [Calendly Security Discussion](https://blog.teknkl.com/calendly-form-js-events-example-vulnerability-like-hubspot/) - Origin validation importance
- [Plausible + Astro Guide](https://santychuy.com/blog/plausible-astro-simplified-web-analytics-guide) - Astro-specific integration

### Tertiary (LOW confidence)
- WebSearch findings on postMessage event types - needs validation against actual widget behavior

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Calendly and Plausible are well-documented, established tools
- Architecture patterns: HIGH - Native APIs (dialog, Intersection Observer, postMessage) have excellent MDN docs
- Pitfalls: HIGH - Based on official documentation warnings and security best practices
- Locale handling: MEDIUM - Calendly locale parameter confirmed but exact codes not officially documented

**Research date:** 2026-01-20
**Valid until:** 2026-02-20 (30 days - stable tools)
