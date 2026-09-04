/**
 * Iconografía vectorial dibujada a mano (Doodle Icons).
 * Proporciona iconos orgánicos estilizados en formato SVG para gatos, huesos, coronas,
 * cohetes, mandos de juego, escudos, libros, pinceles, dinosaurios y herramientas visuales.
 */

import React from 'react';

interface DoodleIconProps {
  className?: string;
  wobbly?: boolean;
}


// Función auxiliar para animación de oscilación
const wobble = (w?: boolean) => (w ? 'animate-pulse' : '');

// 1. Mando / Joystick de videojuegos dibujado a mano
export const DoodleGamepad: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      d="M6.2 8.2 C4.2 9.1, 2.5 12.8, 2.8 16.2 C3.0 18.5, 4.8 19.5, 6.8 18.8 C8.5 18.2, 9.8 16.5, 12.0 16.5 C14.2 16.5, 15.5 18.2, 17.2 18.8 C19.2 19.5, 21.0 18.5, 21.2 16.2 C21.5 12.8, 19.8 9.1, 17.8 8.2 C15.8 7.3, 8.2 7.3, 6.2 8.2 Z"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.12"
    />
    <path d="M7 11.2 L7 15.2 M5 13.2 L9 13.2" strokeWidth="2.2" />
    <circle cx="16.5" cy="12" r="1.1" fill="currentColor" strokeWidth="1.2" />
    <circle cx="18.5" cy="14" r="1.1" fill="currentColor" strokeWidth="1.2" />
    <circle cx="14.5" cy="14" r="1.1" fill="currentColor" strokeWidth="1.2" />
    <circle cx="16.5" cy="16" r="1.1" fill="currentColor" strokeWidth="1.2" />
    <path d="M10.8 11.8 L11.8 11.8 M12.8 11.8 L13.8 11.8" strokeWidth="1.6" />
  </svg>
);

// 2. Gato / Michi dibujado a mano
export const DoodleCat: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      d="M4.5 10.5 L3.2 4.8 L8.5 7.5 C9.6 7.0, 14.4 7.0, 15.5 7.5 L20.8 4.8 L19.5 10.5 C21.2 13.0, 20.8 17.5, 17.8 19.5 C14.5 21.5, 9.5 21.5, 6.2 19.5 C3.2 17.5, 2.8 13.0, 4.5 10.5 Z"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.12"
    />
    <ellipse cx="8.2" cy="12.5" rx="1.2" ry="1.6" fill="currentColor" />
    <ellipse cx="15.8" cy="12.5" rx="1.2" ry="1.6" fill="currentColor" />
    <path d="M12 14.8 L11.4 14.2 Q12 13.8 12.6 14.2 Z" fill="currentColor" strokeWidth="1" />
    <path d="M12 15.2 Q10.5 17 9.2 16.2 M12 15.2 Q13.5 17 14.8 16.2" strokeWidth="1.6" />
    <path d="M6 13.8 L2.5 13.2 M6 15.2 L2.8 16.0" strokeWidth="1.4" />
    <path d="M18 13.8 L21.5 13.2 M18 15.2 L21.2 16.0" strokeWidth="1.4" />
  </svg>
);

// 3. Huella de gato dibujada a mano
export const DoodlePaw: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      d="M8.2 14.5 C6.8 15.2, 6.5 18.2, 9.2 19.8 C11.5 21.0, 13.8 20.8, 15.5 19.5 C17.8 17.5, 16.5 15.0, 14.8 14.2 C13.0 13.5, 10.0 13.6, 8.2 14.5 Z"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.2"
    />
    <ellipse cx="6.2" cy="10.2" rx="1.8" ry="2.2" strokeWidth="1.8" fill="currentColor" fillOpacity="0.25" />
    <ellipse cx="10.2" cy="7.2" rx="1.9" ry="2.4" strokeWidth="1.8" fill="currentColor" fillOpacity="0.25" />
    <ellipse cx="14.8" cy="7.5" rx="1.9" ry="2.4" strokeWidth="1.8" fill="currentColor" fillOpacity="0.25" />
    <ellipse cx="18.5" cy="10.5" rx="1.8" ry="2.2" strokeWidth="1.8" fill="currentColor" fillOpacity="0.25" />
  </svg>
);

// 4. Hueso / Fósil prehistórico dibujado a mano
export const DoodleBone: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      d="M18.8 4.2 C17.5 3.5, 15.8 4.8, 15.5 6.2 L8.2 13.5 C6.8 13.2, 5.2 12.0, 4.2 13.2 C3.2 14.5, 4.0 16.8, 3.5 17.8 C3.0 19.0, 4.5 20.8, 5.8 20.2 C7.0 19.8, 9.2 20.5, 10.5 19.2 C11.5 18.2, 10.5 16.8, 10.2 15.5 L17.5 8.2 C19.0 8.5, 20.5 7.0, 20.2 5.8 C19.8 4.5, 19.8 4.6, 18.8 4.2 Z"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.15"
    />
  </svg>
);

