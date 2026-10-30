/**
 * Analytics setup for Plausible custom events
 * - Section visibility tracking
 */

const TRACKED_SECTIONS = ['services', 'team', 'equity-model', 'process', 'contact'];

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
  setupSectionTracking();
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupAnalytics);
} else {
  setupAnalytics();
}
