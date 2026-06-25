import { 
  Project, 
  Service, 
  BlogPost, 
  CaseStudy, 
  FAQ, 
  Testimonial, 
  SEOConfig, 
  ContactInfo,
  LanguageContent
} from "../types";

export const initialContactInfo: ContactInfo = {
  name: "Jorge Rosario",
  email: "jrosa0653@gmail.com",
  phone: "+18494530811",
  whatsapp: "+18494530811",
  address: "Santo Domingo, Dominican Republic"
};

export const initialSEOConfig: SEOConfig = {
  metaTitle: "Jorge Rosario | Web Development, Technology & Digital Solutions",
  metaDescription: "Professional web development, custom applications, and digital growth strategies for modern businesses. Built for performance and conversion.",
  ogTitle: "Jorge Rosario | Web Development, Technology & Digital Solutions",
  ogDescription: "High-performing, fully customizable websites and business tools that drive sales, streamline operations, and elevate your digital footprint.",
  ogImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  twitterCard: "summary_large_image",
  canonicalUrl: "https://jorgerosario.dev",
  structuredData: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Jorge Rosario Digital Solutions",
    "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    "email": "jrosa0653@gmail.com",
    "telephone": "+18494530811",
    "url": "https://jorgerosario.dev",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Santo Domingo",
      "addressCountry": "DO"
    },
    "sameAs": [
      "https://github.com",
      "https://linkedin.com"
    ]
  }, null, 2)
};

export const initialProjects: (Project & { name_es: string; description_es: string; results_es: string })[] = [
  {
    id: "proj_barber",
    name: "Modern Barbershop Website",
    name_es: "Sitio Web para Barbería Moderna",
    category: "Barbershop",
    url: "https://barber-shop-five-ivory.vercel.app/",
    description: "Premium barbershop website featuring online booking integrations, interactive stylist profiles, service showcase, testimonials, and modern branding.",
    description_es: "Sitio web premium para barbería que cuenta con integraciones de reserva en línea, perfiles interactivos de estilistas, exhibición de servicios, testimonios y marca moderna.",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
    results: "35% increase in online bookings in the first month",
    results_es: "Aumento del 35% en las reservas en línea en el primer mes",
    featured: true
  },
  {
    id: "proj_sabor",
    name: "Sabor Dominicano",
    name_es: "Sabor Dominicano",
    category: "Restaurant",
    url: "https://sabor-dominicano.vercel.app/",
    description: "Restaurant website with an interactive digital menu, beautiful culinary visual galleries, online ordering experiences, contact information, and local SEO optimizations.",
    description_es: "Sitio web para restaurante con un menú digital interactivo, hermosas galerías visuales culinarias, experiencia de pedidos en línea, información de contacto y optimizaciones de SEO local.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    results: "Double the foot-traffic from local searches, 25% delivery growth",
    results_es: "Se duplicó el tráfico de clientes locales, aumento del 25% en pedidos a domicilio",
    featured: true
  },
  {
    id: "proj_realestate",
    name: "Real Estate Platform",
    name_es: "Plataforma Inmobiliaria",
    category: "Real Estate",
    url: "https://real-state-three-ebon.vercel.app/",
    description: "Advanced property showcase platform featuring custom filtration, dynamic property detail sheets, direct WhatsApp lead capture forms, and agent contact tools.",
    description_es: "Plataforma avanzada de exhibición de propiedades que cuenta con filtros personalizados, fichas dinámicas de detalles de propiedades, captura de prospectos directa por WhatsApp y herramientas de contacto con agentes.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
    results: "Over 50 qualified real estate leads generated in the first week",
    results_es: "Más de 50 prospectos calificados generados en la primera semana",
    featured: true
  },
  {
    id: "proj_apex",
    name: "Apex Plumbing",
    name_es: "Apex Plumbing",
    category: "Plumbing",
    url: "https://plumbing2-six.vercel.app/",
    description: "Professional services plumbing landing page highlighting emergency dispatch contact, transparent pricing guides, quote request wizards, and live client trust reviews.",
    description_es: "Página de destino de servicios profesionales de plomería que resalta el contacto de despacho de emergencia, guías de precios transparentes, asistente de solicitud de cotización y testimonios de clientes.",
    image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80",
    results: "Average emergency request response rate streamlined to under 10 minutes",
    results_es: "Tasa de respuesta de solicitudes de emergencia reducida a menos de 10 minutos",
    featured: true
  },
  {
    id: "proj_law",
    name: "Law Firm Website",
    name_es: "Sitio Web para Bufete de Abogados",
    category: "Legal Services",
    url: "https://law-firm-rho-fawn.vercel.app/",
    description: "Credibility-focused legal hub showcasing partner profiles, core service areas, consultation schedulers, success histories, and rich thought-leadership blog contents.",
    description_es: "Centro legal enfocado en la credibilidad que exhibe perfiles de socios, áreas principales de servicio, programadores de consultas, historial de casos exitosos y blog de liderazgo de opinión.",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
    results: "48% expansion in initial consultation inquiries booked",
    results_es: "Expansión del 48% en las consultas iniciales reservadas",
    featured: true
  }
];

