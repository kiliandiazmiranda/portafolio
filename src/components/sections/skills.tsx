// Carrusel responsivo de habilidades

import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SKILL_CATEGORIES } from '../../data/portfolio';
import {
  DoodleLayout,
  DoodleServer,
  DoodleCode,
  DoodleDatabase,
  DoodleCloud,
  DoodleBot,
  DoodleSparkles,
  DoodleUser,
  DoodleFlask,
  DoodlePalette,
  DoodleWrench,
} from '../doodles/icons';
import { PixelSnake } from '../pixel/pixel-snake';

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Layout': return <DoodleLayout className="w-5 h-5" />;
    case 'Server': return <DoodleServer className="w-5 h-5" />;
    case 'Code2': return <DoodleCode className="w-5 h-5" />;
    case 'Database': return <DoodleDatabase className="w-5 h-5" />;
    case 'Cloud': return <DoodleCloud className="w-5 h-5" />;
    case 'Flask':
    case 'Testing': return <DoodleFlask className="w-5 h-5" />;
    case 'Palette':
    case 'Design': return <DoodlePalette className="w-5 h-5" />;
    case 'Wrench':
    case 'Tools': return <DoodleWrench className="w-5 h-5" />;
    case 'Bot': return <DoodleBot className="w-5 h-5" />;
    case 'Sparkles': return <DoodleSparkles className="w-5 h-5" />;
    case 'UserRound':
    case 'User':
    case 'Personal':
      return <DoodleUser className="w-5 h-5" />;
    default: return <DoodleCode className="w-5 h-5" />;
  }
};

import { useLanguage } from '../../context/language';
import { TRANSLATIONS } from '../../data/translations';

const getCardsPerView = (width: number): number => {
  if (width >= 1024) return 3; 
  if (width >= 640) return 2;
  return 1;  
};

