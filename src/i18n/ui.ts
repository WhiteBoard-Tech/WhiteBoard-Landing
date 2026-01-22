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
    "services.title": "Why Whiteboard",
    "services.platformReady.title": "Launch 60% Faster",
    "services.platformReady.tagline": "Auth, multi-tenant, and admin panel ready on day one",
    "services.skinInGame.title": "Aligned Incentives",
    "services.skinInGame.tagline": "We succeed only when you succeed — equity, not invoices",
    "services.governance.title": "Transparent Accountability",
    "services.governance.tagline": "Clear milestones, visible progress, no black boxes",
    "services.aiNative.title": "AI & Data Native",
    "services.aiNative.tagline": "Modern architecture from day one, not retrofitted",

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

    // Portfolio section
    "portfolio.title": "Ventures We've Built",
    "portfolio.radarum.name": "Radarum",
    "portfolio.radarum.description": "Real-time investment infrastructure and data platform for financial education. Built from MVP to production-ready system.",
    "portfolio.radarum.metric": "Live in production",
    "portfolio.alwon.name": "Alwon",
    "portfolio.alwon.description": "AI-powered operating system for micromarkets. Intelligent inventory, analytics, and operations management.",
    "portfolio.alwon.metric": "Serving retail operations",

    // Contact section
    "contact.title": "Does Your Venture Qualify for Whiteboard?",
    "contact.subtitle": "We partner with founders who have clear vision and large markets.",
    "contact.cta": "Schedule Fit Call with the CEO",

    // Testimonial (placeholder content - marked for replacement)
    "testimonial.quote": "Whiteboard transformed how we approach technology. They're not vendors — they're true partners invested in our success.",
    "testimonial.name": "Placeholder Founder",
    "testimonial.role": "CEO, Radarum",

    // FAQ section
    "faq.title": "Frequently Asked Questions",
    "faq.equity.question": "How does the equity model work?",
    "faq.equity.answer": "We offer flexible structures including Vesting schedules and SAFE agreements. Depending on your situation, we can work with pure equity arrangements or hybrid models that combine equity with milestone-based compensation.",
    "faq.ip.question": "Who owns the intellectual property?",
    "faq.ip.answer": "Your venture owns the product we build together. Whiteboard licenses the underlying platform components — authentication, admin panels, infrastructure — that we've developed over years of building startups.",
    "faq.scaling.question": "What happens when we need to scale or transition?",
    "faq.scaling.answer": "Everything we build is designed for transition from day one. When you're ready to grow your own team, we provide hire-and-train support to ensure a smooth handover. You're never locked in.",
    "faq.timeline.question": "How long does it take to build an MVP?",
    "faq.timeline.answer": "Most functional MVPs are ready in 6-10 weeks. Because 60% of our platform is already built, we focus our time on what makes your venture unique rather than rebuilding common infrastructure.",
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
    "services.title": "Por Que Whiteboard",
    "services.platformReady.title": "Lanza 60% Mas Rapido",
    "services.platformReady.tagline": "Auth, multi-tenant y panel de admin listos desde el dia uno",
    "services.skinInGame.title": "Incentivos Alineados",
    "services.skinInGame.tagline": "Solo ganamos cuando ganas tu — equity, no facturas",
    "services.governance.title": "Transparencia Total",
    "services.governance.tagline": "Hitos claros, progreso visible, sin cajas negras",
    "services.aiNative.title": "IA y Datos Nativos",
    "services.aiNative.tagline": "Arquitectura moderna desde el dia uno, no adaptada despues",

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

    // Portfolio section
    "portfolio.title": "Ventures que Hemos Construido",
    "portfolio.radarum.name": "Radarum",
    "portfolio.radarum.description": "Infraestructura de inversion y datos en tiempo real para educacion financiera. De MVP a sistema en produccion.",
    "portfolio.radarum.metric": "En produccion",
    "portfolio.alwon.name": "Alwon",
    "portfolio.alwon.description": "Sistema operativo con IA para micromarkets. Inventario inteligente, analitica y gestion de operaciones.",
    "portfolio.alwon.metric": "Operando en retail",

    // Contact section
    "contact.title": "Tu venture califica para Whiteboard?",
    "contact.subtitle": "Buscamos founders con vision clara y mercados grandes.",
    "contact.cta": "Agendar Fit Call con el CEO",

    // Testimonial (placeholder content - marked for replacement)
    "testimonial.quote": "Whiteboard transformo nuestra forma de abordar la tecnologia. No son proveedores — son verdaderos socios invertidos en nuestro exito.",
    "testimonial.name": "Fundador Placeholder",
    "testimonial.role": "CEO, Radarum",

    // FAQ section
    "faq.title": "Preguntas Frecuentes",
    "faq.equity.question": "Como funciona el modelo de equity?",
    "faq.equity.answer": "Ofrecemos estructuras flexibles que incluyen Vesting y acuerdos SAFE. Dependiendo de tu situacion, podemos trabajar con equity puro o modelos hibridos que combinan equity con compensacion basada en hitos.",
    "faq.ip.question": "Quien es dueno de la propiedad intelectual?",
    "faq.ip.answer": "Tu venture es dueno del producto que construimos juntos. Whiteboard licencia los componentes de la plataforma — autenticacion, paneles de admin, infraestructura — que hemos desarrollado durante anos construyendo startups.",
    "faq.scaling.question": "Que pasa cuando necesitamos escalar o hacer transicion?",
    "faq.scaling.answer": "Todo lo que construimos esta disenado para transicion desde el dia uno. Cuando estes listo para crecer tu propio equipo, ofrecemos soporte de contratacion y capacitacion para asegurar un traspaso fluido. Nunca estas atrapado.",
    "faq.timeline.question": "Cuanto tiempo toma construir un MVP?",
    "faq.timeline.answer": "La mayoria de los MVPs funcionales estan listos en 6-10 semanas. Porque el 60% de nuestra plataforma ya esta construida, enfocamos nuestro tiempo en lo que hace unico a tu venture en lugar de reconstruir infraestructura comun.",
  },
} as const;

export type TranslationKey = keyof (typeof ui)[typeof defaultLang];
