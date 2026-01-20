# Phase 5: Polish and Launch - Context

**Gathered:** 2026-01-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Optimize performance to meet Core Web Vitals targets (Lighthouse 90+, LCP < 2.5s, CLS < 0.1) and deploy to production on Vercel. The site goes live and becomes accessible to users.

</domain>

<decisions>
## Implementation Decisions

### Optimization approach
- Use Astro Image component for automatic WebP/AVIF conversion and responsive srcset
- Target Lighthouse 90+ — stop optimizing once target is met, don't over-engineer
- Run bundle analysis and tree-shake any unused code
- No known performance issues currently — site feels fast

### Deployment config
- Deploy to Vercel subdomain first (*.vercel.app), custom domain added later
- Root URL (/) should detect Accept-Language header and redirect to /es/ or /en/ accordingly
- Environment variable needed: Calendly URL for production (replace placeholder)
- Enable automatic preview deployments for every PR/branch

### Pre-launch checks
- Test on real mobile device as final check (DevTools first, then actual phone)
- Only my approval needed — no external stakeholders

### Post-launch monitoring
- Start with Plausible only — add more tracking later based on what we learn
- A/B testing is a possibility for the future but no immediate plans

### Claude's Discretion
- Browser coverage for testing (Claude picks reasonable set for a landing page)
- Critical path checklist (Claude creates reasonable verification flow)
- Error tracking decision (Sentry or skip based on site complexity)
- Uptime monitoring decision (extra monitoring or trust Vercel)

</decisions>

<specifics>
## Specific Ideas

- LatAm founders are primary audience, but browser detection handles language routing
- Landing page is minimal — shouldn't need heavy error tracking infrastructure

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 05-polish-and-launch*
*Context gathered: 2026-01-20*