export const Skills = () => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].skills;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [cardsPerView, setCardsPerView] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return getCardsPerView(window.innerWidth);
    }
    return 3;
  });

  const [activeGroup, setActiveGroup] = useState<number>(0);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Bloqueo de animación para evitar saltos rápidos entre más de 1 grupo
  const isTransitioningRef = useRef<boolean>(false);
  const transitionTimeoutRef = useRef<number | null>(null);

  // Divide las categorías en grupos según la pantalla actual
  const skillGroups = useMemo(() => {
    const groups: (typeof SKILL_CATEGORIES)[] = [];
    for (let i = 0; i < SKILL_CATEGORIES.length; i += cardsPerView) {
      groups.push(SKILL_CATEGORIES.slice(i, i + cardsPerView));
    }
    return groups;
  }, [cardsPerView]);

  const totalGroups = skillGroups.length;

  // Ajuste en cambio de tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      const cpv = getCardsPerView(window.innerWidth);
      setCardsPerView(cpv);
      const computedTotalGroups = Math.max(1, Math.ceil(SKILL_CATEGORIES.length / cpv));
      setActiveGroup((prev) => Math.min(prev, computedTotalGroups - 1));
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (transitionTimeoutRef.current) window.clearTimeout(transitionTimeoutRef.current);
      if (wheelTimerRef.current) window.clearTimeout(wheelTimerRef.current);
    };
  }, []);

  // Transición de grupo en grupo
  const stepGroup = useCallback((direction: 1 | -1) => {
    if (isTransitioningRef.current) return;

    setActiveGroup((prev) => {
      const target = prev + direction;
      if (target < 0 || target >= totalGroups) {
        setDragOffset(0);
        return prev;
      }

      isTransitioningRef.current = true;
      setDragOffset(0);

      if (transitionTimeoutRef.current) window.clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = window.setTimeout(() => {
        isTransitioningRef.current = false;
      }, 400);

      return target;
    });
  }, [totalGroups]);

  const handlePrev = () => {
    stepGroup(-1);
  };

  const handleNext = () => {
    stepGroup(1);
  };

  const handleDotClick = (targetIndex: number) => {
    if (isTransitioningRef.current || targetIndex === activeGroup) return;
    if (targetIndex > activeGroup) {
      stepGroup(1);
    } else {
      stepGroup(-1);
    }
  };

  // Manejo táctil
  const touchState = useRef<{
    startX: number;
    startY: number;
    startTime: number;
    isDirectionLocked: boolean;
    isHorizontal: boolean;
    currentDeltaX: number;
  } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 1) return;
    touchState.current = {
      startX: e.touches[0].clientX,
      startY: e.touches[0].clientY,
      startTime: Date.now(),
      isDirectionLocked: false,
      isHorizontal: false,
      currentDeltaX: 0,
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const state = touchState.current;
    if (!state) return;

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = currentX - state.startX;
    const deltaY = currentY - state.startY;

    if (!state.isDirectionLocked) {
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);
      if (absX < 7 && absY < 7) return;

      state.isDirectionLocked = true;
      if (absY >= absX) {
        // Gesto vertical
        state.isHorizontal = false;
        return;
      } else {
        // Gesto horizontal
        state.isHorizontal = true;
        setIsDragging(true);
      }
    }

    if (state.isHorizontal) {
      state.currentDeltaX = deltaX;
      let offset = deltaX;
      if ((activeGroup === 0 && deltaX > 0) || (activeGroup === totalGroups - 1 && deltaX < 0)) {
        offset = deltaX * 0.25;
      }
      setDragOffset(offset);
    }
  };

  const handleTouchEnd = () => {
    const state = touchState.current;
    touchState.current = null;
    setIsDragging(false);

    if (!state || !state.isHorizontal) {
      setDragOffset(0);
      return;
    }

    const deltaX = state.currentDeltaX;
    const deltaTime = Date.now() - state.startTime;
    const velocity = Math.abs(deltaX) / Math.max(1, deltaTime);
    const threshold = 45; // Mínimo de desplazamiento

    if (velocity > 0.25 || Math.abs(deltaX) > threshold) {
      if (deltaX < 0) {
        stepGroup(1);
      } else if (deltaX > 0) {
        stepGroup(-1);
      } else {
        setDragOffset(0);
      }
    } else {
      setDragOffset(0);
    }
  };

  // Arrastre con ratón
  const mouseState = useRef<{
    isDown: boolean;
    startX: number;
    startTime: number;
    currentDeltaX: number;
  }>({
    isDown: false,
    startX: 0,
    startTime: 0,
    currentDeltaX: 0,
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    mouseState.current = {
      isDown: true,
      startX: e.clientX,
      startTime: Date.now(),
      currentDeltaX: 0,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!mouseState.current.isDown) return;
    const deltaX = e.clientX - mouseState.current.startX;
    mouseState.current.currentDeltaX = deltaX;

    if (Math.abs(deltaX) > 6) {
      setIsDragging(true);
      let offset = deltaX;
      if ((activeGroup === 0 && deltaX > 0) || (activeGroup === totalGroups - 1 && deltaX < 0)) {
        offset = deltaX * 0.25;
      }
      setDragOffset(offset);
    }
  };

  const handleMouseUp = () => {
    if (!mouseState.current.isDown) return;
    const wasDragging = isDragging;
    const deltaX = mouseState.current.currentDeltaX;
    const deltaTime = Date.now() - mouseState.current.startTime;

    mouseState.current.isDown = false;
    setIsDragging(false);

    if (!wasDragging) {
      setDragOffset(0);
      return;
    }

    const velocity = Math.abs(deltaX) / Math.max(1, deltaTime);
    const threshold = 55;

    if (velocity > 0.25 || Math.abs(deltaX) > threshold) {
      if (deltaX < 0) {
        stepGroup(1);
      } else if (deltaX > 0) {
        stepGroup(-1);
      } else {
        setDragOffset(0);
      }
    } else {
      setDragOffset(0);
    }
  };

  const handleMouseLeave = () => {
    if (mouseState.current.isDown) {
      handleMouseUp();
    }
  };

  // Soporte para gestos de trackpad
  const accumulatedWheelRef = useRef<number>(0);
  const wheelTimerRef = useRef<number | null>(null);

  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 8) {
      accumulatedWheelRef.current += e.deltaX;
      if (wheelTimerRef.current) window.clearTimeout(wheelTimerRef.current);

      if (Math.abs(accumulatedWheelRef.current) > 40) {
        if (accumulatedWheelRef.current > 0) {
          stepGroup(1);
        } else if (accumulatedWheelRef.current < 0) {
          stepGroup(-1);
        }
        accumulatedWheelRef.current = 0;
      } else {
        wheelTimerRef.current = window.setTimeout(() => {
          accumulatedWheelRef.current = 0;
        }, 180);
      }
    }
  };

  return (
    <section
      id="habilidades"
      className="pt-1 sm:pt-2 pb-10 sm:pb-14 border-b border-neutral-200/60 dark:border-neutral-800/60"
    >
      <div className="w-full">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 flex items-center gap-2.5">
              <span>{t.title}</span>
            </h2>

            {/* Código doodle a la derecha del título */}
            <div className="hidden sm:flex items-center gap-2 rotate-[-1.5deg] select-none pointer-events-none text-neutral-700 dark:text-neutral-300">
              <div className="font-crayon text-xs sm:text-sm text-right leading-tight">
                <span className="text-amber-700 dark:text-amber-400 font-bold">const</span> [skills] = <span className="text-sky-700 dark:text-sky-400 font-bold">useStack</span>();
              </div>
              <svg className="w-10 h-4 text-amber-600/60 dark:text-amber-400/60" viewBox="0 0 48 20" fill="none">
                <path d="M 4 10 Q 24 3, 44 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Flechas de navegación para cambiar de grupo */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              disabled={activeGroup === 0}
              className="w-9 h-9 doodle-btn bg-white dark:bg-neutral-800 border-2 border-neutral-400 dark:border-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-neutral-800 dark:text-neutral-200 transition-opacity cursor-pointer shadow-xs hover:border-amber-500 dark:hover:border-amber-400"
              aria-label={t.prev}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={activeGroup >= totalGroups - 1}
              className="w-9 h-9 doodle-btn bg-white dark:bg-neutral-800 border-2 border-neutral-400 dark:border-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-neutral-800 dark:text-neutral-200 transition-opacity cursor-pointer shadow-xs hover:border-amber-500 dark:hover:border-amber-400"
              aria-label={t.next}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Contenedor del carrusel con animación de grupo */}
        <div
          ref={containerRef}
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          className={`relative overflow-hidden w-full pt-1 pb-3 select-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{ touchAction: 'pan-y' }}
        >
          {/* Serpiente animada */}
          <PixelSnake containerRef={containerRef} active={true} />

          <div
            className="flex w-full will-change-transform"
            style={{
              transform: `translateX(calc(-${activeGroup * 100}% + ${dragOffset}px))`,
              transition: isDragging ? 'none' : 'transform 360ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            {skillGroups.map((group, groupIdx) => (
              <div
                key={groupIdx}
                className="w-full shrink-0 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch px-1 sm:px-2"
              >
                {group.map((category) => {
                  const catInfo = t.categories[category.id as keyof typeof t.categories];
                  const categoryTitle = catInfo?.title || category.title;
                  const categoryDesc = catInfo?.desc || category.description;

                  return (
                    <div
                      key={category.id}
                      className="p-4 sm:p-5 doodle-card doodle-shadow bg-white dark:bg-neutral-900 border-2 border-neutral-300 dark:border-neutral-700 hover:border-amber-500 dark:hover:border-amber-400 transition-colors duration-150 flex flex-col justify-between group h-full min-h-[295px] sm:min-h-[305px]"
                    >
                      <div className="flex flex-col flex-1">
                        <div className="flex items-center justify-between mb-2.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-extrabold px-2 py-0.5 doodle-badge border-2 border-neutral-400 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100">
                              {category.number}
                            </span>
                            <h3 className="text-base sm:text-lg font-bold text-neutral-950 dark:text-neutral-50 tracking-tight min-h-[1.75rem] flex items-center">
                              {categoryTitle}
                            </h3>
                          </div>

                          <div className="w-8 h-8 doodle-box bg-amber-500/15 dark:bg-amber-400/15 text-amber-800 dark:text-amber-300 flex items-center justify-center shrink-0 border-2 border-amber-500/30 dark:border-amber-400/30 group-hover:scale-105 transition-transform duration-150">
                            {getIcon(category.iconName)}
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 leading-relaxed mb-2.5 font-medium min-h-[4rem] sm:min-h-[3.75rem] flex items-center">
                          {categoryDesc}
                        </p>
                      </div>

                      <div className="pt-2 border-t-2 border-dashed border-neutral-300 dark:border-neutral-700 mt-1">
                        <div className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200 mb-1.5 flex items-center justify-between">
                          <span>{t.techHeading}</span>
                          <span className="text-[10px] sm:text-xs font-bold lowercase text-neutral-700 dark:text-neutral-300">
                            {category.technologies.length} {t.tagsLabel}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {category.technologies.map((tech) => (
                            <span
                              key={tech.name}
                              className="inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-0.5 doodle-badge text-xs font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700 hover:border-amber-500 dark:hover:border-amber-400 hover:text-amber-800 dark:hover:text-amber-300 transition-colors"
                            >
                              {tech.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Paginación interactiva por grupos */}
        {totalGroups > 1 && (
          <div className="flex items-center justify-center gap-2 mt-4 sm:mt-5">
            {Array.from({ length: totalGroups }).map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => handleDotClick(dotIdx)}
                className={`h-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                  activeGroup === dotIdx
                    ? 'w-7 bg-amber-500 dark:bg-amber-400'
                    : 'w-2.5 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-600'
                }`}
                aria-label={`${t.goToGroup} ${dotIdx + 1} ${language === 'es' ? 'de' : 'of'} ${totalGroups}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export { Skills as SkillsSection };
