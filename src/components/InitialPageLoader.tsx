/**
 * Preloader inspirado en Chrome Dino con una transición breve de salida.
 */

import React, { useState, useEffect } from 'react';

interface InitialPageLoaderProps {
  isLoading: boolean;
}

export const InitialPageLoader: React.FC<InitialPageLoaderProps> = ({ isLoading }) => {
  const [shouldRender, setShouldRender] = useState(isLoading);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setIsFading(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 550);
      return () => clearTimeout(timer);
    } else {
      setShouldRender(true);
      setIsFading(false);
    }
  }, [isLoading]);

  // Bloqueo de scroll y eventos táctiles durante la carga
  useEffect(() => {
    if (shouldRender) {
      const prevBodyOverflow = document.body.style.overflow;

      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      window.scrollTo(0, 0);

      const preventDefaultScroll = (e: Event) => e.preventDefault();
      const preventScrollKeys = (e: KeyboardEvent) => {
        const keys = ['Space', 'PageUp', 'PageDown', 'End', 'Home', 'ArrowUp', 'ArrowDown'];
        if (keys.includes(e.code) || keys.includes(e.key)) e.preventDefault();
      };

      window.addEventListener('wheel', preventDefaultScroll, { passive: false });
      window.addEventListener('touchmove', preventDefaultScroll, { passive: false });
      window.addEventListener('keydown', preventScrollKeys, { passive: false });

      return () => {
        document.body.style.overflow = prevBodyOverflow;
        document.body.style.touchAction = '';

        window.removeEventListener('wheel', preventDefaultScroll);
        window.removeEventListener('touchmove', preventDefaultScroll);
        window.removeEventListener('keydown', preventScrollKeys);
      };
    }
  }, [shouldRender]);

  if (!shouldRender) return null;

  return (
    <div
      id="initial-page-loader"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#faf9f6] text-neutral-900 dark:bg-[#0e1217] dark:text-neutral-100 transition-opacity duration-500 ease-out select-none overflow-hidden touch-none will-change-[opacity] ${
        isFading ? 'opacity-0 pointer-events-none loader-is-fading' : 'opacity-100'
      }`}
      role="status"
      aria-live="polite"
      aria-label="Cargando"
      onWheel={(e) => e.preventDefault()}
      onTouchMove={(e) => e.preventDefault()}
    >
      <style>{`
        /* Salto y cinemática del T-Rex */
        @keyframes trexJump {
          0%, 22% { transform: translateY(0) rotate(0deg); }
          26% { transform: translateY(2px) rotate(-2deg); }
          36% { transform: translateY(-32px) rotate(-6deg); }
          45% { transform: translateY(-48px) rotate(0deg); }
          55% { transform: translateY(-28px) rotate(4deg); }
          62% { transform: translateY(2px) rotate(1deg); }
          66%, 100% { transform: translateY(0) rotate(0deg); }
        }

        @keyframes trexBodyBob {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-2px) rotate(-1deg); }
          50% { transform: translateY(0.5px) rotate(0.5deg); }
          75% { transform: translateY(-1px) rotate(1deg); }
        }

        @keyframes trexLegBack {
          0%, 100% { transform: rotate(26deg); }
          50% { transform: rotate(-24deg); }
        }

        @keyframes trexLegFront {
          0%, 100% { transform: rotate(-24deg); }
          50% { transform: rotate(26deg); }
        }

        @keyframes trexArms {
          0%, 100% { transform: rotate(-8deg); }
          50% { transform: rotate(14deg); }
        }

        @keyframes trexTail {
          0%, 100% { transform: rotate(-4deg); }
          50% { transform: rotate(4deg); }
        }

        @keyframes trexJaw {
          0%, 26%, 62%, 100% { transform: rotate(0deg); }
          38%, 52% { transform: rotate(14deg); }
        }

        /* Obstáculo cactus */
        @keyframes cactusScroll {
          0% { transform: translate3d(250px, 0, 0); opacity: 0; }
          8% { opacity: 1; }
          45% { transform: translate3d(-40px, 0, 0); }
          88% { opacity: 1; }
          100% { transform: translate3d(-240px, 0, 0); opacity: 0; }
        }

        /* Nubes de fondo */
        @keyframes cloudFloat1 {
          0% { transform: translate3d(240px, 0, 0); opacity: 0; }
          12%, 88% { opacity: 0.65; }
          100% { transform: translate3d(-160px, 0, 0); opacity: 0; }
        }

        @keyframes cloudFloat2 {
          0% { transform: translate3d(260px, 0, 0); opacity: 0; }
          14%, 86% { opacity: 0.5; }
          100% { transform: translate3d(-180px, 0, 0); opacity: 0; }
        }

        @keyframes cloudFloat3 {
          0% { transform: translate3d(220px, 0, 0); opacity: 0; }
          15%, 85% { opacity: 0.4; }
          100% { transform: translate3d(-140px, 0, 0); opacity: 0; }
        }

        /* Pterodáctilo */
        @keyframes pteroFly {
          0% { transform: translate3d(240px, 0, 0); opacity: 0; }
          12%, 88% { opacity: 0.85; }
          30% { transform: translate3d(120px, -5px, 0); }
          50% { transform: translate3d(0px, 4px, 0); }
          70% { transform: translate3d(-120px, -4px, 0); }
          100% { transform: translate3d(-240px, 0, 0); opacity: 0; }
        }

        @keyframes pteroWingUp {
          0%, 100% { transform: rotate(-26deg); }
          50% { transform: rotate(22deg); }
        }

        @keyframes pteroWingDown {
          0%, 100% { transform: rotate(22deg); }
          50% { transform: rotate(-26deg); }
        }

        /* Suelo continuo */
        @keyframes groundScroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-240px, 0, 0); }
        }

        /* Polvo al correr */
        @keyframes dustPuff {
          0% { transform: scale(0.3) translate3d(0, 0, 0); opacity: 0.8; }
          50% { transform: scale(1.1) translate3d(-10px, -3px, 0); opacity: 0.45; }
          100% { transform: scale(1.4) translate3d(-18px, -5px, 0); opacity: 0; }
        }

        /* Agrupa la transición final para reducir trabajo durante la salida. */
        @keyframes matrixClusterWave {
          0% {
            opacity: 0;
            transform: translate3d(0, 4px, 0) scale(0.85);
          }
          25% {
            opacity: 1;
            transform: translate3d(0, -6px, 0) scale(1.02);
          }
          70% {
            opacity: 0.85;
            transform: translate3d(0, -18px, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate3d(0, -32px, 0) scale(0.9);
          }
        }

        @keyframes sceneDissolve {
          0% { opacity: 1; transform: translate3d(0, 0, 0); }
          50% { opacity: 0.6; transform: translate3d(0, -2px, 0); }
          100% { opacity: 0; transform: translate3d(0, -4px, 0); }
        }

        /* Detiene las animaciones continuas durante la transición final. */
        .loader-is-fading .anim-loop-stop {
          animation-play-state: paused !important;
        }

        .anim-dissolving-scene {
          animation: sceneDissolve 0.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
          will-change: transform, opacity;
        }

        .matrix-wave-1 {
          animation: matrixClusterWave 0.48s cubic-bezier(0.2, 0.8, 0.2, 1) 0s forwards;
          will-change: transform, opacity;
        }

        .matrix-wave-2 {
          animation: matrixClusterWave 0.48s cubic-bezier(0.2, 0.8, 0.2, 1) 0.06s forwards;
          will-change: transform, opacity;
        }

        /* Asignación de animaciones */
        .anim-trex-jump {
          animation: trexJump 1s cubic-bezier(0.4, 0.05, 0.6, 0.95) infinite;
          transform-origin: 110px 135px;
          will-change: transform;
        }
        .anim-trex-body {
          animation: trexBodyBob 0.22s ease-in-out infinite;
          transform-origin: 75px 85px;
          will-change: transform;
        }
        .anim-trex-leg-back {
          animation: trexLegBack 0.22s ease-in-out infinite;
          transform-origin: 64px 95px;
          will-change: transform;
        }
        .anim-trex-leg-front {
          animation: trexLegFront 0.22s ease-in-out infinite;
          transform-origin: 78px 95px;
          will-change: transform;
        }
        .anim-trex-arms {
          animation: trexArms 0.22s ease-in-out infinite;
          transform-origin: 98px 75px;
          will-change: transform;
        }
        .anim-trex-tail {
          animation: trexTail 0.22s ease-in-out infinite;
          transform-origin: 45px 80px;
          will-change: transform;
        }
        .anim-trex-jaw {
          animation: trexJaw 1s ease-in-out infinite;
          transform-origin: 105px 60px;
          will-change: transform;
        }
        .anim-cactus {
          animation: cactusScroll 1s linear infinite;
          will-change: transform, opacity;
        }
        .anim-cloud-1 {
          animation: cloudFloat1 5s linear infinite;
          will-change: transform, opacity;
        }
        .anim-cloud-2 {
          animation: cloudFloat2 7s linear infinite -3s;
          will-change: transform, opacity;
        }
        .anim-cloud-3 {
          animation: cloudFloat3 6s linear infinite -1.2s;
          will-change: transform, opacity;
        }
        .anim-ptero {
          animation: pteroFly 3s linear infinite;
          will-change: transform, opacity;
        }
        .anim-ptero-wing-up {
          animation: pteroWingUp 0.2s ease-in-out infinite;
          transform-origin: 12px 10px;
          will-change: transform;
        }
        .anim-ptero-wing-down {
          animation: pteroWingDown 0.2s ease-in-out infinite;
          transform-origin: 12px 14px;
          will-change: transform;
        }
        .anim-ground-seamless {
          animation: groundScroll 0.5s linear infinite;
          will-change: transform;
        }
        .anim-dust-puff {
          animation: dustPuff 0.22s ease-out infinite;
          transform-origin: 60px 135px;
          will-change: transform, opacity;
        }
      `}</style>

      {/* Contenedor central doodle */}
      <div
        className={`relative flex flex-col items-center justify-center p-4 sm:p-6 max-w-lg w-full mx-4 overflow-visible transition-all duration-500 ease-out transform ${
          isFading ? 'anim-dissolving-scene scale-95 -translate-y-2' : 'scale-100 translate-y-0 opacity-100'
        }`}
      >
        <div className="relative w-full max-w-[420px] aspect-[340/195] flex items-center justify-center overflow-visible">
          <svg
            viewBox="0 -35 340 195"
            className="w-full h-full text-neutral-800 dark:text-neutral-100 overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Patrón de suelo doodle repetible de 240px */}
              <g id="groundDoodleTile">
                <path
                  d="M 6 142 L 42 142 M 54 142 L 92 142 M 104 142 L 136 142 M 148 142 L 190 142 M 202 142 L 234 142"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                />
                <circle cx="24" cy="148" r="1.4" fill="currentColor" opacity="0.6" />
                <circle cx="76" cy="147" r="1.7" fill="currentColor" opacity="0.65" />
                <circle cx="118" cy="149" r="1.3" fill="currentColor" opacity="0.5" />
                <circle cx="166" cy="147" r="1.6" fill="currentColor" opacity="0.6" />
                <circle cx="216" cy="148" r="1.4" fill="currentColor" opacity="0.55" />
                <path d="M 48 142 L 45 137 M 49 142 L 52 136" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
                <path d="M 142 142 L 139 137 M 143 142 L 147 136" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
                <path d="M 196 142 L 193 138 M 198 142 L 201 137" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
                <path d="M 86 149 L 89 152 M 86 149 L 87 153 M 86 149 L 83 152" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.35" className="text-emerald-700 dark:text-emerald-400" />
                <path d="M 178 149 L 181 152 M 178 149 L 179 153 M 178 149 L 175 152" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.35" className="text-emerald-700 dark:text-emerald-400" />
              </g>

              {/* Máscara de bordes suaves */}
              <linearGradient id="groundEdgeFade" x1="0" y1="0" x2="340" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="white" stopOpacity="0" />
                <stop offset="6%" stopColor="white" stopOpacity="1" />
                <stop offset="94%" stopColor="white" stopOpacity="1" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <mask id="groundSmoothMask">
                <rect x="-60" y="130" width="460" height="40" fill="url(#groundEdgeFade)" />
              </mask>
            </defs>

            {/* 1. Nubes */}
            <g className="anim-cloud-1 anim-loop-stop text-neutral-400 dark:text-neutral-500">
              <path
                d="M 120 28 Q 128 20 138 22 Q 146 16 156 20 Q 166 22 168 30 Q 174 34 170 40 Q 162 46 122 46 Q 114 42 116 34 Q 116 28 120 28 Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="currentColor"
                fillOpacity="0.08"
              />
            </g>

            <g className="anim-cloud-2 anim-loop-stop text-neutral-400 dark:text-neutral-500">
              <path
                d="M 40 40 Q 48 34 56 36 Q 62 32 70 35 Q 78 38 78 44 Q 82 48 78 52 Q 72 56 42 56 Q 36 52 38 46 Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="currentColor"
                fillOpacity="0.06"
              />
            </g>

            <g className="anim-cloud-3 anim-loop-stop text-neutral-400 dark:text-neutral-500">
              <path
                d="M 210 46 Q 216 41 222 43 Q 228 40 234 43 Q 240 46 238 52 Q 232 56 212 56 Q 206 52 208 47 Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="currentColor"
                fillOpacity="0.05"
              />
            </g>

            {/* 2. Pterodáctilo */}
            <g className="anim-ptero anim-loop-stop" style={{ transformOrigin: '170px 38px' }}>
              <g transform="translate(150, 36)" className="text-neutral-700 dark:text-neutral-300">
                <path
                  d="M 10 12 L 0 8 L 8 6 L 16 8 L 24 10 L 18 14 L 12 13 Z"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="currentColor"
                  fillOpacity="0.2"
                />
                <circle cx="8" cy="8" r="1" fill="currentColor" />

                <g className="anim-ptero-wing-up anim-loop-stop">
                  <path
                    d="M 12 8 Q 14 -2 20 2 Q 22 8 22 10"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="currentColor"
                    fillOpacity="0.15"
                  />
                </g>

                <g className="anim-ptero-wing-down anim-loop-stop">
                  <path
                    d="M 12 12 Q 14 22 20 18 Q 22 14 22 12"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="currentColor"
                    fillOpacity="0.15"
                  />
                </g>
              </g>
            </g>

            {/* 3. Obstáculo Cactus */}
            <g className="anim-cactus anim-loop-stop" style={{ transformOrigin: '150px 140px' }}>
              <g className="text-emerald-700 dark:text-emerald-400">
                <path
                  d="M 148 108 L 148 140 M 154 108 L 154 140 M 148 108 Q 151 103 154 108"
                  stroke="currentColor"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="currentColor"
                  fillOpacity="0.2"
                />
                <path
                  d="M 148 124 Q 138 124 138 116 Q 138 112 142 112"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M 154 120 Q 164 120 164 112 Q 164 108 160 108"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M 149 114 L 153 114 M 149 128 L 153 128 M 149 135 L 153 135" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="151" cy="103" r="2" fill="currentColor" />
              </g>
            </g>

            {/* 4. Polvo */}
            <g className="anim-dust-puff anim-loop-stop text-neutral-400 dark:text-neutral-500">
              <path d="M 72 138 Q 62 133 58 140 Q 52 136 46 139" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <circle cx="56" cy="135" r="1.5" fill="currentColor" />
              <circle cx="48" cy="138" r="1.2" fill="currentColor" />
            </g>

            {/* 5. T-Rex Doodle */}
            <g className="anim-trex-jump anim-loop-stop">
              <g transform="translate(42, 16)">
                {/* Pata Trasera */}
                <g className="anim-trex-leg-back anim-loop-stop text-neutral-700 dark:text-neutral-300">
                  <path
                    d="M 60 95 Q 68 105 65 124 L 75 125 M 65 124 L 58 126"
                    stroke="currentColor"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M 75 125 L 80 123" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                </g>

                {/* Cola y cuerpo posterior */}
                <g className="anim-trex-tail anim-loop-stop text-neutral-900 dark:text-neutral-50">
                  <path
                    d="M 20 90 Q 40 85 55 75 Q 70 60 80 40 Q 95 25 125 25 Q 140 25 142 40 Q 140 55 125 60 L 105 60 L 105 70 Q 95 90 85 105 L 65 110 Q 45 105 20 90 Z"
                    fill="currentColor"
                    fillOpacity="0.12"
                    stroke="currentColor"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M 35 90 Q 40 86 45 92" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 50 80 Q 55 76 60 80" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 65 65 Q 70 60 75 66" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </g>

                {/* Cabeza y tronco */}
                <g className="anim-trex-body anim-loop-stop text-neutral-900 dark:text-neutral-50">
                  <circle cx="120" cy="38" r="4.5" className="fill-white dark:fill-[#0e1217]" stroke="currentColor" strokeWidth="2.5" />
                  <circle cx="121.5" cy="38" r="2" fill="currentColor" />
                  <circle cx="122.5" cy="36.8" r="0.7" fill="white" />
                  <path d="M 114 32 C 120 30 126 33 128 34" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
                  <circle cx="137" cy="35" r="1.5" fill="currentColor" />

                  <path
                    d="M 112 59 L 114 65 L 118 59 L 122 66 L 126 59 L 130 65 L 134 59"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Mandíbula */}
                  <g className="anim-trex-jaw anim-loop-stop">
                    <path
                      d="M 105 60 L 138 58 Q 135 70 120 72 L 100 70"
                      stroke="currentColor"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="currentColor"
                      fillOpacity="0.1"
                    />
                    <path
                      d="M 108 69 L 112 64 L 116 69 L 120 64 L 124 70"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>

                  <path d="M 142 50 Q 150 48 155 52" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 2" opacity="0.75" />
                  <path d="M 144 58 Q 154 58 158 64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 2" opacity="0.75" />

                  {/* Brazos */}
                  <g className="anim-trex-arms anim-loop-stop">
                    <path
                      d="M 98 75 Q 108 78 110 74 M 110 74 L 113 72 M 110 74 L 113 76"
                      stroke="currentColor"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 94 80 Q 102 85 106 82 M 106 82 L 109 80 M 106 82 L 108 85"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                  </g>
                </g>

                {/* Pata Delantera */}
                <g className="anim-trex-leg-front anim-loop-stop text-neutral-900 dark:text-neutral-50">
                  <path
                    d="M 75 95 Q 85 105 80 125 L 92 127 M 80 125 L 72 127 M 80 125 L 82 129"
                    stroke="currentColor"
                    strokeWidth="3.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M 92 127 L 97 124 M 92 127 L 94 130" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                </g>
              </g>
            </g>

            {/* 6. Suelo continuo */}
            <g mask="url(#groundSmoothMask)">
              <g className="anim-ground-seamless anim-loop-stop text-neutral-800 dark:text-neutral-200">
                <use href="#groundDoodleTile" x="-240" y="0" />
                <use href="#groundDoodleTile" x="0" y="0" />
                <use href="#groundDoodleTile" x="240" y="0" />
                <use href="#groundDoodleTile" x="480" y="0" />
              </g>
            </g>

            {/* 7. Disolución binaria Matrix ligera agrupada por GPU */}
            {isFading && (
              <g className="text-emerald-600 dark:text-emerald-400 select-none font-mono font-bold text-[11px]">
                <g className="matrix-wave-1">
                  <text x="95" y="55" fill="currentColor">0101010</text>
                  <text x="145" y="45" fill="currentColor">10101</text>
                  <text x="75" y="85" fill="currentColor">010101</text>
                  <text x="160" y="75" fill="currentColor">10010</text>
                </g>
                <g className="matrix-wave-2">
                  <text x="115" y="95" fill="currentColor">0101010</text>
                  <text x="65" y="110" fill="currentColor">11010</text>
                  <text x="135" y="125" fill="currentColor">101010</text>
                  <text x="175" y="95" fill="currentColor">01010</text>
                </g>
              </g>
            )}
          </svg>
        </div>
      </div>
    </div>
  );
};
