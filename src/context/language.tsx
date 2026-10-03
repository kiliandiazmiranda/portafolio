// Contexto global de idioma con persistencia en localStorage y detección automática del navegador

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Language } from '../types';

const STORAGE_KEY = 'portfolio-language';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  resetToSystemLanguage: () => void;
  isManual: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Detecta preferencia de idioma del sistema operativo o navegador.
export const getSystemLanguage = (): Language => {
  if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
    const rawLanguages = navigator.languages && navigator.languages.length > 0
      ? navigator.languages
      : [navigator.language || ''];

    for (const lang of rawLanguages) {
      if (lang && lang.toLowerCase().startsWith('es')) {
        return 'es';
      }
    }

    return 'en';
  }
  return 'es';
};

// Idioma inicial desde localStorage
const getInitialLanguageState = (): { language: Language; isManual: boolean } => {
  if (typeof window !== 'undefined') {
    try {
      const savedLang = localStorage.getItem(STORAGE_KEY) as Language | null;
      if (savedLang === 'es' || savedLang === 'en') {
        return { language: savedLang, isManual: true };
      }
    } catch {
    }
    return { language: getSystemLanguage(), isManual: false };
  }
  return { language: 'es', isManual: false };
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [langState, setLangState] = useState<{ language: Language; isManual: boolean }>(
    getInitialLanguageState
  );

  // Sincronización el atributo lang del elemento raíz <html>
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('lang', langState.language === 'es' ? 'es-CO' : 'en');

    if (langState.isManual) {
      try {
        localStorage.setItem(STORAGE_KEY, langState.language);
      } catch {
      }
    } else {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
      }
    }
  }, [langState]);

  // Sigue los cambios de idioma del sistema
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleLanguageChange = () => {
      let hasManualOverride = false;
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        hasManualOverride = saved === 'es' || saved === 'en';
      } catch {
      }

      if (!hasManualOverride) {
        setLangState({
          language: getSystemLanguage(),
          isManual: false,
        });
      }
    };

    window.addEventListener('languagechange', handleLanguageChange);
    return () => {
      window.removeEventListener('languagechange', handleLanguageChange);
    };
  }, []);

  const toggleLanguage = useCallback(() => {
    setLangState((prev) => {
      const nextLang: Language = prev.language === 'es' ? 'en' : 'es';
      return {
        language: nextLang,
        isManual: true,
      };
    });
  }, []);

  const setLanguage = useCallback((newLang: Language) => {
    setLangState({
      language: newLang,
      isManual: true,
    });
  }, []);

  const resetToSystemLanguage = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
    }
    setLangState({
      language: getSystemLanguage(),
      isManual: false,
    });
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        language: langState.language,
        toggleLanguage,
        setLanguage,
        resetToSystemLanguage,
        isManual: langState.isManual,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage debe ser utilizado dentro de un LanguageProvider');
  }
  return context;
};
