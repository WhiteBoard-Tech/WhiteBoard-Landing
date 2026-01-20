# Phase 3: Content Sections - Research

**Researched:** 2026-01-20
**Domain:** Content sections (Services, Team, Equity Model, Process Flow), Tailwind CSS grids, i18n patterns, Calendly integration
**Confidence:** HIGH

## Summary

This phase builds trust and communicates offerings through four content sections: Services (4 productized offerings), Team (3 co-founders), Equity Model (visual explainer), and Process flow (Discovery -> Build -> Scale). All sections must be bilingual (EN/ES) using the existing translation system.

The existing foundation (Astro 5.16.11, Tailwind v4 CSS-first config, URL-based i18n with `/en/` and `/es/` routing, TypeScript translations in `ui.ts`) provides everything needed. The key implementation patterns are: (1) CSS Grid with responsive breakpoints for section layouts, (2) avatar placeholders with initials for team members pending real photos, (3) icon-based cards for visual explainers, and (4) horizontal stepper pattern for process flow.

**Primary recommendation:** Build each section as a standalone Astro component using CSS Grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-4` pattern), use inline SVG icons for visual elements (no icon library needed for 6-8 icons), and integrate Calendly via `initPopupWidget` triggered from a custom CTA button in the Contact section.

## Standard Stack

The established libraries/tools for this phase:

### Core (Already Installed - No Changes)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro | 5.16.11 | Static site framework | Component architecture, zero-JS by default |
| Tailwind CSS | 4.1.18 | Styling | CSS Grid utilities, responsive breakpoints |
| @fontsource-variable/inter | 5.2.8 | Typography | Already loaded, variable weights for hierarchy |

### Optional Addition (Recommended)
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @lucide/astro | latest | SVG icon components | If more than 8 icons needed, tree-shakeable |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Inline SVG icons | @lucide/astro | Inline is fine for 6-8 icons; Lucide better for 10+ icons |
| CSS Grid | Flexbox | Grid is cleaner for equal-width cards; Flexbox for unequal |
| Calendly popup | Inline embed | Popup keeps page clean, inline for dedicated booking page |

**Installation (only if Lucide needed):**
```bash
npm install @lucide/astro
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/
│   ├── sections/
│   │   ├── Services.astro       # 4 service cards grid
│   │   ├── Team.astro           # 3 founder cards horizontal
│   │   ├── EquityModel.astro    # 3 value propositions visual
│   │   ├── Process.astro        # 3-step horizontal flow
│   │   └── Contact.astro        # Final CTA with Calendly trigger
│   ├── ServiceCard.astro        # Individual service card
│   ├── TeamMember.astro         # Individual team member card
│   └── ProcessStep.astro        # Individual process step
├── i18n/
│   └── ui.ts                    # Add section translations
└── pages/
    ├── en/index.astro           # Add section components
    └── es/index.astro           # Add section components
```

### Pattern 1: Responsive Grid Section Layout
**What:** Base section wrapper with consistent padding, max-width, and responsive grid.
**When to use:** All content sections (Services, Team, Equity Model).
**Example:**
```astro
---
// src/components/sections/Services.astro
import { getLangFromUrl, useTranslations } from '@i18n/utils';
import ServiceCard from '../ServiceCard.astro';

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);

const services = [
  { key: 'ventureLaunch', icon: 'rocket' },
  { key: 'ventureScale', icon: 'trending-up' },
  { key: 'aiEnablement', icon: 'cpu' },
  { key: 'integrations', icon: 'plug' },
];
---

<section id="services" class="py-16 sm:py-20 lg:py-24 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-3xl sm:text-4xl font-bold text-black text-center mb-12">
      {t('services.title')}
    </h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
      {services.map((service) => (
        <ServiceCard
          title={t(`services.${service.key}.title`)}
          tagline={t(`services.${service.key}.tagline`)}
          icon={service.icon}
        />
      ))}
    </div>
  </div>
