// Translation strings for all locales
// Add new keys here, then use t("key") in components

export const languages = {
  en: "English",
  es: "Espanol",
} as const;

export const defaultLang = "en" as const;

export type Lang = keyof typeof languages;

export const ui = {
  en: {
    // Site metadata
    "site.title": "Whiteboard",
    "site.description": "We build tech equity partnerships with ambitious founders",

    // Navigation
    "nav.home": "Home",

    // Placeholder content (for foundation testing)
    "placeholder.heading": "Building the Future Together",
    "placeholder.subheading": "Tech partnership for ambitious founders",
    "placeholder.cta": "Schedule a Call",
    "placeholder.language": "Language",

    // Common
    "common.loading": "Loading...",

    // Hero section
    "hero.headline": "Your Tech Co-Founder",
    "hero.subheadline": "We build your product for equity. No hourly rates. No endless invoices. Just aligned incentives and real outcomes.",
    "hero.cta.primary": "Book a 30-min Call",
    "hero.cta.secondary": "Watch How It Works",

    // Footer
    "footer.copyright": "All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
  },
  es: {
    // Site metadata
    "site.title": "Whiteboard",
    "site.description": "Construimos asociaciones de capital tecnologico con fundadores ambiciosos",

    // Navigation
    "nav.home": "Inicio",

    // Placeholder content (for foundation testing)
    "placeholder.heading": "Construyendo el Futuro Juntos",
    "placeholder.subheading": "Asociacion tecnologica para fundadores ambiciosos",
    "placeholder.cta": "Agendar una Llamada",
    "placeholder.language": "Idioma",

    // Common
    "common.loading": "Cargando...",

    // Hero section
    "hero.headline": "Tu Socio Tecnologico",
    "hero.subheadline": "Construimos tu producto a cambio de equity. Sin tarifas por hora. Sin facturas interminables. Solo incentivos alineados y resultados reales.",
    "hero.cta.primary": "Agenda una Llamada de 30 min",
    "hero.cta.secondary": "Mira Como Funciona",

    // Footer
    "footer.copyright": "Todos los derechos reservados.",
    "footer.privacy": "Politica de Privacidad",
    "footer.terms": "Terminos de Servicio",
  },
} as const;

export type TranslationKey = keyof (typeof ui)[typeof defaultLang];
