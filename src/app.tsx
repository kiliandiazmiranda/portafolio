// Componente principal que coordina estados globales, precarga y modales

import { lazy, Suspense, useEffect, useState } from 'react';
import { ThemeProvider } from './context/theme';
import { LanguageProvider } from './context/language';
import { Navbar } from './components/layout/navbar';
import { Footer } from './components/layout/footer';
import { Hero } from './components/sections/hero';
import { Hub } from './components/sections/hub';
import { Loader } from './components/ui/loader';
import { CatCompanion } from './components/modals/cat-companion';

const PrehistoricModal = lazy(() => import('./components/modals/prehistoric-modal').then((module) => ({
  default: module.PrehistoricModal,
})));
const StrategyModal = lazy(() => import('./components/modals/strategy-modal').then((module) => ({
  default: module.StrategyModal,
})));
const AstroModal = lazy(() => import('./components/modals/astro-modal').then((module) => ({
  default: module.AstroModal,
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

  // Carga o recarga desde el principio.
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Prevención de saltos automáticos del scroll en el navegador
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });

    const handleBeforeUnload = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Bloqueo  del scroll mientras el preloader o un modal está activo.
  useEffect(() => {
    const shouldLock = !isReady || prehistoricOpen || strategyOpen || astronomyOpen;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = shouldLock ? 'hidden' : '';

    if (!isReady) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isReady, prehistoricOpen, strategyOpen, astronomyOpen]);

  // Posiciona la pagina en la parte superior, al finalizar el preloader.
  useEffect(() => {
    if (isReady) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      const frameId = requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      });
      return () => cancelAnimationFrame(frameId);
    }
  }, [isReady]);

  return (
    <>
      <Loader isLoading={!isReady} />

      <div className="relative min-h-screen bg-[#faf9f6] text-neutral-900 dark:bg-[#0e1217] dark:text-neutral-100 font-doodle transition-opacity duration-700 ease-out antialiased selection:bg-emerald-500/20 selection:text-emerald-800 dark:selection:text-emerald-200">
        <Navbar />

        <main id="main-content" className="relative z-10">
          <Hero isReady={isReady} />
          <Hub
            onOpenPrehistoric={() => setPrehistoricOpen(true)}
            onToggleCat={() => setIsCatActive((active) => !active)}
            onOpenStrategyGames={() => setStrategyOpen(true)}
            onOpenAstronomy={() => setAstronomyOpen(true)}
            isCatActive={isCatActive}
          />
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
            <StrategyModal
              isOpen
              onClose={() => setStrategyOpen(false)}
            />
          )}
          {astronomyOpen && (
            <AstroModal
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
      <LanguageProvider>
        <PortfolioContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}