</section>
```
**Source:** [Tailwind CSS Grid Template Columns](https://tailwindcss.com/docs/grid-template-columns)

### Pattern 2: Service Card with Icon
**What:** Individual service card with inline SVG icon, title, and tagline.
**When to use:** Services section - 4 cards with minimal text.
**Example:**
```astro
---
// src/components/ServiceCard.astro
interface Props {
  title: string;
  tagline: string;
  icon: 'rocket' | 'trending-up' | 'cpu' | 'plug';
}

const { title, tagline, icon } = Astro.props;

// Icon paths (inline SVG for minimal footprint)
const icons = {
  rocket: 'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z',
  'trending-up': 'M22 7l-8.5 8.5-5-5L2 17',
  cpu: 'M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0H5a2 2 0 0 1-2-2v-4m6 6h10a2 2 0 0 0 2-2v-4M3 9h18M3 15h18M9 9v6',
  plug: 'M12 22v-5m0 0a7 7 0 0 0 7-7V8a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2a7 7 0 0 0 7 7zm3-12V4m-6 2V4',
};
---

<div class="text-center p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow duration-200">
  <div class="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-gray-50 rounded-full">
    <svg
      class="w-6 h-6 text-black"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d={icons[icon]} />
    </svg>
  </div>
  <h3 class="text-lg font-semibold text-black mb-2">{title}</h3>
  <p class="text-gray-600 text-sm leading-relaxed">{tagline}</p>
</div>
```
**Source:** [Feature/Icon Grid - Tailwindflex](https://tailwindflex.com/@arya/feature-icon-grid)

### Pattern 3: Team Member Card with Placeholder Avatar
**What:** Horizontal team card with circular placeholder avatar, name, and role.
**When to use:** Team section - 3 co-founders in a row.
**Example:**
```astro
---
// src/components/TeamMember.astro
interface Props {
  name: string;
  role: string;
  initials: string;
  linkedIn?: string;
}

const { name, role, initials, linkedIn } = Astro.props;
---

<div class="text-center">
  <!-- Placeholder avatar with initials -->
  <div class="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
    <span class="text-2xl font-semibold text-gray-600">{initials}</span>
  </div>
  <h3 class="text-lg font-semibold text-black">{name}</h3>
  <p class="text-gray-600 text-sm">{role}</p>
  {linkedIn && (
    <a
      href={linkedIn}
      target="_blank"
      rel="noopener noreferrer"
      class="inline-block mt-2 text-gray-400 hover:text-black transition-colors"
      aria-label={`${name} on LinkedIn`}
    >
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    </a>
  )}
</div>
```
**Source:** [Meet the Team Section - Tailwindflex](https://tailwindflex.com/@markvaren/meet-the-team-section-with-team-member-cards), [Tailwind CSS Avatar - Flowbite](https://flowbite.com/docs/components/avatar/)

### Pattern 4: Equity Model Visual with 3 Value Props
**What:** Three-column layout with icons and key messages about the equity partnership.
**When to use:** Equity Model section - visual explainer with 3 key messages.
**Example:**
```astro
---
// src/components/sections/EquityModel.astro
import { getLangFromUrl, useTranslations } from '@i18n/utils';

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);

const props = [
  { key: 'noUpfront', icon: 'dollar-off' },
  { key: 'aligned', icon: 'handshake' },
  { key: 'partnership', icon: 'users' },
];
---