// 5. Lápiz / Pluma dibujada a mano
export const DoodlePencil: React.FC<DoodleIconProps> = ({ className = 'w-4 h-4', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      d="M18.2 2.8 L21.2 5.8 C21.8 6.4, 21.8 7.4, 21.2 8.0 L8.5 20.7 L3.0 21.5 L3.8 16.0 L16.5 3.3 C17.0 2.8, 17.8 2.5, 18.2 2.8 Z"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.12"
    />
    <path d="M14.5 5.5 L18.5 9.5" strokeWidth="1.8" />
    <path d="M3.0 21.5 L7.0 19.5" strokeWidth="1.6" />
  </svg>
);

// 6. Espadas cruzadas dibujadas a mano (Sala de Mando y Estrategia)
export const DoodleSwords: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4.2 4.2 L15.5 15.5 M15.5 15.5 L19.8 19.8 M14.2 16.8 L16.8 14.2" strokeWidth="2.2" />
    <circle cx="20.5" cy="20.5" r="1.5" fill="currentColor" strokeWidth="1.2" />
    <path d="M19.8 4.2 L8.5 15.5 M8.5 15.5 L4.2 19.8 M9.8 16.8 L7.2 14.2" strokeWidth="2.2" />
    <circle cx="3.5" cy="20.5" r="1.5" fill="currentColor" strokeWidth="1.2" />
    <path d="M5.5 3.0 L3.0 5.5 M18.5 3.0 L21.0 5.5" strokeWidth="1.8" />
  </svg>
);

// 7. Corona real dibujada a mano
export const DoodleCrown: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      d="M3.5 17.5 L2.5 8.2 L7.8 12.5 L12.0 5.5 L16.2 12.5 L21.5 8.2 L20.5 17.5 Z"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.18"
    />
    <path d="M3.5 17.5 Q12 19.5 20.5 17.5" strokeWidth="2" />
    <circle cx="2.5" cy="7.5" r="1.2" fill="currentColor" />
    <circle cx="12" cy="4.5" r="1.2" fill="currentColor" />
    <circle cx="21.5" cy="7.5" r="1.2" fill="currentColor" />
  </svg>
);

// 8. Pergamino / Tratado dibujado a mano
export const DoodleScroll: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      d="M6.2 4.5 Q12 3.5 17.8 4.5 C19.5 4.5, 20.5 6.0, 20.0 7.8 L18.5 18.5 C18.0 20.2, 16.5 21.0, 14.8 20.8 Q9.0 20.0 4.2 21.0 C2.5 21.0, 2.0 19.5, 2.5 17.8 L4.0 7.2 C4.5 5.5, 5.2 4.5, 6.2 4.5 Z"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.12"
    />
    <path d="M7 9 L15 9 M6.5 12.5 L16 12.5 M7 16 L13 16" strokeWidth="1.6" />
    <circle cx="15.5" cy="16.5" r="1.8" fill="currentColor" strokeWidth="1" />
  </svg>
);

// 9. Castillo y fortaleza medieval dibujada a mano
export const DoodleCastle: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      d="M3.5 20.5 L3.5 9.0 L5.5 9.0 L5.5 11.0 L7.5 11.0 L7.5 9.0 L9.5 9.0 L9.5 13.5 L14.5 13.5 L14.5 9.0 L16.5 9.0 L16.5 11.0 L18.5 11.0 L18.5 9.0 L20.5 9.0 L20.5 20.5 Z"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.12"
    />
    <path d="M9.5 13.5 L9.5 6.5 L12.0 3.5 L14.5 6.5 L14.5 13.5" strokeWidth="1.8" />
    <path d="M10.2 20.5 L10.2 17.0 Q12 15.5 13.8 17.0 L13.8 20.5" strokeWidth="2" fill="currentColor" fillOpacity="0.25" />
  </svg>
);

// 10. Navío de velas / Carabela dibujada a mano (EU4 / Port Royale)
export const DoodleShip: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      d="M3.2 16.5 Q12 18.5 20.8 16.5 L18.5 20.2 Q12 21.5 5.5 20.2 Z"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.2"
    />
    <path d="M12 4 L12 17" strokeWidth="2.2" />
    <path
      d="M12.5 5.0 Q18 7.5 17.5 13.5 L12.5 13.0 Z"
      strokeWidth="1.8"
      fill="currentColor"
      fillOpacity="0.15"
    />
    <path d="M11.5 6.5 L6.5 13.5 L11.5 13.5 Z" strokeWidth="1.6" />
    <path d="M2 21.5 Q6 20.5 10 21.5 T18 21.5 T22 21.5" strokeWidth="1.6" />
  </svg>
);

