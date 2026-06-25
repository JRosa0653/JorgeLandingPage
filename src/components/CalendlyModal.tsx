import React, { useState } from "react";
import { X, Calendar, Clock, ChevronRight, CheckCircle2, User, Mail, MessageSquare } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { motion, AnimatePresence } from "motion/react";
import { Lead } from "../types";

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
  calendlyLink?: string; // Optional real Calendly username/link
  onBookingCreated: (lead: Omit<Lead, "id" | "date" | "status">) => void;
}

export const CalendlyModal: React.FC<CalendlyModalProps> = ({ isOpen, onClose, calendlyLink, onBookingCreated }) => {
  const { language } = useLanguage();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const services = [
    { id: "web_audit", name: "Free Web Performance & SEO Audit (30m)", name_es: "Auditoría Web y SEO Gratis (30m)", desc: "A live walkthrough of your current web speeds, maps ranking, and growth opportunities." },
    { id: "custom_dev", name: "Custom Project Strategy Session (45m)", name_es: "Sesión Estratégica de Proyecto (45m)", desc: "Review tech stacks, timelines, functional specs, and budget details for your business software." },
    { id: "ai_automate", name: "AI & Workflow Automation Advisory (30m)", name_es: "Asesoría de IA y Automatización (30m)", desc: "Discuss embedding Gemini models, automating leads pipelines, and saving manual team hours." }
  ];

  // Simple next 7 days list (skipping weekends for professional booking feel)
  const getAvailableDates = () => {
    const list = [];
    const options: Intl.DateTimeFormatOptions = { weekday: "short", month: "short", day: "numeric" };
    let added = 0;
    let index = 1;
    
    while (added < 5) {
      const date = new Date();
      date.setDate(date.getDate() + index);
      const dayOfWeek = date.getDay();
      
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Skip Sunday (0) and Saturday (6)
        list.push({
          value: date.toISOString().split("T")[0],
          label: date.toLocaleDateString(language === "en" ? "en-US" : "es-ES", options)
        });
        added++;
      }
      index++;
    }
    return list;
  };

  const timeSlots = ["09:00 AM", "10:30 AM", "01:30 PM", "03:00 PM", "04:30 PM"];

  const handleNextStep = () => {
    if (step === 1 && selectedService) setStep(2);
    else if (step === 2 && selectedDate && selectedTime) setStep(3);
  };

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const chosenService = services.find(s => s.id === selectedService);
    const serviceName = chosenService ? (language === "en" ? chosenService.name : chosenService.name_es) : "Digital Strategy Call";

    onBookingCreated({
      name,
      email,
      phone: "",
      message: notes || `Schedule request for: ${serviceName}`,
      type: "schedule",
      extraDetails: `Slot: ${selectedDate} at ${selectedTime} | Service: ${serviceName}`
    });

    setStep(1);
    setSelectedService("");
    setSelectedDate("");
    setSelectedTime("");
    setName("");
    setEmail("");
    setNotes("");
    
    // Simulate short loader
    onClose();
  };

  const isCalendlyIframe = calendlyLink && calendlyLink.includes("calendly.com");

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="booking-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            id="booking-modal-card"
            className="relative w-full max-w-2xl elegant-glass-card rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Top decorative banner */}
            <div className="h-1.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600" />

            {/* Header */}
            <div className="p-6 border-b border-zinc-900/60 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-cyan-400" />
                  {language === "en" ? "Schedule a Free Strategy Call" : "Reservar Llamada Estratégica Gratis"}
                </h3>
                <p className="text-xs text-zinc-400">
                  {language === "en" ? "Direct video meeting with Jorge Rosario" : "Reunión por videollamada con Jorge Rosario"}
                </p>
              </div>
              <button
                id="booking-modal-close"
                onClick={onClose}
                className="text-zinc-400 hover:text-white p-1.5 hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 p-6 overflow-y-auto bg-transparent">
              {isCalendlyIframe ? (
                /* Embed real Calendly iframe */
                <div className="w-full h-[550px] bg-white rounded-xl overflow-hidden">
                  <iframe
                    src={calendlyLink}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    title="Calendly Scheduler"
                    className="w-full h-full"
                  />
                </div>
              ) : (
                /* Premium Client-Side Interactive Scheduler Flow */
                <div>
                  {/* Step Indicators */}
                  <div className="flex justify-between items-center mb-8 max-w-md mx-auto">
                    <div className="flex flex-col items-center gap-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all border ${step >= 1 ? "bg-cyan-500 text-black border-cyan-400" : "bg-zinc-900/80 text-zinc-400 border-zinc-800"}`}>
                        1
                      </div>
                      <span className="text-[10px] text-zinc-400 font-semibold uppercase">{language === "en" ? "Service" : "Servicio"}</span>
                    </div>
                    <div className={`flex-1 h-0.5 mx-2 ${step >= 2 ? "bg-cyan-500" : "bg-zinc-900"}`} />
                    <div className="flex flex-col items-center gap-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all border ${step >= 2 ? "bg-cyan-500 text-black border-cyan-400" : "bg-zinc-900/80 text-zinc-400 border-zinc-800"}`}>
                        2
                      </div>
                      <span className="text-[10px] text-zinc-400 font-semibold uppercase">{language === "en" ? "Slot" : "Horario"}</span>
                    </div>
                    <div className={`flex-1 h-0.5 mx-2 ${step >= 3 ? "bg-cyan-500" : "bg-zinc-900"}`} />
                    <div className="flex flex-col items-center gap-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all border ${step >= 3 ? "bg-cyan-500 text-black border-cyan-400" : "bg-zinc-900/80 text-zinc-400 border-zinc-800"}`}>
                        3
                      </div>
                      <span className="text-[10px] text-zinc-400 font-semibold uppercase">{language === "en" ? "Profile" : "Datos"}</span>
                    </div>
                  </div>

                  {/* Flow Steps */}
                  {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                      <h4 className="text-sm font-bold text-zinc-300 uppercase tracking-wider mb-2">
                        {language === "en" ? "Select Meeting Objective" : "Seleccione el objetivo de la reunión"}
                      </h4>
                      <div className="space-y-3">
                        {services.map((serv) => (
                          <div
                            key={serv.id}
                            id={`booking-service-${serv.id}`}
                            onClick={() => setSelectedService(serv.id)}
                            className={`p-4 border rounded-xl cursor-pointer transition-all hover:bg-zinc-900/40 ${selectedService === serv.id ? "bg-zinc-900/40 border-cyan-500/80 shadow-md shadow-cyan-950/20" : "bg-black/30 border-zinc-900/60"}`}
                          >
                            <h5 className="font-bold text-white text-sm">
                              {language === "en" ? serv.name : serv.name_es}
                            </h5>
                            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{serv.desc}</p>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-end pt-4">
                        <button
                          id="booking-next-1"
                          onClick={handleNextStep}
                          disabled={!selectedService}
                          className="flex items-center gap-1.5 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed text-black text-xs font-bold rounded-lg transition-colors cursor-pointer"
                        >
                          {language === "en" ? "Continue" : "Continuar"}
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                      {/* Dates list */}
                      <div>
                        <h4 className="text-sm font-bold text-zinc-300 uppercase tracking-wider mb-3">
                          {language === "en" ? "Choose a Date" : "Seleccione un Día"}
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                          {getAvailableDates().map((date) => (
                            <div
                              key={date.value}
                              id={`booking-date-${date.value}`}
                              onClick={() => setSelectedDate(date.value)}
                              className={`p-3 border rounded-xl text-center cursor-pointer transition-all hover:bg-zinc-900/40 flex flex-col justify-center ${selectedDate === date.value ? "bg-cyan-500/10 border-cyan-500 text-cyan-400" : "bg-black/30 border-zinc-900/60 text-zinc-300"}`}
                            >
                              <span className="text-xs font-bold uppercase tracking-wide">{date.label.split(",")[0]}</span>
                              <span className="text-sm font-black mt-1">{date.label.split(",")[1]}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Times list */}
                      {selectedDate && (
                        <div>
                          <h4 className="text-sm font-bold text-zinc-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-cyan-400" />
                            {language === "en" ? "Select a Time Slot (Your Local Time)" : "Seleccione una Hora (Hora Local)"}
                          </h4>
                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                            {timeSlots.map((slot) => (
                              <div
                                key={slot}
                                id={`booking-slot-${slot.replace(" ", "-")}`}
                                onClick={() => setSelectedTime(slot)}
                                className={`p-3 border rounded-xl text-center text-xs font-semibold cursor-pointer transition-all hover:bg-zinc-900/40 ${selectedTime === slot ? "bg-cyan-500 text-black border-cyan-400 font-bold" : "bg-black/30 border-zinc-900/60 text-zinc-300"}`}
                              >
                                {slot}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between pt-4 border-t border-zinc-900/60">
                        <button
                          id="booking-prev-2"
                          onClick={() => setStep(1)}
                          className="px-4 py-2 text-zinc-400 hover:text-white text-xs font-medium rounded-lg"
                        >
                          {language === "en" ? "Back" : "Atrás"}
                        </button>
                        <button
                          id="booking-next-2"
                          onClick={handleNextStep}
                          disabled={!selectedDate || !selectedTime}
                          className="flex items-center gap-1.5 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed text-black text-xs font-bold rounded-lg transition-colors cursor-pointer"
                        >
                          {language === "en" ? "Continue" : "Continuar"}
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                      <form onSubmit={handleBook} className="space-y-4">
                        <div className="p-4 bg-zinc-900/10 border border-zinc-800/60 rounded-xl flex items-center gap-4 mb-4">
                          <div className="w-10 h-10 bg-cyan-950/20 text-cyan-400 border border-cyan-900/40 rounded-full flex items-center justify-center">
                            <Calendar className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs text-zinc-400 uppercase tracking-wider font-bold">
                              {language === "en" ? "Booking Summary" : "Resumen de Reserva"}
                            </p>
                            <p className="text-sm font-bold text-white">
                              {selectedDate} @ {selectedTime}
                            </p>
                            <p className="text-[11px] text-cyan-400">
                              {services.find(s => s.id === selectedService) ? (language === "en" ? services.find(s => s.id === selectedService)!.name : services.find(s => s.id === selectedService)!.name_es) : ""}
                            </p>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-zinc-400 mb-1.5 uppercase tracking-wider">
                            {language === "en" ? "Your Name" : "Tu Nombre"}
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 w-4.5 h-4.5 text-zinc-500" />
                            <input
                              id="booking-form-name"
                              type="text"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder={language === "en" ? "Alex Sterling" : "Carlos Pérez"}
                              className="w-full bg-[#0a0a0c] border border-zinc-800/60 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-zinc-400 mb-1.5 uppercase tracking-wider">
                            {language === "en" ? "Your Email" : "Tu Correo"}
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 w-4.5 h-4.5 text-zinc-500" />
                            <input
                              id="booking-form-email"
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="alex@example.com"
                              className="w-full bg-[#0a0a0c] border border-zinc-800/60 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-zinc-400 mb-1.5 uppercase tracking-wider">
                            {language === "en" ? "Share your website link or any details" : "Comparte tu sitio web o detalles"}
                          </label>
                          <div className="relative">
                            <MessageSquare className="absolute left-3 top-3.5 w-4.5 h-4.5 text-zinc-500" />
                            <textarea
                              id="booking-form-notes"
                              value={notes}
                              onChange={(e) => setNotes(e.target.value)}
                              placeholder={language === "en" ? "Let me know your goal..." : "Cuéntame cuál es tu objetivo..."}
                              rows={3}
                              className="w-full bg-[#0a0a0c] border border-zinc-800/60 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                            />
                          </div>
                        </div>

                        <div className="flex justify-between pt-4 border-t border-zinc-900/60">
                          <button
                            id="booking-prev-3"
                            type="button"
                            onClick={() => setStep(2)}
                            className="px-4 py-2 text-zinc-400 hover:text-white text-xs font-medium rounded-lg cursor-pointer"
                          >
                            {language === "en" ? "Back" : "Atrás"}
                          </button>
                          <button
                            id="booking-submit"
                            type="submit"
                            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs rounded-xl shadow-lg hover:shadow-cyan-500/20 transition-all active:scale-95 cursor-pointer"
                          >
                            {language === "en" ? "Confirm Appointment" : "Confirmar Cita"}
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
