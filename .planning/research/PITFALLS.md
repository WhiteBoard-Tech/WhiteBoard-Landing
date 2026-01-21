# Domain Pitfalls: Portfolio and Testimonials Sections

**Project:** Whiteboard Landing Page - Portfolio & Testimonials Milestone
**Scope:** Adding portfolio/case studies and testimonials sections to existing B2B landing page
**Researched:** 2026-01-20
**Confidence:** HIGH (verified with official docs and multiple sources)

## Context

Existing site characteristics that constrain new feature implementation:
- Zero-JS architecture (currently only Calendly widget loaded on-demand)
- Lighthouse 90+ performance score to maintain
- Bilingual (EN/ES) with structured i18n system in `src/i18n/ui.ts`
- Static site built with Astro, deployed on Vercel
- Current sections: Hero, Services, Team, Equity Model, Process, Contact

---

## Critical Pitfalls

Mistakes that cause performance degradation, rewrites, or major conversion issues.

---

### Pitfall 1: Unoptimized Portfolio Images Tank Performance

**What goes wrong:** Adding portfolio screenshots and case study images without proper optimization destroys the Lighthouse score. Common mistake is adding 5-10 high-resolution project screenshots that collectively add 2-5MB to page weight.

**Why it happens:** Developers add images directly without using Astro's Image component, skip WebP/AVIF conversion, forget width/height attributes, or don't implement lazy loading for below-fold images.

**Consequences:**
- Lighthouse performance drops from 90+ to 50-60
- Core Web Vitals fail (LCP > 2.5s, CLS > 0.1)
- Google ranking penalty
- Mobile users abandon slow-loading page

**Warning signs:**
- Images added as plain `<img>` tags instead of Astro `<Image />`
- No width/height attributes specified
- Images in PNG/JPG format rather than WebP
- All images loading eagerly regardless of viewport position
- Portfolio section placed above the fold

**Prevention:**
1. Use Astro's built-in `<Image />` component for all portfolio images
2. Always specify width and height attributes to prevent CLS
3. Set `loading="lazy"` for images below the fold
4. Use `fetchpriority="high"` only for hero image (already set)
5. Convert to WebP format (averages 16% of original PNG size)
6. Place portfolio section below the fold

```astro
<!-- CORRECT: Astro Image component with proper attributes -->
---
import { Image } from 'astro:assets';
import projectImage from '../assets/portfolio/project-1.png';
---
<Image
  src={projectImage}
  alt="Project name - brief description"
  width={800}
  height={600}
  loading="lazy"
  format="webp"
/>
```

**Detection:** Run Lighthouse before/after adding each image batch. Target: no more than 5-point drop.

**Phase to address:** Portfolio Design phase - establish image handling patterns before content creation