// 11. Paloma de la paz dibujada a mano
export const DoodleDove: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      d="M18.5 7.5 Q22 6.5 20.5 10.5 C19.5 13.0, 16.5 15.0, 13.5 15.5 L12.0 19.5 Q10.5 20.5 9.0 18.0 L9.5 15.2 C7.5 14.8, 5.0 14.0, 3.2 11.5 C2.5 10.5, 4.0 9.5, 6.0 10.2 C7.5 10.8, 9.5 9.0, 11.5 6.5 C13.5 4.0, 16.5 3.0, 17.5 5.5 Z"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.14"
    />
    <circle cx="17.2" cy="7.2" r="1.1" fill="currentColor" />
    <path d="M20.5 8.5 L22.8 7.0 M21.8 7.8 L22.8 9.0" strokeWidth="1.5" />
  </svg>
);

// 12. Engranajes / Mecánicas de juego dibujados a mano
export const DoodleGears: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      d="M10.5 3.2 L13.5 3.2 L14.0 5.2 L16.0 6.0 L17.8 4.8 L19.8 6.8 L18.6 8.6 L19.4 10.6 L21.4 11.1 L21.4 14.1 L19.4 14.6 L18.6 16.6 L19.8 18.4 L17.8 20.4 L16.0 19.2 L14.0 20.0 L13.5 22.0 L10.5 22.0 L10.0 20.0 L8.0 19.2 L6.2 20.4 L4.2 18.4 L5.4 16.6 L4.6 14.6 L2.6 14.1 L2.6 11.1 L4.6 10.6 L5.4 8.6 L4.2 6.8 L6.2 4.8 L8.0 6.0 L10.0 5.2 Z"
      strokeWidth="1.8"
      fill="currentColor"
      fillOpacity="0.12"
    />
    <circle cx="12" cy="12.6" r="3.2" strokeWidth="2" fill="none" />
  </svg>
);

// 13. Galaxia espiral dibujada a mano (Stellaris)
export const DoodleGalaxy: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      d="M12 12 Q14 8 18 7 Q21 6.5 20.5 10 Q19.5 15 15 16.5 Q12 17.5 12 12"
      strokeWidth="2.2"
      fill="currentColor"
      fillOpacity="0.15"
    />
    <path
      d="M12 12 Q10 16 6 17 Q3 17.5 3.5 14 Q4.5 9 9 7.5 Q12 6.5 12 12"
      strokeWidth="2.2"
      fill="currentColor"
      fillOpacity="0.15"
    />
    <circle cx="12" cy="12" r="1.8" fill="currentColor" />
    <circle cx="19" cy="5" r="0.9" fill="currentColor" />
    <circle cx="5" cy="19" r="0.9" fill="currentColor" />
    <circle cx="18" cy="18" r="0.8" fill="currentColor" />
  </svg>
);

// 14. Ovni / Nave espacial dibujada a mano
export const DoodleUFO: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8.5 10 C8.5 6.5, 15.5 6.5, 15.5 10 Z" strokeWidth="2" fill="currentColor" fillOpacity="0.25" />
    <circle cx="12" cy="8.2" r="1" fill="currentColor" />
    <path
      d="M2.5 13.5 C2.5 11.2, 21.5 11.2, 21.5 13.5 C21.5 16.0, 2.5 16.0, 2.5 13.5 Z"
      strokeWidth="2.2"
      fill="currentColor"
      fillOpacity="0.15"
    />
    <circle cx="6.5" cy="13.5" r="0.9" fill="currentColor" />
    <circle cx="12.0" cy="13.8" r="0.9" fill="currentColor" />
    <circle cx="17.5" cy="13.5" r="0.9" fill="currentColor" />
    <path d="M8.5 16 L6.0 21 M15.5 16 L18.0 21" strokeWidth="1.6" strokeDasharray="2 2" />
  </svg>
);

// 15. Senado / Templo clásico dibujado a mano
export const DoodleSenate: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2.8 7.5 L12.0 3.0 L21.2 7.5 Z" strokeWidth="2" fill="currentColor" fillOpacity="0.15" />
    <path d="M3.5 9 L20.5 9" strokeWidth="2" />
    <path d="M5.5 9.5 L5.5 18 M9.8 9.5 L9.8 18 M14.2 9.5 L14.2 18 M18.5 9.5 L18.5 18" strokeWidth="2" />
    <path d="M2.5 18.5 L21.5 18.5 M1.5 21 L22.5 21" strokeWidth="2" />
  </svg>
);