export const initialServices: (Service & { title_es: string; description_es: string; features_es: string[] })[] = [
  {
    id: "serv_web",
    title: "High-Performance Web Development",
    title_es: "Desarrollo Web de Alto Rendimiento",
    description: "Tailor-made, responsive, and blazing-fast websites engineered using React, Next.js, and Tailwind CSS. Optimised for Google Search (SEO) and speed.",
    description_es: "Sitios web a la medida, adaptables y ultrarrápidos diseñados con React, Next.js y Tailwind CSS. Optimizados para búsquedas de Google (SEO) y velocidad.",
    iconName: "Code",
    features: ["Custom UI/UX Prototypes", "Responsive Mobile-First Architecture", "Advanced Search Engine Optimization", "Core Web Vitals Perfection"],
    features_es: ["Prototipos UI/UX personalizados", "Arquitectura adaptable móvil-primero", "Optimización avanzada de motores de búsqueda", "Optimización perfecta de Core Web Vitals"],
    priceRange: "$1,200 - $3,500"
  },
  {
    id: "serv_ai",
    title: "AI Integrations & Automation",
    title_es: "Integración de IA y Automatizaciones",
    description: "Supercharge your business workflows using custom AI integrations (Gemini API), automated lead generation, scheduling processes, and automated notification alerts.",
    description_es: "Potencie sus flujos de trabajo empresariales mediante integraciones personalizadas de IA (API de Gemini), generación de prospectos automatizada y alertas de notificación automáticas.",
    iconName: "Cpu",
    features: ["Gemini AI API Implementation", "Automated Lead Funnel Pipelines", "Workflow Integration", "Custom Chatbots & Assistive Tools"],
    features_es: ["Implementación de API de Gemini AI", "Embudos de prospectos automatizados", "Integración de flujos de trabajo", "Chatbots personalizados y herramientas de asistencia"],
    priceRange: "$1,800 - $5,000"
  },
  {
    id: "serv_seo",
    title: "Growth SEO & Digital Strategy",
    title_es: "SEO de Crecimiento y Estrategia Digital",
    description: "Establish a massive online footprint that naturally commands search volumes, maps rankings, and turns passive visits into loyal clients.",
    description_es: "Establezca una presencia en línea masiva que atraiga volúmenes de búsqueda, posicionamiento en mapas y convierta visitas pasivas en clientes leales.",
    iconName: "TrendingUp",
    features: ["Local SEO Maps Positioning", "Structured Schema Vocabularies", "Competitor Content Gap Auditing", "Dynamic Speed and Server Tuning"],
    features_es: ["Posicionamiento en mapas locales", "Vocabularios de esquema estructurado", "Auditoría de brechas de contenido de competidores", "Ajuste dinámico de velocidad y servidor"],
    priceRange: "$800 - $2,500/mo"
  }
];

