// Panel interactivo con modulos desplegables

import React, { useState, useRef, useEffect } from 'react';
import {
  FolderGit2,
  User,
  Wrench,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { About } from './about';
import { Github } from './github';
import { Skills } from './skills';
import { useLanguage } from '../../context/language';
import { TRANSLATIONS } from '../../data/translations';

interface HubProps {
  onOpenPrehistoric: () => void;
  onToggleCat: () => void;
  onOpenStrategyGames: () => void;
  onOpenAstronomy: () => void;
  isCatActive?: boolean;
}

type ModuleId = 'sobre-mi' | 'repos' | 'skills';

export const Hub: React.FC<HubProps> = ({
  onOpenPrehistoric,
  onToggleCat,
  onOpenStrategyGames,
  onOpenAstronomy,
  isCatActive = false,
}) => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].hub;

  // Estado de módulos desbloqueados
  const [unlocked, setUnlocked] = useState<Record<ModuleId, boolean>>({
    'sobre-mi': false,
    'repos': false,
    'skills': false,
  });

  // Animación para los 4 intereses tras activar "Sobre Mí"
  const [showInterests, setShowInterests] = useState<boolean>(false);

  // Referencias para las secciones
  const sobreMiRef = useRef<HTMLDivElement | null>(null);
  const reposRef = useRef<HTMLDivElement | null>(null);
  const skillsRef = useRef<HTMLDivElement | null>(null);

  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const getSectionRef = (id: ModuleId) => {
    switch (id) {
      case 'sobre-mi':
        return sobreMiRef;
      case 'skills':
        return skillsRef;
      case 'repos':
        return reposRef;
    }
  };

  const handleToggleModule = (id: ModuleId) => {
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    // Si ya está desbloqueado, lo colapsamos
    if (unlocked[id]) {
      setUnlocked({
        'sobre-mi': false,
        'repos': false,
        'skills': false,
      });
      if (id === 'sobre-mi') setShowInterests(false);
      return;
    }

    // Al abrir un módulo, cerramos cualquier otro que esté abierto y abrimos el seleccionado
    setUnlocked({
      'sobre-mi': id === 'sobre-mi',
      'repos': id === 'repos',
      'skills': id === 'skills',
    });

    if (id === 'sobre-mi') {
      setTimeout(() => {
        setShowInterests(true);
      }, 250);
    } else {
      setShowInterests(false);
    }

    // Desplazamiento automático para que en pantalla SOLO se muestre el contenido del módulo seleccionado
    scrollTimeoutRef.current = setTimeout(() => {
      const targetRef = getSectionRef(id);
      const el = targetRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
        // Posicionamos el desplazamiento un poco más arriba (-12px) para que el inicio
        const targetY = Math.max(0, Math.round(rect.top + currentScrollY - 12));
        window.scrollTo({
          top: targetY,
          behavior: 'smooth',
        });
      }
    }, 70);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-4 sm:pb-6">
      {/* Encabezado de la cuadrícula interactiva */}
      <div className="mb-8 sm:mb-10 text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50 font-doodle">
          {t.title}
        </h2>
      </div>

      {/* CUADRÍCULA DE CUADROS ANIMADOS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Cuadro 1: Sobre Mí */}
        <button
          type="button"
          onClick={() => handleToggleModule('sobre-mi')}
          className={`text-left p-5 sm:p-6 doodle-card doodle-shadow border-2 transition-all duration-300 cursor-pointer relative group flex flex-col justify-between min-h-[220px] ${
            unlocked['sobre-mi']
              ? 'bg-amber-50/80 dark:bg-amber-950/30 border-amber-500 dark:border-amber-400 rotate-[0.5deg]'
              : 'bg-white dark:bg-neutral-900 border-neutral-400 dark:border-neutral-700 hover:border-amber-500 dark:hover:border-amber-400 hover:-translate-y-1 hover:rotate-[-0.5deg]'
          }`}
          id="hub-card-sobre-mi"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="w-10 h-10 doodle-box bg-amber-500/15 text-amber-700 dark:text-amber-300 flex items-center justify-center border-2 border-amber-500/40 shrink-0">
                <User className="w-5 h-5" />
              </div>
            </div>

            <h3 className="text-xl font-bold text-neutral-950 dark:text-neutral-50 mb-1.5 font-doodle group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              {t.aboutCard.title}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed line-clamp-2 min-h-[2.5rem]">
              {t.aboutCard.desc}
            </p>
          </div>

          <div className="pt-4 border-t border-dashed border-neutral-300 dark:border-neutral-800 flex items-center justify-between text-xs font-bold text-amber-800 dark:text-amber-300">
            <span>{unlocked['sobre-mi'] ? t.aboutCard.close : t.aboutCard.open}</span>
            {unlocked['sobre-mi'] ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            )}
          </div>
        </button>

        {/* Cuadro 2: Habilidades Técnicas */}
        <button
          type="button"
          onClick={() => handleToggleModule('skills')}
          className={`text-left p-5 sm:p-6 doodle-card doodle-shadow border-2 transition-all duration-300 cursor-pointer relative group flex flex-col justify-between min-h-[220px] ${
            unlocked['skills']
              ? 'bg-rose-50/80 dark:bg-rose-950/30 border-rose-500 dark:border-rose-400 rotate-[-0.5deg]'
              : 'bg-white dark:bg-neutral-900 border-neutral-400 dark:border-neutral-700 hover:border-rose-500 dark:hover:border-rose-400 hover:-translate-y-1 hover:rotate-[0.5deg]'
          }`}
          id="hub-card-skills"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="w-10 h-10 doodle-box bg-rose-500/15 text-rose-700 dark:text-rose-300 flex items-center justify-center border-2 border-rose-500/40 shrink-0">
                <Wrench className="w-5 h-5" />
              </div>
            </div>

            <h3 className="text-xl font-bold text-neutral-950 dark:text-neutral-50 mb-1.5 font-doodle group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
              {t.skillsCard.title}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed line-clamp-2 min-h-[2.5rem]">
              {t.skillsCard.desc}
            </p>
          </div>

          <div className="pt-4 border-t border-dashed border-neutral-300 dark:border-neutral-800 flex items-center justify-between text-xs font-bold text-rose-800 dark:text-rose-300">
            <span>{unlocked['skills'] ? t.skillsCard.close : t.skillsCard.open}</span>
            {unlocked['skills'] ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            )}
          </div>
        </button>

        {/* Cuadro 3: Repositorios */}
        <button
          type="button"
          onClick={() => handleToggleModule('repos')}
          className={`text-left p-5 sm:p-6 doodle-card doodle-shadow border-2 transition-all duration-300 cursor-pointer relative group flex flex-col justify-between min-h-[220px] ${
            unlocked['repos']
              ? 'bg-sky-50/80 dark:bg-sky-950/30 border-sky-500 dark:border-sky-400 rotate-[0.5deg]'
              : 'bg-white dark:bg-neutral-900 border-neutral-400 dark:border-neutral-700 hover:border-sky-500 dark:hover:border-sky-400 hover:-translate-y-1 hover:rotate-[-0.5deg]'
          }`}
          id="hub-card-repos"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="w-10 h-10 doodle-box bg-sky-500/15 text-sky-700 dark:text-sky-300 flex items-center justify-center border-2 border-sky-500/40 shrink-0">
                <FolderGit2 className="w-5 h-5" />
              </div>
            </div>

            <h3 className="text-xl font-bold text-neutral-950 dark:text-neutral-50 mb-1.5 font-doodle group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
              {t.reposCard.title}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed line-clamp-2 min-h-[2.5rem]">
              {t.reposCard.desc}
            </p>
          </div>

          <div className="pt-4 border-t border-dashed border-neutral-300 dark:border-neutral-800 flex items-center justify-between text-xs font-bold text-sky-800 dark:text-sky-300">
            <span>{unlocked['repos'] ? t.reposCard.close : t.reposCard.open}</span>
            {unlocked['repos'] ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            )}
          </div>
        </button>
      </div>

      {/* CONTENIDO DESBLOQUEADO: SECCIÓN SOBRE MÍ */}
      {unlocked['sobre-mi'] && (
        <div
          ref={sobreMiRef}
          className="mb-6 sm:mb-8 animate-doodle-unlock"
          id="unlocked-section-sobre-mi"
        >
          <About
            onOpenPrehistoric={onOpenPrehistoric}
            onToggleCat={onToggleCat}
            onOpenStrategyGames={onOpenStrategyGames}
            onOpenAstronomy={onOpenAstronomy}
            isCatActive={isCatActive}
            showInterests={showInterests}
          />
        </div>
      )}

      {/* CONTENIDO DESBLOQUEADO: HABILIDADES */}
      {unlocked['skills'] && (
        <div ref={skillsRef} className="mb-6 sm:mb-8 animate-doodle-unlock" id="unlocked-section-skills">
          <Skills />
        </div>
      )}

      {/* CONTENIDO DESBLOQUEADO: REPOSITORIOS */}
      {unlocked['repos'] && (
        <div ref={reposRef} className="mb-6 sm:mb-8 animate-doodle-unlock" id="unlocked-section-repos">
          <Github />
        </div>
      )}
    </div>
  );
};

export { Hub as InteractiveHub };
