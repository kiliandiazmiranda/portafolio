/**
 * Sección Sobre Mí.
 * Presenta biografía profesional e intereses con accesos a modales interactivos.
 */

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DinosaurDoodle } from './EasterEggs/DinosaurDoodles';
import {
  DoodleCat,
  DoodlePaw,
  DoodleGamepad,
  DoodleSwords,
  DoodleBone,
  DoodleTelescope,
  DoodleStar
} from './EasterEggs/DoodleIcons';

interface AboutSectionProps {
  onOpenPrehistoric: () => void;
  onToggleCat: () => void;
  onOpenStrategyGames: () => void;
  onOpenAstronomy: () => void;
  isCatActive?: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenPrehistoric,
  onToggleCat,
  onOpenStrategyGames,
  onOpenAstronomy,
  isCatActive = false,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState<boolean>(false);
  const [canScrollNext, setCanScrollNext] = useState<boolean>(true);
  const [activePageIndex, setActivePageIndex] = useState<number>(0);

  // Actualiza los controles y el indicador del carrusel.
  const updateScrollState = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollPrev(scrollLeft > 6);
    setCanScrollNext(scrollLeft < scrollWidth - clientWidth - 6);

    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 6) {
      const page = Math.round(scrollLeft / clientWidth);
      setActivePageIndex(Math.max(0, Math.min(1, page)));
    } else {
      setActivePageIndex(0);
    }
  }, []);

  const handleScrollPrev = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.scrollBy({ left: -container.clientWidth, behavior: 'smooth' });
  };

  const handleScrollNext = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.scrollBy({ left: container.clientWidth, behavior: 'smooth' });
  };

  const scrollToPage = (pageIdx: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const targetLeft = pageIdx * container.clientWidth;
    container.scrollTo({ left: targetLeft, behavior: 'smooth' });
    setActivePageIndex(pageIdx);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    updateScrollState();

    let timeoutId: number | undefined;
    const onScroll = () => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(updateScrollState, 40);
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.clearTimeout(timeoutId);
      container.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [updateScrollState]);

  // Tarjeta 1: Juegos de estrategia
  const renderJuegosCard = () => (
    <div className="p-4 sm:p-4.5 doodle-card doodle-shadow-sm bg-white dark:bg-neutral-900 border-2 border-neutral-400 dark:border-neutral-700 transition-all hover:border-amber-500 dark:hover:border-amber-400 group flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8.5 h-8.5 doodle-box bg-amber-500/15 text-amber-800 dark:text-amber-300 flex items-center justify-center shrink-0 border-2 border-amber-500/40">
              <DoodleGamepad className="w-4.5 h-4.5" />
            </div>
            <h4 className="text-sm sm:text-base font-bold text-neutral-950 dark:text-neutral-50 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors">
              Videojuegos
            </h4>
          </div>

          <button
            onClick={onOpenStrategyGames}
            className="px-3 py-1.5 text-xs font-bold doodle-btn doodle-shadow-sm bg-amber-100 dark:bg-amber-950/90 text-amber-950 dark:text-amber-200 hover:bg-amber-200 dark:hover:bg-amber-900 active:bg-amber-300 dark:active:bg-amber-800 border-2 border-amber-400 dark:border-amber-700 transition-all cursor-pointer shrink-0 flex items-center gap-1.5 active:scale-95 touch-manipulation whitespace-nowrap"
            title="Abrir sala de mando"
          >
            <DoodleSwords className="w-3.5 h-3.5 shrink-0" />
            <span>Sala de Mando</span>
          </button>
        </div>
      </div>
      <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
        Me gustan los juegos de estrategia como CK, EU, Victoria, Stellaris, HOI, Port Royale.
      </p>
    </div>
  );

  // Tarjeta 2: Prehistoria
  const renderPrehistoriaCard = () => (
    <div className="p-4 sm:p-4.5 doodle-card doodle-shadow-sm bg-white dark:bg-neutral-900 border-2 border-neutral-400 dark:border-neutral-700 transition-all hover:border-amber-500 dark:hover:border-amber-400 group flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8.5 h-8.5 doodle-box bg-amber-500/15 text-amber-800 dark:text-amber-300 flex items-center justify-center shrink-0 border-2 border-amber-500/40">
              <DoodleBone className="w-4.5 h-4.5" />
            </div>
            <h4 className="text-sm sm:text-base font-bold text-neutral-950 dark:text-neutral-50 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors">
              Prehistoria
            </h4>
          </div>

          <button
            onClick={onOpenPrehistoric}
            className="px-3 py-1.5 text-xs font-bold doodle-btn doodle-shadow-sm bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white transition-all cursor-pointer shrink-0 flex items-center gap-1.5 border-2 border-amber-800 active:scale-95 touch-manipulation whitespace-nowrap"
            title="Abrir cuaderno prehistórico"
          >
            <DinosaurDoodle id="tyrannosaurus" className="w-4 h-4 shrink-0" />
            <span>Ver Doodles</span>
          </button>
        </div>
      </div>
      <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
        Me fascinan los animales prehistóricos, especialmente los dinosaurios y cómo ha evolucionado la vida.
      </p>
    </div>
  );

  // Tarjeta 3: Gatos
  const renderGatosCard = () => (
    <div className="p-4 sm:p-4.5 doodle-card doodle-shadow-sm bg-white dark:bg-neutral-900 border-2 border-neutral-400 dark:border-neutral-700 transition-all hover:border-emerald-500 dark:hover:border-emerald-400 group flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8.5 h-8.5 doodle-box bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0 border-2 border-emerald-500/40">
              <DoodleCat className="w-4.5 h-4.5" />
            </div>
            <h4 className="text-sm sm:text-base font-bold text-neutral-950 dark:text-neutral-50 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors">
              Gatos
            </h4>
          </div>

          <button
            onClick={onToggleCat}
            className={`px-3 py-1.5 text-xs font-bold doodle-btn doodle-shadow-sm transition-all cursor-pointer shrink-0 flex items-center gap-1.5 border-2 active:scale-95 touch-manipulation whitespace-nowrap ${
              isCatActive
                ? 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white border-emerald-800'
                : 'bg-emerald-100 dark:bg-emerald-950/90 text-emerald-950 dark:text-emerald-200 hover:bg-emerald-200 dark:hover:bg-emerald-900 active:bg-emerald-300 border-emerald-400 dark:border-emerald-700'
            }`}
            title={isCatActive ? "Desactivar compañero felino" : "Activar compañero felino"}
          >
            <DoodlePaw className="w-3.5 h-3.5 shrink-0" />
            <span>{isCatActive ? 'Ocultar Michi' : 'Ver Michi'}</span>
          </button>
        </div>
      </div>
      <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
        Los gatos son una gran compañía para relajarse, concentrarse y disfrutar de los pequeños momentos.
      </p>
    </div>
  );

  // Tarjeta 4: Astronomía
  const renderAstronomiaCard = () => (
    <div className="p-4 sm:p-4.5 doodle-card doodle-shadow-sm bg-white dark:bg-neutral-900 border-2 border-neutral-400 dark:border-neutral-700 transition-all hover:border-blue-500 dark:hover:border-blue-400 group flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8.5 h-8.5 doodle-box bg-blue-500/15 text-blue-800 dark:text-blue-300 flex items-center justify-center shrink-0 border-2 border-blue-500/40">
              <DoodleTelescope className="w-4.5 h-4.5" />
            </div>
            <h4 className="text-sm sm:text-base font-bold text-neutral-950 dark:text-neutral-50 group-hover:text-blue-800 dark:group-hover:text-blue-400 transition-colors">
              Astronomía
            </h4>
          </div>

          <button
            onClick={onOpenAstronomy}
            className="px-3 py-1.5 text-xs font-bold doodle-btn doodle-shadow-sm bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white transition-all cursor-pointer shrink-0 flex items-center gap-1.5 border-2 border-blue-800 dark:border-blue-400 active:scale-95 touch-manipulation whitespace-nowrap"
            title="Abrir observatorio astronómico"
            id="about-open-observatory-btn"
          >
            <DoodleStar className="w-3.5 h-3.5 shrink-0" />
            <span>Observatorio</span>
          </button>
        </div>
      </div>
      <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
        Me interesa mucho la astronomía, el espacio y todo lo relacionado con los misterios del universo.
      </p>
    </div>
  );

  return (
    <section id="sobre-mi" className="py-14 sm:py-20 border-b border-neutral-200/60 dark:border-neutral-800/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-3">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Sobre Mí
          </h2>

          <div className="hidden sm:flex items-center gap-2 rotate-[-1.5deg] select-none pointer-events-none text-neutral-700 dark:text-neutral-300">
            <div className="font-crayon text-xs sm:text-sm text-right leading-tight">
              <span className="text-emerald-700 dark:text-emerald-400 font-bold">const</span> [michi, setMichi] = <span className="text-sky-700 dark:text-sky-400 font-bold">useState</span>(
                <DoodleCat className="w-4 h-4 inline-block align-middle mx-0.5 text-emerald-600 dark:text-emerald-400" />
              );
            </div>
            <svg className="w-10 h-4 text-emerald-600/60 dark:text-emerald-400/60" viewBox="0 0 48 20" fill="none">
              <path d="M 4 10 Q 24 3, 44 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {/* Biografía profesional */}
          <div className="text-neutral-800 dark:text-neutral-200 leading-relaxed text-sm sm:text-base md:text-lg font-medium">
            <div className="p-6 sm:p-7 doodle-card doodle-shadow bg-white dark:bg-neutral-900 border-2 border-neutral-400 dark:border-neutral-700">
              <p className="mb-4 sm:mb-5">
                Como <strong className="text-black dark:text-neutral-50 font-bold">Ingeniero de Sistemas y Computación</strong>, desarrollo soluciones integrales que abarcan frontend, backend, bases de datos e infraestructura, buscando siempre un equilibrio entre funcionalidad, rendimiento, seguridad y mantenibilidad.
              </p>
              <p>
                Mi experiencia incluye el desarrollo de aplicaciones web, la gestión de bases de datos relacionales y NoSQL, implementación de servicios y APIs, integración de herramientas de inteligencia artificial y despliegue de aplicaciones en entornos Cloud y virtualizados. Aplico buenas prácticas de desarrollo y principios de arquitectura de software para construir soluciones escalables, eficientes y fáciles de mantener.
              </p>
            </div>
          </div>

          {/* Tarjetas de intereses personales */}
          <div className="flex flex-col">
            {/* Cabecera en Desktop & Tablet: Sin controles de desplazamiento */}
            <div className="hidden sm:flex items-center justify-between pb-1.5 mb-3">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 flex items-center gap-1.5 font-mono">
                <span>Intereses y Cosas que me gustan</span>
              </h3>
            </div>

            {/* Vista en PC y Tablet: Las 4 tarjetas juntas en cuadrícula 2x2 SIN scroll */}
            <div className="hidden sm:grid sm:grid-cols-2 gap-3.5 sm:gap-4">
              {renderJuegosCard()}
              {renderPrehistoriaCard()}
              {renderGatosCard()}
              {renderAstronomiaCard()}
            </div>

            {/* Vista en Móvil: Carrusel horizontal con 1 arriba y 1 abajo (2 tarjetas por vista) */}
            <div className="block sm:hidden flex-col">
              <div className="flex items-center justify-between pb-1.5 mb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 flex items-center gap-1.5 font-mono">
                  <span>Intereses</span>
                </h3>

                {/* Botones de navegación del carrusel móvil */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handleScrollPrev}
                    disabled={!canScrollPrev}
                    className="w-7 h-7 doodle-btn bg-white dark:bg-neutral-800 border-2 border-neutral-400 dark:border-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-neutral-800 dark:text-neutral-200 transition-opacity cursor-pointer shadow-xs"
                    aria-label="Intereses anteriores"
                    title="Anterior"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleScrollNext}
                    disabled={!canScrollNext}
                    className="w-7 h-7 doodle-btn bg-white dark:bg-neutral-800 border-2 border-neutral-400 dark:border-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-neutral-800 dark:text-neutral-200 transition-opacity cursor-pointer shadow-xs"
                    aria-label="Siguientes intereses"
                    title="Siguiente"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Contenedor scrolleable horizontal en móvil */}
              <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-1 no-scrollbar overscroll-x-contain"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch',
                  scrollSnapType: 'x mandatory',
                  scrollSnapStop: 'always',
                }}
              >
                {/* Página 1 Móvil: Juegos (arriba) y Prehistoria (abajo) */}
                <div
                  style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
                  className="w-full shrink-0 snap-start flex flex-col gap-2.5"
                >
                  {renderJuegosCard()}
                  {renderPrehistoriaCard()}
                </div>

                {/* Página 2 Móvil: Gatos (arriba) y Astronomía (abajo) */}
                <div
                  style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
                  className="w-full shrink-0 snap-start flex flex-col gap-2.5"
                >
                  {renderGatosCard()}
                  {renderAstronomiaCard()}
                </div>
              </div>

              {/* Puntos de paginación en móvil */}
              <div className="flex items-center justify-center gap-1.5 mt-2.5">
                {[0, 1].map((dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={() => scrollToPage(dotIdx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      activePageIndex === dotIdx
                        ? 'w-5 bg-amber-500 dark:bg-amber-400'
                        : 'w-2 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400'
                    }`}
                    aria-label={`Ir al grupo ${dotIdx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

