// Translation strings for all locales
// Add new keys here, then use t("key") in components

export const languages = {
  en: "English",
  es: "Español",
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
    "nav.why": "Why us",
    "nav.model": "Model",
    "nav.process": "Process",
    "nav.ventures": "Ventures",
    "nav.faq": "FAQ",
    "nav.apply": "Apply",

    // Placeholder content (for foundation testing)
    "placeholder.heading": "Building the Future Together",
    "placeholder.subheading": "Tech partnership for ambitious founders",
    "placeholder.cta": "Schedule a Call",
    "placeholder.language": "Language",

    // Common
    "common.loading": "Loading...",

    // Hero section
    "hero.tag": "Venture Tech Partner · Bogotá",
    "hero.headline": "We build your technology for equity.",
    "hero.highlight": "equity",
    "hero.subheadline": "CTO + dedicated squad. 60% of the platform ready on day one. Full technical leadership: our success is tied to yours.",
    "hero.cta.primary": "Apply for venture evaluation",
    "hero.cta.secondary": "See how it works",
    "hero.microcopy": "Only 3–5 ventures selected per year",
    "hero.logos.label": "Trusted by",
    "hero.card.label": "Base platform · day 1",
    "hero.card.caption": "of the platform ready before you write your first line of product.",
    "hero.card.progress": "60% complete",
    "hero.card.auth": "Authentication",
    "hero.card.tenant": "Multi-tenant",
    "hero.card.admin": "Admin panel",
    "hero.card.ai": "AI and data",
    "hero.card.ready": "Ready",
    "hero.card.product": "Your product",
    "hero.card.together": "We build it together",

    // Stats under the hero
    "stats.cost": "upfront cost. We build for equity, not invoices.",
    "stats.mvp": "weeks to a working MVP.",
    "stats.ventures": "ventures selected per year.",

    // Footer
    "footer.copyright": "All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",

    // Services section
    "services.kicker": "01 · Why Whiteboard",
    "services.title": "A technical partner, not another vendor.",
    "services.subtitle": "We arrive with the foundation built and skin in the game. Your team focuses on what makes your venture unique.",
    "services.platformReady.title": "Launch 60% faster",
    "services.platformReady.tagline": "Auth, multi-tenant and admin panel ready on day one.",
    "services.skinInGame.title": "Aligned incentives",
    "services.skinInGame.tagline": "We succeed only when you succeed: equity, not invoices.",
    "services.governance.title": "Full transparency",
    "services.governance.tagline": "Clear milestones, visible progress, no black boxes.",
    "services.aiNative.title": "AI and data native",
    "services.aiNative.tagline": "Modern architecture from day one, not retrofitted.",

    // Team section
    "team.kicker": "05 · Who we are",
    "team.title": "Three co-founders, one shared board.",
    "team.subtitle": "Building the future of tech partnerships.",
    "team.member1.name": "[Founder name]",
    "team.member1.role": "CEO & co-founder",
    "team.member1.initials": "FN",
    "team.member2.name": "[Founder name]",
    "team.member2.role": "CTO & co-founder",
    "team.member2.initials": "FN",
    "team.member3.name": "[Founder name]",
    "team.member3.role": "COO & co-founder",
    "team.member3.initials": "FN",

    // Equity model section
    "equity.kicker": "02 · How we partner",
    "equity.title": "We invest our expertise for equity.",
    "equity.subtitle": "No invoices, no surprises.",
    "equity.noUpfront.title": "No upfront cost",
    "equity.noUpfront.description": "Keep your capital for growth. We build for equity.",
    "equity.aligned.title": "Aligned incentives",
    "equity.aligned.description": "We win when you win. Skin in the game.",
    "equity.partnership.title": "True partnership",
    "equity.partnership.description": "Co-founders, not vendors. Long-term commitment.",

    // Process section
    "process.kicker": "03 · How it works",
    "process.title": "From idea to production in three phases.",
    "process.discovery.when": "Week 0",
    "process.discovery.title": "Discovery",
    "process.discovery.bullet1": "We understand your vision and goals",
    "process.discovery.bullet2": "We define the MVP scope together",
    "process.discovery.bullet3": "We agree on the equity structure",
    "process.build.when": "Weeks 1–10",
    "process.build.title": "Build",
    "process.build.bullet1": "Weekly sprints with visible progress",
    "process.build.bullet2": "Direct access to your tech team",
    "process.build.bullet3": "Launch-ready in weeks",
    "process.scale.when": "After launch",
    "process.scale.title": "Scale",
    "process.scale.bullet1": "We iterate on user feedback",
    "process.scale.bullet2": "Technical guidance as you grow",
    "process.scale.bullet3": "Long-term partnership support",

    // Portfolio section
    "portfolio.kicker": "04 · Portfolio",
    "portfolio.title": "Ventures we've built.",
    "portfolio.radarum.name": "Radarum",
    "portfolio.radarum.description": "Real-time investment infrastructure and data platform for financial education. From MVP to production system.",
    "portfolio.radarum.metric": "Live in production",
    "portfolio.alwon.name": "Alwon",
    "portfolio.alwon.description": "AI-powered operating system for micromarkets. Intelligent inventory, analytics and operations management.",
    "portfolio.alwon.metric": "Serving retail operations",

    // Contact section
    "contact.kicker": "07 · Apply",
    "contact.title": "Does your venture qualify for Whiteboard?",
    "contact.subtitle": "We partner with founders who have a clear vision and large markets.",
    "contact.cta": "Book a fit call with the CEO",
    "contact.microcopy": "Only 3–5 ventures per year",

    // Testimonial (placeholder content - marked for replacement)
    "testimonial.quote": "Whiteboard transformed how we approach technology. They're not vendors: they're true partners invested in our success.",
    "testimonial.name": "[Founder name]",
    "testimonial.role": "CEO, Radarum",

    // FAQ section
    "faq.kicker": "06 · FAQ",
    "faq.title": "What founders ask us.",
    "faq.equity.question": "How does the equity model work?",
    "faq.equity.answer": "We offer flexible structures including vesting schedules and SAFE agreements. Depending on your situation, we work with pure equity or hybrid models that combine equity with milestone-based compensation.",
    "faq.ip.question": "Who owns the intellectual property?",
    "faq.ip.answer": "Your venture owns the product we build together. Whiteboard licenses the underlying platform components (authentication, admin panels, infrastructure) that we've developed over years of building startups.",
    "faq.scaling.question": "What happens when we need to scale or transition?",
    "faq.scaling.answer": "Everything we build is designed for transition from day one. When you're ready to grow your own team, we provide hire-and-train support for a smooth handover. You're never locked in.",
    "faq.timeline.question": "How long does it take to build an MVP?",
    "faq.timeline.answer": "Most working MVPs are ready in 6 to 10 weeks. Because 60% of our platform is already built, we spend our time on what makes your venture unique instead of rebuilding common infrastructure.",
  },
  es: {
    // Site metadata
    "site.title": "Whiteboard",
    "site.description": "Construimos asociaciones de capital tecnológico con fundadores ambiciosos",

    // Navigation
    "nav.home": "Inicio",
    "nav.why": "Por qué",
    "nav.model": "Modelo",
    "nav.process": "Proceso",
    "nav.ventures": "Ventures",
    "nav.faq": "Preguntas",
    "nav.apply": "Aplicar",

    // Placeholder content (for foundation testing)
    "placeholder.heading": "Construyendo el Futuro Juntos",
    "placeholder.subheading": "Asociacion tecnologica para fundadores ambiciosos",
    "placeholder.cta": "Agendar una Llamada",
    "placeholder.language": "Idioma",

    // Common
    "common.loading": "Cargando...",

    // Hero section
    "hero.tag": "Venture Tech Partner · Bogotá",
    "hero.headline": "Construimos tu tecnología a cambio de equity.",
    "hero.highlight": "equity",
    "hero.subheadline": "CTO + squad dedicado. 60% de la plataforma lista desde el día uno. Liderazgo técnico completo: nuestro éxito está atado al tuyo.",
    "hero.cta.primary": "Aplicar para evaluación de venture",
    "hero.cta.secondary": "Mira cómo funciona",
    "hero.microcopy": "Solo 3–5 ventures seleccionados por año",
    "hero.logos.label": "Respaldado por",
    "hero.card.label": "Plataforma base · día 1",
    "hero.card.caption": "de la plataforma lista antes de escribir tu primera línea de producto.",
    "hero.card.progress": "60% completado",
    "hero.card.auth": "Autenticación",
    "hero.card.tenant": "Multi-tenant",
    "hero.card.admin": "Panel de administración",
    "hero.card.ai": "IA y datos",
    "hero.card.ready": "Lista",
    "hero.card.product": "Tu producto",
    "hero.card.together": "Lo construimos juntos",

    // Stats under the hero
    "stats.cost": "costo inicial. Construimos por equity, no por facturas.",
    "stats.mvp": "semanas para tener un MVP funcional.",
    "stats.ventures": "ventures seleccionados por año.",

    // Footer
    "footer.copyright": "Todos los derechos reservados.",
    "footer.privacy": "Política de privacidad",
    "footer.terms": "Términos de servicio",

    // Services section
    "services.kicker": "01 · Por qué Whiteboard",
    "services.title": "Un socio técnico, no un proveedor más.",
    "services.subtitle": "Llegamos con la base construida y con piel en el juego. Tu equipo se enfoca en lo que hace único a tu venture.",
    "services.platformReady.title": "Lanza 60% más rápido",
    "services.platformReady.tagline": "Auth, multi-tenant y panel de admin listos desde el día uno.",
    "services.skinInGame.title": "Incentivos alineados",
    "services.skinInGame.tagline": "Solo ganamos cuando ganas tú: equity, no facturas.",
    "services.governance.title": "Transparencia total",
    "services.governance.tagline": "Hitos claros, progreso visible, sin cajas negras.",
    "services.aiNative.title": "IA y datos nativos",
    "services.aiNative.tagline": "Arquitectura moderna desde el día uno, no adaptada después.",

    // Team section
    "team.kicker": "05 · Quiénes somos",
    "team.title": "Tres co-fundadores, un mismo tablero.",
    "team.subtitle": "Construyendo el futuro de las asociaciones tecnológicas.",
    "team.member1.name": "[Nombre del fundador]",
    "team.member1.role": "CEO y co-fundador",
    "team.member1.initials": "FN",
    "team.member2.name": "[Nombre del fundador]",
    "team.member2.role": "CTO y co-fundador",
    "team.member2.initials": "FN",
    "team.member3.name": "[Nombre del fundador]",
    "team.member3.role": "COO y co-fundador",
    "team.member3.initials": "FN",

    // Equity model section
    "equity.kicker": "02 · Cómo nos asociamos",
    "equity.title": "Invertimos nuestra experiencia por equity.",
    "equity.subtitle": "Sin facturas, sin sorpresas.",
    "equity.noUpfront.title": "Sin costo inicial",
    "equity.noUpfront.description": "Guarda tu capital para crecer. Construimos por equity.",
    "equity.aligned.title": "Incentivos alineados",
    "equity.aligned.description": "Ganamos cuando ganas. Piel en el juego.",
    "equity.partnership.title": "Verdadera asociación",
    "equity.partnership.description": "Co-fundadores, no proveedores. Compromiso a largo plazo.",

    // Process section
    "process.kicker": "03 · Cómo funciona",
    "process.title": "De la idea a producción en tres fases.",
    "process.discovery.when": "Semana 0",
    "process.discovery.title": "Descubrimiento",
    "process.discovery.bullet1": "Entendemos tu visión y metas",
    "process.discovery.bullet2": "Definimos juntos el alcance del MVP",
    "process.discovery.bullet3": "Acordamos la estructura de equity",
    "process.build.when": "Semanas 1–10",
    "process.build.title": "Construcción",
    "process.build.bullet1": "Sprints semanales con progreso visible",
    "process.build.bullet2": "Acceso directo a tu equipo técnico",
    "process.build.bullet3": "Listo para lanzar en semanas",
    "process.scale.when": "Después del lanzamiento",
    "process.scale.title": "Escala",
    "process.scale.bullet1": "Iteramos con el feedback de usuarios",
    "process.scale.bullet2": "Guía técnica mientras creces",
    "process.scale.bullet3": "Soporte de asociación a largo plazo",

    // Portfolio section
    "portfolio.kicker": "04 · Portafolio",
    "portfolio.title": "Ventures que hemos construido.",
    "portfolio.radarum.name": "Radarum",
    "portfolio.radarum.description": "Infraestructura de inversión y datos en tiempo real para educación financiera. De MVP a sistema en producción.",
    "portfolio.radarum.metric": "En producción",
    "portfolio.alwon.name": "Alwon",
    "portfolio.alwon.description": "Sistema operativo con IA para micromarkets. Inventario inteligente, analítica y gestión de operaciones.",
    "portfolio.alwon.metric": "Operando en retail",

    // Contact section
    "contact.kicker": "07 · Aplica",
    "contact.title": "¿Tu venture califica para Whiteboard?",
    "contact.subtitle": "Buscamos founders con visión clara y mercados grandes.",
    "contact.cta": "Agendar fit call con el CEO",
    "contact.microcopy": "Solo 3–5 ventures por año",

    // Testimonial (placeholder content - marked for replacement)
    "testimonial.quote": "Whiteboard transformó nuestra forma de abordar la tecnología. No son proveedores: son verdaderos socios invertidos en nuestro éxito.",
    "testimonial.name": "[Nombre del fundador]",
    "testimonial.role": "CEO, Radarum",

    // FAQ section
    "faq.kicker": "06 · Preguntas frecuentes",
    "faq.title": "Lo que nos preguntan los founders.",
    "faq.equity.question": "¿Cómo funciona el modelo de equity?",
    "faq.equity.answer": "Ofrecemos estructuras flexibles que incluyen vesting y acuerdos SAFE. Según tu situación, trabajamos con equity puro o con modelos híbridos que combinan equity con compensación por hitos.",
    "faq.ip.question": "¿Quién es dueño de la propiedad intelectual?",
    "faq.ip.answer": "Tu venture es dueño del producto que construimos juntos. Whiteboard licencia los componentes de plataforma (autenticación, paneles de admin, infraestructura) que hemos desarrollado durante años construyendo startups.",
    "faq.scaling.question": "¿Qué pasa cuando necesitamos escalar o hacer la transición?",
    "faq.scaling.answer": "Todo lo que construimos está diseñado para la transición desde el día uno. Cuando estés listo para armar tu propio equipo, te damos soporte de contratación y capacitación para un traspaso fluido. Nunca quedas atrapado.",
    "faq.timeline.question": "¿Cuánto tiempo toma construir un MVP?",
    "faq.timeline.answer": "La mayoría de los MVP funcionales están listos en 6 a 10 semanas. Como el 60% de la plataforma ya está construido, dedicamos el tiempo a lo que hace único a tu venture y no a reconstruir infraestructura común.",
  },
} as const;

export type TranslationKey = keyof (typeof ui)[typeof defaultLang];