**Sources:**
- [Astro Images Documentation](https://docs.astro.build/en/guides/images/)
- [Smashing Magazine: How to Fix CLS Issues](https://www.smashingmagazine.com/2021/06/how-to-fix-cumulative-layout-shift-issues/)

---

### Pitfall 2: Logo Wall JavaScript Carousel Destroys Zero-JS Architecture

**What goes wrong:** Implementing client logo wall as an auto-scrolling JavaScript carousel breaks the zero-JS architecture and introduces multiple performance problems.

**Why it happens:** Carousels are the "default" solution for logo walls, and many tutorials recommend libraries like Owl Carousel or Slick that require JavaScript.

**Consequences:**
- Introduces JS dependency for a non-essential feature
- Owl Carousel specifically hides content on initial load, causing massive CLS
- Carousel animations using position/left properties cause continuous layout shifts
- Auto-play carousels can cause infinite CLS accumulation
- Breaks progressive enhancement principle

**Warning signs:**
- Any npm package added for "carousel" or "slider"
- JavaScript that manipulates element position properties
- Logo container that's empty/hidden on first render
- Animating left/top/width instead of transform properties

**Prevention:**
1. Use pure CSS logo grid - no carousel needed for 4-8 logos
2. If animation desired, use CSS-only infinite scroll with `transform: translateX()` (not position)
3. For many logos, use CSS Grid with `overflow-x: auto` for horizontal scroll
4. Reserve space with explicit dimensions to prevent CLS
5. Ensure logos visible on initial HTML render (no JS required)

```css
/* CSS-only logo scroll animation (if animation desired) */
.logo-track {
  display: flex;
  animation: scroll 20s linear infinite;
}

@keyframes scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

/* Or simpler: static CSS Grid */
.logo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 2rem;
  align-items: center;
}
```

**Detection:** Check if page works with JavaScript disabled. Logo wall should be fully visible.

**Phase to address:** Testimonials Design phase - define logo wall pattern early

**Sources:**
- [OSC Professionals: Best Practices for Carousels](https://www.oscprofessionals.com/blog/best-practices-for-carousels-with-respect-to-core-web-vitals/)
- [Smashing Magazine: CLS Issues](https://www.smashingmagazine.com/2021/06/how-to-fix-cumulative-layout-shift-issues/)

---

### Pitfall 3: Breaking Bilingual Parity

**What goes wrong:** Adding portfolio and testimonials content only in English, or with inconsistent Spanish translations, creates a disjointed experience for Spanish-speaking users.

**Why it happens:**
- Portfolio case studies are often received in English from clients
- Testimonial quotes are harder to translate (voice must be preserved)
- Developers forget to update both language files
- No automated check for translation completeness

**Consequences:**
- Spanish users see broken/missing content
- SEO penalty for incomplete language versions
- Brand trust erosion in LatAm target market
- Inconsistent metadata hurts search visibility

**Warning signs:**
- New keys added to English `ui.ts` but not Spanish
- Case study links pointing to English-only pages
- Testimonial quotes without Spanish equivalents
- Images containing English text used on Spanish version

**Prevention:**
1. Add all new translation keys to BOTH `en` and `es` objects in `src/i18n/ui.ts` simultaneously
2. Create localized versions of case study content (at minimum: title, summary, results)
3. For testimonials: use professional translation that preserves speaker's voice
4. Audit: count keys in both language sections to ensure parity
5. Never use text baked into images - use separate text overlays that can be translated

```typescript
// In src/i18n/ui.ts - add to BOTH sections simultaneously
en: {
  // ... existing keys
  "portfolio.title": "Our Work",
  "portfolio.project1.title": "FinTech MVP Launch",
  "portfolio.project1.summary": "Built payment platform in 8 weeks",
  "testimonials.quote1.text": "Whiteboard transformed our idea into reality.",
  "testimonials.quote1.author": "Jane Doe, CEO at TechCorp",
},
es: {
  // ... existing keys
  "portfolio.title": "Nuestro Trabajo",
  "portfolio.project1.title": "Lanzamiento MVP FinTech",
  "portfolio.project1.summary": "Plataforma de pagos construida en 8 semanas",
  "testimonials.quote1.text": "Whiteboard transformo nuestra idea en realidad.",
  "testimonials.quote1.author": "Jane Doe, CEO en TechCorp",
},
```

**Detection:** Create a simple script that compares key counts between language objects.

**Phase to address:** Content Strategy phase - require bilingual content from the start

**Sources:**
- [MotionPoint: Multilingual Website Best Practices](https://www.motionpoint.com/blog/best-practices-for-multilingual-websites-with-examples/)
- [BLEND: Common Multilingual Mistakes](https://www.getblend.com/blog/common-mistakes-to-avoid-when-building-a-multilingual-website/)

---

### Pitfall 4: Expandable Testimonials Without Accessibility

**What goes wrong:** Implementing expandable/collapsible testimonial quotes without proper keyboard navigation and ARIA attributes excludes users with disabilities and potentially violates accessibility requirements.

**Why it happens:**
- Developers use `<div onclick>` instead of `<button>`
- Missing aria-expanded state announcements
- Collapsed content still reachable by screen readers
- No keyboard support for Enter/Space to toggle

**Consequences:**
- Screen reader users can't understand collapsed/expanded state
- Keyboard users can't interact with expand/collapse
- Hidden content announced by screen readers (confusing)
- Potential ADA compliance issues for B2B clients

**Warning signs:**
- Clickable elements that aren't `<button>` or `<a>`
- No aria-expanded attribute on toggle element
- Using CSS `display: none` without `hidden` attribute
- No focus styles on interactive elements
- Can't toggle testimonials with keyboard

**Prevention:**
1. Use native `<details>` and `<summary>` elements when possible (built-in accessibility)
2. If custom: use `<button>` with aria-expanded, aria-controls
3. Apply `hidden` attribute to collapsed content (not just CSS)
4. Support keyboard: Enter/Space to toggle, Tab to navigate
5. Visible focus indicators on all interactive elements
6. Test with screen reader (NVDA or VoiceOver)

```astro
<!-- BEST: Native HTML - no JS required, accessible by default -->
<details class="testimonial-expandable">
  <summary class="testimonial-preview">
    "Whiteboard transformed our idea into reality..."
    <span class="read-more">Read full testimonial</span>
  </summary>
  <blockquote class="testimonial-full">
    <p>"Whiteboard transformed our idea into reality. In just 8 weeks,
    we went from napkin sketch to live product with paying customers.
    Their equity model meant we kept our capital for growth."</p>
    <cite>Jane Doe, CEO at TechCorp</cite>
  </blockquote>
</details>

<!-- ALTERNATIVE: Custom with proper ARIA (if more control needed) -->
<div class="testimonial">
  <blockquote class="testimonial-preview">
    "Whiteboard transformed our idea..."
  </blockquote>
  <button
    type="button"
    aria-expanded="false"
    aria-controls="testimonial-1-full"
    class="testimonial-toggle"
  >
    Read more
  </button>
  <div id="testimonial-1-full" hidden>
    <!-- Full testimonial content -->
  </div>
</div>
```

**Detection:** Tab through page with keyboard only. Use browser's accessibility inspector.

**Phase to address:** Testimonials Implementation phase - establish component pattern with accessibility built-in

**Sources:**
- [A11Y Collective: Accessible Accordion](https://www.a11y-collective.com/blog/accessible-accordion/)
- [USWDS: Accordion Accessibility Tests](https://designsystem.digital.gov/components/accordion/accessibility-tests/)
- [216 Digital: Accordion Accessibility Fixes](https://216digital.com/accordion-accessibility-common-issues-fixes/)

---

## Moderate Pitfalls

Mistakes that cause delays, technical debt, or suboptimal conversion.

---

### Pitfall 5: Generic Testimonials That Don't Convert

**What goes wrong:** Displaying vague testimonials like "Great team to work with!" that provide no specific value proposition or business outcome.

**Why it happens:**
- Clients give short, generic feedback
- No structured testimonial collection process
- Fear of asking for specific metrics
- Copying competitor's format without thought

**Consequences:**
- Testimonials fail to build trust (90% of B2B buyers trust peer reviews, but generic ones don't count)
- Missed opportunity to reinforce value proposition
- Lower conversion rate on CTA

**Warning signs:**
- Testimonials under 2 sentences
- No specific outcomes or metrics mentioned
- No company name or role of testimonial giver
- All testimonials sound similar
- No photos/real names (anonymous = less trust)

**Prevention:**
1. Collect testimonials with specific prompts: "What was your situation before? What specific outcome did you achieve?"
2. Include: full name, role, company, photo (with permission)
3. Highlight specific metrics when available ("40% faster launch", "$200K saved")
4. Show the before/after transformation
5. Vary testimonial content to address different objections

**Testimonial collection template:**
```
1. What challenge were you facing before working with us?
2. What specific results did you achieve? (metrics if possible)
3. What surprised you most about working with us?
4. What would you tell someone considering working with us?
```

**Detection:** Does each testimonial answer "Why should I trust this company?" with specifics?

**Phase to address:** Content Strategy phase - create testimonial collection template

**Sources:**
- [Testimonial Hero: B2B Testimonial Mistakes](https://www.testimonialhero.com/blog/5-mistakes-youre-making-when-asking-b2b-customers-for-a-testimonial)
- [B2B Rocket: Customer Testimonial Impact](https://www.b2brocket.ai/blog-posts/analyzing-customer-testimonial-impact-on-b2b-conversions)

---

### Pitfall 6: Portfolio Without Business Context

**What goes wrong:** Showing portfolio as a gallery of pretty screenshots without explaining the business problem solved or results achieved.

**Why it happens:**
- Design-focused teams prioritize visuals over outcomes
- Clients don't share business metrics
- Treating portfolio like a design showcase, not a sales tool

**Consequences:**
- Visitors see work but don't understand value
- No differentiation from other agencies
- B2B buyers (who care about ROI) don't convert
- Decision-makers scanning for business impact scroll past

**Warning signs:**
- Case studies that are just image galleries
- No problem/solution/result structure
- Missing client industry or use case context
- No metrics or outcomes mentioned
- All projects look the same (no variety)

**Prevention:**
1. Structure each case study: Challenge -> Approach -> Results
2. Include at least one quantified outcome per project
3. Name the industry/vertical for each project
4. Show 2-3 images max, with captions explaining what's shown
5. Lead with the business outcome, not the visual

```markdown
## Case Study Structure Template

### [Project Name] - [Industry]
**Challenge:** [1-2 sentences: What problem did the client face?]

**Approach:** [1-2 sentences: What did we build/do?]

**Results:**
- [Specific metric 1]
- [Specific metric 2]
- [Timeline: "Launched in X weeks"]

[1-2 project screenshots with descriptive captions]
```

**Detection:** Can someone understand the value delivered in 10 seconds?

**Phase to address:** Portfolio Design phase - establish case study template before content creation

**Sources:**
- [Hotjar: Landing Page Optimization Examples](https://www.hotjar.com/landing-page-optimization/examples/)
- [Roast My Landing Page: Case Study Examples](https://blog.roastmylandingpage.com/case-study-landing-page-examples/)

---

### Pitfall 7: Client Logo Usage Without Permission

**What goes wrong:** Displaying client logos on the logo wall without explicit written permission, leading to legal issues or damaged relationships.

**Why it happens:**
- Assumption that being a client implies permission
- No formal permission process
- Rushing to populate logo wall
- Copying logos from client websites

**Consequences:**
- Trademark infringement liability
- Client relationship damage (some clients don't want to be public references)
- Having to quickly remove logos (embarrassing)
- Disqualification from future work

**Warning signs:**
- No permission documentation on file
- Logos downloaded from Google Images
- Using full-color logos when only grayscale was approved
- Including clients who specifically asked for confidentiality

**Prevention:**
1. Create a simple logo permission template (email is fine)
2. Track permissions in a shared document
3. Ask during project wrap-up: "May we feature your logo on our website?"
4. Clarify if grayscale-only or full color is approved
5. Some clients prefer testimonial over logo - offer choice

**Simple permission request template:**
```
Subject: Permission to feature [Company] on our website

Hi [Contact],

We're updating our website and would love to include [Company]
in our client showcase. This would include:

[ ] Your company logo on our "Trusted By" section
[ ] A brief testimonial quote (we can draft for your approval)
[ ] Neither (we understand confidentiality needs)

Please let us know which you're comfortable with.

Thanks!
```

**Detection:** Can you produce written permission for every logo displayed?

**Phase to address:** Content Strategy phase - establish permission process before collecting assets

**Sources:**
- [Idea Grove: B2B Client Logos Guide](https://www.ideagrove.com/blog/the-ultimate-guide-to-displaying-b2b-client-logos-on-your-website)
- [Serenity CRM: Logo Legal Risks](https://www.serenitycrm.io/navigating-the-risks-and-legalities-of-using-client-logos-and-trademarks-in-marketing-materials)

---

### Pitfall 8: Social Proof Isolated in Single Section

**What goes wrong:** Placing all testimonials and logos in one section that users may never scroll to, missing opportunities to reinforce trust at decision points.

**Why it happens:**
- Standard website templates have dedicated "Testimonials" section
- Fear of cluttering other sections
- Not thinking about user journey

**Consequences:**
- Users who don't scroll miss all social proof
- No trust reinforcement near CTAs
- Conversion rates lower than potential (Optimizely found 69% lift from better logo placement)

**Warning signs:**
- Single testimonials section at bottom of page
- No logos or quotes near hero CTA
- Contact section has no social proof nearby
- User journey has "trust gaps"

**Prevention:**
1. Place logo wall in or near hero section (visible without scroll)
2. Add 1-2 testimonial snippets near key CTAs
3. Sprinkle social proof throughout the page, not just one section
4. Consider testimonial pull-quotes between sections
5. A/B test placement

```
Current page structure with social proof integration:

- Hero (add: small "Trusted by" logo row)
- Services
- Team
- Equity Model (add: mini testimonial about trust/partnership)
- Process
- [NEW] Portfolio/Case Studies
- [NEW] Testimonials (detailed section)
- Contact (add: 1 testimonial about results)
```

**Detection:** Map the page sections. Is there social proof visible at each decision point?

**Phase to address:** Page Structure phase - plan social proof placement holistically

**Sources:**
- [Moosend: Landing Page Mistakes](https://moosend.com/blog/landing-page-mistakes/)
- [Zoho: Landing Page Mistakes](https://www.zoho.com/landingpage/landing-page-mistakes.html)

---

## Minor Pitfalls

Annoyances that are fixable but worth avoiding.

---

### Pitfall 9: Inconsistent Logo Sizing and Alignment

**What goes wrong:** Logo wall looks unprofessional because logos are different sizes, some are fuzzy, colors don't match the page aesthetic.

**Prevention:**
1. Set consistent height constraint for all logos (e.g., 40px height)
2. Convert all logos to grayscale for visual consistency
3. Use SVG format when available for crisp rendering at any size
4. Add consistent padding/spacing between logos
5. Consider responsive behavior (fewer logos visible on mobile, or smaller)

```css
.logo-wall img {
  height: 40px;
  width: auto;
  filter: grayscale(100%);
  opacity: 0.7;
  transition: opacity 0.2s;
}

.logo-wall img:hover {
  opacity: 1;
}
```

---

### Pitfall 10: Case Study Links to Separate Pages Break Flow

**What goes wrong:** Each case study clicks through to a separate page, breaking the single-page flow and requiring navigation back.

**Prevention:**
1. For landing page, keep case studies as expandable cards (no separate pages)
2. If separate pages needed, use modal overlay instead of navigation
3. Ensure "back" experience is seamless
4. Consider: does the detail really need a separate page, or can summary suffice?

---

### Pitfall 11: Testimonial Photos That Look Fake

**What goes wrong:** Using stock photos for testimonials instead of real client photos destroys trust.

**Prevention:**
1. Only use real photos with permission
2. If no photo available, use company logo or initials (like current team section pattern)
3. Never use obviously stock photos
4. Consistent photo treatment (circular crop, consistent size, subtle border)

---

### Pitfall 12: Testimonials Without Attribution Context

**What goes wrong:** Quote says great things but reader doesn't know who said it or why they should care.

**Prevention:**
1. Always include: full name, job title, company name
2. Add company logo next to testimonial if available
3. For high-value testimonials, include headshot
4. Consider adding "Founder of [notable company]" or "[company raised $XM]" for credibility

---

## Phase-Specific Warnings

| Phase | Likely Pitfall | Mitigation |
|-------|---------------|------------|
| Content Strategy | Pitfall 3 (bilingual), Pitfall 5 (generic testimonials), Pitfall 7 (permissions) | Create checklists and templates before collecting content |
| Portfolio Design | Pitfall 1 (images), Pitfall 6 (no context) | Establish case study structure and image optimization pipeline first |
| Testimonials Design | Pitfall 2 (carousel), Pitfall 4 (accessibility) | Decide on CSS-only logo wall, use native `<details>` for expandable quotes |
| Page Structure | Pitfall 8 (isolated social proof) | Map social proof placement across full page before building |
| Implementation | All performance pitfalls | Run Lighthouse after each section, maintain 90+ score |
| Testing | Pitfall 3 (bilingual parity) | Test complete user journey in both EN and ES |

---

## Integration Warnings for Existing Architecture

### i18n Integration
The existing `src/i18n/ui.ts` file has a clear pattern. New sections must:
- Add all keys to BOTH `en` and `es` objects
- Follow existing naming convention (e.g., `portfolio.title`, `testimonials.quote1.text`)
- Keep translations in sync - consider a pre-commit hook

### Performance Budget
Current site has near-zero JavaScript. New sections should:
- Use only Astro components (no client-side frameworks)
- If any interactivity needed, use `<details>/<summary>` or CSS-only solutions
- Any new JS must be loaded on-demand (like Calendly widget pattern in existing Contact section)

### Image Handling
Existing hero uses `loading="eager"` and `fetchpriority="high"`. New images should:
- Use `loading="lazy"` for anything below fold
- Always include width/height attributes
- Use Astro's `<Image />` component for automatic optimization

### Component Pattern
Follow existing component structure in `src/components/sections/`:
- Create `Portfolio.astro` and `Testimonials.astro`
- Use same Tailwind utility patterns
- Accept `lang` prop for i18n compatibility

---

## Quick Reference Checklist

Before merging portfolio/testimonials sections:

**Performance:**
- [ ] All portfolio images optimized (WebP via Astro Image)
- [ ] Width/height specified on all images
- [ ] Lazy loading on below-fold images
- [ ] Logo wall works without JavaScript
- [ ] Lighthouse score still 90+ after additions
- [ ] CLS score under 0.1

**Content:**
- [ ] All translation keys added to both EN and ES
- [ ] Written permission documented for each client logo
- [ ] Testimonials include name, role, company
- [ ] Case studies have Challenge/Approach/Results structure

**Accessibility:**
- [ ] Expandable elements use `<details>` or proper ARIA
- [ ] Keyboard navigation tested (Tab, Enter, Space)
- [ ] Focus styles visible on interactive elements

**Conversion:**
- [ ] Social proof visible near CTAs (not just in one section)
- [ ] Logo wall visible without scrolling (near hero)
- [ ] At least one testimonial near contact CTA

---

## Sources

### Performance and Images
- [Astro Images Documentation](https://docs.astro.build/en/guides/images/)
- [Smashing Magazine: How to Fix CLS Issues](https://www.smashingmagazine.com/2021/06/how-to-fix-cumulative-layout-shift-issues/)
- [Perfmatters: CLS on WordPress](https://perfmatters.io/docs/cumulative-layout-shift/)
- [OSC Professionals: Carousels and Core Web Vitals](https://www.oscprofessionals.com/blog/best-practices-for-carousels-with-respect-to-core-web-vitals/)

### Testimonials and Conversion
- [Testimonial Hero: B2B Testimonial Mistakes](https://www.testimonialhero.com/blog/5-mistakes-youre-making-when-asking-b2b-customers-for-a-testimonial)
- [B2B Rocket: Customer Testimonial Impact](https://www.b2brocket.ai/blog-posts/analyzing-customer-testimonial-impact-on-b2b-conversions)
- [Hotjar: Landing Page Optimization Examples](https://www.hotjar.com/landing-page-optimization/examples/)
- [Moosend: Landing Page Mistakes 2026](https://moosend.com/blog/landing-page-mistakes/)

### Logo Wall and Legal
- [Idea Grove: B2B Client Logos Guide](https://www.ideagrove.com/blog/the-ultimate-guide-to-displaying-b2b-client-logos-on-your-website)
- [Serenity CRM: Logo Legal Risks](https://www.serenitycrm.io/navigating-the-risks-and-legalities-of-using-client-logos-and-trademarks-in-marketing-materials)

### Accessibility
- [A11Y Collective: Accessible Accordion](https://www.a11y-collective.com/blog/accessible-accordion/)
- [USWDS: Accordion Accessibility Tests](https://designsystem.digital.gov/components/accordion/accessibility-tests/)
- [216 Digital: Accordion Accessibility Fixes](https://216digital.com/accordion-accessibility-common-issues-fixes/)

### Multilingual/i18n
- [MotionPoint: Multilingual Website Best Practices](https://www.motionpoint.com/blog/best-practices-for-multilingual-websites-with-examples/)
- [BLEND: Common Multilingual Mistakes](https://www.getblend.com/blog/common-mistakes-to-avoid-when-building-a-multilingual-website/)

### Landing Page Conversion
- [Roast My Landing Page: Case Study Examples](https://blog.roastmylandingpage.com/case-study-landing-page-examples/)
- [Zoho: Landing Page Mistakes](https://www.zoho.com/landingpage/landing-page-mistakes.html)
