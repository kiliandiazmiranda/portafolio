/**
 * Contexto global del tema con persistencia y sincronización con el sistema.
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { ThemeMode } from '../types';

const STORAGE_KEY = 'portfolio-theme';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  resetToSystemTheme: () => void;
  isManual: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Detecta la preferencia del sistema operativo o navegador mediante matchMedia.
 */
const getSystemTheme = (): ThemeMode => {
  if (
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark';
  }
  return 'light';
};

/**
 * Obtiene el estado inicial del tema considerando la clave guardada en localStorage o el tema del sistema.
 */
const getInitialThemeState = (): { theme: ThemeMode; isManual: boolean } => {
  if (typeof window !== 'undefined') {
    try {
      const savedTheme = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return { theme: savedTheme, isManual: true };
      }
    } catch {
      // Ignorar errores de acceso a localStorage
    }
    return { theme: getSystemTheme(), isManual: false };
  }
  return { theme: 'light', isManual: false };
};

/**
 * Proveedor de contexto para el tema visual de la aplicación.
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeState, setThemeState] = useState<{ theme: ThemeMode; isManual: boolean }>(
    getInitialThemeState
  );

  // Sincroniza <html> y persiste las selecciones manuales.
  useEffect(() => {
    const root = document.documentElement;
    if (themeState.theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }

    if (themeState.isManual) {
      try {
        localStorage.setItem(STORAGE_KEY, themeState.theme);
      } catch {
        // Ignorar errores de escritura en localStorage
      }
    } else {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // Ignorar
      }
    }
  }, [themeState]);

  // Sigue los cambios del sistema cuando no existe una selección manual.
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      let hasManualOverride = false;
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        hasManualOverride = saved === 'light' || saved === 'dark';
      } catch {
        // Ignorar
      }

      if (!hasManualOverride) {
        setThemeState({
          theme: e.matches ? 'dark' : 'light',
          isManual: false,
        });
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const nextTheme = prev.theme === 'dark' ? 'light' : 'dark';
      return {
        theme: nextTheme,
        isManual: true,
      };
    });
  }, []);

  const setTheme = useCallback((newTheme: ThemeMode) => {
    setThemeState({
      theme: newTheme,
      isManual: true,
    });
  }, []);

  const resetToSystemTheme = useCallback(() => {
    const sysTheme = getSystemTheme();
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignorar
    }
    setThemeState({
      theme: sysTheme,
      isManual: false,
    });
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme: themeState.theme,
        toggleTheme,
        setTheme,
        resetToSystemTheme,
        isManual: themeState.isManual,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook personalizado para consumir el contexto del tema en cualquier componente hijo.
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe ser utilizado dentro de un ThemeProvider');
  }
  return context;
};


