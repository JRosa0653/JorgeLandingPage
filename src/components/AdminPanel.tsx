import React, { useState } from "react";
import { 
  Project, 
  Service, 
  BlogPost, 
  CaseStudy, 
  FAQ, 
  Testimonial, 
  SEOConfig, 
  ContactInfo, 
  Lead,
  LanguageContent
} from "../types";
import { AnalyticsDashboard } from "./AnalyticsDashboard";
import { runSeoAudit, generateVirtualSitemap, generateVirtualRobotsTxt } from "./SeoEngine";
import { 
  Lock, 
  Unlock, 
  Save, 
  Plus, 
  Edit, 
  Trash2, 
  FileText, 
  Image as ImageIcon, 
  BarChart3, 
  Settings, 
  Globe, 
  HelpCircle, 
  MessageSquare, 
  Layout, 
  Briefcase, 
  Eye, 
  Copy, 
  Check, 
  Upload, 
  RefreshCw 
} from "lucide-react";
import { motion } from "motion/react";

interface AdminPanelProps {
  // CMS Content States
  contactInfo: ContactInfo;
  setContactInfo: (c: ContactInfo) => void;
  seoConfig: SEOConfig;
  setSeoConfig: (s: SEOConfig) => void;
  projects: Project[];
  setProjects: (p: any[]) => void;
  services: Service[];
  setServices: (s: any[]) => void;
  testimonials: Testimonial[];
  setTestimonials: (t: Testimonial[]) => void;
  caseStudies: CaseStudy[];
  setCaseStudies: (c: any[]) => void;
  faqs: FAQ[];
  setFaqs: (f: any[]) => void;
  blogPosts: BlogPost[];
  setBlogPosts: (b: any[]) => void;
  englishContent: LanguageContent;
  setEnglishContent: (e: LanguageContent) => void;
  spanishContent: LanguageContent;
  setSpanishContent: (s: LanguageContent) => void;
  
  // CRM & Analytics States
  leads: Lead[];
  onUpdateLeadStatus: (id: string, status: Lead["status"]) => void;
  onDeleteLead: (id: string) => void;
  onClearAllLeads: () => void;
  trackedActions: Record<string, number>;
  onResetCMS: () => void;
}

type AdminTab = 
  | "analytics" 
  | "hero" 
  | "about" 
  | "services" 
  | "portfolio" 
  | "caseStudies" 
  | "blog" 
  | "testimonials" 
  | "faq" 
  | "contact" 
  | "seo" 
  | "media" 
  | "languages";