// 16. Fábrica de producción dibujada a mano (HOI4)
export const DoodleFactory: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      d="M3 20.5 L3 11 L7.5 14 L7.5 11 L12 14 L12 7 L16.5 10.5 L16.5 6.5 L21 6.5 L21 20.5 Z"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.12"
    />
    <rect x="5.5" y="16" width="2.5" height="2.5" strokeWidth="1.4" />
    <rect x="10" y="16" width="2.5" height="2.5" strokeWidth="1.4" />
    <rect x="14.5" y="16" width="2.5" height="2.5" strokeWidth="1.4" />
    <path d="M18.5 4.5 Q18 2.5 19.5 1.5 M17.0 3.8 Q16 2.0 17.5 1.0" strokeWidth="1.5" />
  </svg>
);

// 17. Locomotora / Tren de suministros dibujado a mano (HOI4)
export const DoodleTrain: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      d="M3 16.5 L3 11 Q6 10.5 11 11 L11 7 L19 7 L19 16.5 Z"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.12"
    />
    <path d="M6 10.8 L5.5 6 L8.5 6 L8 10.8" strokeWidth="1.8" />
    <circle cx="6" cy="18" r="2.2" strokeWidth="2" fill="currentColor" fillOpacity="0.2" />
    <circle cx="11.5" cy="18" r="2.2" strokeWidth="2" fill="currentColor" fillOpacity="0.2" />
    <circle cx="17" cy="18" r="2.2" strokeWidth="2" fill="currentColor" fillOpacity="0.2" />
    <path d="M1 21 L23 21" strokeWidth="2" />
  </svg>
);

// 18. Escudo heráldico dibujado a mano
export const DoodleShield: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      d="M12 3 Q18 3.5 19.5 6.5 C20 12, 17 18, 12 21 C7 18, 4 12, 4.5 6.5 Q6 3.5 12 3 Z"
      strokeWidth="2.2"
      fill="currentColor"
      fillOpacity="0.15"
    />
    <path d="M12 6 L12 18 M7.5 10 L16.5 10" strokeWidth="1.8" />
  </svg>
);

// 19. Microscopio / Investigación dibujado a mano
export const DoodleMicroscope: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8 4 L14 10 L12 12 L6 6 Z" strokeWidth="2" fill="currentColor" fillOpacity="0.18" />
    <path d="M15 11 L17 13" strokeWidth="2.2" />
    <path d="M10 11 Q17 12 15 18" strokeWidth="2" />
    <path d="M8 15 L14 15 M4 21 L18 21" strokeWidth="2.2" />
  </svg>
);

// 20. Ancla naval dibujada a mano (Port Royale)
export const DoodleAnchor: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="5" r="2" strokeWidth="2" />
    <path d="M12 7 L12 19 M7 10 L17 10" strokeWidth="2.2" />
    <path d="M4 14 C4.5 19, 19.5 19, 20 14 M3 13 L5 14 M21 13 L19 14" strokeWidth="2.2" />
  </svg>
);

// 21. Troncos de madera / Recursos dibujados a mano
export const DoodleWood: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <ellipse cx="6" cy="15" rx="3" ry="4" strokeWidth="2" fill="currentColor" fillOpacity="0.2" />
    <circle cx="6" cy="15" r="1.5" strokeWidth="1.2" />
    <path d="M6 11 L18 8 C20 8, 21 11, 20 14 L6 19" strokeWidth="2" fill="currentColor" fillOpacity="0.1" />
  </svg>
);

// 22. Bandera pirata con calavera dibujada a mano
export const DoodlePirate: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 3 L4 21 M4 4 L20 6 L18 13 L4 12" strokeWidth="2" fill="currentColor" fillOpacity="0.15" />
    <circle cx="11" cy="8.5" r="1.8" strokeWidth="1.4" />
    <path d="M10 10.5 L12 10.5 M8.5 7.5 L13.5 9.5 M13.5 7.5 L8.5 9.5" strokeWidth="1.2" />
  </svg>
);

// 23. Cometa celeste dibujado a mano
export const DoodleComet: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="17.5" cy="6.5" r="3.5" strokeWidth="2.2" fill="currentColor" fillOpacity="0.3" />
    <path d="M14.5 8.5 Q10 12 3 13 M16 10 Q11 15 4 17.5 M17.5 10 Q14 17 7 21" strokeWidth="2" />
  </svg>
);

// 24. Estrella brillante dibujada a mano
export const DoodleStar: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      d="M12 2.8 L14.5 8.5 L20.8 9.2 L16.0 13.5 L17.5 19.8 L12.0 16.5 L6.5 19.8 L8.0 13.5 L3.2 9.2 L9.5 8.5 Z"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.22"
    />
  </svg>
);

// 25. Planeta con anillos dibujado a mano (Saturno)
export const DoodlePlanet: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="5.5" strokeWidth="2" fill="currentColor" fillOpacity="0.15" />
    <path d="M2.5 14 C4 8.5, 20 8.5, 21.5 14 C20 18.5, 4 18.5, 2.5 14" strokeWidth="2" />
  </svg>
);

