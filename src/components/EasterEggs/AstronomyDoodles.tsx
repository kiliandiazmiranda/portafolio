/**
 * Ilustraciones SVG estilo doodle para los objetos del observatorio.
 */

import React from 'react';

interface AstronomyDoodleProps {
  id: string;
  className?: string;
  wobbly?: boolean;
}

export const AstronomyDoodle: React.FC<AstronomyDoodleProps> = ({
  id,
  className = "w-32 h-32",
  wobbly = false,
}) => {
  const wobbleClass = wobbly ? "animate-pulse" : "";

  switch (id) {
    case 'sun':
    case 'sol':
      // 1. El Sol: Estrella de plasma con llamaradas y corona solar
      return (
        <svg
          viewBox="0 0 160 140"
          className={`${className} ${wobbleClass}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="20" cy="25" r="1" fill="currentColor" opacity="0.4" />
          <circle cx="140" cy="115" r="1.2" fill="currentColor" opacity="0.4" />
          <circle cx="145" cy="30" r="1" fill="currentColor" opacity="0.4" />
          <circle cx="18" cy="118" r="1.2" fill="currentColor" opacity="0.4" />
          <circle
            cx="80"
            cy="70"
            r="35"
            fill="currentColor"
            fillOpacity="0.12"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <ellipse cx="68" cy="62" rx="3.5" ry="2.5" fill="currentColor" fillOpacity="0.6" />
          <circle cx="92" cy="74" r="2.5" fill="currentColor" fillOpacity="0.5" />
          <circle cx="76" cy="82" r="2" fill="currentColor" fillOpacity="0.4" />
          <path d="M 62 76 Q 74 72 86 78" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="2 3" opacity="0.7" />
          <path d="M 80 26 L 80 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M 80 114 L 80 132" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M 36 70 L 18 70" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M 124 70 L 142 70" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M 48 38 L 32 22" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M 112 38 L 128 22" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M 48 102 L 32 118" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M 112 102 L 128 118" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M 98 38 Q 116 30 106 50" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M 52 95 Q 38 108 58 106" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 114 85 Q 132 88 120 72" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );

    case 'moon':
    case 'luna':
      // 2. La Luna: Satélite natural con cráteres y mares lunares
      return (
        <svg
          viewBox="0 0 160 140"
          className={`${className} ${wobbleClass}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M 22 30 L 26 30 M 24 28 L 24 32" stroke="currentColor" strokeWidth="1.6" opacity="0.6" />
          <path d="M 136 100 L 140 100 M 138 98 L 138 102" stroke="currentColor" strokeWidth="1.6" opacity="0.6" />
          <circle cx="132" cy="36" r="1.2" fill="currentColor" opacity="0.5" />
          <circle
            cx="80"
            cy="70"
            r="38"
            fill="currentColor"
            fillOpacity="0.1"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M 80 32 C 102 32, 118 48, 118 70 C 118 92, 102 108, 80 108 C 96 92, 96 48, 80 32 Z"
            fill="currentColor"
            fillOpacity="0.18"
          />
          <circle cx="62" cy="85" r="7" stroke="currentColor" strokeWidth="2.4" fill="currentColor" fillOpacity="0.2" />
          <path d="M 62 76 L 62 70 M 55 85 L 47 87 M 68 89 L 75 94 M 58 91 L 52 98" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
          <circle cx="66" cy="55" r="5.5" stroke="currentColor" strokeWidth="2.2" fill="currentColor" fillOpacity="0.15" />
          <circle cx="66" cy="55" r="2" fill="currentColor" opacity="0.4" />
          <ellipse cx="88" cy="50" rx="6" ry="4" stroke="currentColor" strokeWidth="1.8" strokeDasharray="3 2" fill="currentColor" fillOpacity="0.12" />
          <circle cx="94" cy="78" r="4.5" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.15" />
          <circle cx="80" cy="92" r="3" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );

    case 'mars':
    case 'marte':
      // 3. Marte: Planeta rojo con casquete polar, Valles Marineris y lunas Fobos y Deimos
      return (
        <svg
          viewBox="0 0 160 140"
          className={`${className} ${wobbleClass}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M 28 35 Q 34 32 36 38 Q 33 44 26 40 Z" fill="currentColor" fillOpacity="0.35" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="31" cy="36" r="0.8" fill="currentColor" />
          <path d="M 132 102 Q 138 100 137 106 Q 131 108 132 102 Z" fill="currentColor" fillOpacity="0.35" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <circle
            cx="80"
            cy="70"
            r="36"
            fill="currentColor"
            fillOpacity="0.14"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M 64 38 Q 80 44 96 38 Q 88 34 80 34 Q 72 34 64 38 Z"
            fill="currentColor"
            fillOpacity="0.4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <ellipse cx="62" cy="58" rx="6" ry="4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="currentColor" fillOpacity="0.25" />
          <circle cx="62" cy="58" r="1.6" fill="currentColor" />
          <path
            d="M 55 76 Q 72 82 92 74 Q 104 78 112 73"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path
            d="M 62 82 Q 78 87 96 80"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeDasharray="2 3"
          />
          <path d="M 68 96 Q 82 92 98 96" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        </svg>
      );

    case 'jupiter':
    case 'jupiter_planet':
      // 4. Júpiter: Gigante gaseoso con bandas atmosféricas, Gran Mancha Roja y lunas galileanas
      return (
        <svg
          viewBox="0 0 160 140"
          className={`${className} ${wobbleClass}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="15" cy="70" r="2.2" fill="currentColor" stroke="currentColor" strokeWidth="1" />
          <circle cx="28" cy="68" r="1.8" fill="currentColor" stroke="currentColor" strokeWidth="1" />
          <circle cx="132" cy="72" r="2.5" fill="currentColor" stroke="currentColor" strokeWidth="1" />
          <circle cx="146" cy="69" r="2" fill="currentColor" stroke="currentColor" strokeWidth="1" />
          <circle
            cx="80"
            cy="70"
            r="40"
            fill="currentColor"
            fillOpacity="0.12"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path d="M 44 50 Q 80 54 116 50" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M 41 60 Q 65 64 88 59 Q 106 63 119 60" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M 41 80 Q 75 76 119 80" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M 44 90 Q 80 86 116 90" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          <ellipse
            cx="94"
            cy="72"
            rx="9.5"
            ry="6"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
            fill="currentColor"
            fillOpacity="0.4"
          />
          <ellipse cx="94" cy="72" rx="4.5" ry="2.5" fill="currentColor" fillOpacity="0.7" />
          <path d="M 52 70 Q 62 67 72 71" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 106 72 Q 112 68 116 71" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );

    case 'saturn':
    case 'saturno':
      // 5. Saturno: Señor de los anillos con división de Cassini
      return (
        <svg
          viewBox="0 0 160 140"
          className={`${className} ${wobbleClass}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="138" cy="42" r="2.5" fill="currentColor" stroke="currentColor" strokeWidth="1.2" />
          <path
            d="M 12 65 C 22 45, 138 45, 148 65"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M 22 68 C 34 52, 126 52, 138 68"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeDasharray="4 2"
          />
          <circle
            cx="80"
            cy="70"
            r="30"
            fill="currentColor"
            fillOpacity="0.15"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path d="M 53 62 Q 80 66 107 62" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 52 78 Q 80 82 108 78" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 58 88 Q 80 92 102 88" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path
            d="M 12 65 C 22 92, 138 92, 148 65"
            stroke="currentColor"
            strokeWidth="3.8"
            strokeLinecap="round"
            fill="currentColor"
            fillOpacity="0.08"
          />
          <path
            d="M 20 68 C 30 87, 130 87, 140 68"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeDasharray="3 3"
          />
          <path
            d="M 30 71 C 40 84, 120 84, 130 71"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'orion_nebula':
    case 'nebulosa':
    case 'nebula':
      // 6. Nebulosa de Orión (M42): Velo cósmico de gas brillante y estrellas jóvenes del Trapecio
      return (
        <svg
          viewBox="0 0 160 140"
          className={`${className} ${wobbleClass}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 30 65 C 20 40, 55 25, 80 32 C 110 22, 140 45, 135 75 C 145 105, 105 125, 75 118 C 45 125, 20 100, 30 65 Z"
            fill="currentColor"
            fillOpacity="0.12"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 45 68 C 40 50, 65 42, 85 46 C 110 40, 120 60, 115 80 C 110 100, 85 105, 65 98 C 50 102, 40 85, 45 68 Z"
            fill="currentColor"
            fillOpacity="0.18"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="4 3"
          />
          <path d="M 80 62 L 80 52 M 75 57 L 85 57" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="80" cy="57" r="2.2" fill="currentColor" />

          <path d="M 72 74 L 72 66 M 68 70 L 76 70" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="72" cy="70" r="1.8" fill="currentColor" />

          <path d="M 90 70 L 90 64 M 87 67 L 93 67" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="90" cy="67" r="1.6" fill="currentColor" />

          <circle cx="82" cy="78" r="1.8" fill="currentColor" />
          <circle cx="48" cy="45" r="1.5" fill="currentColor" />
          <circle cx="122" cy="50" r="1.5" fill="currentColor" />
          <circle cx="118" cy="98" r="1.5" fill="currentColor" />
          <circle cx="42" cy="95" r="1.5" fill="currentColor" />
          <path d="M 52 58 Q 68 62 60 76" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 102 58 Q 95 72 108 82" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 70 88 Q 80 96 95 90" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );

    case 'andromeda':
    case 'andromeda_galaxy':
    case 'galaxia':
      // 7. Galaxia de Andrómeda (M31): Galaxia espiral gigante con brazos luminosos
      return (
        <svg
          viewBox="0 0 160 140"
          className={`${className} ${wobbleClass}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse cx="40" cy="42" rx="4.5" ry="3" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="1.5" />
          <ellipse cx="124" cy="102" rx="5" ry="3.5" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="1.5" />
          <ellipse
            cx="80"
            cy="70"
            rx="16"
            ry="9"
            fill="currentColor"
            fillOpacity="0.35"
            stroke="currentColor"
            strokeWidth="2.8"
          />
          <circle cx="80" cy="70" r="5" fill="currentColor" />
          <path
            d="M 80 61 C 55 58, 25 60, 20 72 C 16 82, 38 95, 65 98 C 95 102, 138 94, 146 80 C 150 70, 132 58, 105 52"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="currentColor"
            fillOpacity="0.08"
          />
          <path
            d="M 68 64 C 48 68, 30 76, 32 86 C 36 96, 68 108, 100 106 C 130 104, 148 88, 140 76 C 132 64, 104 54, 82 56"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeDasharray="4 3"
          />
          <circle cx="48" cy="76" r="1.4" fill="currentColor" />
          <circle cx="62" cy="92" r="1.6" fill="currentColor" />
          <circle cx="112" cy="62" r="1.6" fill="currentColor" />
          <circle cx="128" cy="80" r="1.4" fill="currentColor" />
          <circle cx="98" cy="98" r="1.2" fill="currentColor" />
          <path d="M 60 74 Q 80 77 102 73" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
        </svg>
      );

    case 'black_hole':
    case 'blackhole':
    case 'sagitario':
      // 8. Agujero Negro Supermasivo (Sagitario A*): Horizonte de sucesos, disco de acreción y lente gravitacional
      return (
        <svg
          viewBox="0 0 160 140"
          className={`${className} ${wobbleClass}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M 20 70 Q 50 55 80 55 Q 110 55 140 70" stroke="currentColor" strokeWidth="1.8" strokeDasharray="3 3" opacity="0.5" />
          <path d="M 20 70 Q 50 85 80 85 Q 110 85 140 70" stroke="currentColor" strokeWidth="1.8" strokeDasharray="3 3" opacity="0.5" />
          <path
            d="M 38 68 C 45 42, 115 42, 122 68"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            fill="currentColor"
            fillOpacity="0.2"
          />
          <path
            d="M 48 65 C 55 48, 105 48, 112 65"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle
            cx="80"
            cy="70"
            r="24"
            fill="currentColor"
            fillOpacity="0.85"
            stroke="currentColor"
            strokeWidth="3.2"
          />
          <circle
            cx="80"
            cy="70"
            r="26"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeDasharray="5 3"
          />
          <path
            d="M 16 70 C 24 88, 136 88, 144 70"
            stroke="currentColor"
            strokeWidth="4.2"
            strokeLinecap="round"
            fill="currentColor"
            fillOpacity="0.15"
          />
          <path
            d="M 28 72 C 38 84, 122 84, 132 72"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeDasharray="4 2"
          />
          <path d="M 80 40 L 80 12 M 77 18 L 80 10 L 83 18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 80 100 L 80 128 M 77 122 L 80 130 L 83 122" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'pulsar':
    case 'neutron_star':
      // 9. Púlsar: Estrella de neutrones con dipolo magnético colosal, rotación rápida y haces de radiación
      return (
        <svg
          viewBox="0 0 160 140"
          className={`${className} ${wobbleClass}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M 28 20 Q 42 12 56 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 2" opacity="0.7" />
          <path d="M 20 10 Q 40 0 62 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="4 3" opacity="0.5" />
          <path d="M 104 124 Q 118 128 132 120" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 2" opacity="0.7" />
          <path d="M 98 132 Q 120 140 140 130" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="4 3" opacity="0.5" />
          <path d="M 74 58 L 38 18 M 86 62 L 56 14" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M 80 60 L 46 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3 2" fill="currentColor" fillOpacity="0.15" />
          <path d="M 86 82 L 122 122 M 74 78 L 104 126" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M 80 80 L 114 124" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3 2" fill="currentColor" fillOpacity="0.15" />
          <path
            d="M 75 58 C 40 38, 25 102, 75 82"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M 72 56 C 22 25, 10 115, 72 84"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeDasharray="4 3"
            opacity="0.75"
          />
          <path
            d="M 85 58 C 120 38, 135 102, 85 82"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M 88 56 C 138 25, 150 115, 88 84"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeDasharray="4 3"
            opacity="0.75"
          />
          <circle
            cx="80"
            cy="70"
            r="15"
            fill="currentColor"
            fillOpacity="0.35"
            stroke="currentColor"
            strokeWidth="3.2"
          />
          <circle cx="80" cy="70" r="8" fill="currentColor" fillOpacity="0.9" />
          <path d="M 68 70 Q 80 77 92 70" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 89 67 L 93 70 L 89 73" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'messier_87':
    case 'm87':
    case 'virgo_a':
      // 10. Messier 87 (M87): Galaxia elíptica gigante, cúmulos globulares y el célebre chorro relativista de M87*
      return (
        <svg
          viewBox="0 0 160 140"
          className={`${className} ${wobbleClass}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="28" cy="42" r="1.4" fill="currentColor" opacity="0.6" />
          <circle cx="42" cy="104" r="1.6" fill="currentColor" opacity="0.7" />
          <circle cx="118" cy="112" r="1.5" fill="currentColor" opacity="0.6" />
          <circle cx="24" cy="80" r="1.3" fill="currentColor" opacity="0.6" />
          <circle cx="138" cy="78" r="1.5" fill="currentColor" opacity="0.6" />
          <circle cx="62" cy="24" r="1.4" fill="currentColor" opacity="0.7" />
          <circle cx="98" cy="118" r="1.3" fill="currentColor" opacity="0.5" />
          <circle cx="126" cy="38" r="1.4" fill="currentColor" opacity="0.6" />
          <ellipse
            cx="75"
            cy="70"
            rx="48"
            ry="36"
            fill="currentColor"
            fillOpacity="0.1"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <ellipse
            cx="75"
            cy="70"
            rx="32"
            ry="24"
            fill="currentColor"
            fillOpacity="0.18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="5 3"
          />
          <path
            d="M 82 64 L 148 20"
            stroke="currentColor"
            strokeWidth="3.6"
            strokeLinecap="round"
          />
          <path
            d="M 80 62 L 142 18"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeDasharray="3 2"
            opacity="0.8"
          />
          <ellipse cx="104" cy="49" rx="3.5" ry="2.5" fill="currentColor" fillOpacity="0.6" stroke="currentColor" strokeWidth="1.6" />
          <ellipse cx="126" cy="35" rx="3" ry="2.2" fill="currentColor" fillOpacity="0.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M 144 16 L 152 20 L 146 26" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <circle
            cx="75"
            cy="70"
            r="16"
            fill="currentColor"
            fillOpacity="0.3"
            stroke="currentColor"
            strokeWidth="2.6"
          />
          <circle
            cx="75"
            cy="70"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="4 2"
          />
          <circle cx="75" cy="70" r="7" fill="currentColor" fillOpacity="0.9" />
        </svg>
      );

    default:
      // Doodle astronómico genérico (Planeta y estrellas)
      return (
        <svg
          viewBox="0 0 160 140"
          className={`${className} ${wobbleClass}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="80" cy="70" r="32" stroke="currentColor" strokeWidth="3" fill="currentColor" fillOpacity="0.1" />
          <path d="M 25 75 C 40 50, 120 50, 135 75 C 120 100, 40 100, 25 75" stroke="currentColor" strokeWidth="2.8" />
          <circle cx="35" cy="35" r="2" fill="currentColor" />
          <circle cx="125" cy="30" r="2.5" fill="currentColor" />
          <circle cx="120" cy="110" r="2" fill="currentColor" />
        </svg>
      );
  }
};
