import React, { useState, useEffect } from "react";
import { MessageCircle, Send, X, Check } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { motion, AnimatePresence } from "motion/react";

interface FloatingWhatsAppProps {
  phoneNumber: string;
  onTrackAction: (actionName: string) => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ phoneNumber, onTrackAction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    // Show a small notification toast after 5 seconds to prompt interaction
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenChat = () => {
    setIsOpen(!isOpen);
    setShowNotification(false);
    onTrackAction("WhatsApp Widget Opened");
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    onTrackAction("WhatsApp Message Redirected");
    
    // Format the whatsapp link
    const cleanNumber = phoneNumber.replace(/[+\s-()]/g, "");
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
    
    // Redirect
    window.open(whatsappUrl, "_blank");
    setMessage("");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-none">
      
      {/* Small notification tooltip */}
      <AnimatePresence>
        {showNotification && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="pointer-events-auto flex items-center gap-3 bg-slate-900 border border-slate-800 text-white px-4 py-3 rounded-xl shadow-xl max-w-xs mb-3 text-xs"
          >
            <div className="relative w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center text-white shrink-0">
              <MessageCircle className="w-4 h-4" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border border-slate-900 rounded-full animate-ping" />
            </div>
            <div>
              <p className="font-bold">Jorge Rosario</p>
              <p className="text-slate-400">
                {language === "en" ? "Hi there! How can I help you today?" : "¡Hola! ¿Cómo puedo ayudarte hoy?"}
              </p>
            </div>
            <button 
              onClick={() => setShowNotification(false)}
              className="text-slate-500 hover:text-slate-300 ml-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main chat dialogue popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            id="whatsapp-chatbox"
            className="pointer-events-auto w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden mb-3"
          >
            {/* Header */}
            <div className="bg-emerald-600 p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 bg-emerald-700 border border-emerald-500 rounded-full flex items-center justify-center text-white">
                  <span className="font-bold text-sm">JR</span>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-emerald-600 rounded-full" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Jorge Rosario</h4>
                  <p className="text-[10px] text-emerald-100 flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-200" />
                    {language === "en" ? "Online - Solves Web & Tech" : "En línea - Soluciones Web e IA"}
                  </p>
                </div>
              </div>
              <button 
                id="whatsapp-chatbox-close"
                onClick={() => setIsOpen(false)}
                className="text-emerald-100 hover:text-white p-1 hover:bg-emerald-700/50 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 bg-slate-950/60 max-h-48 overflow-y-auto">
              <div className="bg-slate-800/80 text-white rounded-2xl rounded-tl-none p-3 max-w-[85%] text-xs leading-relaxed border border-slate-700">
                <p className="mb-1 font-semibold text-[10px] text-emerald-400">Jorge Rosario</p>
                <p>
                  {language === "en" 
                    ? "Hello! 👋 I'm ready to help you optimize your website, design custom software, or rank #1 on local maps. Send me a message here to start our chat directly on WhatsApp!"
                    : "¡Hola! 👋 Estoy listo para ayudarte a optimizar tu web, diseñar software o posicionarte en Google Maps. ¡Envíame un mensaje y chateemos directamente por WhatsApp!"}
                </p>
              </div>
            </div>

            {/* Input Footer */}
            <form onSubmit={handleSendMessage} className="p-3 bg-slate-900 border-t border-slate-800 flex gap-2">
              <input
                id="whatsapp-chatbox-input"
                type="text"
                required
                placeholder={language === "en" ? "Type your message..." : "Escribe tu mensaje..."}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-transparent"
              />
              <button
                id="whatsapp-chatbox-send"
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-xl flex items-center justify-center transition-colors shadow-md active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Trigger Button */}
      <motion.button
        id="whatsapp-floating-button"
        onClick={handleOpenChat}
        className="pointer-events-auto p-4 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full shadow-2xl flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 hover:shadow-emerald-500/20"
      >
        <MessageCircle className="w-6 h-6 animate-pulse" />
      </motion.button>

    </div>
  );
};