// 26. Rayo eléctrico dibujado a mano
export const DoodleLightning: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      d="M13.5 2.5 L5.5 13.0 L11.5 13.0 L9.5 21.5 L18.5 10.5 L12.5 10.5 Z"
      strokeWidth="2.2"
      fill="currentColor"
      fillOpacity="0.25"
    />
  </svg>
);

// 27. Avión de combate / Aviación dibujado a mano
export const DoodleAirplane: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      d="M17.5 3.5 L19.5 5.5 L14.5 11.5 L20.5 16.5 L18.5 18.5 L11.5 14.5 L7.5 18.5 L7.5 20.5 L5.5 20.5 L6.5 17.5 L2.5 13.5 L4.5 13.5 L4.5 15.5 L8.5 11.5 L4.5 4.5 L6.5 2.5 L11.5 8.5 Z"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.14"
    />
  </svg>
);

// 28. Radio y telecomunicaciones dibujada a mano
export const DoodleRadio: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5.5 9 L17.5 3.5" strokeWidth="2" />
    <rect x="3.5" y="9" width="17" height="11.5" rx="2" strokeWidth="2" fill="currentColor" fillOpacity="0.12" />
    <circle cx="8.5" cy="14.8" r="2.8" strokeWidth="1.8" />
    <circle cx="16" cy="12.5" r="1.2" fill="currentColor" />
    <circle cx="16" cy="16.5" r="1.2" fill="currentColor" />
  </svg>
);

// 29. Medalla militar dibujada a mano
export const DoodleMedal: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8 3.5 L12 7.5 L16 3.5 L14 11 L10 11 Z" strokeWidth="2" fill="currentColor" fillOpacity="0.2" />
    <circle cx="12" cy="16.5" r="4.5" strokeWidth="2.2" fill="currentColor" fillOpacity="0.25" />
    <circle cx="12" cy="16.5" r="2" strokeWidth="1.2" />
  </svg>
);

// 30. Casco de combate dibujado a mano
export const DoodleHelmet: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      d="M3.5 14.5 C3.5 7.5, 20.5 7.5, 20.5 14.5 L21.5 16.5 L2.5 16.5 Z"
      strokeWidth="2.2"
      fill="currentColor"
      fillOpacity="0.18"
    />
    <path d="M12 7.5 L12 16.5" strokeWidth="1.6" strokeDasharray="2 2" />
  </svg>
);

// 31. Olas oceánicas dibujadas a mano
export const DoodleWaves: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2.5 8 Q6 5.5 9.5 8 T16.5 8 T21.5 8" strokeWidth="2.2" />
    <path d="M2.5 13 Q6 10.5 9.5 13 T16.5 13 T21.5 13" strokeWidth="2.2" />
    <path d="M2.5 18 Q6 15.5 9.5 18 T16.5 18 T21.5 18" strokeWidth="2.2" />
  </svg>
);

// 32. Dado de juego dibujado a mano (Eventos aleatorios)
export const DoodleDice: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      d="M12 3.5 L19.5 7.5 L12 11.5 L4.5 7.5 Z"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.15"
    />
    <path
      d="M4.5 7.5 L4.5 16.5 L12 20.5 L12 11.5 Z"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.22"
    />
    <path
      d="M19.5 7.5 L19.5 16.5 L12 20.5 L12 11.5 Z"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <circle cx="12" cy="7.5" r="1.1" fill="currentColor" />
    <circle cx="7.5" cy="13.5" r="0.9" fill="currentColor" />
    <circle cx="9" cy="16.5" r="0.9" fill="currentColor" />
    <circle cx="15" cy="13.5" r="0.9" fill="currentColor" />
    <circle cx="16.5" cy="16.5" r="0.9" fill="currentColor" />
  </svg>
);

// 33. Corazón dibujado a mano
export const DoodleHeart: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      d="M12 20.5 Q4 14.5 3.5 9 C3 5.5, 6 3.5, 9 4.5 Q12 6 12 8 Q12 6 15 4.5 C18 3.5, 21 5.5, 20.5 9 Q20 14.5 12 20.5 Z"
      strokeWidth="2.2"
      fill="currentColor"
      fillOpacity="0.25"
    />
  </svg>
);

// 34. Destellos / Chispas dibujados a mano
export const DoodleSparkles: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      d="M12 3 C12 7.5, 13.5 9, 18 9 C13.5 9, 12 10.5, 12 15 C12 10.5, 10.5 9, 6 9 C10.5 9, 12 7.5, 12 3 Z"
      strokeWidth="1.8"
      fill="currentColor"
      fillOpacity="0.25"
    />
    <path
      d="M19 15 C19 17, 19.8 18, 22 18 C19.8 18, 19 19, 19 21 C19 19, 18.2 18, 16 18 C18.2 18, 19 17, 19 15 Z"
      strokeWidth="1.5"
      fill="currentColor"
      fillOpacity="0.2"
    />
  </svg>
);