export const initialCaseStudies: (CaseStudy & { title_es: string; outcome_es: string; challenge_es: string; solution_es: string; metrics_es: { label: string; value: string }[] })[] = [
  {
    id: "case_barber",
    title: "How We Scaled Barber Booking Convenience",
    title_es: "Cómo Escalamos la Comodidad en Reservas de Barberías",
    client: "Modern Barbershop Project",
    outcome: "Created an immersive appointment-led booking flow that eliminated manual calling by 80% and reduced administrative bottlenecks.",
    outcome_es: "Creamos un flujo de reservas inmersivo guiado por citas que eliminó el 80% de las llamadas manuales y redujo los cuellos de botella administrativos.",
    metrics: [
      { label: "Booking Increase", value: "+35%" },
      { label: "Admin Hours Saved", value: "15h/week" },
      { label: "Mobile Traffic Engagement", value: "92%" }
    ],
    metrics_es: [
      { label: "Aumento de Reservas", value: "+35%" },
      { label: "Horas Ahorradas", value: "15h/sem" },
      { label: "Interacción de Tráfico Móvil", value: "92%" }
    ],
    challenge: "The barber team was losing active bookings during service hours as they could not pick up phone calls from customers, leading to missed client opportunities.",
    challenge_es: "El equipo de barberos perdía reservas activas durante las horas de servicio ya que no podían atender llamadas de clientes, lo que provocaba pérdidas de oportunidades.",
    solution: "Designed and developed an automated, mobile-optimized booking portal synchronized with live Google Calendars and a floating conversion-focused WhatsApp widget.",
    solution_es: "Diseñamos y desarrollamos un portal de reservas automatizado optimizado para móviles, sincronizado con Google Calendars y un widget de WhatsApp flotante enfocado en la conversión.",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "case_sabor",
    title: "Bringing Sabor Dominicano to Local Foodies",
    title_es: "Llevando Sabor Dominicano a los Comensales Locales",
    client: "Sabor Dominicano Restaurant",
    outcome: "Crafted a beautiful online menu and integrated high-conversion Google Maps schema to tap into local 'restaurants near me' search volumes.",
    outcome_es: "Diseñamos un hermoso menú digital e integramos esquemas de Google Maps de alta conversión para captar búsquedas de restaurantes locales cercanos.",
    metrics: [
      { label: "Local SEO Visibility", value: "x3" },
      { label: "Digital Menu Views", value: "12K/mo" },
      { label: "Online Order Inquiries", value: "+40%" }
    ],
    metrics_es: [
      { label: "Visibilidad de SEO Local", value: "x3" },
      { label: "Vistas de Menú Digital", value: "12K/mes" },
      { label: "Consultas de Pedidos Online", value: "+40%" }
    ],
    challenge: "Sabor Dominicano had incredible physical flavors but remained invisible to tourists and searchers looking online for authentic Caribbean culinary experiences.",
    challenge_es: "Sabor Dominicano tenía sabores físicos increíbles pero seguía siendo invisible para turistas y personas que buscaban experiencias culinarias caribeñas auténticas en línea.",
    solution: "Engineered a rapid, light, visually rich menu showcase styled with modern SEO structured markup and local citation optimizations.",
    solution_es: "Desarrollamos una exhibición de menú rápida y visualmente atractiva estructurada con marcado SEO moderno y optimizaciones de citaciones locales.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
  }
];

