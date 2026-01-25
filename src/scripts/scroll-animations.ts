/**
 * Scroll Animations - Powered by Anime.js v4 onScroll
 * Premium reveal effects synchronized with viewport
 */

import { animate, onScroll, stagger } from 'animejs';

// ═══════════════════════════════════════════════════════════
// SERVICES SECTION - Staggered Scroll Sync
// ═══════════════════════════════════════════════════════════

function initServicesAnimation() {
    const servicesSection = document.querySelector('#services');
    const cards = document.querySelectorAll('#services .grid > *');

    if (!servicesSection || cards.length === 0) return;

    // Animate cards based on scroll progress
    animate(cards, {
        opacity: [0, 1],
        translateY: [60, 0],
        scale: [0.9, 1],
        duration: 1, // Progress synchronized with scroll, duration acts as a multiplier if not using sync
        delay: stagger(0.1),
        autoplay: onScroll({
            target: servicesSection,
            enter: 'top 90%', // Starts when top of section is at 90% of viewport
            leave: 'top 20%', // Ends when top of section is at 20% of viewport
            sync: true,       // This is the "magic" - it links scroll % directly to animation %
        })
    });
}

// ═══════════════════════════════════════════════════════════
// SECTION TITLES - Fade In
// ═══════════════════════════════════════════════════════════

function initTitleAnimations() {
    const titles = document.querySelectorAll('section h2');

    titles.forEach(title => {
        animate(title, {
            opacity: [0, 1],
            translateY: [30, 0],
            autoplay: onScroll({
                target: title,
                enter: 'top 95%',
                leave: 'top 70%',
                sync: true
            })
        });
    });
}

// ═══════════════════════════════════════════════════════════
// INITIALIZE
// ═══════════════════════════════════════════════════════════

function init() {
    initServicesAnimation();
    initTitleAnimations();
}

// Run on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Support for Astro View Transitions
document.addEventListener('astro:page-load', init);
document.addEventListener('astro:after-swap', init);
