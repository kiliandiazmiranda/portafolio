/**
 * Sección de Habilidades Técnicas y Áreas de Especialización.
 * Cuadrícula en PC (lg) y carrusel accesible con scroll-snap en móvil/tablet.
 */

import { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import {
  DoodleLayout,
  DoodleServer,
  DoodleCode,
  DoodleDatabase,
  DoodleCloud,
  DoodleSparkles,
} from './EasterEggs/DoodleIcons';

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Layout': return <DoodleLayout className="w-5 h-5" />;
    case 'Server': return <DoodleServer className="w-5 h-5" />;
    case 'Code2': return <DoodleCode className="w-5 h-5" />;
    case 'Database': return <DoodleDatabase className="w-5 h-5" />;
    case 'Cloud': return <DoodleCloud className="w-5 h-5" />;
    case 'Sparkles': return <DoodleSparkles className="w-5 h-5" />;
    default: return <DoodleCode className="w-5 h-5" />;
  }
};

export const SkillsSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState<boolean>(false);
  const [canScrollNext, setCanScrollNext] = useState<boolean>(true);
  const [activePageIndex, setActivePageIndex] = useState<number>(0);
  const [totalPages, setTotalPages] = useState(1);

  // Calcula el estado y la paginación del carrusel.
  const updateScrollState = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollPrev(scrollLeft > 10);
    setCanScrollNext(scrollLeft < scrollWidth - clientWidth - 10);

    const isTablet = clientWidth >= 600;
    const cardsPerView = isTablet ? 2 : 1;
    const computedTotalPages = Math.max(1, Math.ceil(SKILL_CATEGORIES.length / cardsPerView));
    setTotalPages(computedTotalPages);

    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 10) {
      const page = Math.round((scrollLeft / maxScroll) * (computedTotalPages - 1));
      setActivePageIndex(Math.max(0, Math.min(computedTotalPages - 1, page)));
    } else {
      setActivePageIndex(0);
    }
  }, []);

  const handleScrollPrev = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const firstChild = container.firstElementChild as HTMLElement | null;
    const itemWidth = firstChild ? firstChild.offsetWidth + 16 : container.clientWidth;
    container.scrollBy({ left: -itemWidth, behavior: 'smooth' });
  };

  const handleScrollNext = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const firstChild = container.firstElementChild as HTMLElement | null;
    const itemWidth = firstChild ? firstChild.offsetWidth + 16 : container.clientWidth;
    container.scrollBy({ left: itemWidth, behavior: 'smooth' });
  };

  const scrollToPage = (pageIdx: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const { scrollWidth, clientWidth } = container;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0 || totalPages <= 1) return;
    
    const targetLeft = (pageIdx / (totalPages - 1)) * maxScroll;
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

  return (
    <section
      id="habilidades"
      className="py-12 sm:py-16 border-b border-neutral-200/60 dark:border-neutral-800/60"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 flex items-center gap-2.5">
            <span>Mis Habilidades</span>
          </h2>

          {/* Flechas de navegación para pantallas móviles y tablets */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={handleScrollPrev}
              disabled={!canScrollPrev}
              className="w-8 h-8 doodle-btn bg-white dark:bg-neutral-800 border-2 border-neutral-400 dark:border-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-neutral-800 dark:text-neutral-200 transition-opacity cursor-pointer shadow-xs"
              aria-label="Habilidades anteriores"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleScrollNext}
              disabled={!canScrollNext}
              className="w-8 h-8 doodle-btn bg-white dark:bg-neutral-800 border-2 border-neutral-400 dark:border-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-neutral-800 dark:text-neutral-200 transition-opacity cursor-pointer shadow-xs"
              aria-label="Siguientes habilidades"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Vista carrusel para móviles y tablets (< lg) */}
        <div className="block lg:hidden">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-3 no-scrollbar overscroll-x-contain"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              scrollSnapType: 'x mandatory',
              scrollSnapStop: 'always',
            }}
          >
            {SKILL_CATEGORIES.map((category) => (
              <div
                key={category.id}
                style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
                className="w-full sm:w-[calc(50%-0.5rem)] shrink-0 snap-start p-4 sm:p-5 doodle-card doodle-shadow bg-white dark:bg-neutral-900 border-2 border-neutral-300 dark:border-neutral-700 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-extrabold px-2 py-0.5 doodle-badge border-2 border-neutral-400 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100">
                        {category.number}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-neutral-950 dark:text-neutral-50 tracking-tight">
                        {category.title}
                      </h3>
                    </div>

                    <div className="w-8 h-8 doodle-box bg-amber-500/15 dark:bg-amber-400/15 text-amber-800 dark:text-amber-300 flex items-center justify-center shrink-0 border-2 border-amber-500/30 dark:border-amber-400/30">
                      {getIcon(category.iconName)}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-snug mb-3 sm:mb-4 font-medium">
                    {category.description}
                  </p>
                </div>

                <div className="pt-2.5 border-t-2 border-dashed border-neutral-300 dark:border-neutral-700 mt-auto">
                  <div className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2 flex items-center justify-between">
                    <span>Tecnologías y Conocimientos</span>
                    <span className="text-[10px] sm:text-xs font-semibold lowercase text-neutral-500 dark:text-neutral-400">
                      {category.technologies.length} tags
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {category.technologies.map((tech, techIdx) => (
                      <span
                        key={tech.name}
                        className="inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-1 doodle-badge text-xs font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700"
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1.5 mt-3">
              {Array.from({ length: totalPages }).map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => scrollToPage(dotIdx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activePageIndex === dotIdx
                      ? 'w-6 bg-amber-500 dark:bg-amber-400'
                      : 'w-2 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400'
                  }`}
                  aria-label={`Ir al grupo ${dotIdx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Vista en cuadrícula para pantallas grandes (lg: >= 1024px) */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-4 lg:gap-5">
          {SKILL_CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="p-4 sm:p-5 doodle-card doodle-shadow bg-white dark:bg-neutral-900 border-2 border-neutral-300 dark:border-neutral-700 hover:border-amber-500 dark:hover:border-amber-400 transition-colors duration-150 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-extrabold px-2 py-0.5 doodle-badge border-2 border-neutral-400 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100">
                      {category.number}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-neutral-950 dark:text-neutral-50 tracking-tight">
                      {category.title}
                    </h3>
                  </div>

                  <div className="w-8 h-8 doodle-box bg-amber-500/15 dark:bg-amber-400/15 text-amber-800 dark:text-amber-300 flex items-center justify-center shrink-0 border-2 border-amber-500/30 dark:border-amber-400/30 group-hover:scale-105 transition-transform duration-150">
                    {getIcon(category.iconName)}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-snug mb-3 sm:mb-4 font-medium">
                  {category.description}
                </p>
              </div>

              <div className="pt-2.5 border-t-2 border-dashed border-neutral-300 dark:border-neutral-700 mt-auto">
                <div className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2 flex items-center justify-between">
                  <span>Tecnologías y Conocimientos</span>
                  <span className="text-[10px] sm:text-xs font-semibold lowercase text-neutral-500 dark:text-neutral-400">
                    {category.technologies.length} tags
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {category.technologies.map((tech, techIdx) => (
                    <span
                      key={tech.name}
                      className="inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-1 doodle-badge text-xs font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700 hover:border-amber-500 dark:hover:border-amber-400 hover:text-amber-800 dark:hover:text-amber-300 transition-colors"
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


