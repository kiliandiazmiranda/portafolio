/**
 * Sección Hero (Presentación principal).
 * Muestra nombre, título, descripción y llamada a la acción con interactividad doodle.
 */

import React, { useState, useRef, useEffect } from 'react';
import { Linkedin, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { DoodleTriceratops } from './EasterEggs/DoodleIcons';

interface HeroProps {
  isReady?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isReady = false }) => {
  const [playEntrance, setPlayEntrance] = useState<boolean>(false);
  const [isDinoActive, setIsDinoActive] = useState<boolean>(false);
  const [showRoar, setShowRoar] = useState<boolean>(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const entranceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Entrada sincronizada tras completar la carga
  useEffect(() => {
    if (isReady) {
      entranceTimerRef.current = setTimeout(() => {
        setPlayEntrance(true);
      }, 100);
    }
    return () => {
      if (entranceTimerRef.current) clearTimeout(entranceTimerRef.current);
    };
  }, [isReady]);

  const stopDinoRoar = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsDinoActive(false);
    setShowRoar(false);
  };

  const triggerDinoInteraction = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsDinoActive(true);
    setShowRoar(true);

    timeoutRef.current = setTimeout(() => {
      stopDinoRoar();
    }, 1800);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleDinoClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    triggerDinoInteraction();
  };

  return (
    <section
      id="inicio"
      className="relative pt-1 pb-10 sm:pt-1.5 sm:pb-14 md:pt-2 md:pb-16 lg:pt-2.5 lg:pb-20 border-b border-neutral-200/60 dark:border-neutral-800/60"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          <div className="lg:col-span-8">
            <div className="mb-4 sm:mb-6">
              <h1 className="font-doodle text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold sm:font-extrabold tracking-wide text-neutral-950 dark:text-neutral-50 leading-[1.25] break-words select-text">
                <span
                  className={`inline-block hover:-rotate-2 hover:scale-[1.03] transition-transform duration-200 mr-2 text-neutral-950 dark:text-neutral-100 font-bold cursor-default ${
                    playEntrance ? 'animate-doodle-entry-tilt' : 'opacity-100'
                  }`}
                >
                  Hola, soy
                </span>
                <span className="relative inline-flex flex-wrap items-center gap-1.5 sm:gap-2.5 mt-1 sm:mt-0">
                  <span className="relative inline-block">
                    <span
                      className={`relative z-10 inline-block hover:rotate-1 hover:scale-[1.01] transition-transform duration-200 cursor-default text-black dark:text-neutral-50 font-extrabold drop-shadow-[0.5px_0.5px_0px_rgba(0,0,0,0.12)] dark:drop-shadow-[0.5px_1px_0px_rgba(255,255,255,0.15)] ${
                        playEntrance ? 'animate-doodle-entry-name' : 'opacity-100'
                      }`}
                    >
                      Kilian Diaz Miranda
                    </span>

                    {/* Subrayado animado estilo crayón */}
                    <svg
                      className={`absolute -bottom-2 sm:-bottom-2.5 left-0 w-full h-3 sm:h-4 text-amber-500 dark:text-amber-400 crayola-underline pointer-events-none ${
                        playEntrance ? 'animate-crayola-draw' : 'opacity-90'
                      }`}
                      viewBox="0 0 200 16"
                      width="200"
                      height="16"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 9 C 45 4, 95 12, 145 7 C 170 4.5, 188 8, 198 6"
                        stroke="currentColor"
                        strokeWidth="3.8"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 11.5 C 55 7, 105 14, 155 9 C 178 7, 190 9.5, 195 8.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeOpacity="0.8"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>

                  {/* Doodle de Triceratops interactivo */}
                  <button
                    type="button"
                    onClick={handleDinoClick}
                    className={`relative inline-flex items-center justify-center align-middle ml-1 sm:ml-2 p-1 bg-transparent border-0 outline-none focus:outline-none cursor-pointer select-none shrink-0 active:scale-95 touch-manipulation ${
                      isDinoActive
                        ? 'animate-doodle-roar'
                        : playEntrance
                        ? 'animate-dino-walk'
                        : 'opacity-100'
                    }`}
                    title="Toca para activar el gruñido"
                    aria-label="Toca para activar el gruñido"
                  >
                    <span className="text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-200 transition-colors inline-block w-9 h-6.5 xs:w-10 xs:h-7.5 sm:w-12 sm:h-9 md:w-14 md:h-10 lg:w-16 lg:h-11.5 xl:w-18 xl:h-13">
                      <DoodleTriceratops className="w-full h-full shrink-0 drop-shadow-sm" />
                    </span>

                    {showRoar && (
                      <span className="absolute -top-8 sm:-top-9 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-amber-900 text-amber-100 dark:bg-amber-100 dark:text-amber-950 font-mono text-[10px] sm:text-xs font-bold rounded-md border border-amber-500 whitespace-nowrap shadow-lg z-30 animate-doodle-roar-bubble flex items-center gap-1 pointer-events-none">
                        <span>🌿 ¡Grooooh!</span>
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-amber-900 dark:bg-amber-100 border-r border-b border-amber-500 rotate-45" />
                      </span>
                    )}
                  </button>
                </span>
              </h1>
            </div>

            <p className="text-lg sm:text-xl md:text-2xl font-bold text-emerald-800 dark:text-emerald-400 mb-4 sm:mb-6 tracking-tight font-mono">
              Ingeniero de Sistemas y Computación | Desarrollador de Software
            </p>

            <p className="text-base sm:text-lg md:text-xl text-neutral-800 dark:text-neutral-200 leading-relaxed mb-6 sm:mb-8 max-w-2xl font-medium">
              Me apasiona la tecnología y el desarrollo de soluciones de software. En mi tiempo libre disfruto estudiando sobre animales prehistóricos y la astronomía. Soy fan de los gatos y los juegos de estrategia.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 pt-1">
              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 doodle-btn doodle-shadow bg-[#0077b5] hover:bg-[#006097] text-white text-sm sm:text-base font-bold transition-all border-2 border-[#005580] min-h-[46px]"
                id="hero-cta-linkedin"
                title="Ver perfil de LinkedIn"
              >
                <Linkedin className="w-4.5 h-4.5 shrink-0" />
                <span>LinkedIn</span>
              </a>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 doodle-btn doodle-shadow bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-950 dark:text-neutral-100 text-sm sm:text-base font-bold border-2 border-neutral-400 dark:border-neutral-700 transition-colors min-h-[46px]"
                title={`Enviar correo a ${PERSONAL_INFO.email}`}
                id="hero-send-email-btn"
              >
                <Mail className="w-4.5 h-4.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="truncate max-w-[220px] sm:max-w-none">{PERSONAL_INFO.email}</span>
              </a>
            </div>
          </div>

          {/* Snippet doodle de código */}
          <div className="hidden lg:flex flex-col items-end justify-center lg:col-span-4 select-none pr-2">
            <div className="rotate-[1.5deg] p-5 sm:p-6 doodle-card doodle-shadow border-2 border-neutral-400 dark:border-neutral-700 bg-white dark:bg-neutral-900 max-w-[280px]">
              <div className="font-pencil text-sm text-neutral-900 dark:text-neutral-100 leading-snug">
                <div className="space-y-1 font-mono text-xs sm:text-sm">
                  <div>
                    <span className="text-rose-700 dark:text-rose-400 font-bold">fn</span>{' '}
                    <span className="text-sky-700 dark:text-sky-400 font-bold">build</span>() -&gt;{' '}
                    <span className="text-amber-700 dark:text-amber-400 font-bold">Result</span>&lt;()&gt; &#123;
                  </div>
                  <div className="pl-3">
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold">Ok(software.deploy())</span>
                  </div>
                  <div>&#125;</div>
                </div>
                <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-3 font-mono italic font-semibold">
                  ~ O(1) tiempo • 12ms ~
                </div>
              </div>
              <svg className="w-32 h-3.5 text-amber-600/70 dark:text-amber-400/60 mt-2.5 ml-auto" viewBox="0 0 130 14" fill="none">
                <path d="M 128 4 Q 75 12, 35 4 T 2 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