// 35. Llaves de código dibujadas a mano
export const DoodleCode: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7.5 7.5 L3.2 12.0 L7.5 16.5" strokeWidth="2.2" />
    <path d="M16.5 7.5 L20.8 12.0 L16.5 16.5" strokeWidth="2.2" />
    <path d="M14.0 4.5 L10.0 19.5" strokeWidth="2" />
  </svg>
);

// 36. Base de datos / Pila de discos dibujada a mano
export const DoodleDatabase: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <ellipse cx="12" cy="5.5" rx="8" ry="2.8" strokeWidth="2" fill="currentColor" fillOpacity="0.15" />
    <path d="M4 5.5 L4 12 C4 13.8, 20 13.8, 20 12 L20 5.5" strokeWidth="2" />
    <path d="M4 12 L4 18.5 C4 20.2, 20 20.2, 20 18.5 L20 12" strokeWidth="2" fill="currentColor" fillOpacity="0.1" />
  </svg>
);

// 37. Nube dibujada a mano
export const DoodleCloud: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      d="M7 18.5 L17.5 18.5 C20 18.5, 21.5 16.5, 20.8 14.5 C20.2 12.5, 18.2 12, 17 12 C16.5 8.5, 13 6.5, 9.5 7.5 C7 8.2, 5.5 10.5, 5.8 13 C4 13.5, 3 15.5, 3.8 17.2 C4.5 18.5, 5.8 18.5, 7 18.5 Z"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.14"
    />
  </svg>
);

// 38. Servidor / Pila de racks dibujada a mano
export const DoodleServer: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3.5" y="4" width="17" height="6.5" rx="2" strokeWidth="2" fill="currentColor" fillOpacity="0.12" />
    <circle cx="7" cy="7.2" r="1" fill="currentColor" />
    <path d="M11 7.2 L17 7.2" strokeWidth="1.6" />
    <rect x="3.5" y="13.5" width="17" height="6.5" rx="2" strokeWidth="2" fill="currentColor" fillOpacity="0.12" />
    <circle cx="7" cy="16.8" r="1" fill="currentColor" />
    <path d="M11 16.8 L17 16.8" strokeWidth="1.6" />
  </svg>
);

// 39. Maquetación / Interfaz de usuario dibujada a mano
export const DoodleLayout: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" strokeWidth="2" fill="currentColor" fillOpacity="0.08" />
    <path d="M3.5 9 L20.5 9 M9.5 9 L9.5 20.5" strokeWidth="1.8" />
    <circle cx="6" cy="6.2" r="0.8" fill="currentColor" />
    <circle cx="8.5" cy="6.2" r="0.8" fill="currentColor" />
  </svg>
);

// 40. Libro / Publicación académica dibujada a mano (ORCID)
export const DoodleBook: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      d="M4 19.5 C5.5 18.2, 8.5 18.2, 12 19.5 C15.5 18.2, 18.5 18.2, 20 19.5 L20 5.5 C18.5 4.2, 15.5 4.2, 12 5.5 C8.5 4.2, 5.5 4.2, 4 5.5 Z"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.12"
    />
    <path d="M12 5.5 L12 19.5" strokeWidth="2" />
    <path d="M6.5 9 L9.5 9 M6.5 12.5 L10 12.5 M14 9 L17.5 9 M14 12.5 L17 12.5" strokeWidth="1.4" />
  </svg>
);

// 41. Volumen / Rugido prehistórico dibujado a mano
export const DoodleVolume: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 9.5 L8 9.5 L13 5.5 L13 18.5 L8 14.5 L4 14.5 Z" strokeWidth="2" fill="currentColor" fillOpacity="0.15" />
    <path d="M16.5 8.5 Q19 12 16.5 15.5" strokeWidth="2" />
    <path d="M19 6 Q22.5 12 19 18" strokeWidth="2" />
  </svg>
);

// 42. Deshacer acción dibujado a mano
export const DoodleUndo: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 14 L4 9 L9 4" strokeWidth="2.2" />
    <path d="M4 9 L14 9 C18 9, 20 11, 20 15 C20 19, 17 20, 13 20" strokeWidth="2" />
  </svg>
);

// 43. Rehacer acción dibujado a mano
export const DoodleRedo: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 14 L20 9 L15 4" strokeWidth="2.2" />
    <path d="M20 9 L10 9 C6 9, 4 11, 4 15 C4 19, 7 20, 11 20" strokeWidth="2" />
  </svg>
);

