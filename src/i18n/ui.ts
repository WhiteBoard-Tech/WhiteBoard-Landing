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
    "hero.headline": "We Build Your Technology for Equity. Your Venture Tech Partner.",
    "hero.subheadline": "CTO + dedicated squad. 60% of platform ready on day one. Full technical leadership — our success is tied to yours.",
    "hero.cta.primary": "Apply for Venture Evaluation",
    "hero.cta.secondary": "Watch How It Works",
    "hero.microcopy": "Only 3-5 ventures selected per year",
    "hero.logos.label": "Trusted by",

    // Footer
    "footer.copyright": "All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",

    // Services section
    "services.title": "What We Do",
    "services.ventureLaunch.title": "Venture Launch",
    "services.ventureLaunch.tagline": "From idea to MVP in weeks, not months",
    "services.ventureScale.title": "Venture Scale",
    "services.ventureScale.tagline": "Grow your product with a technical co-founder",
    "services.aiEnablement.title": "AI Enablement",
    "services.aiEnablement.tagline": "Integrate AI to multiply your team's output",
    "services.integrations.title": "Integrations",
    "services.integrations.tagline": "Connect your tools for seamless workflows",

    // Team section
    "team.title": "Who We Are",
    "team.subtitle": "Three co-founders building the future of tech partnerships",
    "team.member1.name": "Founder Name",
    "team.member1.role": "CEO & Co-Founder",
    "team.member1.initials": "FN",
    "team.member2.name": "Founder Name",
    "team.member2.role": "CTO & Co-Founder",
    "team.member2.initials": "FN",
    "team.member3.name": "Founder Name",
    "team.member3.role": "COO & Co-Founder",
    "team.member3.initials": "FN",

    // Equity model section
    "equity.title": "How We Partner",
    "equity.subtitle": "We invest our expertise for equity. No invoices, no surprises.",
    "equity.noUpfront.title": "No Upfront Cost",
    "equity.noUpfront.description": "Keep your capital for growth. We build for equity.",
    "equity.aligned.title": "Aligned Incentives",
    "equity.aligned.description": "We succeed when you succeed. Skin in the game.",
    "equity.partnership.title": "True Partnership",
    "equity.partnership.description": "Co-founders, not vendors. Long-term commitment.",

    // Process section
    "process.title": "How It Works",
    "process.discovery.title": "Discovery",
    "process.discovery.bullet1": "Understand your vision and goals",
    "process.discovery.bullet2": "Define MVP scope together",
    "process.discovery.bullet3": "Agree on equity structure",
    "process.build.title": "Build",
    "process.build.bullet1": "Weekly sprints with visible progress",
    "process.build.bullet2": "Direct access to your tech team",
    "process.build.bullet3": "Launch-ready in weeks",
    "process.scale.title": "Scale",
    "process.scale.bullet1": "Iterate based on user feedback",
    "process.scale.bullet2": "Technical guidance as you grow",
    "process.scale.bullet3": "Long-term partnership support",

    // Contact section
    "contact.title": "Ready to Build Together?",
    "contact.subtitle": "Book a 30-minute call to explore if we're a fit.",
    "contact.cta": "Schedule a Call",
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
    "hero.headline": "Construimos tu Tecnología a cambio de Equity. Tu Venture Tech Partner.",
    "hero.subheadline": "CTO + squad dedicado. 60% de plataforma lista desde el día uno. Liderazgo técnico completo — nuestro éxito está atado al tuyo.",
    "hero.cta.primary": "Aplicar para Evaluación de Venture",
    "hero.cta.secondary": "Mira Como Funciona",
    "hero.microcopy": "Solo 3-5 ventures seleccionados por año",
    "hero.logos.label": "Respaldado por",

    // Footer
    "footer.copyright": "Todos los derechos reservados.",
    "footer.privacy": "Politica de Privacidad",
    "footer.terms": "Terminos de Servicio",

    // Services section
    "services.title": "Lo Que Hacemos",
    "services.ventureLaunch.title": "Lanzamiento de Ventures",
    "services.ventureLaunch.tagline": "De idea a MVP en semanas, no meses",
    "services.ventureScale.title": "Escalamiento de Ventures",
    "services.ventureScale.tagline": "Crece tu producto con un co-fundador tecnico",
    "services.aiEnablement.title": "Habilitacion de IA",
    "services.aiEnablement.tagline": "Integra IA para multiplicar la capacidad de tu equipo",
    "services.integrations.title": "Integraciones",
    "services.integrations.tagline": "Conecta tus herramientas para flujos de trabajo fluidos",

    // Team section
    "team.title": "Quienes Somos",
    "team.subtitle": "Tres co-fundadores construyendo el futuro de las asociaciones tecnologicas",
    "team.member1.name": "Nombre del Fundador",
    "team.member1.role": "CEO y Co-Fundador",
    "team.member1.initials": "FN",
    "team.member2.name": "Nombre del Fundador",
    "team.member2.role": "CTO y Co-Fundador",
    "team.member2.initials": "FN",
    "team.member3.name": "Nombre del Fundador",
    "team.member3.role": "COO y Co-Fundador",
    "team.member3.initials": "FN",

    // Equity model section
    "equity.title": "Como Nos Asociamos",
    "equity.subtitle": "Invertimos nuestra experiencia por equity. Sin facturas, sin sorpresas.",
    "equity.noUpfront.title": "Sin Costo Inicial",
    "equity.noUpfront.description": "Guarda tu capital para crecer. Construimos por equity.",
    "equity.aligned.title": "Incentivos Alineados",
    "equity.aligned.description": "Ganamos cuando ganas. Piel en el juego.",
    "equity.partnership.title": "Verdadera Asociacion",
    "equity.partnership.description": "Co-fundadores, no proveedores. Compromiso a largo plazo.",

    // Process section
    "process.title": "Como Funciona",
    "process.discovery.title": "Descubrimiento",
    "process.discovery.bullet1": "Entendemos tu vision y metas",
    "process.discovery.bullet2": "Definimos el alcance del MVP juntos",
    "process.discovery.bullet3": "Acordamos la estructura de equity",
    "process.build.title": "Construccion",
    "process.build.bullet1": "Sprints semanales con progreso visible",
    "process.build.bullet2": "Acceso directo a tu equipo tecnico",
    "process.build.bullet3": "Listo para lanzar en semanas",
    "process.scale.title": "Escala",
    "process.scale.bullet1": "Iteramos basados en feedback de usuarios",
    "process.scale.bullet2": "Guia tecnica mientras creces",
    "process.scale.bullet3": "Soporte de asociacion a largo plazo",

    // Contact section
    "contact.title": "Listo para Construir Juntos?",
    "contact.subtitle": "Agenda una llamada de 30 minutos para explorar si somos compatibles.",
    "contact.cta": "Agenda una Llamada",
  },
} as const;

export type TranslationKey = keyof (typeof ui)[typeof defaultLang];
