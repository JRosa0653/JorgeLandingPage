import React, { useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext";
import { AnimatePresence, motion } from "motion/react";
import { X, Sparkles, Send, CheckCircle2 } from "lucide-react";
import { Lead } from "../types";

interface ExitIntentPopupProps {
  onLeadCaptured: (lead: Omit<Lead, "id" | "date" | "status">) => void;
}

export const ExitIntentPopup: React.FC<ExitIntentPopupProps> = ({ onLeadCaptured }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    // Prevent showing in local storage if already dismissed or completed
    const dismissed = localStorage.getItem("jorge_exit_dismissed");
    if (dismissed === "true") {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // e.clientY < 20 indicates mouse moving up to close/switch tab
      if (e.clientY < 20 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasShown]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("jorge_exit_dismissed", "true");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    onLeadCaptured({
      name,
      email,
      phone,
      message: "Captured via Exit-Intent Popup Offer: Free Performance Audit",
      type: "contact",
      extraDetails: "Offer: Free Web Speed Audit"
    });

    setSubmitted(true);
    localStorage.setItem("jorge_exit_dismissed", "true");

    setTimeout(() => {
      setIsVisible(false);
    }, 4000);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div id="exit-intent-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            id="exit-intent-card"
            className="relative w-full max-w-lg overflow-hidden elegant-glass-card shadow-2xl"
          >
            {/* Top decorative gradient bar */}
            <div className="h-2 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600" />

            {/* Dismiss button */}
            <button
              id="exit-intent-close"
              onClick={handleDismiss}
              className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800/80 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8">
              {!submitted ? (
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-medium text-cyan-400 bg-cyan-950/20 border border-cyan-900/40 rounded-full">
                    <Sparkles className="w-3.5 h-3.5" />
                    {language === "en" ? "Wait! Before You Go..." : "¡Espera! Antes de irte..."}
                  </div>

                  <h3 className="text-2xl font-bold tracking-tight text-white mb-2">
                    {language === "en" 
                      ? "Get a Free Website Speed & Lead Capture Audit" 
                      : "Recibe una Auditoría Gratis de Velocidad y Conversión"}
                  </h3>
                  
                  <p className="text-zinc-300 text-sm mb-6 leading-relaxed">
                    {language === "en"
                      ? "I will personally audit your current website or online listing, run a Core Web Vitals report, and draft 3 high-impact strategies to double your inbound customer bookings. Worth $250—completely free."
                      : "Analizaré personalmente tu sitio web actual, generaré un reporte de Core Web Vitals y diseñará 3 estrategias de alto impacto para duplicar tus reservas de clientes. Valorada en $250—completamente gratis."}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">
                        {language === "en" ? "Your Name" : "Tu Nombre"}
                      </label>
                      <input
                        id="exit-lead-name"
                        type="text"
                        required
                        placeholder={language === "en" ? "Jorge Rosario" : "Juan Pérez"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 bg-[#0a0a0c] border border-zinc-800/60 rounded-xl text-white text-sm placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">
                          {language === "en" ? "Email Address" : "Correo Electrónico"}
                        </label>
                        <input
                          id="exit-lead-email"
                          type="email"
                          required
                          placeholder="name@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3 bg-[#0a0a0c] border border-zinc-800/60 rounded-xl text-white text-sm placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">
                          {language === "en" ? "WhatsApp (Optional)" : "WhatsApp (Opcional)"}
                        </label>
                        <input
                          id="exit-lead-phone"
                          type="tel"
                          placeholder="+18494530811"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-4 py-3 bg-[#0a0a0c] border border-zinc-800/60 rounded-xl text-white text-sm placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    <button
                      id="exit-lead-submit"
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 mt-6 px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_35px_rgba(6,182,212,0.4)] active:scale-[0.98]"
                    >
                      <Send className="w-4 h-4" />
                      {language === "en" ? "Claim My Free Audit Plan" : "Reclamar mi Plan de Auditoría Gratis"}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center py-8">
                  <div className="w-16 h-16 flex items-center justify-center bg-cyan-950/20 border border-cyan-800/40 text-cyan-400 rounded-full mb-4">
                    <CheckCircle2 className="w-10 h-10 animate-bounce" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {language === "en" ? "You're on the list!" : "¡Estás en la lista!"}
                  </h3>
                  <p className="text-zinc-300 text-sm max-w-sm leading-relaxed">
                    {language === "en"
                      ? "Thank you! I will personally review your details and send your personalized speed & conversion audit within 24 hours. Check your inbox!"
                      : "¡Gracias! Analizaré tus detalles personalmente y te enviaré tu auditoría personalizada en menos de 24 horas. ¡Revisa tu bandeja de entrada!"}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
