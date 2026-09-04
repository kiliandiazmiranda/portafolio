/**
 * Easter Egg: Compañero interactivo felino (Michi de Debugging).
 * Muestra curiosidades sobre gatos, animación de caricias reactiva,
 * contador interactivo y tips de programación en una ventana flotante accesible.
 */

import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { CAT_FACTS } from '../../data/portfolioData';
import { DoodleCat, DoodleHeart, DoodleSparkles } from './DoodleIcons';

interface CatCompanionProps {
  isVisible: boolean;
  onClose: () => void;
}

export const CatCompanion: React.FC<CatCompanionProps> = ({ isVisible, onClose }) => {
  const [factIndex, setFactIndex] = useState(0);
  const [purring, setPurring] = useState(false);
  const [petsCount, setPetsCount] = useState(0);
  const [speechBubble, setSpeechBubble] = useState<string | null>(null);
  const purrTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (purrTimeoutRef.current) {
        clearTimeout(purrTimeoutRef.current);
      }
    };
  }, []);

  if (!isVisible) return null;

  const handlePet = () => {
    setPetsCount((prev) => prev + 1);
    setPurring(true);

    const compliments = [
      '¡Prrrr! 🐾 Compilación exitosa sin warnings.',
      'Miau! El garbage collector limpió la memoria a la perfección.',
      '🐾 Comiendo snacks mientras se optimiza la base de datos.',
      '¡Purr! Detecto cero memory leaks en esta sesión.',
      '🐱 Si cabe en la caja, el commit entra en producción.',
      '🐾 Ronroneando a 60 Hz para calmar el servidor en hora pico.'
    ];

    const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
    setSpeechBubble(randomCompliment);

    if (purrTimeoutRef.current) {
      clearTimeout(purrTimeoutRef.current);
    }
    purrTimeoutRef.current = setTimeout(() => {
      setPurring(false);
    }, 3500);
  };

  const handleNextFact = () => {
    setFactIndex((prev) => (prev + 1) % CAT_FACTS.length);
    setSpeechBubble(null);
  };

  return (
    <div
      className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-40 w-[calc(100vw-24px)] sm:w-auto max-w-xs sm:max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-300"
      id="cat-companion-widget"
    >
      <div className="p-3.5 sm:p-4 doodle-card doodle-shadow-sm bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-2 border-emerald-600/50 dark:border-emerald-400/50 text-neutral-900 dark:text-neutral-100 relative">
        {/* Botón de cerrar con alto contraste, borde doodle y respuesta inmediata al toque táctil */}
        <button
          onClick={onClose}
          className="absolute top-2.5 right-2.5 p-1 doodle-box doodle-shadow-sm bg-red-100 hover:bg-red-500 active:bg-red-600 dark:bg-red-950/80 dark:hover:bg-red-600 dark:active:bg-red-700 text-red-750 hover:text-white active:text-white dark:text-red-300 dark:hover:text-white dark:active:text-white transition-all min-h-[32px] min-w-[32px] flex items-center justify-center cursor-pointer border-2 border-red-400 hover:border-red-600 active:border-red-700 dark:border-red-600 dark:hover:border-red-500 dark:active:border-red-400 active:scale-90 touch-manipulation z-20"
          title="Cerrar compañero felino"
          aria-label="Cerrar widget del gato"
        >
          <X className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* Encabezado */}
        <div className="flex items-center gap-2.5 mb-2.5 pr-6">
          <div
            onClick={handlePet}
            className={`w-9 h-9 doodle-box flex items-center justify-center cursor-pointer transition-transform select-none shrink-0 border-2 ${
              purring
                ? 'bg-emerald-500 text-white scale-110 rotate-6 border-emerald-700 doodle-shadow-sm'
                : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:scale-105 border-emerald-500/30'
            }`}
            title="¡Haz clic para acariciar al Michi de Debugging!"
          >
            <DoodleCat className="w-5 h-5" />
          </div>

          <div className="min-w-0">
            <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5 truncate">
              <span>Michi de Debugging</span>
              {petsCount > 0 && (
                <span className="text-[10px] font-mono px-1.5 py-0.2 doodle-badge bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 shrink-0 border border-emerald-400">
                  {petsCount} caricias
                </span>
              )}
            </div>
            <div className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono truncate">
              {purring ? '✨ Ronroneando suavemente...' : 'Compañero de código activo'}
            </div>
          </div>
        </div>

        {/* Cuadro de diálogo y datos curiosos */}
        <div className="p-2.5 doodle-box bg-neutral-50 dark:bg-neutral-950/70 border-2 border-neutral-300 dark:border-neutral-700 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3">
          {speechBubble || CAT_FACTS[factIndex]}
        </div>

        {/* Controles de acción */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <button
            onClick={handlePet}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 doodle-btn doodle-shadow-sm text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-all cursor-pointer min-h-[32px] border-2 border-emerald-700"
            id="cat-pet-btn"
          >
            <DoodleHeart className="w-3.5 h-3.5 fill-current shrink-0" />
            <span>Acariciar ({petsCount})</span>
          </button>

          <button
            onClick={handleNextFact}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 doodle-btn text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer min-h-[32px] border border-neutral-300 dark:border-neutral-700"
          >
            <DoodleSparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>Siguiente tip</span>
          </button>
        </div>
      </div>
    </div>
  );
};