export const AdminPanel: React.FC<AdminPanelProps> = ({
  contactInfo, setContactInfo,
  seoConfig, setSeoConfig,
  projects, setProjects,
  services, setServices,
  testimonials, setTestimonials,
  caseStudies, setCaseStudies,
  faqs, setFaqs,
  blogPosts, setBlogPosts,
  englishContent, setEnglishContent,
  spanishContent, setSpanishContent,
  leads, onUpdateLeadStatus, onDeleteLead, onClearAllLeads,
  trackedActions,
  onResetCMS
}) => {
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("jorge_admin_auth") === "true";
  });
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState<AdminTab>("analytics");
  
  // Clipboard indicators
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Forms states for adds/edits
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Local preset media files
  const [mediaFiles, setMediaFiles] = useState<{ name: string; url: string; size: string }[]>([
    { name: "Barbershop Hero.jpg", url: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80", size: "142 KB" },
    { name: "Sabor Dominicano Menu.jpg", url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80", size: "210 KB" },
    { name: "Real Estate Building.jpg", url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80", size: "185 KB" },
    { name: "Corporate Analytics.jpg", url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80", size: "320 KB" }
  ]);
  const [newMediaUrl, setNewMediaUrl] = useState("");
  const [newMediaName, setNewMediaName] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "1234") {
      setIsAuthenticated(true);
      sessionStorage.setItem("jorge_admin_auth", "true");
      setAuthError("");
    } else {
      setAuthError("Invalid Administrator Passcode. Tip: Use 1234");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("jorge_admin_auth");
    setPasscode("");
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // 1. Hero & Badges save handler
  const handleUpdateHero = (lang: "en" | "es", field: string, val: string) => {
    if (lang === "en") {
      setEnglishContent({
        ...englishContent,
        hero: { ...englishContent.hero, [field]: val }
      });
    } else {
      setSpanishContent({
        ...spanishContent,
        hero: { ...spanishContent.hero, [field]: val }
      });
    }
  };

  // 2. About Me save handler
  const handleUpdateAbout = (lang: "en" | "es", field: string, val: string) => {
    if (lang === "en") {
      setEnglishContent({
        ...englishContent,
        about: { ...englishContent.about, [field]: val }
      });
    } else {
      setSpanishContent({
        ...spanishContent,
        about: { ...spanishContent.about, [field]: val }
      });
    }
  };

  // 3. Portfolio project addition and deletion handlers
  const [projectForm, setProjectForm] = useState<Partial<Project & { name_es: string; description_es: string; results_es: string }>>({
    name: "", name_es: "", category: "", url: "", description: "", description_es: "", results: "", results_es: "", image: "", featured: true
  });

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.name || !projectForm.url) return;

    if (editingId) {
      setProjects(projects.map(p => p.id === editingId ? { ...p, ...projectForm } : p));
      setEditingId(null);
    } else {
      const newProj = {
        ...projectForm,
        id: `proj_${Date.now()}`
      };
      setProjects([...projects, newProj]);
    }
    setProjectForm({ name: "", name_es: "", category: "", url: "", description: "", description_es: "", results: "", results_es: "", image: "", featured: true });
  };

  const handleEditProject = (p: any) => {
    setEditingId(p.id);
    setProjectForm(p);
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  // 4. Services addition & editing
  const [serviceForm, setServiceForm] = useState<Partial<Service & { title_es: string; description_es: string }>>({
    title: "", title_es: "", description: "", description_es: "", priceRange: "", iconName: "Code"
  });

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceForm.title || !serviceForm.priceRange) return;

    if (editingId) {
      setServices(services.map(s => s.id === editingId ? { ...s, ...serviceForm } : s));
      setEditingId(null);
    } else {
      const newServ = {
        ...serviceForm,
        id: `serv_${Date.now()}`,
        features: ["Fully Customizable layout", "Mobile responsive styling", "Core SEO configurations"],
        features_es: ["Diseño 100% Personalizable", "Diseño Adaptable para Móviles", "Configuración de SEO Esencial"]
      };
      setServices([...services, newServ]);
    }
    setServiceForm({ title: "", title_es: "", description: "", description_es: "", priceRange: "", iconName: "Code" });
  };

  const handleEditService = (s: any) => {
    setEditingId(s.id);
    setServiceForm(s);
  };

  const handleDeleteService = (id: string) => {
    setServices(services.filter(s => s.id !== id));
  };

  // 5. Testimonials addition & editing
  const [testForm, setTestForm] = useState<Partial<Testimonial>>({
    name: "", role: "", company: "", feedback: "", rating: 5, image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
  });

  const handleSaveTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testForm.name || !testForm.feedback) return;

    if (editingId) {
      setTestimonials(testimonials.map(t => t.id === editingId ? { ...t, ...testForm } : t));
      setEditingId(null);
    } else {
      const newTest = {
        ...testForm,
        id: `test_${Date.now()}`
      } as Testimonial;
      setTestimonials([...testimonials, newTest]);
    }
    setTestForm({ name: "", role: "", company: "", feedback: "", rating: 5, image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" });
  };

  // 6. Blog post editor
  const [blogForm, setBlogForm] = useState<Partial<BlogPost & { title_es: string; excerpt_es: string; content_es: string }>>({
    title: "", title_es: "", excerpt: "", excerpt_es: "", content: "", content_es: "", category: "Web Development", readTime: "4 min read", author: "Jorge Rosario", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
  });

  const handleSaveBlogPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.title || !blogForm.content) return;

    if (editingId) {
      setBlogPosts(blogPosts.map(b => b.id === editingId ? { ...b, ...blogForm } : b));
      setEditingId(null);
    } else {
      const newPost = {
        ...blogForm,
        id: `blog_${Date.now()}`,
        date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
      };
      setBlogPosts([...blogPosts, newPost]);
    }
    setBlogForm({ title: "", title_es: "", excerpt: "", excerpt_es: "", content: "", content_es: "", category: "Web Development", readTime: "4 min read", author: "Jorge Rosario", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" });
  };

  // 7. Media Addition (Base64 file uploader or direct URL pasting)
  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newMedia = {
          name: file.name,
          url: reader.result as string,
          size: `${Math.round(file.size / 1024)} KB`
        };
        setMediaFiles([newMedia, ...mediaFiles]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddMediaUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMediaUrl) return;
    const item = {
      name: newMediaName || "External Asset.jpg",
      url: newMediaUrl,
      size: "Remote URL"
    };
    setMediaFiles([item, ...mediaFiles]);
    setNewMediaUrl("");
    setNewMediaName("");
  };

  // 8. Dynamic Sitemap and Robots views
  const virtualSitemap = generateSitemapString(seoConfig.canonicalUrl || "https://jorgerosario.dev", projects, blogPosts);
  const virtualRobots = generateVirtualRobotsTxt(seoConfig.canonicalUrl || "https://jorgerosario.dev");

  // Run Real-time SEO Audit on current configuration fields
  const seoAudit = runSeoAudit(seoConfig, projects.length + blogPosts.length);

  function generateSitemapString(canonical: string, prjs: any[], bgs: any[]): string {
    const orig = canonical.replace(/\/$/, "");
    const date = new Date().toISOString().split("T")[0];
    let mapStr = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    mapStr += `  <url>\n    <loc>${orig}</loc>\n    <lastmod>${date}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;
    prjs.forEach(p => {
      mapStr += `  <url>\n    <loc>${orig}/#portfolio</loc>\n    <lastmod>${date}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    });
    bgs.forEach(b => {
      mapStr += `  <url>\n    <loc>${orig}/#blog</loc>\n    <lastmod>${date}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
    });
    mapStr += `</urlset>`;
    return mapStr;
  }

  // Render Login Window if not Authenticated
  if (!isAuthenticated) {
    return (
      <div id="admin-auth-panel" className="max-w-md mx-auto my-12 p-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full flex items-center justify-center mx-auto mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-black text-white">Administrator CMS Login</h3>
          <p className="text-xs text-slate-400 mt-1">Jorge Rosario Content Management System</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Enter Passcode</label>
            <input
              id="admin-passcode-input"
              type="password"
              placeholder="••••••••"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-center text-white text-lg placeholder-slate-600 tracking-widest focus:outline-none focus:ring-1 focus:ring-cyan-500"
              required
            />
          </div>

          {authError && (
            <div id="admin-auth-error" className="p-3 bg-red-950/40 border border-red-900/60 text-red-400 text-xs text-center rounded-lg font-medium">
              {authError}
            </div>
          )}

          <button
            id="admin-auth-submit"
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg active:scale-95"
          >
            Unlock Dashboard
          </button>
        </form>

        <div className="text-center mt-6 text-[10px] text-slate-500 font-semibold uppercase tracking-wider bg-slate-950/40 py-2.5 rounded-lg border border-slate-800/40">
          🔑 Security Key Tip: <span className="text-cyan-400">1234</span>
        </div>
      </div>
    );
  }

  return (
    <div id="admin-active-panel" className="bg-slate-950 border border-slate-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row min-h-[600px] text-xs">
      
      {/* Sidebar Navigation */}
      <div id="admin-sidebar" className="lg:w-64 bg-slate-900 border-b lg:border-b-0 lg:border-r border-slate-800 p-6 shrink-0 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center text-slate-950 font-black text-sm">
              JR
            </div>
            <div>
              <h3 className="font-black text-white text-sm">Jorge Rosario</h3>
              <p className="text-[10px] text-slate-400">Website CMS Portal</p>
            </div>
          </div>

          <div className="space-y-1">
            <button
              onClick={() => setActiveTab("analytics")}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl font-semibold transition-colors ${activeTab === "analytics" ? "bg-cyan-500 text-slate-950" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
            >
              <BarChart3 className="w-4 h-4" /> Analytics & Leads
            </button>
            
            <div className="h-[1px] bg-slate-800 my-2" />
            <span className="block text-[9px] text-slate-500 uppercase font-black px-3 py-1">Content Editors</span>

            <button
              onClick={() => setActiveTab("hero")}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl font-semibold transition-colors ${activeTab === "hero" ? "bg-cyan-500 text-slate-950" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
            >
              <Layout className="w-4 h-4" /> Hero Section
            </button>

            <button
              onClick={() => setActiveTab("about")}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl font-semibold transition-colors ${activeTab === "about" ? "bg-cyan-500 text-slate-950" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
            >
              <FileText className="w-4 h-4" /> About & Bio
            </button>

            <button
              onClick={() => setActiveTab("services")}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl font-semibold transition-colors ${activeTab === "services" ? "bg-cyan-500 text-slate-950" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
            >
              <Settings className="w-4 h-4" /> Services Config
            </button>

            <button
              onClick={() => setActiveTab("portfolio")}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl font-semibold transition-colors ${activeTab === "portfolio" ? "bg-cyan-500 text-slate-950" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
            >
              <Briefcase className="w-4 h-4" /> Portfolio Grid
            </button>

            <button
              onClick={() => setActiveTab("caseStudies")}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl font-semibold transition-colors ${activeTab === "caseStudies" ? "bg-cyan-500 text-slate-950" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
            >
              <FileText className="w-4 h-4" /> Case Studies
            </button>

            <button
              onClick={() => setActiveTab("blog")}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl font-semibold transition-colors ${activeTab === "blog" ? "bg-cyan-500 text-slate-950" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
            >
              <FileText className="w-4 h-4" /> Blog Articles
            </button>

            <button
              onClick={() => setActiveTab("testimonials")}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl font-semibold transition-colors ${activeTab === "testimonials" ? "bg-cyan-500 text-slate-950" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
            >
              <MessageSquare className="w-4 h-4" /> Testimonials
            </button>

            <button
              onClick={() => setActiveTab("faq")}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl font-semibold transition-colors ${activeTab === "faq" ? "bg-cyan-500 text-slate-950" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
            >
              <HelpCircle className="w-4 h-4" /> FAQs List
            </button>

            <div className="h-[1px] bg-slate-800 my-2" />
            <span className="block text-[9px] text-slate-500 uppercase font-black px-3 py-1">Channels & Technical</span>

            <button
              onClick={() => setActiveTab("contact")}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl font-semibold transition-colors ${activeTab === "contact" ? "bg-cyan-500 text-slate-950" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
            >
              <Globe className="w-4 h-4" /> Contact Info
            </button>

            <button
              onClick={() => setActiveTab("seo")}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl font-semibold transition-colors ${activeTab === "seo" ? "bg-cyan-500 text-slate-950" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
            >
              <Globe className="w-4 h-4" /> SEO Manager
            </button>

            <button
              onClick={() => setActiveTab("media")}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl font-semibold transition-colors ${activeTab === "media" ? "bg-cyan-500 text-slate-950" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
            >
              <ImageIcon className="w-4 h-4" /> Media Library
            </button>

            <button
              onClick={() => setActiveTab("languages")}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl font-semibold transition-colors ${activeTab === "languages" ? "bg-cyan-500 text-slate-950" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
            >
              <Globe className="w-4 h-4" /> Translation (i18n)
            </button>

          </div>
        </div>

        {/* Bottom Actions */}
        <div className="space-y-2 pt-4 border-t border-slate-800 mt-6 lg:mt-0">
          <button
            onClick={onResetCMS}
            className="w-full flex items-center gap-2 justify-center px-3 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset CMS
          </button>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 justify-center px-3 py-2 bg-red-950/20 hover:bg-red-950/40 border border-red-900/40 rounded-xl font-semibold text-red-400 hover:text-red-300 transition-colors"
          >
            Lock Dashboard
          </button>
        </div>
      </div>

      {/* Editor Panel Content */}
      <div id="admin-workspace" className="flex-1 p-8 bg-slate-950 overflow-y-auto">
        
        {/* Tab 1: Analytics & CRM */}
        {activeTab === "analytics" && (
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-black text-white">Analytics, CRM & Performance Metrics</h3>
              <p className="text-xs text-slate-400 mt-1">Real-time engagement telemetry gathered on this session.</p>
            </div>
            
            <AnalyticsDashboard
              leads={leads}
              onUpdateLeadStatus={onUpdateLeadStatus}
              onDeleteLead={onDeleteLead}
              onClearAllLeads={onClearAllLeads}
              trackedActions={trackedActions}
            />
          </div>
        )}

        {/* Tab 2: Hero Section */}
        {activeTab === "hero" && (
          <div className="space-y-6">
            <div className="mb-6">
              <h3 className="text-xl font-black text-white">Hero Header Editor</h3>
              <p className="text-xs text-slate-400 mt-1">Update high-impact branding slogans and CTAs across both languages.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* English Hero */}
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
                <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-2">English Hero Content</h4>
                
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">Floating Badge</label>
                  <input
                    type="text"
                    value={englishContent.hero.badge}
                    onChange={(e) => handleUpdateHero("en", "badge", e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">Catchy Header Text</label>
                  <input
                    type="text"
                    value={englishContent.hero.title}
                    onChange={(e) => handleUpdateHero("en", "title", e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">Highlighted Solution Slogan</label>
                  <input
                    type="text"
                    value={englishContent.hero.highlight}
                    onChange={(e) => handleUpdateHero("en", "highlight", e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white animate-pulse"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">Body Paragraph Description</label>
                  <textarea
                    rows={4}
                    value={englishContent.hero.subtitle}
                    onChange={(e) => handleUpdateHero("en", "subtitle", e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">Primary CTA Button</label>
                    <input
                      type="text"
                      value={englishContent.hero.ctaPrimary}
                      onChange={(e) => handleUpdateHero("en", "ctaPrimary", e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">Secondary Button</label>
                    <input
                      type="text"
                      value={englishContent.hero.ctaSecondary}
                      onChange={(e) => handleUpdateHero("en", "ctaSecondary", e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Spanish Hero */}
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
                <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-2">Contenido de Hero en Español</h4>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">Insignia Flotante</label>
                  <input
                    type="text"
                    value={spanishContent.hero.badge}
                    onChange={(e) => handleUpdateHero("es", "badge", e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">Texto del Título de Entrada</label>
                  <input
                    type="text"
                    value={spanishContent.hero.title}
                    onChange={(e) => handleUpdateHero("es", "title", e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">Eslógan de Soluciones Resaltado</label>
                  <input
                    type="text"
                    value={spanishContent.hero.highlight}
                    onChange={(e) => handleUpdateHero("es", "highlight", e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">Párrafo de Descripción de Hero</label>
                  <textarea
                    rows={4}
                    value={spanishContent.hero.subtitle}
                    onChange={(e) => handleUpdateHero("es", "subtitle", e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">Botón CTA Primario</label>
                    <input
                      type="text"
                      value={spanishContent.hero.ctaPrimary}
                      onChange={(e) => handleUpdateHero("es", "ctaPrimary", e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">Botón Secundario</label>
                    <input
                      type="text"
                      value={spanishContent.hero.ctaSecondary}
                      onChange={(e) => handleUpdateHero("es", "ctaSecondary", e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: About Section */}
        {activeTab === "about" && (
          <div className="space-y-6">
            <div className="mb-6">
              <h3 className="text-xl font-black text-white">About Me & Biography Editor</h3>
              <p className="text-xs text-slate-400 mt-1">Customize Jorge's bios, experience parameters, and trust statistics.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* English Bio */}
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
                <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-2">English Bio Texts</h4>
                
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">Section Title</label>
                  <input
                    type="text"
                    value={englishContent.about.title}
                    onChange={(e) => handleUpdateAbout("en", "title", e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">Subtitle Header</label>
                  <input
                    type="text"
                    value={englishContent.about.subtitle}
                    onChange={(e) => handleUpdateAbout("en", "subtitle", e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">Bio Paragraph 1</label>
                  <textarea
                    rows={4}
                    value={englishContent.about.bioParagraph1}
                    onChange={(e) => handleUpdateAbout("en", "bioParagraph1", e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">Bio Paragraph 2</label>
                  <textarea
                    rows={4}
                    value={englishContent.about.bioParagraph2}
                    onChange={(e) => handleUpdateAbout("en", "bioParagraph2", e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white"
                  />
                </div>
              </div>

              {/* Spanish Bio */}
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
                <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-2">Biografía en Español</h4>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">Título de Sección</label>
                  <input
                    type="text"
                    value={spanishContent.about.title}
                    onChange={(e) => handleUpdateAbout("es", "title", e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">Subtítulo Superior</label>
                  <input
                    type="text"
                    value={spanishContent.about.subtitle}
                    onChange={(e) => handleUpdateAbout("es", "subtitle", e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">Párrafo de Biografía 1</label>
                  <textarea
                    rows={4}
                    value={spanishContent.about.bioParagraph1}
                    onChange={(e) => handleUpdateAbout("es", "bioParagraph1", e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">Párrafo de Biografía 2</label>
                  <textarea
                    rows={4}
                    value={spanishContent.about.bioParagraph2}
                    onChange={(e) => handleUpdateAbout("es", "bioParagraph2", e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Services Editor */}
        {activeTab === "services" && (
          <div className="space-y-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-white">Services & Pricing Architecture</h3>
                <p className="text-xs text-slate-400 mt-1">Manage the core services, investment sizes, and technological tools displayed to users.</p>
              </div>
            </div>

            {/* List and form */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
              <div className="xl:col-span-4 p-6 bg-slate-900 border border-slate-800 rounded-2xl h-max">
                <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-4">
                  {editingId ? "Edit Service" : "Add New Service"}
                </h4>

                <form onSubmit={handleSaveService} className="space-y-4">
                  <div>
                    <label className="block text-slate-400 mb-1 text-[10px] uppercase font-bold">English Title</label>
                    <input
                      type="text"
                      required
                      value={serviceForm.title || ""}
                      onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                      placeholder="E.g., Custom Next.js Platform"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 text-[10px] uppercase font-bold">Spanish Title</label>
                    <input
                      type="text"
                      required
                      value={serviceForm.title_es || ""}
                      onChange={(e) => setServiceForm({ ...serviceForm, title_es: e.target.value })}
                      placeholder="E.g., Plataforma Next.js"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 text-[10px] uppercase font-bold">Investment Range</label>
                    <input
                      type="text"
                      required
                      value={serviceForm.priceRange || ""}
                      onChange={(e) => setServiceForm({ ...serviceForm, priceRange: e.target.value })}
                      placeholder="E.g., $1,500 - $3,000"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 text-[10px] uppercase font-bold">English Description</label>
                    <textarea
                      rows={3}
                      required
                      value={serviceForm.description || ""}
                      onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 text-[10px] uppercase font-bold">Spanish Description</label>
                    <textarea
                      rows={3}
                      required
                      value={serviceForm.description_es || ""}
                      onChange={(e) => setServiceForm({ ...serviceForm, description_es: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition-all shadow-md text-xs"
                    >
                      <Save className="w-4 h-4 inline-block mr-1.5 shrink-0" />
                      Save Service
                    </button>
                    {editingId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(null);
                          setServiceForm({ title: "", title_es: "", description: "", description_es: "", priceRange: "", iconName: "Code" });
                        }}
                        className="px-3 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <div className="xl:col-span-8 space-y-4">
                <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-2">Configured Services</h4>
                {services.map((serv) => (
                  <div key={serv.id} id={`cms-service-item-${serv.id}`} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{serv.title}</span>
                        <span className="text-[10px] px-2 py-0.5 bg-slate-950 border border-slate-800 text-cyan-400 rounded font-mono font-bold">
                          {serv.priceRange}
                        </span>
                      </div>
                      <p className="text-slate-400 mt-1 leading-relaxed">{serv.description}</p>
                      <p className="text-slate-500 mt-1.5 text-[11px] font-medium italic">Español: {serv.title_es} — {serv.description_es}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        id={`cms-service-edit-${serv.id}`}
                        onClick={() => handleEditService(serv)}
                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        id={`cms-service-delete-${serv.id}`}
                        onClick={() => handleDeleteService(serv.id)}
                        className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-950 border border-transparent hover:border-red-900/40 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Portfolio Grid */}
        {activeTab === "portfolio" && (
          <div className="space-y-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-white">Featured Portfolio Manager</h3>
                <p className="text-xs text-slate-400 mt-1">Add, update, or remove projects shown in the active grids.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
              {/* Form card */}
              <div className="xl:col-span-4 p-6 bg-slate-900 border border-slate-800 rounded-2xl h-max">
                <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-4">
                  {editingId ? "Edit Project" : "Add Project"}
                </h4>

                <form onSubmit={handleSaveProject} className="space-y-4">
                  <div>
                    <label className="block text-slate-400 mb-1 text-[10px] uppercase font-bold">English Name</label>
                    <input
                      type="text"
                      required
                      value={projectForm.name || ""}
                      onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                      placeholder="Modern Real Estate Platform"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 text-[10px] uppercase font-bold">Spanish Name</label>
                    <input
                      type="text"
                      required
                      value={projectForm.name_es || ""}
                      onChange={(e) => setProjectForm({ ...projectForm, name_es: e.target.value })}
                      placeholder="Plataforma Inmobiliaria"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 mb-1 text-[10px] uppercase font-bold">Category</label>
                      <input
                        type="text"
                        required
                        value={projectForm.category || ""}
                        onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                        placeholder="Real Estate"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 text-[10px] uppercase font-bold">Live URL</label>
                      <input
                        type="text"
                        required
                        value={projectForm.url || ""}
                        onChange={(e) => setProjectForm({ ...projectForm, url: e.target.value })}
                        placeholder="https://..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 text-[10px] uppercase font-bold">English Description</label>
                    <textarea
                      rows={3}
                      required
                      value={projectForm.description || ""}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 text-[10px] uppercase font-bold">Spanish Description</label>
                    <textarea
                      rows={3}
                      required
                      value={projectForm.description_es || ""}
                      onChange={(e) => setProjectForm({ ...projectForm, description_es: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 mb-1 text-[10px] uppercase font-bold">English Results Badge</label>
                      <input
                        type="text"
                        value={projectForm.results || ""}
                        onChange={(e) => setProjectForm({ ...projectForm, results: e.target.value })}
                        placeholder="+45% sales conversion"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 text-[10px] uppercase font-bold">Spanish Results</label>
                      <input
                        type="text"
                        value={projectForm.results_es || ""}
                        onChange={(e) => setProjectForm({ ...projectForm, results_es: e.target.value })}
                        placeholder="+45% de conversiones"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 text-[10px] uppercase font-bold">Project Hero Image URL</label>
                    <input
                      type="text"
                      value={projectForm.image || ""}
                      onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                      placeholder="Paste Unsplash URL"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs font-mono"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition-all shadow-md text-xs"
                    >
                      <Save className="w-4 h-4 inline-block mr-1.5 shrink-0" />
                      Save Project
                    </button>
                    {editingId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(null);
                          setProjectForm({ name: "", name_es: "", category: "", url: "", description: "", description_es: "", results: "", results_es: "", image: "", featured: true });
                        }}
                        className="px-3 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* List grid */}
              <div className="xl:col-span-8 space-y-4">
                <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-2">Projects List</h4>
                {projects.map((proj) => (
                  <div key={proj.id} id={`cms-project-${proj.id}`} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-start gap-4 hover:border-slate-700 transition-colors">
                    <img 
                      src={proj.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=200&q=80"} 
                      alt={proj.name}
                      className="w-16 h-16 rounded-xl object-cover border border-slate-800 shrink-0"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm truncate">{proj.name}</span>
                        <span className="text-[9px] px-2 py-0.5 bg-slate-950 border border-slate-800 text-slate-400 rounded uppercase font-bold tracking-wider">
                          {proj.category}
                        </span>
                      </div>
                      <p className="text-slate-400 mt-1 leading-relaxed truncate text-xs">{proj.description}</p>
                      
                      <div className="flex items-center gap-3 mt-1.5 text-[10px] text-cyan-400 font-semibold font-mono">
                        <span>Results: {proj.results || "N/A"}</span>
                        <span>•</span>
                        <a href={proj.url} target="_blank" rel="noreferrer" className="underline hover:text-cyan-300">
                          {proj.url}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        id={`cms-project-edit-${proj.id}`}
                        onClick={() => handleEditProject(proj)}
                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        id={`cms-project-delete-${proj.id}`}
                        onClick={() => handleDeleteProject(proj.id)}
                        className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-950 border border-transparent hover:border-red-900/40 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: Case Studies */}
        {activeTab === "caseStudies" && (
          <div className="space-y-6">
            <div className="mb-6">
              <h3 className="text-xl font-black text-white">Case Studies Editor</h3>
              <p className="text-xs text-slate-400 mt-1">Update deep business metrics, user challenges, solutions, and exact outcomes for prior launches.</p>
            </div>

            <div className="space-y-6">
              {caseStudies.map((cs, idx) => (
                <div key={cs.id} className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="font-bold text-white text-base">{cs.client}</span>
                    <span className="text-[10px] px-2 py-0.5 bg-slate-950 border border-slate-800 text-cyan-400 rounded font-mono font-bold">
                      Case Study {idx + 1}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">English Client Title</label>
                      <input
                        type="text"
                        value={cs.title}
                        onChange={(e) => {
                          setCaseStudies(caseStudies.map((item, i) => i === idx ? { ...item, title: e.target.value } : item));
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">Spanish Client Title</label>
                      <input
                        type="text"
                        value={(cs as any).title_es || ""}
                        onChange={(e) => {
                          setCaseStudies(caseStudies.map((item, i) => i === idx ? { ...item, title_es: e.target.value } : item));
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">The Challenge (English)</label>
                      <textarea
                        rows={3}
                        value={cs.challenge}
                        onChange={(e) => {
                          setCaseStudies(caseStudies.map((item, i) => i === idx ? { ...item, challenge: e.target.value } : item));
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">The Challenge (Spanish)</label>
                      <textarea
                        rows={3}
                        value={(cs as any).challenge_es || ""}
                        onChange={(e) => {
                          setCaseStudies(caseStudies.map((item, i) => i === idx ? { ...item, challenge_es: e.target.value } : item));
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">The Solution Strategy (English)</label>
                      <textarea
                        rows={3}
                        value={cs.solution}
                        onChange={(e) => {
                          setCaseStudies(caseStudies.map((item, i) => i === idx ? { ...item, solution: e.target.value } : item));
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">The Solution (Spanish)</label>
                      <textarea
                        rows={3}
                        value={(cs as any).solution_es || ""}
                        onChange={(e) => {
                          setCaseStudies(caseStudies.map((item, i) => i === idx ? { ...item, solution_es: e.target.value } : item));
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 7: Blog Articles */}
        {activeTab === "blog" && (
          <div className="space-y-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-white">Thought Leadership Blog Editor</h3>
                <p className="text-xs text-slate-400 mt-1">Publish and edit articles about web design, local marketing, and AI automations.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
              {/* Form */}
              <div className="xl:col-span-5 p-6 bg-slate-900 border border-slate-800 rounded-2xl h-max">
                <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-4">
                  {editingId ? "Edit Blog Article" : "Write New Article"}
                </h4>

                <form onSubmit={handleSaveBlogPost} className="space-y-4">
                  <div>
                    <label className="block text-slate-400 mb-1 text-[10px] uppercase font-bold">English Title</label>
                    <input
                      type="text"
                      required
                      value={blogForm.title || ""}
                      onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                      placeholder="E.g., How Speed Double Sales"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 text-[10px] uppercase font-bold">Spanish Title</label>
                    <input
                      type="text"
                      required
                      value={blogForm.title_es || ""}
                      onChange={(e) => setBlogForm({ ...blogForm, title_es: e.target.value })}
                      placeholder="E.g., Cómo la Velocidad Duplica"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 mb-1 text-[10px] uppercase font-bold">Category</label>
                      <input
                        type="text"
                        value={blogForm.category || ""}
                        onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 text-[10px] uppercase font-bold">Read Time</label>
                      <input
                        type="text"
                        value={blogForm.readTime || ""}
                        onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 text-[10px] uppercase font-bold">English Content (Supports Markdown)</label>
                    <textarea
                      rows={6}
                      required
                      value={blogForm.content || ""}
                      onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 text-[10px] uppercase font-bold">Spanish Content</label>
                    <textarea
                      rows={6}
                      required
                      value={blogForm.content_es || ""}
                      onChange={(e) => setBlogForm({ ...blogForm, content_es: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs"
                  >
                    Save & Publish Article
                  </button>
                </form>
              </div>

              {/* List */}
              <div className="xl:col-span-7 space-y-4">
                <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-2">Published Articles</h4>
                {blogPosts.map((post) => (
                  <div key={post.id} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-start justify-between gap-4">
                    <div>
                      <span className="font-bold text-white text-sm block">{post.title}</span>
                      <p className="text-slate-400 text-[11px] mt-1 line-clamp-2">{post.excerpt}</p>
                      <span className="text-[9px] text-slate-500 font-bold block mt-1.5">{post.date} • {post.category}</span>
                    </div>

                    <div className="flex gap-1.5 shrink-0">
                      <button
                        onClick={() => {
                          setEditingId(post.id);
                          setBlogForm(post);
                        }}
                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setBlogPosts(blogPosts.filter(b => b.id !== post.id))}
                        className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-950 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 8: Testimonials */}
        {activeTab === "testimonials" && (
          <div className="space-y-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-white">Client Testimonials Manager</h3>
                <p className="text-xs text-slate-400 mt-1">Review feedback sliders and client ratings displayed on the home page.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
              <div className="xl:col-span-4 p-6 bg-slate-900 border border-slate-800 rounded-2xl h-max">
                <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-4">
                  {editingId ? "Edit Testimonial" : "Add Testimonial"}
                </h4>

                <form onSubmit={handleSaveTestimonial} className="space-y-4">
                  <div>
                    <label className="block text-slate-400 mb-1 text-[10px] uppercase font-bold">Client Name</label>
                    <input
                      type="text"
                      required
                      value={testForm.name || ""}
                      onChange={(e) => setTestForm({ ...testForm, name: e.target.value })}
                      placeholder="Alex Sterling"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 mb-1 text-[10px] uppercase font-bold">Position / Role</label>
                      <input
                        type="text"
                        required
                        value={testForm.role || ""}
                        onChange={(e) => setTestForm({ ...testForm, role: e.target.value })}
                        placeholder="Founder"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 text-[10px] uppercase font-bold">Company</label>
                      <input
                        type="text"
                        required
                        value={testForm.company || ""}
                        onChange={(e) => setTestForm({ ...testForm, company: e.target.value })}
                        placeholder="Sterling Fades"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 text-[10px] uppercase font-bold">Client Review Text</label>
                    <textarea
                      rows={4}
                      required
                      value={testForm.feedback || ""}
                      onChange={(e) => setTestForm({ ...testForm, feedback: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs"
                  >
                    Save Testimonial
                  </button>
                </form>
              </div>

              <div className="xl:col-span-8 space-y-4">
                <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-2">Testimonials List</h4>
                {testimonials.map((test) => (
                  <div key={test.id} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-start justify-between gap-4">
                    <div>
                      <span className="font-bold text-white text-sm block">{test.name}</span>
                      <span className="text-[10px] text-slate-500 block font-semibold">{test.role}, {test.company}</span>
                      <p className="text-slate-300 mt-2 leading-relaxed italic">"{test.feedback}"</p>
                    </div>

                    <div className="flex gap-1.5 shrink-0">
                      <button
                        onClick={() => {
                          setEditingId(test.id);
                          setTestForm(test);
                        }}
                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setTestimonials(testimonials.filter(t => t.id !== test.id))}
                        className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-950 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 9: FAQs List */}
        {activeTab === "faq" && (
          <div className="space-y-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-white">Frequently Asked Questions Editor</h3>
                <p className="text-xs text-slate-400 mt-1">Review the service, pricing, and process questions answers.</p>
              </div>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={faq.id} className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
                  <span className="text-[9px] px-2 py-0.5 bg-slate-950 border border-slate-800 text-cyan-400 rounded font-mono font-bold">
                    FAQ {idx + 1} ({faq.category})
                  </span>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">English Question</label>
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => {
                          setFaqs(faqs.map((item, i) => i === idx ? { ...item, question: e.target.value } : item));
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">Spanish Question</label>
                      <input
                        type="text"
                        value={(faq as any).question_es || ""}
                        onChange={(e) => {
                          setFaqs(faqs.map((item, i) => i === idx ? { ...item, question_es: e.target.value } : item));
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">English Answer</label>
                      <textarea
                        rows={3}
                        value={faq.answer}
                        onChange={(e) => {
                          setFaqs(faqs.map((item, i) => i === idx ? { ...item, answer: e.target.value } : item));
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">Spanish Answer</label>
                      <textarea
                        rows={3}
                        value={(faq as any).answer_es || ""}
                        onChange={(e) => {
                          setFaqs(faqs.map((item, i) => i === idx ? { ...item, answer_es: e.target.value } : item));
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 10: Contact Info */}
        {activeTab === "contact" && (
          <div className="space-y-6">
            <div className="mb-6">
              <h3 className="text-xl font-black text-white">Contact Information Channels</h3>
              <p className="text-xs text-slate-400 mt-1">Configure direct communication endpoints (Phone, Email, WhatsApp redirects).</p>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl max-w-xl space-y-4">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">Recipient Name</label>
                <input
                  type="text"
                  value={contactInfo.name}
                  onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">Primary Email address</label>
                  <input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">Phone Number</label>
                  <input
                    type="text"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">WhatsApp Endpoint (Redirect trigger)</label>
                <input
                  type="text"
                  value={contactInfo.whatsapp}
                  onChange={(e) => setContactInfo({ ...contactInfo, whatsapp: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs font-mono"
                />
                <p className="text-[10px] text-slate-500 mt-1">Provide country code first (E.g. +18494530811) for correct link assembly.</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 11: SEO Manager */}
        {activeTab === "seo" && (
          <div className="space-y-8">
            <div className="mb-6">
              <h3 className="text-xl font-black text-white">Advanced Search Engine Optimizer</h3>
              <p className="text-xs text-slate-400 mt-1">Configure metadata headers, structured JSON-LD schemas, and copy auto-generated robots.txt and sitemap.xml files.</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
              <div className="xl:col-span-7 p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
                <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-2">Meta Headers Config</h4>
                
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">Global Meta Title</label>
                  <input
                    type="text"
                    value={seoConfig.metaTitle}
                    onChange={(e) => setSeoConfig({ ...seoConfig, metaTitle: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">Meta Description</label>
                  <textarea
                    rows={3}
                    value={seoConfig.metaDescription}
                    onChange={(e) => setSeoConfig({ ...seoConfig, metaDescription: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">Open Graph Slogan</label>
                    <input
                      type="text"
                      value={seoConfig.ogTitle}
                      onChange={(e) => setSeoConfig({ ...seoConfig, ogTitle: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">Canonical Absolute URL</label>
                    <input
                      type="text"
                      value={seoConfig.canonicalUrl}
                      onChange={(e) => setSeoConfig({ ...seoConfig, canonicalUrl: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">Structured Data Schema (JSON-LD)</label>
                  <textarea
                    rows={6}
                    value={seoConfig.structuredData}
                    onChange={(e) => setSeoConfig({ ...seoConfig, structuredData: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs font-mono"
                  />
                </div>
              </div>

              {/* Audit results & Sitemap exports */}
              <div className="xl:col-span-5 space-y-6">
                
                {/* Visual score card */}
                <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
                  <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">Live SEO Audit Rating</h4>
                  
                  <div className="flex items-center gap-6 mb-6">
                    <div className="relative w-20 h-20 shrink-0 rounded-full border-4 border-slate-800 flex items-center justify-center">
                      <span className="text-2xl font-black text-cyan-400">{seoAudit.score}%</span>
                    </div>
                    <div>
                      <h5 className="font-bold text-white text-sm">SEO Audit Dashboard</h5>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {seoAudit.passed ? "Your meta configurations are optimized for Google bots and local crawlers." : "Review below warnings to lift visibility parameters."}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                    {seoAudit.checks.map((check, i) => (
                      <div key={i} className="p-2 bg-slate-950/50 border border-slate-800/60 rounded-xl flex items-start gap-3">
                        <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${check.status === "passed" ? "bg-emerald-400 animate-pulse" : check.status === "warning" ? "bg-amber-400" : "bg-red-400"}`} />
                        <div>
                          <p className="font-bold text-white text-[11px]">{check.name}: <span className="text-cyan-400">{check.value}</span></p>
                          <p className="text-[10px] text-slate-400 leading-normal mt-0.5">{check.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sitemap Copy */}
                <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
                  <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Dynamic Sitemap & Robots Generator</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center text-[10px] mb-1 font-bold text-slate-400">
                        <span>SITEMAP.XML</span>
                        <button
                          onClick={() => handleCopy(virtualSitemap, "sitemap")}
                          className="text-cyan-400 flex items-center gap-1 hover:text-cyan-300"
                        >
                          {copiedText === "sitemap" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          Copy XML
                        </button>
                      </div>
                      <textarea
                        readOnly
                        value={virtualSitemap}
                        rows={3}
                        className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-[9px] font-mono text-slate-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center text-[10px] mb-1 font-bold text-slate-400">
                        <span>ROBOTS.TXT</span>
                        <button
                          onClick={() => handleCopy(virtualRobots, "robots")}
                          className="text-cyan-400 flex items-center gap-1 hover:text-cyan-300"
                        >
                          {copiedText === "robots" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          Copy Robots
                        </button>
                      </div>
                      <textarea
                        readOnly
                        value={virtualRobots}
                        rows={2}
                        className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-[9px] font-mono text-slate-500"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* Tab 12: Media Library */}
        {activeTab === "media" && (
          <div className="space-y-8">
            <div className="mb-6">
              <h3 className="text-xl font-black text-white">Tactile Media Library</h3>
              <p className="text-xs text-slate-400 mt-1">Upload files, drag-and-drop local images, or paste external asset links to secure easy-to-copy image paths.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Image upload / add form */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Drag and Drop card */}
                <div className="p-6 bg-slate-900 border-2 border-dashed border-slate-800 hover:border-cyan-500/50 rounded-2xl text-center transition-colors relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMediaUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload className="w-10 h-10 text-slate-500 mx-auto mb-3" />
                  <h5 className="font-bold text-white text-sm">Drag & Drop Image File</h5>
                  <p className="text-[10px] text-slate-400 mt-1 leading-normal">Or click to browse local folders. Fully client-side base64 compiler.</p>
                </div>

                {/* External URL form */}
                <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
                  <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3">Add Remote URL Asset</h4>
                  <form onSubmit={handleAddMediaUrl} className="space-y-3">
                    <input
                      type="text"
                      placeholder="Asset Name (e.g., My Project.png)"
                      value={newMediaName}
                      onChange={(e) => setNewMediaName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                    <input
                      type="url"
                      required
                      placeholder="https://images.unsplash.com/photo-..."
                      value={newMediaUrl}
                      onChange={(e) => setNewMediaUrl(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs font-mono"
                    />
                    <button
                      type="submit"
                      className="w-full py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white rounded-xl transition-all font-semibold"
                    >
                      Index Asset
                    </button>
                  </form>
                </div>

              </div>

              {/* Grid of media files */}
              <div className="lg:col-span-8 space-y-4">
                <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Indexed Assets Directory</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {mediaFiles.map((media, idx) => (
                    <div key={idx} id={`media-item-${idx}`} className="p-3 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between group hover:border-slate-700 transition-all relative overflow-hidden">
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800 mb-2">
                        <img 
                          src={media.url} 
                          alt={media.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      
                      <div>
                        <div className="font-bold text-white text-[11px] truncate">{media.name}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{media.size}</div>
                      </div>

                      <button
                        onClick={() => handleCopy(media.url, `media_${idx}`)}
                        className="mt-2.5 w-full py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white rounded-lg flex items-center justify-center gap-1 font-semibold text-[10px]"
                      >
                        {copiedText === `media_${idx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        Copy URL Path
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab 13: Languages Switcher view */}
        {activeTab === "languages" && (
          <div className="space-y-6">
            <div className="mb-6">
              <h3 className="text-xl font-black text-white">Language Pack Manager (i18n)</h3>
              <p className="text-xs text-slate-400 mt-1">Review the status of English and Spanish translations. Customize or map missing dictionary entries.</p>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl max-w-xl">
              <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-4">Supported Locales status</h4>
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                  <span className="font-bold">English Translation Set (default)</span>
                  <span className="text-[9px] px-2.5 py-1 bg-emerald-950 border border-emerald-900 text-emerald-400 rounded-full font-black uppercase tracking-wider">
                    ● ACTIVE
                  </span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                  <span className="font-bold">Spanish Translation Set</span>
                  <span className="text-[9px] px-2.5 py-1 bg-emerald-950 border border-emerald-900 text-emerald-400 rounded-full font-black uppercase tracking-wider">
                    ● ACTIVE
                  </span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-slate-950/40 rounded-xl border border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
                ℹ️ **Bilingual CMS syncing**: Any edits you make in the **Hero**, **About**, or other tab modules will instantly synchronize with the respective language layout context.
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
