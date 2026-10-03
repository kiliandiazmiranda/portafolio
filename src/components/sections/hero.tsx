import React, { useState, useRef, useEffect } from 'react';
import { Linkedin, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolio';
import { DoodleTriceratops } from '../doodles/icons';
import { PixelCat } from '../pixel/pixel-cat';
import { useLanguage } from '../../context/language';
import { TRANSLATIONS } from '../../data/translations';

interface HeroProps {
  isReady?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isReady = false }) => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].hero;

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
      }, 50);
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
      className="relative pt-2 pb-8 sm:pt-3 sm:pb-12 md:pt-4 md:pb-14 border-b border-neutral-200/60 dark:border-neutral-800/60"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          <div className="lg:col-span-8">
            <div className="mb-3 sm:mb-5">
              <h1 className="font-doodle text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold sm:font-extrabold tracking-wide text-neutral-950 dark:text-neutral-50 leading-[1.25] break-words select-text">
                <span
                  className={`inline-block hover:-rotate-2 hover:scale-[1.03] transition-transform duration-200 mr-2 text-neutral-950 dark:text-neutral-100 font-bold cursor-default ${
                    playEntrance ? 'animate-doodle-entry-tilt' : 'opacity-100'
                  }`}
                >
                  {t.greeting}
                </span>
                <span className="relative inline-flex flex-wrap items-center gap-1.5 sm:gap-2.5 mt-1 sm:mt-0">
                  <span className="relative inline-block">
                    <span
                      className={`relative z-10 inline-block hover:rotate-1 hover:scale-[1.01] transition-transform duration-200 cursor-default text-black dark:text-neutral-50 font-extrabold drop-shadow-[0.5px_0.5px_0px_rgba(0,0,0,0.12)] dark:drop-shadow-[0.5px_1px_0px_rgba(255,255,255,0.15)] ${
                        playEntrance ? 'animate-doodle-entry-name' : 'opacity-100'
                      }`}
                    >
                      {PERSONAL_INFO.name}
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
                    title={t.dinoTitle}
                    aria-label={t.dinoTitle}
                  >
                    <span className="text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-200 transition-colors inline-block w-9 h-6.5 xs:w-10 xs:h-7.5 sm:w-12 sm:h-9 md:w-14 md:h-10 lg:w-16 lg:h-11.5 xl:w-18 xl:h-13">
                      <DoodleTriceratops className="w-full h-full shrink-0 drop-shadow-sm" />
                    </span>

                    {showRoar && (
                      <span className="absolute -top-8 sm:-top-9 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-amber-900 text-amber-100 dark:bg-amber-100 dark:text-amber-950 font-mono text-[10px] sm:text-xs font-bold rounded-md border border-amber-500 whitespace-nowrap shadow-lg z-30 animate-doodle-roar-bubble flex items-center gap-1 pointer-events-none">
                        <span>{t.dinoRoar}</span>
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-amber-900 dark:bg-amber-100 border-r border-b border-amber-500 rotate-45" />
                      </span>
                    )}
                  </button>
                </span>
              </h1>
            </div>

            {/* Subtítulo */}
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-emerald-800 dark:text-emerald-400 mb-4 sm:mb-5 tracking-tight font-mono select-text min-h-[1.75rem] sm:min-h-[2rem] flex items-center">
              {t.title}
            </p>

            {/* Párrafo de presentación */}
            <p className="text-base sm:text-lg md:text-xl text-neutral-800 dark:text-neutral-200 leading-relaxed font-medium mb-6 sm:mb-8 max-w-2xl select-text min-h-[4.75rem] sm:min-h-[5.25rem]">
              {t.bio}
            </p>

            {/* Botones de LinkedIn y Ver CV */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-cta-linkedin"
                title={t.linkedinTitle}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 doodle-btn doodle-shadow font-bold text-sm sm:text-base border-2 border-[#005580] bg-[#0077b5] hover:bg-[#006097] text-white min-h-[46px] h-[46px] min-w-[145px] sm:min-w-[160px] cursor-pointer transition-transform"
              >
                <Linkedin className="w-4.5 h-4.5" />
                <span>{t.linkedin}</span>
              </a>

              <a
                href={PERSONAL_INFO.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-view-cv-btn"
                title={t.cvTitle}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 doodle-btn doodle-shadow font-bold text-sm sm:text-base border-2 border-neutral-400 dark:border-neutral-700 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-950 dark:text-neutral-100 min-h-[46px] h-[46px] min-w-[145px] sm:min-w-[160px] cursor-pointer transition-transform"
              >
                <FileText className="w-4.5 h-4.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{t.cv}</span>
              </a>
            </div>
          </div>

          {/* gato */}
          <div className="hidden lg:flex flex-col items-end justify-center lg:col-span-4 select-none pr-2">
            <PixelCat isReady={isReady} />
          </div>
        </div>
      </div>
    </section>
  );
};