export const initialFAQs: (FAQ & { question_es: string; answer_es: string })[] = [
  {
    id: "faq_1",
    question: "What is your project timeline?",
    question_es: "¿Cuál es el cronograma de trabajo para los proyectos?",
    answer: "A standard professional corporate or service landing website typically takes 2 to 4 weeks. Complex platforms requiring customized systems or advanced integrations require 4 to 8 weeks.",
    answer_es: "Un sitio web corporativo o de servicios estándar suele tardar de 2 a 4 semanas. Las plataformas complejas que requieren sistemas personalizados o integraciones avanzadas requieren de 4 a 8 semanas.",
    category: "Process"
  },
  {
    id: "faq_2",
    question: "Do you offer post-launch support and hosting?",
    question_es: "¿Ofreces soporte post-lanzamiento y alojamiento?",
    answer: "Yes, I provide comprehensive post-launch support including monthly security audits, platform backups, content revisions, speed tuning, and standard performance hosting assistance.",
    answer_es: "Sí, ofrezco soporte post-lanzamiento completo que incluye auditorías mensuales de seguridad, respaldos de la plataforma, revisiones de contenido, ajuste de velocidad y asistencia en alojamiento.",
    category: "Support"
  },
  {
    id: "faq_3",
    question: "Can I manage the website content myself?",
    question_es: "¿Puedo administrar el contenido del sitio web yo mismo?",
    answer: "Absolutely! I build custom administrative dashboards (CMS) tailored exactly to your needs, so you can edit images, text descriptions, services, and blog articles instantly without writing a single line of code.",
    answer_es: "¡Absolutamente! Construyo paneles de administración (CMS) personalizados adaptados exactamente a tus necesidades, para que puedas editar imágenes, textos, servicios y artículos de blog al instante sin escribir una sola línea de código.",
    category: "General"
  },
  {
    id: "faq_4",
    question: "Do you integrate AI features like smart assistants?",
    question_es: "¿Integras funciones de IA como asistentes inteligentes?",
    answer: "Yes, I specialized in embedding modern artificial intelligence capabilities (e.g. Gemini API) to create smart customer recommendation systems, automated support flows, and lead qualification chatbots.",
    answer_es: "Sí, me especializo en incorporar capacidades modernas de inteligencia artificial (por ejemplo, la API de Gemini) para crear sistemas de recomendación inteligentes, flujos de soporte automatizados y asistentes de calificación de clientes potenciales.",
    category: "Technology"
  }
];

