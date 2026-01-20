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
  },
} as const;

export type TranslationKey = keyof (typeof ui)[typeof defaultLang];
