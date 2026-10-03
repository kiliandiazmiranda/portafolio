import React from 'react';

// Componente de mono escalador
export const PixelMonkey: React.FC = () => {
  return (
    <div
      className="relative w-full h-full min-h-[270px] flex items-center justify-center select-none pointer-events-none"
      aria-hidden="true"
    >
      {/* 1. Rama superior */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
        <svg
          className="w-14 h-7"
          viewBox="0 0 28 14"
          style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
        >
          {/* Rama de madera */}
          <rect x="2" y="5" width="24" height="3" fill="#5c2e0b" />
          <rect x="3" y="4" width="22" height="1" fill="#78350f" />
          <rect x="4" y="5" width="20" height="1" fill="#92400e" />

          {/* hojas pixeladas */}
          <rect x="1" y="2" width="5" height="3" fill="#15803d" />
          <rect x="2" y="1" width="3" height="1" fill="#22c55e" />
          <rect x="0" y="3" width="7" height="2" fill="#14532d" />
          <rect x="3" y="2" width="2" height="1" fill="#4ade80" />

          <rect x="10" y="1" width="4" height="3" fill="#15803d" />
          <rect x="11" y="2" width="2" height="1" fill="#4ade80" />
          <rect x="18" y="2" width="6" height="3" fill="#15803d" />
          <rect x="19" y="1" width="4" height="1" fill="#22c55e" />
          <rect x="20" y="2" width="2" height="1" fill="#4ade80" />
          <rect x="18" y="4" width="7" height="2" fill="#14532d" />
        </svg>
      </div>

      {/* 2. Cuerda */}
      <div
        className="absolute top-4 bottom-3 left-1/2 -translate-x-1/2 w-3 h-[calc(100%-24px)] overflow-hidden"
        style={{ imageRendering: 'pixelated' }}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 6 100"
          preserveAspectRatio="none"
          style={{ shapeRendering: 'crispEdges' }}
        >
          {/* Fondo sombra cuerda */}
          <rect x="0" y="0" width="6" height="100" fill="#78350f" />
          {/* Tronco/cuerpo de la soga */}
          <rect x="1" y="0" width="4" height="100" fill="#b45309" />
          {/* Trama */}
          <path
            d="M 2 0 L 4 0 M 3 4 L 5 4 M 2 8 L 4 8 M 3 12 L 5 12 M 2 16 L 4 16 M 3 20 L 5 20 M 2 24 L 4 24 M 3 28 L 5 28 M 2 32 L 4 32 M 3 36 L 5 36 M 2 40 L 4 40 M 3 44 L 5 44 M 2 48 L 4 48 M 3 52 L 5 52 M 2 56 L 4 56 M 3 60 L 5 60 M 2 64 L 4 64 M 3 68 L 5 68 M 2 72 L 4 72 M 3 76 L 5 76 M 2 80 L 4 80 M 3 84 L 5 84 M 2 88 L 4 88 M 3 92 L 5 92 M 2 96 L 4 96"
            stroke="#fde68a"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Nudo inferior de la cuerda */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10">
        <svg
          className="w-4 h-4"
          viewBox="0 0 8 8"
          style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
        >
          <rect x="1" y="0" width="6" height="4" fill="#5c2e0b" />
          <rect x="2" y="1" width="4" height="3" fill="#b45309" />
          <rect x="3" y="1" width="2" height="1" fill="#fde68a" />
          <rect x="2" y="4" width="2" height="3" fill="#78350f" />
          <rect x="4" y="4" width="2" height="4" fill="#5c2e0b" />
        </svg>
      </div>

      {/* 3. Mono - lados de la cuerda */}
      <div
        className="absolute animate-pixel-monkey-climb z-20 w-14 h-14"
        style={{ imageRendering: 'pixelated' }}
      >
        <svg
          className="w-full h-full drop-shadow-sm"
          viewBox="0 0 24 24"
          style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
        >
          {/* FRAME 1 */}
          <g className="animate-pixel-climb-frame1">
            {/* Cola */}
            <rect x="4" y="16" width="2" height="2" fill="#78350f" />
            <rect x="2" y="14" width="2" height="3" fill="#78350f" />
            <rect x="1" y="11" width="2" height="3" fill="#92400e" />
            <rect x="2" y="9" width="2" height="2" fill="#b45309" />
            <rect x="4" y="9" width="1" height="1" fill="#fde68a" />

            {/* Oreja izquierda */}
            <rect x="4" y="4" width="3" height="4" fill="#78350f" />
            <rect x="5" y="5" width="1" height="2" fill="#fed7aa" />

            {/* Cabeza */}
            <rect x="7" y="3" width="8" height="7" fill="#92400e" />
            <rect x="8" y="2" width="6" height="1" fill="#78350f" />
            <rect x="10" y="1" width="2" height="1" fill="#92400e" />
            <rect x="8" y="3" width="6" height="1" fill="#b45309" />

            {/* Cara */}
            <rect x="11" y="4" width="5" height="5" fill="#fed7aa" />
            <rect x="12" y="8" width="4" height="2" fill="#fed7aa" />

            {/* Ojo */}
            <rect x="12" y="5" width="2" height="2" fill="#000000" />
            <rect x="12" y="5" width="1" height="1" fill="#ffffff" />

            {/* Nariz */}
            <rect x="15" y="6" width="1" height="1" fill="#78350f" />
            <rect x="14" y="7" width="2" height="1" fill="#b91c1c" />
            <rect x="11" y="7" width="1" height="1" fill="#f87171" />

            {/* Cuerpo */}
            <rect x="6" y="10" width="8" height="7" fill="#92400e" />
            <rect x="7" y="10" width="7" height="6" fill="#78350f" />
            <rect x="8" y="11" width="5" height="5" fill="#fed7aa" />
            <rect x="9" y="12" width="3" height="3" fill="#fde68a" />

            {/* Pierna inferior */}
            <rect x="7" y="16" width="3" height="2" fill="#78350f" />
            <rect x="9" y="17" width="3" height="2" fill="#92400e" />
            <rect x="11" y="18" width="3" height="2" fill="#b45309" />
            <rect x="14" y="18" width="4" height="2" fill="#fed7aa" /> 
            <rect x="17" y="18" width="2" height="2" fill="#78350f" /> 

            {/* Pierna superior */}
            <rect x="10" y="15" width="3" height="2" fill="#78350f" />
            <rect x="12" y="14" width="3" height="2" fill="#92400e" />
            <rect x="14" y="14" width="2" height="2" fill="#b45309" />
            <rect x="16" y="14" width="4" height="2" fill="#fed7aa" /> 
            <rect x="19" y="14" width="2" height="2" fill="#78350f" /> 

            {/* Brazo superior */}
            <rect x="13" y="8" width="3" height="2" fill="#92400e" />
            <rect x="16" y="6" width="3" height="2" fill="#92400e" />
            <rect x="19" y="4" width="3" height="3" fill="#fed7aa" />
            <rect x="20" y="5" width="1" height="1" fill="#78350f" />

            {/* Brazo inferior */}
            <rect x="13" y="12" width="3" height="2" fill="#92400e" />
            <rect x="16" y="12" width="3" height="2" fill="#b45309" />
            <rect x="19" y="11" width="3" height="3" fill="#fed7aa" />
            <rect x="20" y="12" width="1" height="1" fill="#78350f" />
          </g>

          {/* FRAME 2 */}
          <g className="animate-pixel-climb-frame2">
            {/* Cola */}
            <rect x="4" y="15" width="2" height="2" fill="#78350f" />
            <rect x="2" y="13" width="2" height="3" fill="#78350f" />
            <rect x="1" y="10" width="2" height="3" fill="#92400e" />
            <rect x="3" y="8" width="2" height="2" fill="#b45309" />
            <rect x="4" y="8" width="1" height="1" fill="#fde68a" />

            {/* Oreja izquierda */}
            <rect x="4" y="3" width="3" height="4" fill="#78350f" />
            <rect x="5" y="4" width="1" height="2" fill="#fed7aa" />

            {/* Cabeza */}
            <rect x="7" y="2" width="8" height="7" fill="#92400e" />
            <rect x="8" y="1" width="6" height="1" fill="#78350f" />
            <rect x="11" y="0" width="2" height="1" fill="#92400e" /> {/* Copete */}
            <rect x="8" y="2" width="6" height="1" fill="#b45309" />

            {/* Cara */}
            <rect x="11" y="3" width="5" height="5" fill="#fed7aa" />
            <rect x="12" y="7" width="4" height="2" fill="#fed7aa" />

            {/* Ojo*/}
            <rect x="12" y="4" width="2" height="2" fill="#000000" />
            <rect x="13" y="4" width="1" height="1" fill="#ffffff" />

            {/* Nariz */}
            <rect x="15" y="5" width="1" height="1" fill="#78350f" />
            <rect x="14" y="6" width="2" height="1" fill="#b91c1c" />
            <rect x="11" y="6" width="1" height="1" fill="#f87171" />

            {/* Cuerpo */}
            <rect x="6" y="9" width="8" height="7" fill="#92400e" />
            <rect x="7" y="9" width="7" height="6" fill="#78350f" />
            <rect x="8" y="10" width="5" height="5" fill="#fed7aa" />
            <rect x="9" y="11" width="3" height="3" fill="#fde68a" />

            {/* Pierna superior*/}
            <rect x="10" y="14" width="3" height="2" fill="#78350f" />
            <rect x="12" y="13" width="3" height="2" fill="#92400e" />
            <rect x="14" y="12" width="2" height="2" fill="#b45309" />
            <rect x="16" y="12" width="4" height="2" fill="#fed7aa" /> 
            <rect x="19" y="12" width="2" height="2" fill="#78350f" />

            {/* Pierna inferior */}
            <rect x="7" y="15" width="3" height="2" fill="#78350f" />
            <rect x="9" y="16" width="3" height="2" fill="#92400e" />
            <rect x="11" y="16" width="3" height="2" fill="#b45309" />
            <rect x="14" y="16" width="4" height="2" fill="#fed7aa" /> 
            <rect x="17" y="16" width="2" height="2" fill="#78350f" /> 

            {/* Brazos en paso alterno */}
            <rect x="13" y="6" width="2" height="3" fill="#92400e" />
            <rect x="15" y="4" width="3" height="2" fill="#92400e" />
            <rect x="18" y="2" width="3" height="3" fill="#fed7aa" /> 
            <rect x="19" y="3" width="1" height="1" fill="#78350f" />
            <rect x="13" y="10" width="3" height="2" fill="#92400e" />
            <rect x="16" y="9" width="3" height="2" fill="#b45309" />
            <rect x="18" y="8" width="3" height="3" fill="#fed7aa" /> 
            <rect x="19" y="9" width="1" height="1" fill="#78350f" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export { PixelMonkey as ClimbingMonkeyDoodle, PixelMonkey as MonkeyDoodle };