export const initialBlogPosts: (BlogPost & { title_es: string; excerpt_es: string; content_es: string })[] = [
  {
    id: "blog_1",
    title: "How Modern Web Performance Impacts Business Conversions",
    title_es: "Cómo el Rendimiento Web Impacta las Conversiones de Negocio",
    excerpt: "Discover why a 1-second delay in page load speeds can cost up to 7% of your digital transactions, and how to fix it using modern rendering.",
    excerpt_es: "Descubra por qué un retraso de 1 segundo en la carga de la página puede costar hasta el 7% de sus transacciones digitales y cómo solucionarlo con tecnologías modernas.",
    content: `## The 1-Second Rule of Sales Conversion

In today's fast-paced digital environment, speed is no longer a luxury; it's a vital business metric. Search engines like Google rank websites based on mobile loading speeds and interactivity benchmarks (Core Web Vitals). If your page takes more than 3 seconds to load, over 40% of potential buyers will return to search results.

### Key Factors of Web Speed:
1. **Asset Compression**: Uncompressed high-resolution images are the primary cause of sluggish loading speeds.
2. **Framework Choices**: React and Next.js offer static-site generation (SSG) and server-side rendering (SSR), fetching data prior to client loads.
3. **Database Tuning**: Lean local caching and lazy querying keep operations snappy.

As a web architect, my sites consistently aim for Lighthouse performance ratings of 95+, turning passive bounces back into completed checkouts and qualified calls.`,
    content_es: `## La regla del segundo en conversiones de ventas

En el acelerado entorno digital actual, la velocidad ya no es un lujo; es una métrica comercial vital. Los motores de búsqueda como Google clasifican los sitios web según la velocidad de carga móvil y la interactividad (Core Web Vitals). Si su página tarda más de 3 segundos en cargarse, más del 40% de los compradores potenciales volverán a los resultados de búsqueda.

### Factores clave de la velocidad web:
1. **Compresión de Recursos**: Las imágenes de alta resolución sin comprimir son la principal causa de cargas lentas.
2. **Elección de Frameworks**: React y Next.js ofrecen generación de sitios estáticos (SSG) y renderizado del lado del servidor (SSR).
3. **Optimización de Bases de Datos**: El almacenamiento en caché local mantiene las operaciones rápidas.

Como arquitecto web, mis sitios apuntan constantemente a calificaciones de rendimiento de Lighthouse de más de 95, convirtiendo rebotes pasivos en transacciones completadas.`,
    category: "Web Development",
    readTime: "4 min read",
    author: "Jorge Rosario",
    date: "June 18, 2026",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "blog_2",
    title: "Harnessing Gemini AI to Streamline Small Business Operations",
    title_es: "Aprovechando la IA de Gemini para Optimizar Operaciones de PYMEs",
    excerpt: "Learn how to embed conversational APIs to automatically pre-qualify inbound customer quotes and schedules, saving hours daily.",
    excerpt_es: "Aprenda a integrar APIs de lenguaje para precalificar automáticamente cotizaciones y programaciones entrantes, ahorrando horas diarias.",
    content: `## Bridging AI and Customer Experience

Small businesses spend up to 15 hours per week managing early-stage inquiries and qualifying service leads. By embedding lightweight AI models (such as Gemini 2.5 Flash), we can build an automated, 24/7 client qualifying hub right on your portal.

### What AI Integrations Can Do for You:
- **Instant Response Assistants**: Give clients immediate answers regarding your services, schedules, and pricing ranges.
- **Form Qualification**: Structure random, raw form fields and draft immediate email quotes or follow-up briefs.
- **Multi-language Support**: Automatically translate client requests and draft localized responses.

Adding intelligent agents directly to standard business pages isn't just about sounding advanced—it guarantees that hot leads never freeze waiting for an email response.`,
    content_es: `## Conectando la IA con la Experiencia del Cliente

Las pequeñas empresas pasan hasta 15 horas por semana gestionando consultas iniciales y calificando prospectos. Al integrar modelos de IA ligeros (como Gemini), podemos construir un centro de calificación automatizado las 24 horas del día, los 7 días de la semana, directamente en su sitio web.

### Qué pueden hacer las integraciones de IA por usted:
- **Asistentes de Respuesta Instantánea**: Respuestas inmediatas sobre servicios, horarios y rangos de precios.
- **Calificación de Formularios**: Estructure campos de formularios y redacte cotizaciones de correo electrónico instantáneas.
- **Soporte Multilingüe**: Traduzca automáticamente las solicitudes de clientes.

Agregar agentes inteligentes directamente no es solo para lucir avanzado: garantiza que los clientes nunca tengan que esperar por una respuesta.`,
    category: "Technology",
    readTime: "5 min read",
    author: "Jorge Rosario",
    date: "June 22, 2026",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: "test_1",
    name: "Alex Sterling",
    role: "Owner",
    company: "Sterling Fades Barbershop",
    rating: 5,
    feedback: "Jorge revolutionized our customer booking pipeline. Within a week of launching our website, our stylist schedules filled up entirely online. Highly professional and fast execution!",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "test_2",
    name: "Maria Gomez",
    role: "Founder",
    company: "Sabor Dominicano Bistro",
    rating: 5,
    feedback: "The local SEO setup was incredible. We went from being invisible on maps to ranking in the top three for Caribbean food searches in Santo Domingo. The digital menu is gorgeous!",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "test_3",
    name: "David Vance",
    role: "Marketing Director",
    company: "Apex Properties Group",
    rating: 5,
    feedback: "An absolute master of modern React and API structures. The real estate showcase page captures solid, pre-qualified customer leads daily. Our agents are thrilled.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
  }
];

