import React, { createContext, useContext, useState, useEffect } from "react";
import { LanguageContent } from "../types";
import { englishTranslations, spanishTranslations } from "../constants/initialData";

interface LanguageContextType {
  language: "en" | "es";
  setLanguage: (lang: "en" | "es") => void;
  t: LanguageContent;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<"en" | "es">(() => {
    const saved = localStorage.getItem("jorge_portfolio_lang");
    if (saved === "en" || saved === "es") return saved;
    return "en";
  });

  useEffect(() => {
    localStorage.setItem("jorge_portfolio_lang", language);
  }, [language]);

  const setLanguage = (lang: "en" | "es") => {
    setLanguageState(lang);
  };

  const t = language === "en" ? englishTranslations : spanishTranslations;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
