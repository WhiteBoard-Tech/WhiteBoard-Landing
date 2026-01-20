/**
 * Analytics setup for Plausible custom events
 * - Section visibility tracking
 * - Calendly booking conversion tracking
 */

const TRACKED_SECTIONS = ['services', 'team', 'equity-model', 'process', 'contact'];

function isCalendlyEvent(e: MessageEvent): boolean {
  return e.origin === 'https://calendly.com' &&
         typeof e.data?.event === 'string' &&
         e.data.event.startsWith('calendly.');
}

function setupCalendlyTracking(): void {
  window.addEventListener('message', (e) => {
    if (!isCalendlyEvent(e)) return;

    switch (e.data.event) {
      case 'calendly.event_scheduled':
        window.plausible?.('booking_confirmed');
        break;
      case 'calendly.date_and_time_selected':
        window.plausible?.('date_time_selected', { interactive: false });
        break;
    }
  });
}

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

        // Unobserve after first view to prevent duplicate events
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: '0px 0px -50% 0px', // Fire when 50% visible
      threshold: 0
    }
  );

  TRACKED_SECTIONS.forEach((id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}

export function setupAnalytics(): void {
  setupCalendlyTracking();
  setupSectionTracking();
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupAnalytics);
} else {
  setupAnalytics();
}