// 44. Borrador / Goma de borrar dibujada a mano
export const DoodleEraser: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 21 L21 21" strokeWidth="2" />
    <path d="M18 3.5 L20.5 6 C21.5 7, 21.5 8.5, 20.5 9.5 L12 18 L6 18 L3.5 15.5 C2.5 14.5, 2.5 13, 3.5 12 L12 3.5 C13 2.5, 14.5 2.5, 15.5 3.5 Z" strokeWidth="2" fill="currentColor" fillOpacity="0.15" />
    <path d="M8.5 7 L17 15.5" strokeWidth="1.8" />
  </svg>
);

// 45. Flecha hacia abajo dibujada a mano
export const DoodleChevronDown: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 9.5 L12 15.5 L18 9.5" strokeWidth="2.5" />
  </svg>
);

// 46. Marca de verificación dibujada a mano
export const DoodleCheck: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4.5 12.5 L9.5 17.5 L19.5 6.5" strokeWidth="2.8" />
  </svg>
);

// 47. Globo terráqueo / Mundo dibujado a mano
export const DoodleGlobe: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="9" strokeWidth="2" fill="currentColor" fillOpacity="0.1" />
    <path d="M3.5 12 L20.5 12" strokeWidth="1.8" />
    <ellipse cx="12" cy="12" rx="4.5" ry="9" strokeWidth="1.8" />
  </svg>
);

// 48. Cohete espacial dibujado a mano
export const DoodleRocket: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      d="M13.5 3 C13.5 3, 20.5 4.5, 20.5 11.5 C20.5 15, 17.5 18.5, 14 18.5 L10.5 15 L6.5 15 L6.5 11 L10 7.5 C10 4, 13.5 3, 13.5 3 Z"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.15"
    />
    <circle cx="14.5" cy="9.5" r="1.5" strokeWidth="1.6" />
    <path d="M5.5 18.5 L2.5 21.5 M9 21.5 L7.5 17.5 M2.5 15 L6.5 16.5" strokeWidth="1.8" />
  </svg>
);

// 49. Trofeo de logro dibujado a mano
export const DoodleTrophy: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6.5 4.5 L17.5 4.5 L17.5 10 C17.5 13.5, 15 16, 12 16 C9 16, 6.5 13.5, 6.5 10 Z" strokeWidth="2" fill="currentColor" fillOpacity="0.15" />
    <path d="M6.5 6 L3 6 C2.5 6, 2 8, 3 10 C4 11.5, 5.5 11.5, 6.5 11" strokeWidth="1.8" />
    <path d="M17.5 6 L21 6 C21.5 6, 22 8, 21 10 C20 11.5, 18.5 11.5, 17.5 11" strokeWidth="1.8" />
    <path d="M12 16 L12 20 M8 20 L16 20" strokeWidth="2" />
  </svg>
);

// 50. Comillas de testimonio dibujadas a mano
export const DoodleQuote: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 12 C4 8.5, 6.5 6.5, 9.5 6 L10 7.5 C8 8, 7.2 9, 7.2 10.5 L10 10.5 L10 17 L4 17 Z" strokeWidth="1.8" fill="currentColor" fillOpacity="0.2" />
    <path d="M14 12 C14 8.5, 16.5 6.5, 19.5 6 L20 7.5 C18 8, 17.2 9, 17.2 10.5 L20 10.5 L20 17 L14 17 Z" strokeWidth="1.8" fill="currentColor" fillOpacity="0.2" />
  </svg>
);

// 51. Crayón de cera dibujado a mano (estilo prehistórico / boceto)
export const DoodleCrayon: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      d="M3.2 20.8 L7.0 20.8 L3.2 17.0 Z"
      strokeWidth="1.8"
      fill="currentColor"
      fillOpacity="0.55"
    />
    <path
      d="M7.0 20.8 L20.5 7.3 C21.2 6.6, 21.2 5.4, 20.5 4.7 L19.3 3.5 C18.6 2.8, 17.4 2.8, 16.7 3.5 L3.2 17.0"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.2"
    />
    <path d="M7.5 12.8 L11.2 16.5" strokeWidth="1.8" strokeDasharray="1 1" />
    <path d="M11.5 8.8 L15.2 12.5" strokeWidth="1.8" strokeDasharray="1 1" />
    <path d="M5.1 18.9 L6.5 17.5" strokeWidth="1.6" />
  </svg>
);

