// Biblioteca de iconos vectoriales SVG con trazos estilo de dibujo doodle

import React from 'react';

interface DoodleIconProps {
  className?: string;
  wobbly?: boolean;
}


// Función auxiliar para animación de oscilación
const wobble = (w?: boolean) => (w ? 'animate-pulse' : '');

// 1. Mando / Joystick de videojuegos
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

// 2. Gato
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

// 3. Huella de gato
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

// 4. Hueso / Fósil prehistórico
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

// 5. Lápiz doodle
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

// 6. Espadas cruzadas
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

// 7. Corona
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

// 8. Navío Carabela dibujada
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

// 9. Fábrica de producción
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

// 10. Escudo heráldico
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

// 11. DoodleMoon
export const DoodleMoon: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
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
      d="M14.8 3.5 C 10.4 4.5, 7.3 8.3, 7.6 13.0 C 7.9 17.6, 11.4 20.8, 15.8 20.6 C 17.2 20.5, 18.4 20.0, 19.4 19.2 C 16.0 18.1, 13.4 15.4, 13.2 11.6 C 13.0 7.8, 15.1 4.7, 18.2 3.8 C 17.1 3.4, 15.9 3.3, 14.8 3.5 Z"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.25"
    />
    <circle cx="10.8" cy="11.5" r="1.1" strokeWidth="1.2" fill="none" />
    <circle cx="12.5" cy="16.0" r="0.8" strokeWidth="1.2" fill="none" />
  </svg>
);

// 12. Saturno
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

// 13. Dado de juego
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

// 14. Robot
export const DoodleBot: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 6.5 L12 3.5" strokeWidth="2" />
    <circle cx="12" cy="2.5" r="1.5" strokeWidth="1.8" fill="currentColor" fillOpacity="0.3" />

    <rect
      x="4"
      y="6.5"
      width="16"
      height="14"
      rx="3.5"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.14"
    />

    <circle cx="8.5" cy="12" r="1.5" fill="currentColor" />
    <circle cx="15.5" cy="12" r="1.5" fill="currentColor" />

    <path d="M8.5 16.5 C10.2 18 13.8 18 15.5 16.5" strokeWidth="1.8" />

    <path d="M1.8 12.5 L4 12.5 M20 12.5 L22.2 12.5" strokeWidth="2" />
  </svg>
);

// 15. Usuario
export const DoodleUser: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle
      cx="12"
      cy="7.5"
      r="4"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.14"
    />
    <path
      d="M4.5 20.5 C4.5 16.5, 7.8 14.5, 12 14.5 C16.2 14.5, 19.5 16.5, 19.5 20.5"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.1"
    />
  </svg>
);

// 16. Llaves
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

// 17. Base de datos
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

// 18. Nube
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

// 19. Servidor
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

// 20. Maquetación
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

// 21. Libro
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

// 22. Volumen
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

// 23. Deshacer acción
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

// 24. Rehacer acción
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

// 25. Borrador
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

// 26. Flecha hacia abajo
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

// 27. Marca de verificación
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

// 28. Globo terráqueo
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

// 29. Cohete espacial
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

// 30. Triceratops dibujo
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

// 31. Descargar / Exportar
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

// 32. Controles de intensidad
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

// 33. Telescopio Astronómico
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

// 34. Radar / Escáner
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

// 35. Órbita elíptica cósmica
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

// 36. Corazón
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

// 37. Destellos / Chispas
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

// 38. Matraz / Frasco de pruebas
export const DoodleFlask: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${wobble(wobbly)}`}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 2.5 L14 2.5 M10 4 L14 4 M10 4 L10 8.5 L4.5 19 C3.8 20.2 4.6 21.5 6 21.5 L18 21.5 C19.4 21.5 20.2 20.2 19.5 19 L14 8.5 L14 4" strokeWidth="2" />
    <path d="M7 16 C8.5 14.8 11.5 16.5 14 15 C15.5 14.2 16.5 14.8 17 16 L18.5 19 C18.8 19.8 18.2 20.5 17.5 20.5 L6.5 20.5 C5.8 20.5 5.2 19.8 5.5 19 Z" strokeWidth="1.6" fill="currentColor" fillOpacity="0.22" />
    <circle cx="10" cy="18" r="0.9" fill="currentColor" />
    <circle cx="13.5" cy="17" r="1.1" fill="currentColor" />
  </svg>
);

// 39. Paleta de pincel
export const DoodlePalette: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
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
      d="M12 2.8 C6.5 2.8 2.5 6.8 2.5 12 C2.5 17 6.2 21 11 21 C12.2 21 13 20 13 19 C13 18.2 12.6 17.5 12.6 16.8 C12.6 15.5 13.6 14.5 14.8 14.5 L16.5 14.5 C19.5 14.5 21.5 12.5 21.5 9.5 C21.5 5.5 17.2 2.8 12 2.8 Z"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.14"
    />
    <circle cx="7.5" cy="8.5" r="1.3" fill="currentColor" />
    <circle cx="11.8" cy="6.8" r="1.3" fill="currentColor" />
    <circle cx="16.5" cy="8.5" r="1.3" fill="currentColor" />
    <circle cx="17.2" cy="12.2" r="1.3" fill="currentColor" />
    <circle cx="8.5" cy="16.5" r="1.5" strokeWidth="1.8" fill="none" />
  </svg>
);

// 40. Llave inglesa / Herramientas doodle
export const DoodleWrench: React.FC<DoodleIconProps> = ({ className = 'w-5 h-5', wobbly = false }) => (
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
      d="M14.7 6.3 A 4.8 4.8 0 0 0 7.4 13.6 L2.6 18.4 C 1.9 19.1 1.9 20.3 2.6 21 C 3.3 21.7 4.5 21.7 5.2 21 L10 16.2 A 4.8 4.8 0 0 0 17.3 8.9 L14.7 11.4 L12.2 8.9 Z"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.14"
    />
    <circle cx="4.2" cy="19.8" r="0.75" fill="currentColor" />
  </svg>
);

