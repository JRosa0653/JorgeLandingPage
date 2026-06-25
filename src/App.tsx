import React, { useState, useEffect } from "react";
import { 
  LanguageProvider, 
  useLanguage 
} from "./components/LanguageContext";
import { SeoEngine } from "./components/SeoEngine";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { ExitIntentPopup } from "./components/ExitIntentPopup";
import { CalendlyModal } from "./components/CalendlyModal";
import { AdminPanel } from "./components/AdminPanel";

import { 
  initialContactInfo, 
  initialSEOConfig, 
  initialProjects, 
  initialServices, 
  initialCaseStudies, 
  initialFAQs, 
  initialBlogPosts, 
  initialTestimonials,
  englishTranslations,
  spanishTranslations
} from "./constants/initialData";

import { 
  Project, 
  Service, 
  BlogPost, 
  CaseStudy, 
  FAQ, 
  Testimonial, 
  SEOConfig, 
  ContactInfo, 
  Lead 
} from "./types";

import { 
  Code, 
  Cpu, 
  TrendingUp, 
  Smartphone, 
  Monitor, 
  Globe, 
  Mail, 
  Phone, 
  ArrowRight, 
  Lock, 
  ExternalLink, 
  Star, 
  BookOpen, 
  Send, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Laptop, 
  Zap, 
  X,
  MessageSquare
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

function PortfolioApp() {
  const { language, setLanguage, t } = useLanguage();

  // 1. Core State Hooks with Local Storage Synchronization
  const [contactInfo, setContactInfo] = useState<ContactInfo>(() => {
    const saved = localStorage.getItem("jorge_contact_info");
    return saved ? JSON.parse(saved) : initialContactInfo;
  });

  const [seoConfig, setSeoConfig] = useState<SEOConfig>(() => {
    const saved = localStorage.getItem("jorge_seo_config");
    return saved ? JSON.parse(saved) : initialSEOConfig;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem("jorge_projects");
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem("jorge_services");
    return saved ? JSON.parse(saved) : initialServices;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem("jorge_testimonials");
    return saved ? JSON.parse(saved) : initialTestimonials;
  });

  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(() => {
    const saved = localStorage.getItem("jorge_case_studies");
    return saved ? JSON.parse(saved) : initialCaseStudies;
  });

  const [faqs, setFaqs] = useState<FAQ[]>(() => {
    const saved = localStorage.getItem("jorge_faqs");
    return saved ? JSON.parse(saved) : initialFAQs;
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem("jorge_blog_posts");
    return saved ? JSON.parse(saved) : initialBlogPosts;
  });

  const [englishContent, setEnglishContent] = useState<any>(() => {
    const saved = localStorage.getItem("jorge_en_content");
    return saved ? JSON.parse(saved) : englishTranslations;
  });

  const [spanishContent, setSpanishContent] = useState<any>(() => {
    const saved = localStorage.getItem("jorge_es_content");
    return saved ? JSON.parse(saved) : spanishTranslations;
  });

  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem("jorge_leads");
    return saved ? JSON.parse(saved) : [];
  });

  const [trackedActions, setTrackedActions] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem("jorge_tracked_actions");
    return saved ? JSON.parse(saved) : {};
  });

  // Local UI Modal Controls
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedActiveBlogPost, setSelectedActiveBlogPost] = useState<BlogPost | null>(null);
  
  // Active states
  const [activeFaqId, setActiveFaqId] = useState<string | null>(null);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  // Form contact hooks
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  // Newsletter hooks
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Sync to local storage when state transitions
  useEffect(() => {
    localStorage.setItem("jorge_contact_info", JSON.stringify(contactInfo));
  }, [contactInfo]);

  useEffect(() => {
    localStorage.setItem("jorge_seo_config", JSON.stringify(seoConfig));
  }, [seoConfig]);

  useEffect(() => {
    localStorage.setItem("jorge_projects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem("jorge_services", JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem("jorge_testimonials", JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem("jorge_case_studies", JSON.stringify(caseStudies));
  }, [caseStudies]);

  useEffect(() => {
    localStorage.setItem("jorge_faqs", JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem("jorge_blog_posts", JSON.stringify(blogPosts));
  }, [blogPosts]);

  useEffect(() => {
    localStorage.setItem("jorge_en_content", JSON.stringify(englishContent));
  }, [englishContent]);

  useEffect(() => {
    localStorage.setItem("jorge_es_content", JSON.stringify(spanishContent));
  }, [spanishContent]);

  useEffect(() => {
    localStorage.setItem("jorge_leads", JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem("jorge_tracked_actions", JSON.stringify(trackedActions));
  }, [trackedActions]);

  // Sync state in real-time across tabs / windows
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (!e.key || !e.newValue) return;
      try {
        const val = JSON.parse(e.newValue);
        switch (e.key) {
          case "jorge_contact_info":
            setContactInfo(val);
            break;
          case "jorge_seo_config":
            setSeoConfig(val);
            break;
          case "jorge_projects":
            setProjects(val);
            break;
          case "jorge_services":
            setServices(val);
            break;
          case "jorge_testimonials":
            setTestimonials(val);
            break;
          case "jorge_case_studies":
            setCaseStudies(val);
            break;
          case "jorge_faqs":
            setFaqs(val);
            break;
          case "jorge_blog_posts":
            setBlogPosts(val);
            break;
          case "jorge_en_content":
            setEnglishContent(val);
            break;
          case "jorge_es_content":
            setSpanishContent(val);
            break;
          case "jorge_leads":
            setLeads(val);
            break;
          case "jorge_tracked_actions":
            setTrackedActions(val);
            break;
          default:
            break;
        }
      } catch (err) {
        console.error("Storage parse error:", err);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Lead handling
  const handleAddLead = (leadData: Omit<Lead, "id" | "date" | "status">) => {
    const newLead: Lead = {
      ...leadData,
      id: `lead_${Date.now()}`,
      status: "new",
      date: new Date().toLocaleDateString(language === "en" ? "en-US" : "es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    };
    setLeads([newLead, ...leads]);
    trackAction("Inbound Lead Captured");
  };

  const handleUpdateLeadStatus = (id: string, status: Lead["status"]) => {
    setLeads(leads.map(lead => lead.id === id ? { ...lead, status } : lead));
  };

  const handleDeleteLead = (id: string) => {
    setLeads(leads.filter(lead => lead.id !== id));
  };

  const handleClearAllLeads = () => {
    setLeads([]);
  };

  const trackAction = (actionName: string) => {
    setTrackedActions(prev => {
      const copy = { ...prev };
      copy[actionName] = (copy[actionName] || 0) + 1;
      return copy;
    });
  };

  const handleResetCMS = () => {
    setContactInfo(initialContactInfo);
    setSeoConfig(initialSEOConfig);
    setProjects(initialProjects);
    setServices(initialServices);
    setTestimonials(initialTestimonials);
    setCaseStudies(initialCaseStudies);
    setFaqs(initialFAQs);
    setBlogPosts(initialBlogPosts);
    setEnglishContent(englishTranslations);
    setSpanishContent(spanishTranslations);
    setLeads([]);
    setTrackedActions({});
    localStorage.clear();
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail) return;

    handleAddLead({
      name: contactName,
      email: contactEmail,
      phone: contactPhone,
      message: contactMessage,
      type: "contact",
      extraDetails: "Footer Contact Consultation Form"
    });

    setContactSuccess(true);
    setContactName("");
    setContactEmail("");
    setContactPhone("");
    setContactMessage("");

    setTimeout(() => {
      setContactSuccess(false);
    }, 6000);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    handleAddLead({
      name: "Newsletter Subscriber",
      email: newsletterEmail,
      message: "Subscribed to Digital Growth updates",
      type: "newsletter"
    });

    setNewsletterSuccess(true);
    setNewsletterEmail("");
    
    setTimeout(() => {
      setNewsletterSuccess(false);
    }, 6000);
  };

  // Switch translations based on active language hooks
  const activeT = language === "en" ? englishContent : spanishContent;

  const technologies = [
    { name: "React", desc: "Interactive, high-converting interfaces.", level: "Advanced" },
    { name: "Next.js", desc: "Static Pre-rendering & fast server loads.", level: "Advanced" },
    { name: "Tailwind CSS", desc: "Fully responsive utilities compilation.", level: "Advanced" },
    { name: "TypeScript", desc: "Bulletproof architecture stability.", level: "Advanced" },
    { name: "Gemini AI", desc: "Intelligent support assistant APIs.", level: "Smart Nodes" },
    { name: "Vercel / Cloud", desc: "Fast hosting CDN networks.", level: "Production ready" },
    { name: "Automations", desc: "Lead triggers & webhook sequences.", level: "Optimized" },
    { name: "APIs Integration", desc: "Payment gateways & secure booking maps.", level: "Seamless" }
  ];

  return (
    <div id="jorge-rosario-portfolio" className="bg-[#030303] text-zinc-100 min-h-screen relative overflow-x-hidden font-sans select-none selection:bg-cyan-500 selection:text-black">
      
      {/* 1. SEO Head Synchronizer */}
      <SeoEngine 
        config={seoConfig} 
        projectName={selectedActiveBlogPost ? selectedActiveBlogPost.title : undefined}
      />

      {/* 2. Exit Intent Popup Retention Offer */}
      <ExitIntentPopup onLeadCaptured={handleAddLead} />

      {/* 3. Floating WhatsApp widget */}
      <FloatingWhatsApp 
        phoneNumber={contactInfo.whatsapp} 
        onTrackAction={trackAction}
      />

      {/* 4. Sticky Header Navigation bar */}
      <header id="portfolio-navbar" className="sticky top-0 z-40 bg-[#030303]/85 backdrop-blur-md border-b border-zinc-900/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-8.5 h-8.5 bg-gradient-to-br from-cyan-400 to-indigo-500 rounded-xl flex items-center justify-center text-black font-black text-sm group-hover:scale-105 transition-transform">
                JR
              </div>
              <span className="font-display font-bold text-base tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                {contactInfo.name}
              </span>
            </a>
          </div>

          <nav id="navbar-links" className="hidden md:flex items-center gap-6 text-xs font-semibold text-zinc-400">
            <a href="#services" className="hover:text-white transition-colors">{language === "en" ? "Solutions" : "Soluciones"}</a>
            <a href="#portfolio" className="hover:text-white transition-colors">{language === "en" ? "Projects" : "Proyectos"}</a>
            <a href="#case-studies" className="hover:text-white transition-colors">{language === "en" ? "Case Studies" : "Casos de Éxito"}</a>
            <a href="#process" className="hover:text-white transition-colors">{language === "en" ? "Process" : "Proceso"}</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <a href="#blog" className="hover:text-white transition-colors">Blog</a>
          </nav>

          <div className="flex items-center gap-3">
            {/* Language dropdown switcher */}
            <div className="relative">
              <button
                id="language-dropdown-toggle"
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="px-3 py-1.5 bg-zinc-900/50 border border-zinc-800/80 rounded-xl flex items-center gap-1 text-xs font-bold text-zinc-300 hover:text-white transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                {language === "en" ? "English" : "Español"}
                <ChevronDown className="w-3 h-3" />
              </button>
              
              {isLangMenuOpen && (
                <div id="language-dropdown" className="absolute right-0 mt-2 w-32 bg-zinc-950 border border-zinc-800 rounded-xl shadow-xl overflow-hidden z-50 py-1">
                  <button
                    onClick={() => {
                      setLanguage("en");
                      setIsLangMenuOpen(false);
                      trackAction("Language Switched to EN");
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold ${language === "en" ? "text-cyan-400 bg-zinc-800/40" : "text-zinc-300 hover:bg-zinc-800/40"}`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => {
                      setLanguage("es");
                      setIsLangMenuOpen(false);
                      trackAction("Language Switched to ES");
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold ${language === "es" ? "text-cyan-400 bg-zinc-800/40" : "text-zinc-300 hover:bg-zinc-800/40"}`}
                  >
                    Español
                  </button>
                </div>
              )}
            </div>

            {/* Admin CMS Trigger */}
            <button
              id="admin-cms-trigger"
              onClick={() => {
                setIsAdminOpen(true);
                trackAction("CMS Panel Accessed");
              }}
              className="p-2 bg-zinc-900/50 hover:bg-zinc-800/60 border border-zinc-800/80 rounded-xl text-zinc-300 hover:text-cyan-400 transition-all"
              title="Content Editor Login"
            >
              <Lock className="w-4 h-4" />
            </button>

            {/* Sticky Header CTA Action */}
            <button
              id="header-cta-button"
              onClick={() => {
                setIsCalendarOpen(true);
                trackAction("CTA Header Booking Clicked");
              }}
              className="hidden sm:inline-flex items-center gap-1 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5" />
              {language === "en" ? "Book Strategy" : "Agendar"}
            </button>
          </div>

        </div>
      </header>

      {/* 5. Main Hero Banner section */}
      <section id="hero-banner" className="relative px-6 py-20 lg:py-32 bg-radial from-[#0d0d12] via-[#030303] to-[#030303]">
        
        {/* Glow ambient vector background shapes */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-8 relative">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900/60 border border-zinc-800/80 rounded-full">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shrink-0" />
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
              {activeT.hero.badge}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1] text-balance">
            {activeT.hero.title}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">
              {activeT.hero.highlight}
            </span>
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-balance font-medium">
            {activeT.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              id="hero-cta-primary"
              onClick={() => {
                setIsCalendarOpen(true);
                trackAction("Hero Primary CTA Clicked");
              }}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm tracking-wide rounded-2xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.25)] hover:shadow-[0_0_35px_rgba(6,182,212,0.45)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 animate-bounce" />
              {activeT.hero.ctaPrimary}
            </button>
            
            <a
              id="hero-cta-secondary"
              href="#portfolio"
              className="w-full sm:w-auto px-8 py-4 bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800/80 text-zinc-100 font-semibold text-sm rounded-2xl transition-all flex items-center justify-center gap-1.5"
            >
              {activeT.hero.ctaSecondary}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Core Trust indicators / Counter strip */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto pt-16 border-t border-zinc-900">
            <div className="text-center">
              <span className="block text-xl sm:text-3xl font-display font-black text-white">5+</span>
              <span className="block text-[10px] sm:text-xs text-zinc-500 font-bold uppercase tracking-wider mt-1">
                {language === "en" ? "Real-World Launches" : "Lanzamientos Reales"}
              </span>
            </div>
            <div className="text-center">
              <span className="block text-xl sm:text-3xl font-display font-black text-cyan-400">99.8%</span>
              <span className="block text-[10px] sm:text-xs text-zinc-500 font-bold uppercase tracking-wider mt-1">
                {language === "en" ? "Lighthouse Performance" : "Rendimiento Web"}
              </span>
            </div>
            <div className="text-center">
              <span className="block text-xl sm:text-3xl font-display font-black text-white">100%</span>
              <span className="block text-[10px] sm:text-xs text-zinc-500 font-bold uppercase tracking-wider mt-1">
                {language === "en" ? "Lead-Capture Driven" : "Enfoque en Ventas"}
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Professional Services Section */}
      <section id="services" className="py-24 px-6 border-t border-zinc-900/60 bg-[#030303]">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs text-cyan-400 uppercase font-black tracking-widest font-mono">
              {language === "en" ? "Services Offered" : "Servicios Ofrecidos"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-white">
              {activeT.services.title}
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              {activeT.services.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((serv) => {
              const itemTitle = language === "en" ? serv.title : (serv as any).title_es || serv.title;
              const itemDesc = language === "en" ? serv.description : (serv as any).description_es || serv.description;
              const itemFeatures = language === "en" ? serv.features : (serv as any).features_es || serv.features;

              return (
                <div
                  key={serv.id}
                  id={`service-card-${serv.id}`}
                  className="p-8 elegant-glass-card rounded-2xl flex flex-col justify-between transition-all hover:scale-[1.01] group relative overflow-hidden"
                >
                  <div className="space-y-6">
                    {/* Icon loader based on seed parameters */}
                    <div className="w-12 h-12 bg-cyan-950/20 text-cyan-400 border border-cyan-900/40 rounded-xl flex items-center justify-center">
                      {serv.iconName === "Cpu" ? <Cpu className="w-6 h-6" /> : serv.iconName === "TrendingUp" ? <TrendingUp className="w-6 h-6" /> : <Code className="w-6 h-6" />}
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {itemTitle}
                      </h3>
                      <p className="text-zinc-400 text-xs mt-2.5 leading-relaxed">
                        {itemDesc}
                      </p>
                    </div>

                    <ul className="space-y-2 border-t border-zinc-900/60 pt-6">
                      {itemFeatures?.map((feat: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-6 border-t border-zinc-900/60 flex items-center justify-between">
                    <div>
                      <span className="block text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                        {activeT.services.priceLabel}
                      </span>
                      <span className="text-xs font-bold text-white font-mono">{serv.priceRange}</span>
                    </div>
                    <button
                      id={`service-cta-${serv.id}`}
                      onClick={() => {
                        setIsCalendarOpen(true);
                        trackAction(`Service CTA Requested: ${serv.title}`);
                      }}
                      className="px-4 py-2 bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 hover:text-white text-[11px] font-bold rounded-xl transition-colors"
                    >
                      {activeT.services.ctaLabel}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 7. Technologies I Use (Advanced Grid section) */}
      <section id="technologies" className="py-24 px-6 border-t border-zinc-900/60 bg-[#030303]">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs text-indigo-400 uppercase font-black tracking-widest font-mono">
              {language === "en" ? "Core Tech Capabilities" : "Capacidades de Tecnología"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-white">
              {language === "en" ? "Modern Stack for Peak Speed" : "Tecnologías de Alto Rendimiento"}
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              {language === "en" 
                ? "I build websites using fast rendering processes, fluid client hydration, and smart API automations." 
                : "Construyo sitios web utilizando renderizado rápido, hidratación fluida y automatizaciones inteligentes."}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {technologies.map((tech, i) => (
              <div
                key={i}
                id={`tech-item-${i}`}
                className="p-6 bg-zinc-900/10 border border-zinc-900/60 rounded-2xl flex flex-col justify-between hover:border-zinc-800/80 transition-colors group cursor-pointer"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-display font-extrabold text-white text-base group-hover:text-cyan-400 transition-colors">{tech.name}</span>
                    <span className="text-[9px] px-2 py-0.5 bg-black/40 text-zinc-500 rounded-full font-bold uppercase tracking-wider">{tech.level}</span>
                  </div>
                  <p className="text-zinc-400 text-[11px] leading-relaxed">
                    {tech.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. Portfolio Section: Featured Projects Grid */}
      <section id="portfolio" className="py-24 px-6 border-t border-zinc-900/60 bg-radial from-zinc-900/40 via-[#030303] to-[#030303]">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs text-cyan-400 uppercase font-black tracking-widest font-mono">
              {language === "en" ? "Featured Work" : "Portafolio Destacado"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-white">
              {activeT.portfolio.title}
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              {activeT.portfolio.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((proj) => {
              const projTitle = language === "en" ? proj.name : (proj as any).name_es || proj.name;
              const projDesc = language === "en" ? proj.description : (proj as any).description_es || proj.description;
              const projResults = language === "en" ? proj.results : (proj as any).results_es || proj.results;

              return (
                <div
                  key={proj.id}
                  id={`project-card-${proj.id}`}
                  className="elegant-glass-card rounded-2xl overflow-hidden flex flex-col justify-between transition-all hover:scale-[1.01] group"
                >
                  <div>
                    {/* Card Cover Picture */}
                    <div className="relative aspect-video bg-black overflow-hidden border-b border-zinc-900/60">
                      <img
                        src={proj.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"}
                        alt={projTitle}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-2.5 py-1 bg-zinc-950/90 border border-zinc-800 text-[10px] font-black uppercase text-zinc-300 rounded-lg shadow-lg">
                          {proj.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <h3 className="text-base font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors">
                        {projTitle}
                      </h3>
                      <p className="text-zinc-400 text-xs leading-relaxed line-clamp-3">
                        {projDesc}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 space-y-4">
                    {/* Measurable Results tag */}
                    {projResults && (
                      <div className="p-3 bg-black/40 border border-zinc-900/60 rounded-xl">
                        <span className="block text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
                          {activeT.portfolio.resultsLabel}
                        </span>
                        <span className="text-xs text-white font-medium mt-0.5 block">{projResults}</span>
                      </div>
                    )}

                    <div className="pt-2 flex items-center justify-between">
                      <a
                        id={`project-live-btn-${proj.id}`}
                        href={proj.url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => trackAction(`Project External Visited: ${proj.name}`)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        {activeT.portfolio.livePreview}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 9. Case Studies Section */}
      <section id="case-studies" className="py-24 px-6 border-t border-zinc-900/60 bg-[#030303]">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs text-indigo-400 uppercase font-black tracking-widest font-mono">
              {language === "en" ? "Measurable Results" : "Resultados Medibles"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-white">
              {activeT.caseStudies.title}
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              {activeT.caseStudies.subtitle}
            </p>
          </div>

          <div className="space-y-12">
            {caseStudies.map((cs) => {
              const csTitle = language === "en" ? cs.title : (cs as any).title_es || cs.title;
              const csOutcome = language === "en" ? cs.outcome : (cs as any).outcome_es || cs.outcome;
              const csChallenge = language === "en" ? cs.challenge : (cs as any).challenge_es || cs.challenge;
              const csSolution = language === "en" ? cs.solution : (cs as any).solution_es || cs.solution;
              const csMetrics = language === "en" ? cs.metrics : (cs as any).metrics_es || cs.metrics;

              return (
                <div
                  key={cs.id}
                  id={`case-study-block-${cs.id}`}
                  className="p-8 lg:p-12 elegant-glass-card rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                >
                  
                  {/* Left Column: Metrics and Title */}
                  <div className="lg:col-span-5 space-y-6">
                    <span className="text-[10px] px-2.5 py-1 bg-zinc-950 text-zinc-400 font-bold uppercase rounded border border-zinc-800">
                      {cs.client}
                    </span>
                    <h3 className="text-2xl font-bold font-display tracking-tight text-white">
                      {csTitle}
                    </h3>
                    
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-900/60">
                      {csMetrics?.map((met: any, idx: number) => (
                        <div key={idx}>
                          <span className="block text-2xl font-black text-cyan-400">{met.value}</span>
                          <span className="block text-[9px] text-zinc-500 font-bold uppercase tracking-wider mt-1">{met.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Challenge vs Strategy */}
                  <div className="lg:col-span-7 space-y-6 lg:border-l lg:border-zinc-900/60 lg:pl-8">
                    <div>
                      <h4 className="text-xs font-black uppercase text-indigo-400 tracking-wider mb-1.5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                        {activeT.caseStudies.challengeTitle}
                      </h4>
                      <p className="text-zinc-400 text-xs leading-relaxed">
                        {csChallenge}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-black uppercase text-cyan-400 tracking-wider mb-1.5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                        {activeT.caseStudies.solutionTitle}
                      </h4>
                      <p className="text-zinc-400 text-xs leading-relaxed">
                        {csSolution}
                      </p>
                    </div>

                    <div className="p-4 bg-black/40 border border-zinc-900/60 rounded-xl">
                      <h4 className="text-xs font-black uppercase text-white tracking-wider mb-1 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        {activeT.caseStudies.outcomeTitle}
                      </h4>
                      <p className="text-zinc-300 text-xs leading-relaxed mt-1">
                        {csOutcome}
                      </p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 10. Business Delivery Process timeline */}
      <section id="process" className="py-24 px-6 border-t border-zinc-900/60 bg-radial from-zinc-900/20 via-[#030303] to-[#030303]">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs text-cyan-400 uppercase font-black tracking-widest font-mono">
              {language === "en" ? "Lifecycle" : "Metodología"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-white">
              {activeT.process.title}
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              {activeT.process.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            {/* Horizontal timeline connector bar */}
            <div className="hidden md:block absolute top-12 left-10 right-10 h-[1px] bg-zinc-800/80 z-0" />

            {activeT.process.steps.map((step: any, idx: number) => (
              <div key={idx} id={`process-step-${idx}`} className="space-y-4 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-cyan-400 text-cyan-400 text-xs font-bold flex items-center justify-center transition-colors">
                  0{idx + 1}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{step.title}</h4>
                  <p className="text-zinc-400 text-xs mt-1.5 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 11. Frequently Asked Questions Section (Accoridons) */}
      <section id="faq" className="py-24 px-6 border-t border-zinc-900/60 bg-[#030303]">
        <div className="max-w-3xl mx-auto">
          
          <div className="text-center mb-16 space-y-3">
            <span className="text-xs text-indigo-400 uppercase font-black tracking-widest font-mono">FAQ</span>
            <h2 className="text-3xl font-display font-black tracking-tight text-white">
              {activeT.faq.title}
            </h2>
            <p className="text-zinc-400 text-xs max-w-md mx-auto">
              {activeT.faq.subtitle}
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => {
              const activeQuestion = language === "en" ? faq.question : (faq as any).question_es || faq.question;
              const activeAnswer = language === "en" ? faq.answer : (faq as any).answer_es || faq.answer;
              const isOpen = activeFaqId === faq.id;

              return (
                <div
                  key={faq.id}
                  id={`faq-item-${faq.id}`}
                  className="elegant-glass-card rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => {
                      setActiveFaqId(isOpen ? null : faq.id);
                      trackAction(`FAQ Toggled: ${faq.id}`);
                    }}
                    className="w-full text-left p-6 flex justify-between items-center gap-4 text-white hover:text-cyan-400 transition-colors"
                  >
                    <span className="font-bold text-xs sm:text-sm">{activeQuestion}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-cyan-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0" />}
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-6 pt-0 border-t border-zinc-900/40 text-zinc-400 text-xs leading-relaxed">
                          {activeAnswer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 12. Thought Leadership Blog section */}
      <section id="blog" className="py-24 px-6 border-t border-zinc-900/60 bg-[#030303]">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs text-cyan-400 uppercase font-black tracking-widest font-mono">
              {language === "en" ? "Industry Insights" : "Artículos de Interés"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-white">
              {activeT.blog.title}
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              {activeT.blog.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post) => {
              const activeTitle = language === "en" ? post.title : (post as any).title_es || post.title;
              const activeExcerpt = language === "en" ? post.excerpt : (post as any).excerpt_es || post.excerpt;

              return (
                <div
                  key={post.id}
                  id={`blog-item-${post.id}`}
                  className="p-6 elegant-glass-card rounded-2xl flex flex-col justify-between transition-colors group cursor-pointer"
                  onClick={() => {
                    setSelectedActiveBlogPost(post);
                    trackAction(`Blog Article Read: ${post.title}`);
                  }}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-[10px] text-zinc-500 font-bold uppercase tracking-wider font-mono">
                      <span>{post.category}</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {activeTitle}
                    </h3>
                    
                    <p className="text-zinc-400 text-xs leading-relaxed line-clamp-2">
                      {activeExcerpt}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-zinc-900/60 mt-6 flex items-center justify-between">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase">
                      {activeT.blog.writtenBy} <span className="text-zinc-300">{post.author}</span>
                    </span>
                    <span className="text-cyan-400 font-bold text-xs inline-flex items-center gap-1 group-hover:text-cyan-300">
                      {activeT.blog.readMore}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 13. Testimonials Sliders Carousel Section */}
      <section id="testimonials" className="py-24 px-6 border-t border-zinc-900/60 bg-radial from-zinc-900/30 via-[#030303] to-[#030303]">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs text-indigo-400 uppercase font-black tracking-widest font-mono">
              {language === "en" ? "Testimonials" : "Testimonios"}
            </span>
            <h2 className="text-3xl font-display font-black tracking-tight text-white">
              {language === "en" ? "What Scaled Clients Say" : "Opiniones de Clientes"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test) => (
              <div key={test.id} className="p-8 elegant-glass-card rounded-2xl flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex gap-1">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
                    ))}
                  </div>
                  <p className="text-zinc-300 text-xs leading-relaxed italic">
                    "{test.feedback}"
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-6 pt-6 border-t border-zinc-900/60">
                  <div>
                    <span className="font-bold text-white text-xs block">{test.name}</span>
                    <span className="text-[10px] text-zinc-500 block font-semibold">{test.role}, {test.company}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 14. Real-time Conversion Footer: Booking + Direct form */}
      <footer id="contact" className="py-24 px-6 border-t border-zinc-900/60 bg-[#030303] relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
          
          {/* Left Column: direct channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-xs text-cyan-400 uppercase font-black tracking-widest font-mono">
                {language === "en" ? "Ready to Scale?" : "¿Listo para Comenzar?"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-white leading-tight">
                {activeT.contact.title}
              </h2>
              <p className="text-zinc-400 text-xs leading-relaxed max-w-sm">
                {activeT.contact.subtitle}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase text-zinc-500 tracking-wider">
                {activeT.contact.directContact}
              </h4>

              <div className="space-y-3">
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="p-4 elegant-glass-card rounded-2xl flex items-center gap-4 hover:bg-zinc-900/40 transition-all cursor-pointer group"
                >
                  <div className="w-10 h-10 bg-cyan-950/20 text-cyan-400 border border-cyan-900/40 rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-zinc-500 font-bold uppercase">Send email</span>
                    <span className="text-xs font-bold text-white font-mono group-hover:text-cyan-400 transition-colors">{contactInfo.email}</span>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${contactInfo.whatsapp.replace(/[+\s-()]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackAction("Direct WhatsApp Action Triggered")}
                  className="p-4 elegant-glass-card rounded-2xl flex items-center gap-4 hover:bg-zinc-900/40 transition-all cursor-pointer group"
                >
                  <div className="w-10 h-10 bg-emerald-950/20 text-emerald-400 border border-emerald-900/40 rounded-xl flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-zinc-500 font-bold uppercase">WhatsApp Direct</span>
                    <span className="text-xs font-bold text-white font-mono group-hover:text-emerald-400 transition-colors">{contactInfo.phone}</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Newsletter form */}
            <div className="p-6 elegant-glass-card rounded-2xl space-y-4">
              <h4 className="text-xs font-black uppercase text-zinc-400 tracking-wider">
                {language === "en" ? "Subscribe to Growth Insights" : "Boletín de Estrategia Digital"}
              </h4>
              <p className="text-zinc-500 text-[11px] leading-relaxed">
                {language === "en" ? "Get monthly guides on sitemaps, Google maps ranking, and web speed diagnostics. No spam." : "Reciba guías mensuales de SEO, Google Maps y velocidad. Sin spam."}
              </p>
              
              {!newsletterSuccess ? (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <input
                    id="newsletter-email-input"
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 bg-[#0a0a0c] border border-zinc-800/60 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                  <button
                    id="newsletter-submit-btn"
                    type="submit"
                    className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs uppercase tracking-wider rounded-xl transition-colors shrink-0"
                  >
                    {language === "en" ? "Join" : "Unirme"}
                  </button>
                </form>
              ) : (
                <p className="text-emerald-400 text-xs font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  {language === "en" ? "Successfully joined list!" : "¡Suscrito con éxito!"}
                </p>
              )}
            </div>
          </div>

          {/* Right Column: dynamic lead capture form */}
          <div className="lg:col-span-7 p-8 lg:p-10 elegant-glass-card rounded-3xl h-max">
            
            <h3 className="text-lg font-bold text-white tracking-tight mb-6">
              {language === "en" ? "Request a Free Custom Strategy Proposal" : "Solicitar Propuesta Estratégica Gratis"}
            </h3>

            {contactSuccess ? (
              <div id="contact-success-toast" className="p-6 bg-cyan-950/20 border border-cyan-800/40 text-cyan-400 rounded-2xl space-y-3">
                <CheckCircle2 className="w-8 h-8 animate-bounce" />
                <p className="text-xs leading-relaxed font-bold">
                  {activeT.contact.formSuccess}
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5">
                      {activeT.contact.formName}
                    </label>
                    <input
                      id="contact-name-input"
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Alex Sterling"
                      className="w-full bg-[#0a0a0c] border border-zinc-800/60 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5">
                      {activeT.contact.formEmail}
                    </label>
                    <input
                      id="contact-email-input"
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="alex@example.com"
                      className="w-full bg-[#0a0a0c] border border-zinc-800/60 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5">
                    {activeT.contact.formPhone}
                  </label>
                  <input
                    id="contact-phone-input"
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="+18494530811"
                    className="w-full bg-[#0a0a0c] border border-zinc-800/60 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5">
                    {activeT.contact.formMessage}
                  </label>
                  <textarea
                    id="contact-message-input"
                    required
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder={language === "en" ? "My target is to scale my barbershop bookings..." : "Mi objetivo es aumentar los clientes de mi negocio..."}
                    rows={4}
                    className="w-full bg-[#0a0a0c] border border-zinc-800/60 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-transparent transition-all"
                  />
                </div>

                <button
                  id="contact-submit-btn"
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.25)] hover:shadow-[0_0_35px_rgba(6,182,212,0.45)] active:scale-95 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 inline-block mr-1.5 shrink-0" />
                  {activeT.contact.formSubmit}
                </button>
              </form>
            )}

          </div>

        </div>

        {/* Footer Credit Line */}
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-zinc-900/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-zinc-500 font-semibold tracking-wider uppercase">
          <div>
            © {new Date().getFullYear()} {contactInfo.name} Digital Solutions. All Rights Reserved.
          </div>
          <div className="flex gap-4">
            <a href="#portfolio" className="hover:text-cyan-400 transition-colors">Portafolio</a>
            <span>•</span>
            <a href="#services" className="hover:text-cyan-400 transition-colors">Servicios</a>
            <span>•</span>
            <button 
              onClick={() => {
                setIsAdminOpen(true);
                trackAction("Footer Lock Clicked");
              }}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              <Lock className="w-3 h-3" /> Console Log
            </button>
          </div>
        </div>
      </footer>

      {/* 15. Calendly Scheduler Dialog Modal */}
      <CalendlyModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        onBookingCreated={handleAddLead}
      />

      {/* 16. Admin CMS Workspace Modal Overlay */}
      <AnimatePresence>
        {isAdminOpen && (
          <div id="admin-modal-overlay" className="fixed inset-0 z-50 bg-slate-950 flex flex-col p-4 lg:p-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col gap-4">
              
              {/* Header inside admin fullscreen */}
              <div className="flex items-center justify-between border-b border-slate-900 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 bg-cyan-400 rounded-full animate-pulse" />
                  <h2 className="text-xl font-black text-white">Jorge Rosario CMS Admin Portal</h2>
                </div>
                <button
                  id="admin-modal-close"
                  onClick={() => setIsAdminOpen(false)}
                  className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Real panel */}
              <AdminPanel
                contactInfo={contactInfo}
                setContactInfo={setContactInfo}
                seoConfig={seoConfig}
                setSeoConfig={setSeoConfig}
                projects={projects}
                setProjects={setProjects}
                services={services}
                setServices={setServices}
                testimonials={testimonials}
                setTestimonials={setTestimonials}
                caseStudies={caseStudies}
                setCaseStudies={setCaseStudies}
                faqs={faqs}
                setFaqs={setFaqs}
                blogPosts={blogPosts}
                setBlogPosts={setBlogPosts}
                englishContent={englishContent}
                setEnglishContent={setEnglishContent}
                spanishContent={spanishContent}
                setSpanishContent={setSpanishContent}
                leads={leads}
                onUpdateLeadStatus={handleUpdateLeadStatus}
                onDeleteLead={handleDeleteLead}
                onClearAllLeads={handleClearAllLeads}
                trackedActions={trackedActions}
                onResetCMS={handleResetCMS}
              />

            </div>
          </div>
        )}
      </AnimatePresence>

      {/* 17. Expanded BlogPost Article Overlay Drawer */}
      <AnimatePresence>
        {selectedActiveBlogPost && (
          <div id="blog-drawer-overlay" className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              id="blog-drawer-card"
              className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            >
              <div className="relative aspect-video bg-slate-950 border-b border-slate-800">
                <img 
                  src={selectedActiveBlogPost.image} 
                  alt={selectedActiveBlogPost.title} 
                  className="w-full h-full object-cover"
                />
                <button
                  id="blog-drawer-close"
                  onClick={() => setSelectedActiveBlogPost(null)}
                  className="absolute top-4 right-4 p-1.5 bg-slate-950/80 hover:bg-slate-950 border border-slate-800 text-slate-400 hover:text-white rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 p-8 overflow-y-auto space-y-4">
                <div className="flex items-center gap-3 text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">
                  <span>{selectedActiveBlogPost.category}</span>
                  <span>•</span>
                  <span>{selectedActiveBlogPost.date}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white">
                  {language === "en" ? selectedActiveBlogPost.title : (selectedActiveBlogPost as any).title_es || selectedActiveBlogPost.title}
                </h3>

                <div className="h-[1px] bg-slate-800 my-4" />

                {/* Simulated Markdown body parser */}
                <div 
                  className="markdown-body"
                  dangerouslySetInnerHTML={{ 
                    __html: (language === "en" ? selectedActiveBlogPost.content : (selectedActiveBlogPost as any).content_es || selectedActiveBlogPost.content)
                      .replace(/##\s+(.*)/g, "<h2>$1</h2>")
                      .replace(/###\s+(.*)/g, "<h3 class='text-sm font-bold text-white mt-4 mb-2'>$1</h3>")
                      .replace(/-\s+\*\*(.*?)\*\*:\s+(.*)/g, "<li class='text-xs text-slate-400 leading-relaxed mb-1.5'><strong class='text-cyan-400'>$1</strong>: $2</li>")
                      .replace(/\n\n/g, "</p><p>")
                      .replace(/^(?!<(h2|h3|li))/gm, "<p>") 
                  }}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <PortfolioApp />
    </LanguageProvider>
  );
}
