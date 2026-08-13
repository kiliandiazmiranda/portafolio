/**
 * Composición principal del portafolio y coordinación de sus estados globales.
 */

import { lazy, Suspense, useEffect, useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { GithubReposSection } from './components/GithubReposSection';
import { OrcidSection } from './components/OrcidSection';
import { Footer } from './components/Footer';
import { InitialPageLoader } from './components/InitialPageLoader';
import { CatCompanion } from './components/EasterEggs/CatCompanion';

const PrehistoricModal = lazy(() => import('./components/EasterEggs/PrehistoricModal').then((module) => ({
  default: module.PrehistoricModal,
})));
const StrategyGamesModal = lazy(() => import('./components/EasterEggs/StrategyGamesModal').then((module) => ({
  default: module.StrategyGamesModal,
})));
const AstronomyModal = lazy(() => import('./components/EasterEggs/AstronomyModal').then((module) => ({
  default: module.AstronomyModal,
})));

export function PortfolioContent() {
  const [isReady, setIsReady] = useState(false);
  const [prehistoricOpen, setPrehistoricOpen] = useState(false);
  const [isCatActive, setIsCatActive] = useState(false);
  const [strategyOpen, setStrategyOpen] = useState(false);
  const [astronomyOpen, setAstronomyOpen] = useState(false);

  // Mantiene el preloader hasta que las fuentes locales estén disponibles.
  useEffect(() => {
    let cancelled = false;
    const startTime = Date.now();
    const minimumDuration = 1300;

    const loadFonts = async () => {
      try {
        if ('fonts' in document) {
          await document.fonts.ready;
          await Promise.allSettled([
            document.fonts.load('16px "Architects Daughter"'),
            document.fonts.load('16px "Gochi Hand"'),
            document.fonts.load('16px "Gloria Hallelujah"'),
            document.fonts.load('16px "Caveat"'),
            document.fonts.load('16px "Kalam"'),
            document.fonts.load('16px "Patrick Hand"'),
            document.fonts.load('16px "Cabin Sketch"'),
            document.fonts.load('16px "JetBrains Mono"'),
          ]);
        }
      } catch {
        // El preloader continúa aunque alguna fuente no pueda verificarse.
      }

      const remaining = Math.max(80, minimumDuration - (Date.now() - startTime));
      window.setTimeout(() => {
        if (!cancelled) setIsReady(true);
      }, remaining);
    };

    void loadFonts();

    return () => {
      cancelled = true;
    };
  }, []);

  // Bloquea el scroll mientras el preloader o un modal está activo.
  useEffect(() => {
    const shouldLock = !isReady || prehistoricOpen || strategyOpen || astronomyOpen;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = shouldLock ? 'hidden' : '';

    if (!isReady) window.scrollTo(0, 0);

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isReady, prehistoricOpen, strategyOpen, astronomyOpen]);

  return (
    <>
      <InitialPageLoader isLoading={!isReady} />

      <div className="relative min-h-screen bg-[#faf9f6] text-neutral-900 dark:bg-[#0e1217] dark:text-neutral-100 font-doodle transition-opacity duration-700 ease-out antialiased selection:bg-emerald-500/20 selection:text-emerald-800 dark:selection:text-emerald-200">
        <Navbar />

        <main id="main-content" className="relative z-10">
          <Hero isReady={isReady} />
          <AboutSection
            onOpenPrehistoric={() => setPrehistoricOpen(true)}
            onToggleCat={() => setIsCatActive((active) => !active)}
            onOpenStrategyGames={() => setStrategyOpen(true)}
            onOpenAstronomy={() => setAstronomyOpen(true)}
            isCatActive={isCatActive}
          />
          <SkillsSection />
          <GithubReposSection />
          <OrcidSection />
        </main>

        <Footer />

        {isCatActive && (
          <CatCompanion
            isVisible
            onClose={() => setIsCatActive(false)}
          />
        )}

        <Suspense fallback={null}>
          {prehistoricOpen && (
            <PrehistoricModal
              isOpen
              onClose={() => setPrehistoricOpen(false)}
            />
          )}
          {strategyOpen && (
            <StrategyGamesModal
              isOpen
              onClose={() => setStrategyOpen(false)}
            />
          )}
          {astronomyOpen && (
            <AstronomyModal
              isOpen
              onClose={() => setAstronomyOpen(false)}
            />
          )}
        </Suspense>
      </div>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  );
}
