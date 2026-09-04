/**
 * Ilustraciones vectoriales en SVG de criaturas prehistóricas dibujadas a mano.
 * Genera trazos orgánicos estilo boceto para T-Rex, Stegosaurus, Triceratops,
 * Velociraptor, Carnotaurus, Smilodon, Megatherium, Mamut, Megalodon y Mosasaurus.
 */

import React from 'react';

interface DinosaurDoodleProps {
  id: string;
  className?: string;
  wobbly?: boolean;
}


export const DinosaurDoodle: React.FC<DinosaurDoodleProps> = ({
  id,
  className = "w-32 h-32",
  wobbly = false,
}) => {
  const wobbleClass = wobbly ? "animate-pulse" : "";

  switch (id) {
    case 'tyrannosaurus':
      // T-Rex: Diseño expresivo.
      return (
        <svg
          viewBox="0 0 160 140"
          className={`${className} ${wobbleClass}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15 130 C45 131 95 129 145 131" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 4" opacity="0.5" />
          <path
            d="M 20 90 Q 40 85 55 75 Q 70 60 80 40 Q 95 25 125 25 Q 140 25 142 40 Q 140 55 125 60 L 105 60 L 105 70 Q 95 90 85 105 L 65 110 Q 45 105 20 90 Z"
            fill="currentColor"
            fillOpacity="0.08"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 105 60 L 138 58 Q 135 70 120 72 L 100 70"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M 112 59 L 114 65 L 118 59 L 122 66 L 126 59 L 130 65 L 134 59" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 108 69 L 112 64 L 116 69 L 120 64 L 124 70" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="120" cy="38" r="4.5" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="121.5" cy="38" r="1.8" fill="currentColor" />
          <path d="M 114 32 C 120 30 126 33 128 34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="137" cy="35" r="1.5" fill="currentColor" />
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
          <path
            d="M 75 95 Q 85 105 80 125 L 92 127 M 80 125 L 72 127 M 80 125 L 82 129"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 60 95 Q 68 105 65 124 L 75 125 M 65 124 L 58 126"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M 50 80 Q 55 76 60 80" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M 65 65 Q 70 60 75 66" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M 35 90 Q 40 86 45 92" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M 142 50 Q 150 48 155 52" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 2" />
          <path d="M 144 58 Q 154 58 158 64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 2" />
        </svg>
      );

    case 'stegosaurus':
      // Stegosaurus: Cuerpo robusto, placas dorsales onduladas y espinas caudales
      return (
        <svg
          viewBox="0 0 160 140"
          className={`${className} ${wobbleClass}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15 130 C45 131 95 129 145 131" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 4" opacity="0.5" />
          <path
            d="M 22 95 Q 40 100 55 90 Q 75 60 110 70 Q 130 75 142 90 Q 135 100 120 105 Q 85 115 50 110 Q 30 105 22 95 Z"
            fill="currentColor"
            fillOpacity="0.08"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 130 85 Q 148 90 145 98 Q 138 105 125 100"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="140" cy="92" r="2.5" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="140.5" cy="92" r="1" fill="currentColor" />
          <path d="M 138 98 Q 142 101 145 99" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 45 88 L 48 70 L 58 84" stroke="currentColor" strokeWidth="2.8" strokeLinejoin="round" strokeLinecap="round" fill="currentColor" fillOpacity="0.12" />
          <path d="M 58 78 L 65 55 L 75 72" stroke="currentColor" strokeWidth="2.8" strokeLinejoin="round" strokeLinecap="round" fill="currentColor" fillOpacity="0.12" />
          <path d="M 76 68 L 86 45 L 96 66" stroke="currentColor" strokeWidth="2.8" strokeLinejoin="round" strokeLinecap="round" fill="currentColor" fillOpacity="0.12" />
          <path d="M 97 66 L 108 52 L 117 72" stroke="currentColor" strokeWidth="2.8" strokeLinejoin="round" strokeLinecap="round" fill="currentColor" fillOpacity="0.12" />
          <path d="M 118 73 L 126 62 L 132 82" stroke="currentColor" strokeWidth="2.8" strokeLinejoin="round" strokeLinecap="round" fill="currentColor" fillOpacity="0.12" />
          <path d="M 22 95 L 10 90 M 22 95 L 8 98 M 26 98 L 14 105 M 26 98 L 18 110" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M 55 108 L 52 128 L 64 128 L 65 109" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 72 108 L 74 126 L 82 126" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 105 106 L 104 128 L 116 128 L 117 104" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 120 102 L 122 124 L 128 124" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 80 110 Q 88 106 95 110" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'triceratops':
      // Triceratops: Gran escudo óseo (gola), 3 cuernos afilados y cuerpo fornido
      return (
        <svg
          viewBox="0 0 160 140"
          className={`${className} ${wobbleClass}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15 130 C45 131 95 129 145 131" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 4" opacity="0.5" />
          <path
            d="M 20 98 Q 38 102 50 92 Q 70 70 105 78 L 105 110 Q 65 116 20 98 Z"
            fill="currentColor"
            fillOpacity="0.08"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 98 60 Q 105 40 120 42 Q 135 44 135 65 Q 135 80 118 85 Z"
            fill="currentColor"
            fillOpacity="0.14"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M 108 45 Q 112 40 118 43 Q 124 40 128 46" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path
            d="M 115 80 L 140 85 Q 146 95 138 102 L 115 95"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M 118 68 Q 138 52 148 50" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M 112 65 Q 130 46 138 42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 136 84 Q 146 72 144 68" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <circle cx="122" cy="74" r="3.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
          <circle cx="123" cy="74" r="1.2" fill="currentColor" />
          <path d="M 136 94 Q 142 96 144 92" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M 48 100 L 46 127 L 58 127 L 60 102" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 66 100 L 68 124 L 76 124" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 98 100 L 97 127 L 109 127 L 111 96" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'velociraptor':
      // Velociraptor: Plumaje ágil, postura aerodinámica y garra falciforme retráctil
      return (
        <svg
          viewBox="0 0 160 140"
          className={`${className} ${wobbleClass}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15 130 C45 131 95 129 145 131" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 4" opacity="0.5" />
          <path d="M 10 65 Q 40 70 70 80 Q 85 85 95 70 Q 105 50 120 40 L 145 42 Q 148 52 135 56 L 115 56 L 100 80" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 10 65 L 18 58 M 18 67 L 26 60 M 26 69 L 34 62" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 125 48 L 142 48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M 128 48 L 130 53 L 133 48 L 136 53 L 139 48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="126" cy="44" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="127" cy="44" r="1" fill="currentColor" />
          <path d="M 95 65 Q 110 72 115 82 M 102 74 L 112 88 M 98 70 L 106 84" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 75 82 Q 85 98 78 115 L 90 125" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M 78 115 Q 74 105 80 102 Q 86 104 84 112" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.3" />
          <path d="M 65 85 Q 55 100 58 126 L 68 126" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 5 55 L 18 55 M 2 75 L 14 75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 3" />
        </svg>
      );

    case 'carnotaurus':
      // Carnotaurus: Cuernos frontales de toro, ceño marcado, cuerpo veloz y brazos mínimos
      return (
        <svg
          viewBox="0 0 160 140"
          className={`${className} ${wobbleClass}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15 130 C45 131 95 129 145 131" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 4" opacity="0.5" />
          <path
            d="M 15 85 Q 45 80 65 70 Q 80 50 110 40 L 135 42 Q 140 60 120 70 L 100 75 Q 85 95 65 105 Q 40 100 15 85 Z"
            fill="currentColor"
            fillOpacity="0.08"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M 118 38 L 122 22 L 128 35" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.2" />
          <path d="M 112 36 L 114 24 L 118 34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="120" cy="48" r="3.5" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="121" cy="48" r="1.5" fill="currentColor" />
          <path d="M 114 42 L 126 46" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M 98 74 L 102 78 M 102 78 L 104 77" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 75 90 Q 92 102 85 126 L 98 126" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 60 90 Q 50 105 52 126 L 62 126" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'smilodon':
      // Smilodon: Felino musculoso del Pleistoceno con colmillos de sable sobresalientes
      return (
        <svg
          viewBox="0 0 160 140"
          className={`${className} ${wobbleClass}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15 130 C45 131 95 129 145 131" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 4" opacity="0.5" />
          <path
            d="M 35 90 Q 25 80 20 85 Q 22 95 38 98 Q 55 95 75 80 Q 90 65 110 65 Q 128 65 135 78 Q 130 95 110 100 Q 80 108 50 105 Z"
            fill="currentColor"
            fillOpacity="0.08"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M 108 62 L 112 50 L 118 62" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 122 62 L 126 52 L 130 64" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="120" cy="74" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="121" cy="74" r="1.2" fill="currentColor" />
          <circle cx="132" cy="78" r="1" fill="currentColor" />
          <circle cx="135" cy="80" r="1" fill="currentColor" />
          <path d="M 124 82 Q 126 98 122 108 Q 120 102 120 82" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.25" />
          <path d="M 130 82 Q 132 96 128 104 Q 126 98 126 82" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.25" />
          <path d="M 48 100 L 46 126 L 56 126" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 65 98 L 66 124 L 74 124" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 98 98 L 96 126 L 108 126" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 112 95 L 114 124 L 122 124" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'megatherium':
      // Megatherium: Perezoso gigante erguido con garras curvas prensiles
      return (
        <svg
          viewBox="0 0 160 140"
          className={`${className} ${wobbleClass}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15 130 C45 131 95 129 145 131" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 4" opacity="0.5" />
          <path
            d="M 40 120 Q 30 95 45 70 Q 60 45 80 40 Q 95 38 105 48 Q 115 58 105 75 Q 115 95 105 125 Z"
            fill="currentColor"
            fillOpacity="0.08"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="95" cy="48" r="3.5" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="96" cy="48" r="1.2" fill="currentColor" />
          <path d="M 98 56 Q 105 60 102 54" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M 80 65 Q 115 65 125 80 L 132 85" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M 132 85 Q 138 92 135 98 M 130 87 Q 135 95 132 100 M 128 89 Q 132 96 129 102" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M 45 118 L 40 128 L 58 128" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 95 118 L 92 128 L 112 128" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 55 60 L 52 65 M 65 75 L 62 80 M 75 90 L 72 96" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'mammoth':
    case 'mamut':
      // Mamut: Gigante lanudo con colmillos curvados imponentes y trompa erguida
      return (
        <svg
          viewBox="0 0 160 140"
          className={`${className} ${wobbleClass}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15 130 C45 131 95 129 145 131" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 4" opacity="0.5" />
          <path
            d="M 28 92 Q 22 80 20 85 Q 22 92 30 96 Q 35 60 60 48 Q 78 40 92 46 Q 105 38 118 48 Q 128 60 125 78 Q 115 85 105 88 Q 90 98 65 102 Q 45 100 28 92 Z"
            fill="currentColor"
            fillOpacity="0.08"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 98 44 Q 108 34 118 42 Q 125 48 126 58"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path d="M 104 38 L 102 33 M 110 36 L 110 30 M 116 38 L 118 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path
            d="M 100 56 Q 94 58 96 66 Q 102 68 104 62 Z"
            fill="currentColor"
            fillOpacity="0.15"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="114" cy="54" r="2.8" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="115" cy="54" r="1.2" fill="currentColor" />
          <path d="M 110 49 Q 114 47 118 49" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path
            d="M 124 66 Q 135 72 138 85 Q 140 98 132 105 Q 124 108 126 98 Q 128 88 122 80"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="currentColor"
            fillOpacity="0.05"
          />
          <path d="M 130 105 L 128 102" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M 128 76 L 132 78 M 132 84 L 136 86 M 132 94 L 136 95" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path
            d="M 116 75 Q 125 90 142 90 Q 152 82 150 65 Q 148 55 142 50 Q 144 60 140 72 Q 132 80 118 78 Z"
            fill="currentColor"
            fillOpacity="0.22"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 112 78 Q 118 88 132 88 Q 142 82 142 70"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="2 3"
          />
          <path
            d="M 42 98 L 40 108 L 46 99 L 48 110 L 54 100 L 58 111 L 64 101 L 70 112 L 76 102 L 82 110 L 88 101"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 36 96 L 34 126 L 46 126 L 48 98"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 52 98 L 54 124 L 62 124 L 64 100"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 88 100 L 86 126 L 100 126 L 102 96"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 104 96 L 106 124 L 115 124 L 116 90"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 22 86 Q 16 92 18 100 L 16 103"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path d="M 16 100 L 14 106 M 18 101 L 17 107" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );

    case 'megalodon':
      // Megalodon: Escualo prehistórico colosal con aleta dorsal imponente y dientes aserrados
      return (
        <svg
          viewBox="0 0 160 140"
          className={`${className} ${wobbleClass}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M 10 115 Q 25 110 40 115 Q 55 120 70 115 Q 85 110 100 115 Q 115 120 130 115 Q 145 110 155 115" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
          <path d="M 20 125 Q 35 120 50 125 Q 65 130 80 125 Q 95 120 110 125 Q 125 130 140 125" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.3" />
          <path
            d="M 15 65 L 30 75 Q 60 70 85 45 Q 110 50 145 70 Q 120 100 75 95 Q 45 95 30 85 Z"
            fill="currentColor"
            fillOpacity="0.08"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M 75 50 L 90 20 L 102 48" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15" />
          <path d="M 20 72 L 5 48 L 15 65 L 5 88 Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15" />
          <path d="M 80 90 L 72 110 L 92 92" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15" />
          <path d="M 142 70 L 115 78 L 138 86" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 120 77 L 123 74 L 126 77 L 129 74 L 132 77 L 135 74 L 138 77" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M 122 81 L 125 84 L 128 81 L 131 84 L 134 81" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="128" cy="62" r="3" fill="currentColor" />
          <path d="M 98 68 C 100 74 100 80 98 84 M 104 69 C 106 75 106 79 104 83 M 110 70 C 112 75 112 78 110 82" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'mosasaurus':
      // Mosasaurus: Reptil marino gigante con aletas natatorias y mandíbula alargada
      return (
        <svg
          viewBox="0 0 160 140"
          className={`${className} ${wobbleClass}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M 10 115 Q 35 108 60 115 Q 85 122 110 115 Q 135 108 155 115" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
          <path
            d="M 12 75 Q 35 85 65 70 Q 95 60 120 62 L 148 68 Q 135 85 110 88 Q 75 92 45 80 Z"
            fill="currentColor"
            fillOpacity="0.08"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M 20 78 L 6 60 L 14 74 L 8 92 Z" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15" />
          <path d="M 85 82 Q 95 105 105 108 Q 100 95 95 80" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15" />
          <path d="M 45 80 Q 48 98 56 100 Q 54 90 52 80" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15" />
          <path d="M 120 62 L 148 68 L 125 78" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 126 66 L 128 70 L 131 66 L 134 71 L 137 67 L 140 72 L 143 68" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="124" cy="58" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="125" cy="58" r="1.2" fill="currentColor" />
        </svg>
      );

    default:
      // Silueta de dinosaurio en trazo estándar
      return (
        <svg
          viewBox="0 0 160 140"
          className={`${className} ${wobbleClass}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15 130 C45 131 95 129 145 131" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 4" opacity="0.5" />
          <path d="M 30 95 Q 60 70 85 70 Q 110 50 130 50 L 140 60 L 125 65 Q 100 95 70 105 Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.1" />
          <circle cx="125" cy="54" r="2.5" fill="currentColor" />
          <path d="M 65 105 L 60 126 L 72 126" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M 90 95 L 88 126 L 98 126" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
  }
};
