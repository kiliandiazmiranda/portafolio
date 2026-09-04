/**
 * Pie de página (Footer) de la aplicación.
 */

import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-9 bg-transparent text-neutral-700 dark:text-neutral-300 text-sm border-t-2 border-dashed border-neutral-400 dark:border-neutral-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          {/* Derechos de autor y licencia */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
            <span className="font-bold text-neutral-950 dark:text-neutral-50 font-pencil text-sm sm:text-base">
              Kilian Diaz Miranda • 2026
            </span>
            <span className="text-neutral-400 dark:text-neutral-500 hidden sm:inline">•</span>
            <span className="text-neutral-700 dark:text-neutral-300 font-pencil font-medium">
              Licenciado bajo{' '}
              <a
                href="https://choosealicense.com/es/licenses/mit/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-emerald-800 dark:text-emerald-300 hover:text-emerald-950 dark:hover:text-emerald-100 underline underline-offset-2 transition-colors doodle-badge px-1.5 py-0.5 border-2 border-emerald-500/40 bg-emerald-500/10"
              >
                MIT License
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