export const englishTranslations: LanguageContent = {
  hero: {
    badge: "⚡ Complete Digital Transformation",
    title: "I build high-converting",
    highlight: "Web & Tech Solutions",
    subtitle: "Professional web development, custom software integrations, and growth-focused SEO engineered by Jorge Rosario to turn traffic into paying customers.",
    ctaPrimary: "Grow My Business",
    ctaSecondary: "View Featured Work",
    activeClients: "Active Businesses Scaled"
  },
  about: {
    title: "About Jorge Rosario",
    subtitle: "Bridging code, growth strategy, and high-impact digital solutions",
    bioParagraph1: "Hi, I'm Jorge Rosario. I design and build lightning-fast, visually striking web portals and custom digital tools tailored to scale modern businesses. My engineering philosophy combines strict visual craftsmanship with high-performing backends to maximize lead acquisition.",
    bioParagraph2: "Whether you need a sleek customer reservation system, an optimized local SEO listing to rank #1 on Google, or automated workflows using smart AI, I specialize in translating technical potential into measurable financial results for your business.",
    experienceYears: "Years Experience",
    projectsCompleted: "Projects Delivered",
    clientSatisfaction: "Client Satisfaction"
  },
  services: {
    title: "Digital Growth Solutions",
    subtitle: "Engineered to capture leads, streamline operations, and scale your brand",
    priceLabel: "Investment Range:",
    ctaLabel: "Request Proposal"
  },
  portfolio: {
    title: "Featured Projects",
    subtitle: "Real websites built for real businesses to drive customer actions",
    livePreview: "Explore Live Website",
    resultsLabel: "Measurable Impact:"
  },
  caseStudies: {
    title: "Success Case Studies",
    subtitle: "Deep-dives into actual customer challenges, solutions, and financial metrics",
    challengeTitle: "The Challenge",
    solutionTitle: "The Strategy",
    outcomeTitle: "The Result",
    ctaText: "Book a Strategy Call"
  },
  process: {
    title: "My Delivery Process",
    subtitle: "From initial concept mapping to high-performance launch & scaling support",
    steps: [
      { title: "1. Discovery", desc: "We map your target market, competitors, booking funnels, and core business goals." },
      { title: "2. Strategic Design", desc: "Interactive UX wireframes focused strictly on conversion psychology and readability." },
      { title: "3. Fast Engineering", desc: "Clean, high-performance coding with modern React/Next.js frameworks and responsive styling." },
      { title: "4. SEO & Speed Tuning", desc: "Structured schemas, rich sitemaps, and Core Web Vitals optimizations for rank commands." },
      { title: "5. Launch & Scale", desc: "Assisted hosting deployment, analytics configuration, and direct support routines." }
    ]
  },
  faq: {
    title: "Frequently Asked Questions",
    subtitle: "Get straight, transparent answers regarding timelines, budgets, and capabilities"
  },
  blog: {
    title: "Digital Growth Articles",
    subtitle: "Stay updated with tactical insights regarding web speed, SEO strategies, and custom AI tooling",
    readMore: "Read Full Article",
    writtenBy: "By"
  },
  contact: {
    title: "Secure Your Custom Digital Plan",
    subtitle: "Let's build an interactive system that captures customers and boosts your revenues",
    formName: "Full Name",
    formEmail: "Email Address",
    formPhone: "Phone Number (Optional)",
    formMessage: "Tell me about your business goals",
    formSubmit: "Send Strategy Request",
    formSuccess: "⚡ Request successfully sent! Jorge will review your details and contact you via WhatsApp/Email shortly.",
    getInTouch: "Get In Touch",
    directContact: "Direct Channels"
  }
};

