import React from 'react';
import { User } from 'lucide-react';
import { DinosaurDoodle } from '../doodles/dino-doodle';
import {
  DoodleCat,
  DoodlePaw,
  DoodleGamepad,
  DoodleSwords,
  DoodleBone,
  DoodleTelescope,
  DoodleMoon,
} from '../doodles/icons';
import { PixelMonkey } from '../pixel/pixel-monkey';
import { useLanguage } from '../../context/language';
import { TRANSLATIONS } from '../../data/translations';

export interface AboutProps {
  onOpenPrehistoric: () => void;
  onToggleCat: () => void;
  onOpenStrategyGames: () => void;
  onOpenAstronomy: () => void;
  isCatActive?: boolean;
  showInterests?: boolean;
}

export const About: React.FC<AboutProps> = ({
  onOpenPrehistoric,
  onToggleCat,
  onOpenStrategyGames,
  onOpenAstronomy,
  isCatActive = false,
  showInterests = true,
}) => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].about;

  return (
    <section
      id="sobre-mi"
      className="p-6 sm:p-8 md:p-10 doodle-card doodle-shadow bg-white dark:bg-neutral-900 border-2 border-neutral-400 dark:border-neutral-700"
    >
      {/* Cabecera de la sección */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-neutral-200 dark:border-neutral-800 gap-3">
        <div className="flex items-center gap-3">
          <span className="p-2 doodle-box bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/40">
            <User className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold font-doodle text-neutral-950 dark:text-neutral-50">
              {t.title}
            </h3>
          </div>
        </div>

        {/* Código doodle gato */}
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

      {/* Biografía */}
      <div className="flex items-stretch justify-between gap-6 sm:gap-8 mb-10">
        <div className="space-y-4 text-base sm:text-lg md:text-xl text-neutral-800 dark:text-neutral-200 leading-relaxed font-medium flex-1">
          <p>{t.p1}</p>
          <p>{t.p2}</p>
          <p>{t.p3}</p>
        </div>

        {/* Mono subiendo y bajando */}
        <div className="hidden lg:flex w-28 shrink-0 self-stretch relative items-center justify-center">
          <PixelMonkey />
        </div>
      </div>

      {/* Intereses y cosas que me gustan */}
      {showInterests && (
        <div className="pt-6 border-t-2 border-dashed border-neutral-200 dark:border-neutral-800 animate-doodle-unlock">
          <div className="flex items-center gap-2 mb-6">
            <h4 className="text-xl sm:text-2xl font-bold font-doodle text-neutral-900 dark:text-neutral-100">
              {t.interestsTitle}
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {/* 1. Animales Prehistóricos */}
            <div className="p-4 sm:p-5 doodle-card doodle-shadow-sm bg-amber-50/50 dark:bg-neutral-800/80 border-2 border-amber-400/80 dark:border-amber-700/80 flex flex-col justify-between hover:border-amber-500 transition-colors min-h-[195px] sm:min-h-[205px]">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-8 h-8 doodle-box bg-amber-500/20 text-amber-800 dark:text-amber-300 flex items-center justify-center border border-amber-500/40">
                    <DoodleBone className="w-4 h-4" />
                  </div>
                  <button
                    onClick={onOpenPrehistoric}
                    className="px-2.5 py-1 text-xs font-bold doodle-btn doodle-shadow-sm bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white transition-all cursor-pointer flex items-center gap-1 border-2 border-amber-800 active:scale-95 min-h-[32px]"
                    title={t.prehistoricCard.btnTitle}
                    id="about-open-prehistoric-btn"
                  >
                    <DinosaurDoodle id="tyrannosaurus" className="w-3.5 h-3.5 shrink-0" />
                    <span>{t.prehistoricCard.btn}</span>
                  </button>
                </div>
                <h5 className="text-base font-bold text-neutral-950 dark:text-neutral-50 mb-1 font-doodle">
                  {t.prehistoricCard.title}
                </h5>
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium min-h-[3rem] sm:min-h-[3.25rem]">
                  {t.prehistoricCard.desc}
                </p>
              </div>
            </div>

            {/* 2. Astronomía */}
            <div className="p-4 sm:p-5 doodle-card doodle-shadow-sm bg-blue-50/50 dark:bg-neutral-800/80 border-2 border-blue-400/80 dark:border-blue-700/80 flex flex-col justify-between hover:border-blue-500 transition-colors min-h-[195px] sm:min-h-[205px]">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-8 h-8 doodle-box bg-blue-500/20 text-blue-800 dark:text-blue-300 flex items-center justify-center border border-blue-500/40">
                    <DoodleTelescope className="w-4 h-4" />
                  </div>
                  <button
                    onClick={onOpenAstronomy}
                    className="px-2.5 py-1 text-xs font-bold doodle-btn doodle-shadow-sm bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white transition-all cursor-pointer flex items-center gap-1 border-2 border-blue-800 active:scale-95 min-h-[32px]"
                    title={t.astronomyCard.btnTitle}
                    id="about-open-observatory-btn"
                  >
                    <DoodleMoon className="w-3.5 h-3.5 shrink-0" />
                    <span>{t.astronomyCard.btn}</span>
                  </button>
                </div>
                <h5 className="text-base font-bold text-neutral-950 dark:text-neutral-50 mb-1 font-doodle">
                  {t.astronomyCard.title}
                </h5>
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium min-h-[3rem] sm:min-h-[3.25rem]">
                  {t.astronomyCard.desc}
                </p>
              </div>
            </div>

            {/* 3. Gatos */}
            <div className="p-4 sm:p-5 doodle-card doodle-shadow-sm bg-emerald-50/50 dark:bg-neutral-800/80 border-2 border-emerald-400/80 dark:border-emerald-700/80 flex flex-col justify-between hover:border-emerald-500 transition-colors min-h-[195px] sm:min-h-[205px]">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-8 h-8 doodle-box bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 flex items-center justify-center border border-emerald-500/40">
                    <DoodleCat className="w-4 h-4" />
                  </div>
                  <button
                    onClick={onToggleCat}
                    className={`px-2.5 py-1 text-xs font-bold doodle-btn doodle-shadow-sm transition-all cursor-pointer flex items-center gap-1 border-2 active:scale-95 min-h-[32px] ${
                      isCatActive
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-800'
                        : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-950 dark:text-emerald-200 border-emerald-400'
                    }`}
                    title={t.catCard.btnTitle}
                    id="about-toggle-cat-btn"
                  >
                    <DoodlePaw className="w-3.5 h-3.5 shrink-0" />
                    <span>{isCatActive ? t.catCard.btnHide : t.catCard.btnShow}</span>
                  </button>
                </div>
                <h5 className="text-base font-bold text-neutral-950 dark:text-neutral-50 mb-1 font-doodle">
                  {t.catCard.title}
                </h5>
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium min-h-[3rem] sm:min-h-[3.25rem]">
                  {t.catCard.desc}
                </p>
              </div>
            </div>

            {/* 4. Juegos de Estrategia */}
            <div className="p-4 sm:p-5 doodle-card doodle-shadow-sm bg-rose-50/50 dark:bg-neutral-800/80 border-2 border-rose-400/80 dark:border-rose-700/80 flex flex-col justify-between hover:border-rose-500 transition-colors min-h-[195px] sm:min-h-[205px]">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-8 h-8 doodle-box bg-rose-500/20 text-rose-800 dark:text-rose-300 flex items-center justify-center border border-rose-500/40">
                    <DoodleGamepad className="w-4 h-4" />
                  </div>
                  <button
                    onClick={onOpenStrategyGames}
                    className="px-2.5 py-1 text-xs font-bold doodle-btn doodle-shadow-sm bg-rose-700 hover:bg-rose-800 active:bg-rose-900 text-white transition-all cursor-pointer flex items-center gap-1 border-2 border-rose-900 active:scale-95 min-h-[32px]"
                    title={t.strategyCard.btnTitle}
                    id="about-open-strategy-btn"
                  >
                    <DoodleSwords className="w-3.5 h-3.5 shrink-0" />
                    <span>{t.strategyCard.btn}</span>
                  </button>
                </div>
                <h5 className="text-base font-bold text-neutral-950 dark:text-neutral-50 mb-1 font-doodle">
                  {t.strategyCard.title}
                </h5>
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium min-h-[3rem] sm:min-h-[3.25rem]">
                  {t.strategyCard.desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export { About as AboutSection };
export type { AboutProps as AboutSectionProps };