<section id="equity-model" class="py-16 sm:py-20 lg:py-24 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-3xl sm:text-4xl font-bold text-black text-center mb-4">
      {t('equity.title')}
    </h2>
    <p class="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
      {t('equity.subtitle')}
    </p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
      {props.map((prop) => (
        <div class="text-center">
          <div class="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-black rounded-full">
            <!-- Icon SVG here -->
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
              <!-- Path varies by icon -->
            </svg>
          </div>
          <h3 class="text-xl font-bold text-black mb-2">
            {t(`equity.${prop.key}.title`)}
          </h3>
          <p class="text-gray-600 leading-relaxed">
            {t(`equity.${prop.key}.description`)}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
```
**Source:** [Info Cards Grid with Icons - Tailwindflex](https://tailwindflex.com/@prajwal/info-cards-grid-with-icons)

### Pattern 5: Horizontal Process Flow (Stepper)
**What:** Three-step horizontal flow with connecting lines and content.
**When to use:** Process section - Discovery -> Build -> Scale.
**Example:**
```astro
---
// src/components/sections/Process.astro
import { getLangFromUrl, useTranslations } from '@i18n/utils';

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);

const steps = ['discovery', 'build', 'scale'];
---

<section id="process" class="py-16 sm:py-20 lg:py-24 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-3xl sm:text-4xl font-bold text-black text-center mb-12">
      {t('process.title')}
    </h2>

    <!-- Mobile: Vertical, Desktop: Horizontal -->
    <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-4">
      {steps.map((step, index) => (
        <div class="flex-1 relative">
          <!-- Step number circle -->
          <div class="flex items-center lg:flex-col lg:text-center mb-4 lg:mb-0">
            <div class="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
              {index + 1}
            </div>
            <!-- Connecting line (desktop only) -->
            {index < steps.length - 1 && (
              <div class="hidden lg:block absolute top-5 left-1/2 w-full h-0.5 bg-gray-200 -z-10" />
            )}
          </div>

          <div class="ml-14 lg:ml-0 lg:mt-4 lg:text-center">
            <h3 class="text-xl font-semibold text-black mb-2">
              {t(`process.${step}.title`)}
            </h3>
            <ul class="text-gray-600 text-sm space-y-1">
              <li>{t(`process.${step}.bullet1`)}</li>
              <li>{t(`process.${step}.bullet2`)}</li>
              <li>{t(`process.${step}.bullet3`)}</li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```
**Source:** [Tailwind CSS Stepper - Flowbite](https://flowbite.com/docs/components/stepper/)

### Pattern 6: Contact/CTA Section with Calendly Popup
**What:** Final CTA section with button that triggers Calendly popup widget.
**When to use:** Contact section - last section before footer.
**Example:**
```astro
---
// src/components/sections/Contact.astro
import { getLangFromUrl, useTranslations } from '@i18n/utils';

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);

// Calendly URL - will be replaced with actual URL
const calendlyUrl = 'https://calendly.com/whiteboard-co/30min';
---

<section id="contact" class="py-16 sm:py-20 lg:py-24 bg-black text-white">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 class="text-3xl sm:text-4xl font-bold mb-4">
      {t('contact.title')}
    </h2>
    <p class="text-lg text-gray-300 mb-8">
      {t('contact.subtitle')}
    </p>

    <button
      onclick={`Calendly.initPopupWidget({url: '${calendlyUrl}'}); return false;`}
      class="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-black bg-white rounded hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white"
    >
      {t('contact.cta')}
    </button>
  </div>
</section>

<!-- Calendly widget script - add to BaseLayout head -->
```

**Required in BaseLayout.astro head:**
```html
<link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
<script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript" async></script>
```
**Source:** [How to trigger Calendly popup widget with a button - Koravski](https://koravski.com/blog/how-to-trigger-calendly-popup-widget-with-a-button/)

### Anti-Patterns to Avoid
- **Too many items in grid:** 4 services maximum in a row; more than 4 creates cognitive overload.
- **Inconsistent card heights:** Use CSS Grid (not Flexbox) so cards stretch to equal height.
- **Heavy icon libraries:** Don't install Lucide/Heroicons for 6-8 icons; inline SVG is lighter.
- **Text-heavy sections:** Keep taglines under 15 words; process bullets under 10 words each.
- **Missing scroll-margin-top:** All section `id` elements need `scroll-margin-top: 5rem` (already in global.css).

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Avatar placeholders | Custom image generation | CSS initials circle with `rounded-full bg-gray-200` | Simple, fast, swap-ready for real photos |
| Process flow lines | Complex SVG connectors | CSS pseudo-elements or borders | Grid handles alignment automatically |
| Calendly scheduling | Custom booking form | Calendly popup widget | Handles timezone, availability, confirmation |
| Icon library | npm install heroicons | Inline SVG for 6-8 icons | Tree-shaking unnecessary for small count |
| Equal-height cards | JavaScript resize handlers | CSS Grid `grid-cols-*` | Grid stretches cards automatically |

**Key insight:** All section layouts can be built with Tailwind CSS Grid utilities. No JavaScript needed for layout responsiveness or card alignment.

## Common Pitfalls

### Pitfall 1: Spanish Text Breaking Card Layouts
**What goes wrong:** Service taglines or process bullets overflow card boundaries in Spanish.
**Why it happens:** Spanish text is 20-30% longer than English; fixed-width cards don't accommodate.
**How to avoid:**
- Use `text-sm` for taglines and bullets (smaller text wraps more gracefully)
- Test with Spanish translations during development
- Use `leading-relaxed` for multi-line text
- Avoid `max-w-*` on text containers inside cards
**Warning signs:** Uneven card heights, text truncation, horizontal scrollbars.

### Pitfall 2: Grid Columns Not Collapsing on Mobile
**What goes wrong:** 4-column grid looks cramped on mobile.
**Why it happens:** Missing responsive breakpoint classes.
**How to avoid:** Always use mobile-first pattern: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`
**Warning signs:** Cards too narrow on small screens, content unreadable.

### Pitfall 3: Calendly Script Not Loading
**What goes wrong:** Button click does nothing; console shows "Calendly is not defined".
**Why it happens:** Script tag missing from `<head>` or not loaded before click.
**How to avoid:**
- Add Calendly script and CSS to `BaseLayout.astro` head section
- Use `async` attribute for non-blocking load
- Test popup on both development and production builds
**Warning signs:** Console error on button click, popup never appears.

### Pitfall 4: Icons Not Scaling with Text
**What goes wrong:** Icons look too small or too large relative to headings.
**Why it happens:** Fixed icon sizes don't match responsive text sizes.
**How to avoid:** Use consistent icon size (w-6 h-6 for cards, w-8 h-8 for featured), don't make icons responsive
**Warning signs:** Visual imbalance between icon and text at certain breakpoints.

### Pitfall 5: Process Steps Misaligned on Tablet
**What goes wrong:** Horizontal flow looks broken on tablet (not quite desktop, not mobile).
**Why it happens:** Transition from vertical to horizontal at wrong breakpoint.
**How to avoid:** Use `lg:` breakpoint (1024px) for horizontal layout, vertical below
**Warning signs:** Three steps don't fit horizontally on tablet, wrapping occurs.

### Pitfall 6: Section Backgrounds Creating Visual Monotony
**What goes wrong:** All sections look the same; no visual rhythm.
**Why it happens:** Same background color on every section.
**How to avoid:** Alternate between `bg-white` and `bg-gray-50` for visual separation
**Warning signs:** Users lose sense of progress when scrolling, sections blur together.

## Code Examples

Verified patterns from official sources:

### Translation Strings Structure for Content Sections
```typescript
// src/i18n/ui.ts - Add these keys
export const ui = {
  en: {
    // ... existing keys

    // Services section
    'services.title': 'What We Do',
    'services.ventureLaunch.title': 'Venture Launch',
    'services.ventureLaunch.tagline': 'From idea to MVP in weeks, not months',
    'services.ventureScale.title': 'Venture Scale',
    'services.ventureScale.tagline': 'Grow your product with a technical co-founder',
    'services.aiEnablement.title': 'AI Enablement',
    'services.aiEnablement.tagline': 'Integrate AI to multiply your team\'s output',
    'services.integrations.title': 'Integrations',
    'services.integrations.tagline': 'Connect your tools for seamless workflows',

    // Team section
    'team.title': 'Who We Are',
    'team.member1.name': 'Founder Name',
    'team.member1.role': 'CEO & Co-Founder',
    'team.member2.name': 'Founder Name',
    'team.member2.role': 'CTO & Co-Founder',
    'team.member3.name': 'Founder Name',
    'team.member3.role': 'COO & Co-Founder',

    // Equity model section
    'equity.title': 'How We Partner',
    'equity.subtitle': 'We invest our expertise for equity. No invoices, no surprises.',
    'equity.noUpfront.title': 'No Upfront Cost',
    'equity.noUpfront.description': 'Keep your capital for growth. We build for equity.',
    'equity.aligned.title': 'Aligned Incentives',
    'equity.aligned.description': 'We succeed when you succeed. Skin in the game.',
    'equity.partnership.title': 'True Partnership',
    'equity.partnership.description': 'Co-founders, not vendors. Long-term commitment.',

    // Process section
    'process.title': 'How It Works',
    'process.discovery.title': 'Discovery',
    'process.discovery.bullet1': 'Understand your vision and goals',
    'process.discovery.bullet2': 'Define MVP scope together',
    'process.discovery.bullet3': 'Agree on equity structure',
    'process.build.title': 'Build',
    'process.build.bullet1': 'Weekly sprints with visible progress',
    'process.build.bullet2': 'Direct access to your tech team',
    'process.build.bullet3': 'Launch-ready in weeks',
    'process.scale.title': 'Scale',
    'process.scale.bullet1': 'Iterate based on user feedback',
    'process.scale.bullet2': 'Technical guidance as you grow',
    'process.scale.bullet3': 'Long-term partnership support',

    // Contact section
    'contact.title': 'Ready to Build Together?',
    'contact.subtitle': 'Book a 30-minute call to explore if we\'re a fit.',
    'contact.cta': 'Schedule a Call',
  },
  es: {
    // ... existing keys

    // Services section
    'services.title': 'Lo Que Hacemos',
    'services.ventureLaunch.title': 'Lanzamiento de Ventures',
    'services.ventureLaunch.tagline': 'De idea a MVP en semanas, no meses',
    'services.ventureScale.title': 'Escalamiento de Ventures',
    'services.ventureScale.tagline': 'Crece tu producto con un co-fundador tecnico',
    'services.aiEnablement.title': 'Habilitacion de IA',
    'services.aiEnablement.tagline': 'Integra IA para multiplicar la capacidad de tu equipo',
    'services.integrations.title': 'Integraciones',
    'services.integrations.tagline': 'Conecta tus herramientas para flujos de trabajo fluidos',

    // Team section
    'team.title': 'Quienes Somos',
    'team.member1.name': 'Nombre del Fundador',
    'team.member1.role': 'CEO y Co-Fundador',
    'team.member2.name': 'Nombre del Fundador',
    'team.member2.role': 'CTO y Co-Fundador',
    'team.member3.name': 'Nombre del Fundador',
    'team.member3.role': 'COO y Co-Fundador',

    // Equity model section
    'equity.title': 'Como Nos Asociamos',
    'equity.subtitle': 'Invertimos nuestra experiencia por equity. Sin facturas, sin sorpresas.',
    'equity.noUpfront.title': 'Sin Costo Inicial',
    'equity.noUpfront.description': 'Guarda tu capital para crecer. Construimos por equity.',
    'equity.aligned.title': 'Incentivos Alineados',
    'equity.aligned.description': 'Ganamos cuando ganas. Piel en el juego.',
    'equity.partnership.title': 'Verdadera Asociacion',
    'equity.partnership.description': 'Co-fundadores, no proveedores. Compromiso a largo plazo.',

    // Process section
    'process.title': 'Como Funciona',
    'process.discovery.title': 'Descubrimiento',
    'process.discovery.bullet1': 'Entendemos tu vision y metas',
    'process.discovery.bullet2': 'Definimos el alcance del MVP juntos',
    'process.discovery.bullet3': 'Acordamos la estructura de equity',
    'process.build.title': 'Construccion',
    'process.build.bullet1': 'Sprints semanales con progreso visible',
    'process.build.bullet2': 'Acceso directo a tu equipo tecnico',
    'process.build.bullet3': 'Listo para lanzar en semanas',
    'process.scale.title': 'Escala',
    'process.scale.bullet1': 'Iteramos basados en feedback de usuarios',
    'process.scale.bullet2': 'Guia tecnica mientras creces',
    'process.scale.bullet3': 'Soporte de asociacion a largo plazo',

    // Contact section
    'contact.title': 'Listo para Construir Juntos?',
    'contact.subtitle': 'Agenda una llamada de 30 minutos para explorar si somos compatibles.',
    'contact.cta': 'Agenda una Llamada',
  },
} as const;
```

### BaseLayout Head Addition for Calendly
```astro
<!-- Add to BaseLayout.astro inside <head> -->
<!-- Calendly widget scripts -->
<link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
<script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript" async></script>
```

### Index Page with All Sections
```astro
---
// src/pages/en/index.astro (and es/index.astro)
import BaseLayout from '@layouts/BaseLayout.astro';
import Hero from '@components/Hero.astro';
import Services from '@components/sections/Services.astro';
import Team from '@components/sections/Team.astro';
import EquityModel from '@components/sections/EquityModel.astro';
import Process from '@components/sections/Process.astro';
import Contact from '@components/sections/Contact.astro';
---

<BaseLayout>
  <Hero />
  <Services />
  <Team />
  <EquityModel />
  <Process />
  <Contact />
</BaseLayout>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| JavaScript carousel for services | CSS Grid, all visible | 2023+ | Better UX, no JS overhead |
| Modal contact forms | Calendly popup integration | 2024+ | Better conversion, handles complexity |
| Icon fonts (Font Awesome) | Inline SVG or tree-shaken components | 2022+ | Smaller bundle, better accessibility |
| Flexbox for equal-height cards | CSS Grid auto-stretch | 2021+ | Simpler code, automatic alignment |

**Deprecated/outdated:**
- Icon fonts: Use inline SVG or tree-shakeable icon components
- Fixed-width cards: Use CSS Grid for automatic equal sizing
- Custom booking forms: Use Calendly or Cal.com for scheduling

## Open Questions

Things that couldn't be fully resolved:

1. **Actual Calendly URL**
   - What we know: Calendly popup integration pattern is documented
   - What's unclear: The actual Whiteboard Calendly scheduling URL
   - Recommendation: Use placeholder URL, update before launch

2. **Team member details**
   - What we know: 3 co-founders, placeholder avatars, name + role only
   - What's unclear: Actual names, roles, and LinkedIn URLs
   - Recommendation: Use placeholder data in translations, update before launch

3. **LinkedIn links for team**
   - What we know: CRO best practice suggests social proof links help conversion
   - What's unclear: Whether to include LinkedIn links (marked as Claude's discretion)
   - Recommendation: Include optional LinkedIn prop, let planner decide

4. **Process section CTA**
   - What we know: CTA at end of Process is Claude's discretion
   - What's unclear: Whether to include (Contact section already has CTA)
   - Recommendation: Omit Process CTA to avoid redundancy; Contact section is the conversion point

## Sources

### Primary (HIGH confidence)
- [Tailwind CSS Grid Template Columns](https://tailwindcss.com/docs/grid-template-columns) - Responsive grid patterns
- [Tailwind CSS Stepper - Flowbite](https://flowbite.com/docs/components/stepper/) - Horizontal process flow
- [Tailwind CSS Avatar - Flowbite](https://flowbite.com/docs/components/avatar/) - Placeholder avatar patterns

### Secondary (MEDIUM confidence)
- [Feature/Icon Grid - Tailwindflex](https://tailwindflex.com/@arya/feature-icon-grid) - Service card patterns
- [Meet the Team Section - Tailwindflex](https://tailwindflex.com/@markvaren/meet-the-team-section-with-team-member-cards) - Team section layout
- [Calendly Popup Widget - Koravski](https://koravski.com/blog/how-to-trigger-calendly-popup-widget-with-a-button/) - Button-triggered popup
- [Lucide Astro](https://lucide.dev/guide/packages/lucide-astro) - Icon component usage

### Tertiary (LOW confidence)
- [Landing Page Best Practices 2026 - involve.me](https://www.involve.me/blog/landing-page-best-practices) - General design trends
- [Landing Page Design Trends 2026 - GDJ](https://graphicdesignjunction.com/2026/01/landing-page-design-trends-2026/) - Visual design trends

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All built-in Tailwind features, no new dependencies required
- Architecture patterns: HIGH - Well-documented CSS Grid and component patterns
- Pitfalls: HIGH - Common responsive layout issues with known solutions
- i18n integration: HIGH - Follows existing ui.ts pattern from Phase 2
- Calendly integration: MEDIUM - Pattern documented, actual URL unknown

**Research date:** 2026-01-20
**Valid until:** 2026-02-20 (30 days - stable patterns, no breaking changes expected)