export const spanishTranslations: LanguageContent = {
  hero: {
    badge: "⚡ Transformación Digital Completa",
    title: "Construyo soluciones de",
    highlight: "Desarrollo Web e IA",
    subtitle: "Desarrollo web profesional, integraciones de software a medida y SEO enfocado en el crecimiento de negocios locales, diseñado por Jorge Rosario.",
    ctaPrimary: "Hacer Crecer mi Negocio",
    ctaSecondary: "Ver Proyectos Destacados",
    activeClients: "Negocios Escalados"
  },
  about: {
    title: "Sobre Jorge Rosario",
    subtitle: "Conectando código de alto rendimiento, estrategias de SEO y crecimiento digital",
    bioParagraph1: "Hola, soy Jorge Rosario. Diseño y desarrollo portales web ultrarrápidos y herramientas digitales personalizadas diseñadas para escalar empresas modernas. Mi filosofía combina un diseño visual impecable con optimizaciones técnicas que maximizan la conversión de clientes.",
    bioParagraph2: "Ya sea que necesite un sistema de reservas conveniente para sus clientes, un posicionamiento destacado en Google Maps o automatizaciones impulsadas por inteligencia artificial, me especializo en traducir código complejo en ingresos reales.",
    experienceYears: "Años de Experiencia",
    projectsCompleted: "Proyectos Entregados",
    clientSatisfaction: "Satisfacción de Clientes"
  },
  services: {
    title: "Soluciones de Crecimiento",
    subtitle: "Diseñado para capturar prospectos, optimizar operaciones y escalar su marca",
    priceLabel: "Rango de Inversión:",
    ctaLabel: "Solicitar Propuesta"
  },
  portfolio: {
    title: "Proyectos Destacados",
    subtitle: "Plataformas reales creadas para empresas reales que generan ventas y reservas",
    livePreview: "Visitar Sitio Web",
    resultsLabel: "Impacto Medible:"
  },
  caseStudies: {
    title: "Casos de Éxito",
    subtitle: "Análisis profundos de retos de clientes reales, estrategias y métricas financieras",
    challengeTitle: "El Desafío",
    solutionTitle: "La Estrategia",
    outcomeTitle: "El Resultado",
    ctaText: "Reservar Llamada Estratégica"
  },
  process: {
    title: "Mi Proceso de Trabajo",
    subtitle: "Desde el mapa conceptual inicial hasta el lanzamiento optimizado y soporte continuo",
    steps: [
      { title: "1. Descubrimiento", desc: "Analizamos su público objetivo, competidores directos, embudos de conversión y metas de ventas." },
      { title: "2. Diseño Estratégico", desc: "Creación de bocetos interactivos con enfoque en psicología de conversión y lectura rápida." },
      { title: "3. Ingeniería Rápida", desc: "Desarrollo limpio y ultra veloz utilizando React, Next.js y un diseño móvil impecable." },
      { title: "4. SEO y Velocidad", desc: "Metadatos estructurados, mapas del sitio y optimización total de Core Web Vitals." },
      { title: "5. Lanzamiento", desc: "Despliegue guiado de alojamiento, analíticas de conversión de clientes y soporte continuo." }
    ]
  },
  faq: {
    title: "Preguntas Frecuentes",
    subtitle: "Respuestas claras sobre tiempos, presupuestos, metodologías y soporte"
  },
  blog: {
    title: "Artículos de Crecimiento",
    subtitle: "Manténgase al día con guías prácticas sobre rendimiento web, posicionamiento SEO e integraciones de IA",
    readMore: "Leer Artículo Completo",
    writtenBy: "Por"
  },
  contact: {
    title: "Asegure su Plan de Crecimiento",
    subtitle: "Construyamos un sistema interactivo que califique prospectos y aumente sus ingresos",
    formName: "Nombre Completo",
    formEmail: "Correo Electrónico",
    formPhone: "Teléfono (Opcional)",
    formMessage: "Cuénteme sobre sus objetivos de negocio",
    formSubmit: "Enviar Solicitud de Estrategia",
    formSuccess: "⚡ ¡Solicitud enviada con éxito! Jorge revisará sus datos y se pondrá en contacto por WhatsApp o correo electrónico muy pronto.",
    getInTouch: "Contacto Directo",
    directContact: "Canales Directos"
  }
};
