// Componente de gato en pixel art

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface PixelCatProps {
  className?: string;
  isReady?: boolean;
}

// Direcciones de mirada (-1, 0, 1)
type PupilDir = { x: -1 | 0 | 1; y: -1 | 0 | 1 };

const TOTAL_ROWS = 32;
const BYTES_PER_ROW = 4; // Cada bite/byte = 8 píxeles de ancho (32 píxeles por fila)
const TOTAL_STEPS = TOTAL_ROWS * BYTES_PER_ROW; // 128 bites totales

export const PixelCat: React.FC<PixelCatProps> = ({ className = '', isReady = true }) => {
  const catSvgRef = useRef<SVGSVGElement | null>(null);

  // Estados de generación bit a bit (de arriba a abajo)
  const [isGenerated, setIsGenerated] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [genStep, setGenStep] = useState<number>(0);

  // Estados
  const [pupilDir, setPupilDir] = useState<PupilDir>({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState<boolean>(false);
  const [cleanPhase, setCleanPhase] = useState<number>(0); // 0 = reposo, 1..8 = fases de acicalamiento
  const [tailFrame, setTailFrame] = useState<0 | 1>(0);

  const cleanTimersRef = useRef<number[]>([]);
  const blinkTimerRef = useRef<number | null>(null);
  const tailIntervalRef = useRef<number | null>(null);

  // Animación de generación como juego
  useEffect(() => {
    if (!isReady) {
      setGenStep(0);
      setIsGenerated(false);
      setIsGenerating(false);
      return;
    }

    if (isGenerated) return;

    let animationFrameId: number;
    let startTime: number | null = null;
    const DURATION = 1150; // Duración de generación

    const startTimer = window.setTimeout(() => {
      setIsGenerating(true);

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(1, elapsed / DURATION);

        const currentStep = Math.floor(progress * TOTAL_STEPS);
        setGenStep(currentStep);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step);
        } else {
          setGenStep(TOTAL_STEPS);
          setIsGenerated(true);
          setIsGenerating(false);
        }
      };

      animationFrameId = requestAnimationFrame(step);
    }, 120);

    return () => {
      window.clearTimeout(startTimer);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isReady, isGenerated]);

  // Animación de cola
  useEffect(() => {
    if (!isGenerated) return;
    tailIntervalRef.current = window.setInterval(() => {
      setTailFrame((prev) => (prev === 0 ? 1 : 0));
    }, 1600);
    return () => {
      if (tailIntervalRef.current) window.clearInterval(tailIntervalRef.current);
    };
  }, [isGenerated]);

  // Pestañeo periódico
  useEffect(() => {
    if (!isGenerated) return;
    let active = true;
    const scheduleBlink = () => {
      if (!active) return;
      if (cleanPhase === 0) {
        setIsBlinking(true);
        window.setTimeout(() => {
          if (active) setIsBlinking(false);
        }, 150);
      }
      const delay = 2800 + Math.random() * 2400;
      blinkTimerRef.current = window.setTimeout(scheduleBlink, delay);
    };

    blinkTimerRef.current = window.setTimeout(scheduleBlink, 2000);
    return () => {
      active = false;
      if (blinkTimerRef.current) window.clearTimeout(blinkTimerRef.current);
    };
  }, [cleanPhase, isGenerated]);

  // Seguimiento ocular
  const handlePointerMove = useCallback((clientX: number, clientY: number) => {
    if (!isGenerated || cleanPhase !== 0 || !catSvgRef.current) return;

    const rect = catSvgRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width * 0.5;
    const centerY = rect.top + rect.height * 0.5;

    const dx = clientX - centerX;
    const dy = clientY - centerY;

    // Zona de interacción alrededor del gato.
    const activationRadius = Math.max(200, rect.width * 1.45);
    const distance = Math.hypot(dx, dy);

    if (distance > activationRadius) {
      setPupilDir((prev) =>
        prev.x === 0 && prev.y === 0 ? prev : { x: 0, y: 0 }
      );
      return;
    }

    // El seguimiento usa 9 direcciones.
    const thresholdX = Math.max(12, rect.width * 0.08);
    const thresholdY = Math.max(12, rect.height * 0.08);

    let nx: -1 | 0 | 1 = 0;
    let ny: -1 | 0 | 1 = 0;

    if (dx < -thresholdX) nx = -1;
    else if (dx > thresholdX) nx = 1;

    if (dy < -thresholdY) ny = -1;
    else if (dy > thresholdY) ny = 1;

    setPupilDir((prev) => {
      if (prev.x === nx && prev.y === ny) return prev;
      return { x: nx, y: ny };
    });
  }, [cleanPhase, isGenerated]);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      handlePointerMove(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [handlePointerMove]);

  // Animación de acicalamiento al hacer clic
  const handleCatClick = () => {
    if (!isGenerated || cleanPhase !== 0) return;

    cleanTimersRef.current.forEach((t) => window.clearTimeout(t));
    cleanTimersRef.current = [];

    const timeline = [
      { phase: 1, at: 0 },    // Sube la pata hacia el pecho
      { phase: 2, at: 180 },  // Llega al hocico, prepara la cara
      { phase: 3, at: 360 },  // Abre la boca, asoma la lengua
      { phase: 4, at: 560 },  // Lame la pata
      { phase: 5, at: 760 },  // Retira ligeramente la lengua
      { phase: 6, at: 940 },  // Segundo lamido
      { phase: 7, at: 1160 }, // Guarda la lengua
      { phase: 8, at: 1440 }, // Baja la pata hacia el suelo
      { phase: 0, at: 1640 }, // Regresa a reposo y mira al ratón
    ];

    timeline.forEach(({ phase, at }) => {
      const timer = window.setTimeout(() => {
        setCleanPhase(phase);
      }, at);
      cleanTimersRef.current.push(timer);
    });
  };

  useEffect(() => {
    return () => {
      cleanTimersRef.current.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  // Paleta de sombreado
  const P = {
    // Delineado y sombras
    OUTLINE: '#191512',
    OUTLINE_SOFT: '#2c241c',

    // Pelaje
    W_HI: '#ffffff',
    W_BASE: '#f8fafc',
    W_SHADE: '#e2e8f0',
    W_DEEP: '#cbd5e1',

    // Pelaje amarillo / anaranjado
    G_HI: '#fbbf24',
    G_GOLD: '#f59e0b',
    G_MID: '#ea580c',
    G_SHADE: '#c2410c',
    G_DEEP: '#9a3412',

    // Cuello y garganta
    NECK_SHADE: '#94a3b8',
    CHIN_SHADOW: '#cbd5e1',

    // Collar rojo oscuro y medalla
    COLLAR_HI: '#b91c1c',
    COLLAR_BASE: '#7f1d1d', 
    COLLAR_DEEP: '#450a0a',
    COLLAR_BUCKLE: '#e2e8f0',
    MEDAL_GOLD: '#f59e0b',
    MEDAL_HI: '#fde047',
    MEDAL_CORE: '#0f172a',

    // Nariz, boca y lengua
    PINK_HI: '#fecdd3',
    PINK_MID: '#f43f5e',
    PINK_DEEP: '#be123c',
    MOUTH_DARK: '#881337',
    PEACH_BLUSH: '#fed7aa',

    // Ojos ámbar
    EYE_HI: '#fde047',
    EYE_AMBER: '#f59e0b',
    EYE_SHADE: '#b45309',
    EYE_DEEP: '#78350f',
    EYE_PUPIL: '#09090b',
    EYE_GLINT: '#ffffff',

    // Sombras y brillos
    SHADOW_OUTER: 'rgba(0, 0, 0, 0.08)',
    SHADOW_MID: 'rgba(0, 0, 0, 0.16)',
    SHADOW_CORE: 'rgba(0, 0, 0, 0.28)',
    SPARKLE: '#ffffff',
    SPARKLE_GOLD: '#fef08a',
  };

  const Px = ({ x, y, c }: { x: number; y: number; c: string }) => (
    <rect x={x} y={y} width={1} height={1} fill={c} />
  );
  const Row = ({ x, y, w, c }: { x: number; y: number; w: number; c: string }) => (
    <rect x={x} y={y} width={w} height={1} fill={c} />
  );

  const isLicking = cleanPhase >= 3 && cleanPhase <= 6;
  const eyesHappyClosed = isBlinking || (cleanPhase >= 2 && cleanPhase <= 7);
  const px = pupilDir.x;
  const py = pupilDir.y;

  // Coordenadas de la generación de arriba hacia abajo
  const currentRow = Math.min(32, Math.floor(genStep / BYTES_PER_ROW));
  const currentCol = (genStep % BYTES_PER_ROW) * 8;

  return (
    <div
      onClick={handleCatClick}
      className={`relative select-none inline-flex items-center justify-center transition-transform ${
        isGenerated
          ? 'cursor-pointer hover:scale-[1.03] active:scale-[0.98]'
          : 'cursor-default'
      } ${className}`}
      id="pixel-cat-hero"
      role="button"
      tabIndex={isGenerated ? 0 : -1}
      title={isGenerated ? 'Acaricia a Alfonsino' : 'Cargando michi en 8-bits...'}
      aria-label="Acaricia a Alfonsino"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCatClick();
        }
      }}
    >
      <svg
        ref={catSvgRef}
        viewBox="0 0 32 32"
        className="w-44 h-44 sm:w-48 sm:h-48 lg:w-52 lg:h-52 drop-shadow-lg"
        style={{ shapeRendering: 'crispEdges', imageRendering: 'pixelated' }}
        aria-hidden="true"
      >
        {/* Máscara de recorte para la animación */}
        <defs>
          <clipPath id="cat-bit-scanline-clip">
            {/* Todas las filas completadas por encima */}
            {currentRow > 0 && (
              <rect x={0} y={0} width={32} height={currentRow} />
            )}
            {/* Fila actual generándose */}
            {currentCol > 0 && currentRow < 32 && (
              <rect x={0} y={currentRow} width={currentCol} height={1} />
            )}
          </clipPath>
        </defs>

        {/* Contenido completo */}
        <g id="cat-content-root" clipPath={!isGenerated ? 'url(#cat-bit-scanline-clip)' : undefined}>
        {/* 1. SOMBRA DEL SUELO */}
        <g id="ground-shadow">
          <Row x={5} y={29} w={22} c={P.SHADOW_OUTER} />
          <Row x={4} y={30} w={24} c={P.SHADOW_OUTER} />
          <Row x={6} y={29} w={20} c={P.SHADOW_MID} />
          <Row x={5} y={30} w={22} c={P.SHADOW_MID} />
          <Row x={8} y={29} w={16} c={P.SHADOW_CORE} />
          <Row x={7} y={30} w={18} c={P.SHADOW_CORE} />
        </g>

        {/* 2. COLA ANILLADA */}
        <g id="tail">
          {tailFrame === 0 ? (
            <>
              {/* Base de la cola */}
              <Row x={24} y={24} w={3} c={P.G_DEEP} />
              {/* Anillo naranja medio */}
              <Row x={25} y={23} w={3} c={P.G_MID} />
              {/* Anillo naranja oscuro */}
              <Row x={26} y={22} w={3} c={P.G_SHADE} />
              {/* Anillo naranja medio */}
              <Row x={26} y={21} w={3} c={P.G_MID} />
              {/* Anillo naranja claro */}
              <Row x={27} y={20} w={2} c={P.G_HI} />
              {/* Anillo naranja oscuro */}
              <Row x={27} y={19} w={2} c={P.G_DEEP} />
              {/* Punta de la cola */}
              <Row x={27} y={18} w={2} c={P.G_MID} />
              <Row x={26} y={17} w={2} c={P.G_HI} />
              <Px x={25} y={17} c={P.G_HI} />
              <Px x={27} y={24} c={P.OUTLINE} />
              <Px x={28} y={23} c={P.OUTLINE} />
              <Px x={29} y={22} c={P.OUTLINE} />
              <Px x={29} y={21} c={P.OUTLINE} />
              <Px x={29} y={20} c={P.OUTLINE} />
              <Px x={29} y={19} c={P.OUTLINE} />
              <Px x={29} y={18} c={P.OUTLINE} />
              <Px x={28} y={17} c={P.OUTLINE} />
              <Row x={25} y={16} w={3} c={P.OUTLINE} />
              <Px x={24} y={17} c={P.OUTLINE} />
              <Px x={25} y={18} c={P.OUTLINE} />
              <Px x={26} y={19} c={P.OUTLINE} />
              <Px x={26} y={20} c={P.OUTLINE} />
            </>
          ) : (
            <>
              {/* Base de la cola (naranja oscuro) */}
              <Row x={24} y={24} w={3} c={P.G_DEEP} />
              {/* Anillo naranja medio */}
              <Row x={25} y={23} w={3} c={P.G_MID} />
              {/* Anillo naranja oscuro */}
              <Row x={26} y={22} w={3} c={P.G_SHADE} />
              {/* Anillo naranja claro */}
              <Row x={27} y={21} w={2} c={P.G_HI} />
              <Row x={27} y={20} w={3} c={P.G_HI} />
              {/* Anillo naranja oscuro */}
              <Row x={28} y={19} w={2} c={P.G_DEEP} />
              {/* Punta de la cola */}
              <Row x={28} y={18} w={2} c={P.G_MID} />
              <Row x={27} y={17} w={2} c={P.G_HI} />
              <Px x={26} y={16} c={P.G_HI} />
              <Px x={27} y={24} c={P.OUTLINE} />
              <Px x={28} y={23} c={P.OUTLINE} />
              <Px x={29} y={22} c={P.OUTLINE} />
              <Px x={29} y={21} c={P.OUTLINE} />
              <Px x={30} y={20} c={P.OUTLINE} />
              <Px x={30} y={19} c={P.OUTLINE} />
              <Px x={30} y={18} c={P.OUTLINE} />
              <Px x={29} y={17} c={P.OUTLINE} />
              <Row x={26} y={15} w={3} c={P.OUTLINE} />
              <Px x={25} y={16} c={P.OUTLINE} />
              <Px x={26} y={17} c={P.OUTLINE} />
              <Px x={27} y={18} c={P.OUTLINE} />
              <Px x={27} y={19} c={P.OUTLINE} />
            </>
          )}
        </g>

        {/* 3. SENTADO */}
        <g id="hind-quarters">
          {/* Izquierda */}
          <Px x={6} y={21} c={P.OUTLINE} />
          <Px x={5} y={22} c={P.OUTLINE} />
          <Px x={4} y={23} c={P.OUTLINE} />
          <Px x={4} y={24} c={P.OUTLINE} />
          <Px x={4} y={25} c={P.OUTLINE} />
          <Px x={4} y={26} c={P.OUTLINE} />
          <Px x={5} y={27} c={P.OUTLINE} />
          <Row x={5} y={28} w={4} c={P.OUTLINE} />

          <Row x={7} y={21} w={2} c={P.W_HI} />
          <Row x={6} y={22} w={3} c={P.W_BASE} />
          <Row x={5} y={23} w={4} c={P.W_BASE} />
          <Row x={5} y={24} w={4} c={P.W_SHADE} />
          <Row x={5} y={25} w={4} c={P.W_SHADE} />
          <Row x={5} y={26} w={4} c={P.W_DEEP} />
          <Row x={6} y={27} w={3} c={P.W_DEEP} />

          {/* Derecha */}
          <Px x={24} y={21} c={P.OUTLINE} />
          <Px x={25} y={22} c={P.OUTLINE} />
          <Px x={26} y={23} c={P.OUTLINE} />
          <Px x={26} y={24} c={P.OUTLINE} />
          <Px x={26} y={25} c={P.OUTLINE} />
          <Px x={26} y={26} c={P.OUTLINE} />
          <Px x={25} y={27} c={P.OUTLINE} />
          <Row x={22} y={28} w={4} c={P.OUTLINE} />

          <Row x={22} y={21} w={2} c={P.W_BASE} />
          <Row x={22} y={22} w={3} c={P.W_BASE} />
          <Row x={22} y={23} w={4} c={P.W_SHADE} />
          <Row x={22} y={24} w={4} c={P.W_SHADE} />
          <Row x={22} y={25} w={4} c={P.W_DEEP} />
          <Row x={22} y={26} w={4} c={P.W_DEEP} />
          <Row x={22} y={27} w={3} c={P.W_DEEP} />
        </g>

        {/* 4. CUERPO COMPLETO */}
        <g id="torso-and-belly">
          {/* Líneas laterales del torso */}
          <Px x={7} y={17} c={P.OUTLINE} />
          <Px x={7} y={18} c={P.OUTLINE} />
          <Px x={6} y={19} c={P.OUTLINE} />
          <Px x={6} y={20} c={P.OUTLINE} />

          <Px x={23} y={17} c={P.OUTLINE} />
          <Px x={23} y={18} c={P.OUTLINE} />
          <Px x={24} y={19} c={P.OUTLINE} />
          <Px x={24} y={20} c={P.OUTLINE} />

          {/* Costado naranja izquierdo */}
          <Row x={8} y={17} w={3} c={P.G_HI} />
          <Row x={8} y={18} w={3} c={P.G_MID} />
          <Row x={7} y={19} w={4} c={P.G_MID} />
          <Row x={7} y={20} w={4} c={P.G_SHADE} />

          {/* Pechera blanca central */}
          <Row x={11} y={17} w={9} c={P.W_HI} />
          <Row x={11} y={18} w={9} c={P.W_BASE} />
          <Row x={11} y={19} w={9} c={P.W_BASE} />
          <Row x={10} y={20} w={10} c={P.W_BASE} />
          <Row x={9} y={21} w={13} c={P.W_SHADE} />
          <Row x={9} y={22} w={13} c={P.W_SHADE} />
          <Row x={9} y={23} w={13} c={P.W_DEEP} />

          <Row x={14} y={19} w={3} c={P.W_HI} />
          <Row x={15} y={20} w={2} c={P.W_HI} />

          {/* Costado derecho del torso */}
          <Row x={20} y={17} w={2} c={P.W_BASE} />
          <Px x={22} y={17} c={P.W_SHADE} />
          <Row x={20} y={18} w={2} c={P.W_SHADE} />
          <Px x={22} y={18} c={P.W_DEEP} />
          <Row x={20} y={19} w={2} c={P.W_SHADE} />
          <Row x={22} y={19} w={2} c={P.W_DEEP} />
          <Row x={20} y={20} w={2} c={P.W_SHADE} />
          <Row x={22} y={20} w={2} c={P.W_DEEP} />
          <Row x={22} y={21} w={2} c={P.W_DEEP} />
          <Row x={22} y={22} w={2} c={P.W_DEEP} />

          {/* CUERPO INFERIOR */}
          {/* Fila 24: Abdomen blanco conectado entre ambos lados */}
          <Row x={13} y={24} w={5} c={P.W_BASE} />
          <Row x={18} y={24} w={4} c={P.W_SHADE} />

          {/* Fila 25: Vientre  y flanco derecho */}
          <Row x={13} y={25} w={5} c={P.W_BASE} />
          <Row x={18} y={25} w={4} c={P.W_SHADE} />

          {/* Fila 26: Sombra y muslo interior derecho */}
          <Row x={13} y={26} w={5} c={P.W_SHADE} />
          <Row x={18} y={26} w={4} c={P.W_DEEP} />

          {/* Fila 27: Parte baja del vientre y pata trasera derecha */}
          <Row x={13} y={27} w={5} c={P.W_DEEP} />
          <Row x={18} y={27} w={4} c={P.W_SHADE} />

          {/* Fila 28: Base de la barriga y pata trasera*/}
          <Row x={13} y={28} w={5} c={P.W_DEEP} />
          <Row x={18} y={28} w={4} c={P.W_BASE} />

          {/* Delineado inferior del cuerpo*/}
          <Row x={13} y={29} w={10} c={P.OUTLINE} />
        </g>

        {/* 5. CUELLO VISIBLE */}
        <g id="neck">
          {/* Cuello */}
          <Row x={9} y={15} w={14} c={P.W_SHADE} />
          <Row x={10} y={16} w={12} c={P.W_BASE} />

          {/* Sombra de la barbilla proyectada sobre la garganta */}
          <Row x={12} y={15} w={8} c={P.NECK_SHADE} />

          {/* Bordes laterales del cuello */}
          <Px x={8} y={15} c={P.OUTLINE} />
          <Px x={9} y={16} c={P.OUTLINE} />
          <Px x={23} y={15} c={P.OUTLINE} />
          <Px x={22} y={16} c={P.OUTLINE} />
        </g>

        {/* 6. COLLAR */}
        <g id="collar">
          {/* Sombra del collar sobre el pecho */}
          <Row x={10} y={17} w={12} c={P.W_DEEP} />

          {/* Banda del collar curvada */}
          <Row x={9} y={15} w={2} c={P.COLLAR_HI} />
          <Row x={11} y={16} w={10} c={P.COLLAR_HI} />
          <Row x={21} y={15} w={2} c={P.COLLAR_HI} />

          {/* Fila base del collar */}
          <Row x={9} y={16} w={2} c={P.COLLAR_BASE} />
          <Row x={11} y={17} w={10} c={P.COLLAR_BASE} />
          <Row x={21} y={16} w={2} c={P.COLLAR_BASE} />

          {/* Contorno y extremos del collar */}
          <Px x={8} y={15} c={P.OUTLINE} />
          <Px x={8} y={16} c={P.OUTLINE} />
          <Px x={23} y={15} c={P.OUTLINE} />
          <Px x={23} y={16} c={P.OUTLINE} />
          <Row x={11} y={18} w={10} c={P.OUTLINE} />

          {/* Detalle de hebilla plateada en el lateral izquierdo */}
          <Px x={10} y={16} c={P.COLLAR_HI} />
          <Px x={10} y={17} c={P.COLLAR_BASE} />

          {/* Anilla metálica */}
          <Px x={15} y={17} c={P.MEDAL_GOLD} />
          <Px x={16} y={17} c={P.MEDAL_GOLD} />

          {/* Medalla circular con borde dorado y centro oscuro */}
          <Row x={14} y={18} w={4} c={P.MEDAL_GOLD} />
          <Row x={14} y={19} w={4} c={P.MEDAL_GOLD} />
          <Px x={15} y={18} c={P.MEDAL_HI} />
          <Px x={15} y={19} c={P.MEDAL_CORE} />
          <Px x={16} y={19} c={P.MEDAL_CORE} />

          {/* Contorno y sombra de la medalla sobre la pechera */}
          <Px x={13} y={18} c={P.OUTLINE} />
          <Px x={13} y={19} c={P.OUTLINE} />
          <Px x={18} y={18} c={P.OUTLINE} />
          <Px x={18} y={19} c={P.OUTLINE} />
          <Row x={14} y={20} w={4} c={P.OUTLINE} />
          <Row x={14} y={21} w={4} c={P.W_DEEP} />
        </g>

        {/* 7. PATA DELANTERA IZQUIERDA */}
        <g id="front-paw-left">
          <Row x={9} y={24} w={4} c={P.W_BASE} />
          <Row x={9} y={25} w={4} c={P.W_BASE} />
          <Row x={9} y={26} w={4} c={P.W_SHADE} />
          <Row x={8} y={27} w={5} c={P.W_BASE} />
          <Row x={8} y={28} w={5} c={P.W_HI} />
          <Px x={10} y={28} c={P.W_DEEP} />
          <Px x={12} y={28} c={P.W_DEEP} />
          <Px x={8} y={24} c={P.OUTLINE} />
          <Px x={8} y={25} c={P.OUTLINE} />
          <Px x={8} y={26} c={P.OUTLINE} />
          <Px x={7} y={27} c={P.OUTLINE} />
          <Px x={7} y={28} c={P.OUTLINE} />
          <Row x={8} y={29} w={5} c={P.OUTLINE} />
          <Px x={13} y={27} c={P.OUTLINE} />
          <Px x={13} y={28} c={P.OUTLINE} />
          <Px x={13} y={25} c={P.OUTLINE} />
          <Px x={13} y={26} c={P.OUTLINE} />
        </g>

        {/* 8. CABEZA, OREJAS Y FRENTE */}
        <g id="head-base">
          {/* Oreja izquierda */}
          <Px x={8} y={2} c={P.OUTLINE} />
          <Px x={7} y={3} c={P.OUTLINE} />
          <Px x={8} y={3} c={P.G_HI} />
          <Px x={9} y={3} c={P.OUTLINE} />
          <Px x={7} y={4} c={P.OUTLINE} />
          <Row x={8} y={4} w={2} c={P.G_HI} />
          <Px x={10} y={4} c={P.OUTLINE} />
          <Px x={7} y={5} c={P.OUTLINE} />
          <Row x={8} y={5} w={3} c={P.G_MID} />
          <Px x={11} y={5} c={P.OUTLINE} />
          {/* Interior rosado de oreja izquierda */}
          <Row x={8} y={5} w={2} c={P.PINK_MID} />
          <Px x={7} y={6} c={P.OUTLINE} />
          <Row x={8} y={6} w={4} c={P.G_MID} />
          <Row x={8} y={6} w={2} c={P.PINK_HI} />
          <Px x={10} y={6} c={P.W_HI} />
          <Px x={12} y={6} c={P.OUTLINE} />

          {/* Oreja derecha  */}
          <Px x={23} y={2} c={P.OUTLINE} />
          <Px x={22} y={3} c={P.OUTLINE} />
          <Px x={23} y={3} c={P.G_HI} />
          <Px x={24} y={3} c={P.OUTLINE} />
          <Px x={21} y={4} c={P.OUTLINE} />
          <Row x={22} y={4} w={2} c={P.G_HI} />
          <Px x={24} y={4} c={P.OUTLINE} />
          <Px x={20} y={5} c={P.OUTLINE} />
          <Row x={21} y={5} w={3} c={P.G_MID} />
          <Px x={24} y={5} c={P.OUTLINE} />
          {/* Interior rosado de oreja derecha */}
          <Row x={22} y={5} w={2} c={P.PINK_MID} />
          <Px x={19} y={6} c={P.OUTLINE} />
          <Row x={20} y={6} w={4} c={P.G_MID} />
          <Row x={22} y={6} w={2} c={P.PINK_HI} />
          <Px x={21} y={6} c={P.W_HI} />
          <Px x={24} y={6} c={P.OUTLINE} />

          {/* Coronilla y frente superior */}
          <Row x={12} y={5} w={8} c={P.OUTLINE} />
          <Row x={12} y={6} w={8} c={P.G_MID} />
          <Row x={13} y={6} w={6} c={P.G_HI} />

          {/* Fila 7: Frente amarilla */}
          <Row x={8} y={7} w={16} c={P.G_HI} />
          <Row x={12} y={7} w={8} c={P.G_GOLD} />

          {/* Fila 8: Punta del triangulo blanco */}
          <Row x={8} y={8} w={7} c={P.G_HI} />
          {/* Vértice del triángulo blanco */}
          <Row x={15} y={8} w={2} c={P.W_HI} />
          <Row x={17} y={8} w={7} c={P.G_HI} />

          {/* Fila 9: Manchas amarillas sobre los ojos */}
          <Row x={8} y={9} w={6} c={P.G_MID} />
          <Row x={14} y={9} w={4} c={P.W_HI} />
          <Row x={18} y={9} w={6} c={P.G_MID} />

          {/* Fila 10: Laterales amarillos */}
          <Px x={7} y={10} c={P.G_MID} />
          <Row x={8} y={10} w={5} c={P.G_MID} />
          <Row x={13} y={10} w={6} c={P.W_BASE} />
          <Row x={19} y={10} w={5} c={P.G_MID} />
          <Px x={24} y={10} c={P.G_MID} />

          {/* Fila 11: Triangulo */}
          <Px x={7} y={11} c={P.G_SHADE} />
          <Row x={8} y={11} w={4} c={P.G_SHADE} />
          {/* Base del triángulo blanco */}
          <Row x={12} y={11} w={8} c={P.W_BASE} />
          <Row x={20} y={11} w={4} c={P.G_SHADE} />
          <Px x={24} y={11} c={P.G_SHADE} />

          {/* Fila 12: triángulo blanco */}
          <Row x={7} y={12} w={3} c={P.G_SHADE} />
          <Row x={10} y={12} w={12} c={P.W_BASE} />
          <Row x={22} y={12} w={3} c={P.G_SHADE} />
          <Row x={9} y={13} w={14} c={P.W_BASE} />
          <Row x={10} y={14} w={12} c={P.W_BASE} />
          <Row x={12} y={15} w={8} c={P.W_SHADE} />
          <Row x={14} y={16} w={4} c={P.W_DEEP} />

          {/* Rubor durazno bajo los ojos */}
          <Row x={8} y={12} w={2} c={P.PEACH_BLUSH} />
          <Row x={22} y={12} w={2} c={P.PEACH_BLUSH} />

          {/* Delineado exterior de la cabeza */}
          <Px x={7} y={7} c={P.OUTLINE} />
          <Px x={7} y={8} c={P.OUTLINE} />
          <Px x={7} y={9} c={P.OUTLINE} />
          <Px x={7} y={10} c={P.OUTLINE} />
          <Px x={7} y={11} c={P.OUTLINE} />
          <Px x={7} y={12} c={P.OUTLINE} />
          <Px x={8} y={13} c={P.OUTLINE} />
          <Px x={9} y={14} c={P.OUTLINE} />
          <Px x={11} y={15} c={P.OUTLINE} />
          <Px x={13} y={16} c={P.OUTLINE} />
          <Row x={14} y={16} w={4} c={P.OUTLINE} />

          <Px x={24} y={7} c={P.OUTLINE} />
          <Px x={24} y={8} c={P.OUTLINE} />
          <Px x={24} y={9} c={P.OUTLINE} />
          <Px x={24} y={10} c={P.OUTLINE} />
          <Px x={24} y={11} c={P.OUTLINE} />
          <Px x={24} y={12} c={P.OUTLINE} />
          <Px x={23} y={13} c={P.OUTLINE} />
          <Px x={22} y={14} c={P.OUTLINE} />
          <Px x={20} y={15} c={P.OUTLINE} />
          <Px x={18} y={16} c={P.OUTLINE} />
        </g>

        {/* 9. OJOS */}
        <g id="eyes">
          {eyesHappyClosed ? (
            <>
              {/* Ojo izquierdo */}
              <Px x={8} y={11} c={P.OUTLINE} />
              <Row x={9} y={10} w={3} c={P.OUTLINE} />
              <Px x={12} y={11} c={P.OUTLINE} />
              <Row x={9} y={9} w={3} c={P.G_DEEP} />

              {/* Ojo derecho */}
              <Px x={19} y={11} c={P.OUTLINE} />
              <Row x={20} y={10} w={3} c={P.OUTLINE} />
              <Px x={23} y={11} c={P.OUTLINE} />
              <Row x={20} y={9} w={3} c={P.G_DEEP} />
            </>
          ) : (
            <>
              {/* Ojo izquierdo */}
              <Row x={9} y={9} w={4} c={P.OUTLINE} />
              <Px x={8} y={10} c={P.OUTLINE} />
              <Px x={8} y={11} c={P.OUTLINE} />
              <Px x={13} y={10} c={P.OUTLINE} />
              <Px x={13} y={11} c={P.OUTLINE} />
              <Row x={9} y={12} w={4} c={P.OUTLINE} />

              <Row x={9} y={10} w={4} c={P.EYE_HI} />
              <Row x={9} y={11} w={4} c={P.EYE_AMBER} />

              <rect
                x={10 + px}
                y={py === -1 ? 9 : py === 1 ? 11 : 10}
                width={1}
                height={2}
                fill={P.EYE_PUPIL}
              />
              <Px
                x={10 + px}
                y={py === -1 ? 9 : 10}
                c={P.EYE_GLINT}
              />

              {/* Ojo derecho */}
              <Row x={19} y={9} w={4} c={P.OUTLINE} />
              <Px x={18} y={10} c={P.OUTLINE} />
              <Px x={18} y={11} c={P.OUTLINE} />
              <Px x={23} y={10} c={P.OUTLINE} />
              <Px x={23} y={11} c={P.OUTLINE} />
              <Row x={19} y={12} w={4} c={P.OUTLINE} />

              <Row x={19} y={10} w={4} c={P.EYE_HI} />
              <Row x={19} y={11} w={4} c={P.EYE_AMBER} />

              <rect
                x={20 + px}
                y={py === -1 ? 9 : py === 1 ? 11 : 10}
                width={1}
                height={2}
                fill={P.EYE_PUPIL}
              />
              <Px
                x={20 + px}
                y={py === -1 ? 9 : 10}
                c={P.EYE_GLINT}
              />
            </>
          )}
        </g>

        {/* 10. NARIZ Y BOCA */}
        <g id="muzzle-mouth">
          {/* Nariz triangular */}
          <Row x={15} y={12} w={2} c={P.PINK_MID} />
          <Row x={15} y={13} w={2} c={P.PINK_DEEP} />
          <Px x={15} y={12} c={P.PINK_HI} />

          {/* Reposo boca */}
          {!isLicking && cleanPhase !== 2 && cleanPhase !== 7 && (
            <>
              <Px x={15} y={14} c={P.OUTLINE_SOFT} />
              <Px x={16} y={14} c={P.OUTLINE_SOFT} />
              <Px x={13} y={14} c={P.OUTLINE_SOFT} />
              <Px x={14} y={14} c={P.OUTLINE_SOFT} />
              <Px x={17} y={14} c={P.OUTLINE_SOFT} />
              <Px x={18} y={14} c={P.OUTLINE_SOFT} />
              <Row x={15} y={15} w={2} c={P.CHIN_SHADOW} />
            </>
          )}

          {/* FASE 2: Animación boca */}
          {cleanPhase === 2 && (
            <>
              <Px x={15} y={14} c={P.OUTLINE_SOFT} />
              <Px x={16} y={14} c={P.OUTLINE_SOFT} />
              <Row x={14} y={14} w={4} c={P.MOUTH_DARK} />
              <Row x={15} y={14} w={2} c={P.PINK_MID} />
            </>
          )}

          {cleanPhase === 7 && (
            <>
              <Row x={14} y={14} w={4} c={P.OUTLINE_SOFT} />
              <Px x={13} y={13} c={P.OUTLINE_SOFT} />
              <Px x={18} y={13} c={P.OUTLINE_SOFT} />
              <Px x={16} y={14} c={P.PINK_HI} />
            </>
          )}

          <Row x={4} y={12} w={3} c={P.OUTLINE_SOFT} />
          <Row x={6} y={14} w={3} c={P.OUTLINE_SOFT} />
          <Row x={25} y={12} w={3} c={P.OUTLINE_SOFT} />
          <Row x={23} y={14} w={3} c={P.OUTLINE_SOFT} />
        </g>

        {/* 11. Animacion pata */}
        <g id="front-paw-right-and-tongue">
          {cleanPhase === 0 && (
            <>
              <Row x={18} y={24} w={4} c={P.W_BASE} />
              <Row x={18} y={25} w={4} c={P.W_BASE} />
              <Row x={18} y={26} w={4} c={P.W_SHADE} />
              <Row x={18} y={27} w={5} c={P.W_BASE} />
              <Row x={18} y={28} w={5} c={P.W_HI} />
              <Px x={19} y={28} c={P.W_DEEP} />
              <Px x={21} y={28} c={P.W_DEEP} />
              <Px x={17} y={24} c={P.OUTLINE} />
              <Px x={17} y={25} c={P.OUTLINE} />
              <Px x={17} y={26} c={P.OUTLINE} />
              <Px x={17} y={27} c={P.OUTLINE} />
              <Px x={17} y={28} c={P.OUTLINE} />
              <Row x={18} y={29} w={5} c={P.OUTLINE} />
              <Px x={23} y={27} c={P.OUTLINE} />
              <Px x={23} y={28} c={P.OUTLINE} />
              <Px x={22} y={24} c={P.OUTLINE} />
              <Px x={22} y={25} c={P.OUTLINE} />
              <Px x={22} y={26} c={P.OUTLINE} />
            </>
          )}

          {(cleanPhase === 1 || cleanPhase === 8) && (
            <>
              <Row x={18} y={22} w={4} c={P.W_BASE} />
              <Row x={18} y={23} w={4} c={P.W_BASE} />
              <Row x={19} y={24} w={4} c={P.W_SHADE} />
              <Row x={19} y={25} w={4} c={P.W_HI} />
              <Px x={20} y={25} c={P.PINK_MID} />
              <Px x={21} y={25} c={P.PINK_HI} />
              <Px x={17} y={22} c={P.OUTLINE} />
              <Px x={17} y={23} c={P.OUTLINE} />
              <Px x={18} y={24} c={P.OUTLINE} />
              <Px x={18} y={25} c={P.OUTLINE} />
              <Row x={19} y={26} w={4} c={P.OUTLINE} />
              <Px x={23} y={24} c={P.OUTLINE} />
              <Px x={23} y={25} c={P.OUTLINE} />
              <Px x={22} y={22} c={P.OUTLINE} />
              <Px x={22} y={23} c={P.OUTLINE} />
            </>
          )}

          {cleanPhase === 2 && (
            <>
              <Row x={19} y={21} w={3} c={P.W_SHADE} />
              <Row x={18} y={20} w={4} c={P.W_BASE} />
              <Row x={18} y={19} w={4} c={P.W_BASE} />
              <Row x={17} y={18} w={4} c={P.W_HI} />
              <Row x={17} y={17} w={4} c={P.W_BASE} />
              <Row x={17} y={17} w={2} c={P.PINK_MID} />
              <Px x={18} y={18} c={P.PINK_HI} />
              <Px x={16} y={17} c={P.OUTLINE} />
              <Px x={16} y={18} c={P.OUTLINE} />
              <Px x={17} y={19} c={P.OUTLINE} />
              <Px x={17} y={20} c={P.OUTLINE} />
              <Px x={18} y={21} c={P.OUTLINE} />
              <Row x={17} y={16} w={4} c={P.OUTLINE} />
              <Px x={21} y={17} c={P.OUTLINE} />
              <Px x={21} y={18} c={P.OUTLINE} />
              <Px x={22} y={19} c={P.OUTLINE} />
              <Px x={22} y={20} c={P.OUTLINE} />
              <Px x={22} y={21} c={P.OUTLINE} />
            </>
          )}

          {/* Fase Animaciones */}
          {isLicking && (
            <>
              {/* Apertura de la boca*/}
              <Row x={14} y={14} w={4} c={P.MOUTH_DARK} />
              <Row x={15} y={15} w={3} c={P.MOUTH_DARK} />
              <Px x={13} y={14} c={P.OUTLINE} />
              <Px x={18} y={14} c={P.OUTLINE} />

              {/* Pata delantera */}
              <Row x={19} y={21} w={3} c={P.W_SHADE} />
              <Row x={18} y={20} w={4} c={P.W_BASE} />
              <Row x={18} y={19} w={4} c={P.W_BASE} />
              <Row x={17} y={18} w={4} c={P.W_HI} />
              <Row x={17} y={17} w={4} c={P.W_BASE} />
              {/* Almohadilla */}
              <Row x={17} y={17} w={2} c={P.PINK_MID} />
              <Px x={18} y={18} c={P.PINK_HI} />
              <Px x={16} y={17} c={P.OUTLINE} />
              <Px x={16} y={18} c={P.OUTLINE} />
              <Px x={17} y={19} c={P.OUTLINE} />
              <Px x={17} y={20} c={P.OUTLINE} />
              <Px x={18} y={21} c={P.OUTLINE} />
              <Row x={17} y={16} w={4} c={P.OUTLINE} />
              <Px x={21} y={17} c={P.OUTLINE} />
              <Px x={21} y={18} c={P.OUTLINE} />
              <Px x={22} y={19} c={P.OUTLINE} />
              <Px x={22} y={20} c={P.OUTLINE} />

              {/* LENGUA */}
              {(cleanPhase === 3 || cleanPhase === 5) && (
                <>
                  {/* Lengua Animación */}
                  <Row x={15} y={14} w={3} c={P.PINK_HI} />
                  <Row x={15} y={15} w={3} c={P.PINK_MID} />
                  <Row x={16} y={16} w={2} c={P.PINK_MID} />
                  <Px x={17} y={16} c={P.PINK_DEEP} />
                  {/* Delineado de la lengua */}
                  <Px x={14} y={15} c={P.OUTLINE} />
                  <Px x={15} y={16} c={P.OUTLINE} />
                  <Px x={18} y={16} c={P.OUTLINE} />
                </>
              )}

              {(cleanPhase === 4 || cleanPhase === 6) && (
                <>
                  {/* Lengua */}
                  <Row x={14} y={14} w={4} c={P.PINK_HI} />
                  <Row x={14} y={15} w={4} c={P.PINK_HI} />
                  <Row x={15} y={16} w={4} c={P.PINK_MID} />
                  <Row x={16} y={17} w={3} c={P.PINK_DEEP} />
                  <Px x={15} y={15} c={P.W_HI} />
                  <Px x={16} y={16} c={P.PINK_HI} />

                  {/* Delineado la lengua */}
                  <Px x={13} y={15} c={P.OUTLINE} />
                  <Px x={14} y={16} c={P.OUTLINE} />
                  <Px x={15} y={17} c={P.OUTLINE} />
                  <Row x={16} y={18} w={3} c={P.OUTLINE} />
                  <Px x={19} y={17} c={P.OUTLINE} />

                  {/* Destellos de limpieza */}
                  <Px x={12} y={15} c={P.SPARKLE} />
                  <Px x={11} y={14} c={P.SPARKLE_GOLD} />
                  <Px x={13} y={14} c={P.SPARKLE_GOLD} />
                  <Px x={12} y={13} c={P.SPARKLE} />
                </>
              )}
            </>
          )}

          {/* FASE 7: Pata sostenida */}
          {cleanPhase === 7 && (
            <>
              <Row x={19} y={21} w={3} c={P.W_SHADE} />
              <Row x={18} y={20} w={4} c={P.W_BASE} />
              <Row x={17} y={19} w={4} c={P.W_BASE} />
              <Row x={17} y={18} w={4} c={P.W_HI} />
              <Row x={17} y={17} w={4} c={P.W_HI} />
              <Row x={17} y={17} w={2} c={P.PINK_HI} />
              <Px x={18} y={18} c={P.PINK_MID} />
              <Px x={16} y={17} c={P.OUTLINE} />
              <Px x={16} y={18} c={P.OUTLINE} />
              <Px x={17} y={19} c={P.OUTLINE} />
              <Row x={17} y={16} w={4} c={P.OUTLINE} />
              <Px x={21} y={17} c={P.OUTLINE} />
              <Px x={21} y={18} c={P.OUTLINE} />

              {/* Destello */}
              <Px x={20} y={14} c={P.SPARKLE} />
              <Px x={21} y={14} c={P.SPARKLE_GOLD} />
              <Px x={20} y={13} c={P.SPARKLE_GOLD} />
              <Px x={20} y={15} c={P.SPARKLE_GOLD} />
              <Px x={19} y={14} c={P.SPARKLE} />
            </>
          )}
        </g>
        </g>

        {!isGenerated && isGenerating && currentRow < 32 && (
          <g id="retro-bit-scanline" pointerEvents="none">
            {/* Haz de escaneo horizontal */}
            <rect
              x={0}
              y={currentRow}
              width={32}
              height={1}
              fill="#f59e0b"
              opacity={0.35}
            />
            {currentCol > 0 && (
              <rect
                x={Math.max(0, currentCol - 8)}
                y={currentRow}
                width={8}
                height={1}
                fill="#fde047"
                opacity={0.65}
              />
            )}
            {/* Píxel guía del cursor */}
            <rect
              x={Math.min(31, currentCol)}
              y={currentRow}
              width={1}
              height={1}
              fill="#ffffff"
              opacity={0.95}
            />
          </g>
        )}
      </svg>
    </div>
  );
};

export { PixelCat as PixelCatHero };
