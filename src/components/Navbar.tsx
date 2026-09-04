/**
 * Barra superior de navegación (Navbar).
 * Incluye el conmutador de tema claro/oscuro con iconos vectoriales doodle.
 */

import React from 'react';
import { useTheme } from '../context/ThemeContext';

// Icono vectorial doodle de sol
const HandDrawnSunIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M12 7.2 C 14.7 7.0, 16.9 9.1, 16.7 12 C 16.5 14.8, 14.6 16.9, 11.9 16.8 C 9.2 16.6, 7.2 14.7, 7.3 11.9 C 7.5 9.3, 9.4 7.4, 12 7.2 Z"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="10.3" cy="11.2" r="0.65" fill="currentColor" />
    <circle cx="13.7" cy="11.2" r="0.65" fill="currentColor" />
    <path
      d="M10.8 13.3 Q 12 14.4, 13.2 13.3"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
    <path d="M12 2.2 C 11.9 3.2, 12.2 4.1, 12 5.0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M11.9 19.0 C 12.1 20.0, 11.8 20.9, 12 21.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M2.2 12.1 C 3.1 11.9, 4.1 12.2, 5.0 12.0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M19.0 11.9 C 19.9 12.1, 20.9 11.8, 21.8 12.0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M17.0 7.0 C 17.9 6.1, 18.7 5.3, 19.4 4.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M16.9 17.1 C 17.8 18.0, 18.6 18.7, 19.5 19.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M7.1 17.0 C 6.2 17.9, 5.4 18.6, 4.6 19.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M7.0 7.1 C 6.1 6.2, 5.3 5.4, 4.6 4.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

// Icono vectorial doodle de luna
const HandDrawnMoonIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M14.8 3.5 C 10.4 4.5, 7.3 8.3, 7.6 13.0 C 7.9 17.6, 11.4 20.8, 15.8 20.6 C 17.2 20.5, 18.4 20.0, 19.4 19.2 C 16.0 18.1, 13.4 15.4, 13.2 11.6 C 13.0 7.8, 15.1 4.7, 18.2 3.8 C 17.1 3.4, 15.9 3.3, 14.8 3.5 Z"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <ellipse cx="10.8" cy="11.5" rx="1.1" ry="0.9" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <ellipse cx="12.5" cy="16.0" rx="0.9" ry="0.7" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path
      d="M19.2 7.2 C 19.4 8.0, 19.7 8.3, 20.5 8.5 C 19.7 8.7, 19.4 9.0, 19.2 9.8 C 19.0 9.0, 18.7 8.7, 17.9 8.5 C 18.7 8.3, 19.0 8.0, 19.2 7.2 Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeLinejoin="round"
    />
    <circle cx="17.2" cy="14.8" r="0.75" fill="currentColor" />
  </svg>
);

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="relative w-full z-10 pt-1.5 sm:pt-2">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-10 sm:h-11 flex items-center justify-end">
        <button
          onClick={toggleTheme}
          className="group relative w-10 h-10 doodle-btn doodle-shadow-sm flex items-center justify-center bg-neutral-100/90 hover:bg-neutral-200/90 dark:bg-neutral-900/90 dark:hover:bg-neutral-800 border-2 border-neutral-300 dark:border-neutral-700 transition-all duration-200 cursor-pointer"
          title={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
          aria-label="Cambiar tema de color"
          id="nav-theme-toggle"
        >
          {theme === 'dark' ? (
            <HandDrawnMoonIcon className="w-5 h-5 text-amber-300 dark:text-amber-300/90 group-hover:rotate-12 transition-transform duration-200" />
          ) : (
            <HandDrawnSunIcon className="w-5 h-5 text-amber-500 group-hover:rotate-45 transition-transform duration-300" />
          )}
        </button>
      </div>
    </header>
  );
};
