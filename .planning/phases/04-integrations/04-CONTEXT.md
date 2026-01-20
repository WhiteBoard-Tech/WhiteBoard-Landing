# Phase 4: Integrations - Context

**Gathered:** 2026-01-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Connect Calendly scheduling and Plausible analytics — the mechanisms that turn visitor interest into tracked conversions. Calendly opens as a lazy-loaded popup on CTA click, displays in page locale, and fires conversion events to Plausible.

</domain>

<decisions>
## Implementation Decisions

### Calendly behavior
- Light blur backdrop behind popup (dims page content slightly)
- Lazy-load Calendly widget on click, not on page load

### Analytics events
- Track CTA clicks (Schedule a Call button)
- Track scroll milestones (50%, 100% of page)
- Track section views (Services, Team, Process, Contact visible in viewport)
- Track both `popup_opened` and `booking_confirmed` as separate events (funnel analysis)

### Locale handling
- Calendly link setup TBD — build flexibility for either single link with locale param or separate links per language
- Pass page locale to Calendly widget

### Claude's Discretion
- Loading state approach (spinner in popup vs button loading state)
- Popup close behavior (X button, Escape key, backdrop click combinations)
- Mobile popup behavior (full-screen vs scaled popup)
- Language fallback if Calendly doesn't support locale
- Whether to include locale as event property (URL already captures it)
- Whether to track language switcher clicks
- Whether to pass UTM parameters to Calendly
- Booking confirmation email language (may be Calendly-controlled)

</decisions>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches for Calendly embed and Plausible integration.

</specifics>

<deferred>
## Deferred Ideas

- **Social proof section** — mock/sample testimonials, client logos, or case study snippets (content section, not integration)

</deferred>

---

*Phase: 04-integrations*
*Context gathered: 2026-01-20*