// 52. Triceratops dibujado a mano (Dinosaurio Ceratópsido)
export const DoodleTriceratops: React.FC<DoodleIconProps> = ({ className = 'w-6 h-6', wobbly = false }) => (
  <svg
    viewBox="0 0 36 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      d="M 3.5 19.5 Q 6.5 20.5 9.5 18.5 Q 14.5 13.5 22.5 15.0 L 22.5 21.5 Q 14.5 23.0 3.5 19.5 Z"
      strokeWidth="1.8"
      fill="currentColor"
      fillOpacity="0.12"
    />
    <path
      d="M 21.0 12.0 Q 23.0 7.5 27.0 8.0 Q 30.5 8.5 30.0 13.0 Q 29.5 16.5 25.5 17.5 Z"
      strokeWidth="1.8"
      fill="currentColor"
      fillOpacity="0.2"
    />
    <path d="M 23.5 8.5 Q 25.0 7.0 27.0 7.8 Q 28.5 7.2 29.5 9.0" strokeWidth="1.4" />
    <path
      d="M 25.0 16.0 L 31.5 17.0 Q 33.0 19.5 31.0 21.0 L 25.5 19.5"
      strokeWidth="1.8"
    />
    <path d="M 25.5 13.5 Q 30.5 9.5 33.0 9.0" strokeWidth="2.0" />
    <path d="M 24.0 12.5 Q 28.0 8.0 30.5 7.0" strokeWidth="1.5" />
    <path d="M 30.5 17.0 Q 33.0 14.0 32.5 13.0" strokeWidth="1.8" />
    <circle cx="26.8" cy="14.8" r="0.9" fill="currentColor" strokeWidth="0.5" />
    <path d="M 30.5 19.2 Q 31.8 19.8 32.0 18.8" strokeWidth="1.2" />
    <path d="M 9.5 19.0 L 9.0 24.5 L 12.0 24.5 L 12.5 19.0" strokeWidth="1.8" />
    <path d="M 14.0 19.0 L 14.5 24.0 L 16.8 24.0" strokeWidth="1.5" />
    <path d="M 20.5 18.5 L 20.2 24.5 L 23.2 24.5 L 23.5 17.8" strokeWidth="1.8" />
    <path d="M 2.0 25.5 L 34.0 25.5" strokeWidth="1.2" strokeDasharray="2 3" opacity="0.6" />
  </svg>
);

// 53. Descargar / Exportar dibujo dibujado a mano
export const DoodleDownload: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3.5 L12 15.5 M7.5 11 L12 15.5 L16.5 11" strokeWidth="2.2" />
    <path
      d="M4 14.5 L4 19.5 C4 20.2, 4.8 20.8, 5.8 20.8 L18.2 20.8 C19.2 20.8, 20 20.2, 20 19.5 L20 14.5"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.12"
    />
  </svg>
);

// 54. Deslizadores / Controles de intensidad dibujados a mano
export const DoodleSliders: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3.5 7 L20.5 7" strokeWidth="2" />
    <circle cx="9" cy="7" r="2.5" strokeWidth="1.8" fill="currentColor" fillOpacity="0.25" />
    <path d="M3.5 17 L20.5 17" strokeWidth="2" />
    <circle cx="15.5" cy="17" r="2.5" strokeWidth="1.8" fill="currentColor" fillOpacity="0.25" />
  </svg>
);

// 55. Telescopio Astronómico dibujado a mano
export const DoodleTelescope: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      d="M9 13.5 L19.5 4.5 C20.2 3.8, 21.2 4.8, 20.5 5.5 L11.5 16 Z"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.2"
    />
    <path d="M6 16.5 L9 13.5 L11.5 16 L8.5 19 Z" strokeWidth="1.8" fill="currentColor" fillOpacity="0.3" />
    <path d="M4 18.5 L6 16.5" strokeWidth="2.4" />
    <path d="M10 15 L6 22 M10 15 L10 22 M10 15 L14 22" strokeWidth="2" />
    <path d="M21 2 L22 3.5 M22 2 L21 3.5" strokeWidth="1.4" />
  </svg>
);

// 56. Radar / Escáner de telemetría cósmica
export const DoodleRadar: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      d="M4.5 14.5 C4.5 8, 10 3.5, 16.5 4.5 C18 4.8, 19.5 6, 19.5 7.5 C19.5 14, 14 19.5, 7.5 19.5 C6 19.5, 4.8 18, 4.5 16.5"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.15"
    />
    <path d="M12 12 L18 6" strokeWidth="2.2" />
    <circle cx="18" cy="6" r="1.5" fill="currentColor" />
    <path d="M17 11 C18.5 9.5, 19.5 8, 20 6" strokeWidth="1.6" strokeDasharray="2 2" />
    <path d="M19 14 C21 11.5, 22 9, 22.5 6.5" strokeWidth="1.4" strokeDasharray="2 2" />
    <path d="M7 17 L3.5 21 M8.5 18.5 L7 21.5" strokeWidth="2" />
  </svg>
);

// 57. Órbita elíptica cósmica
export const DoodleOrbit: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <ellipse cx="12" cy="12" rx="9" ry="5.5" strokeWidth="1.8" transform="rotate(-25 12 12)" strokeDasharray="3 2" />
    <circle cx="12" cy="12" r="3.5" strokeWidth="1.8" fill="currentColor" fillOpacity="0.3" />
    <circle cx="19" cy="8" r="1.8" fill="currentColor" />
  </svg>
);





