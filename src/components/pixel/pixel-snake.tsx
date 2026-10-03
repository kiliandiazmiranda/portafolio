import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';

// Serpiente Estilo Python

interface Point {
  x: number;
  y: number;
}

interface Segment {
  x: number;
  y: number;
  angle: number;
}

interface PixelSnakeProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  active?: boolean;
}

// Cantidad de eslabones según el ancho de pantalla
const getSegmentCount = (width: number): number => {
  if (width >= 1024) return 24; 
  if (width >= 640) return 17; 
  return 11; 
};

// Distancia fija entre eslabones
const SEGMENT_DISTANCE = 9.5;

export const PixelSnake: React.FC<PixelSnakeProps> = ({
  containerRef,
  active = true,
}) => {
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 900,
    height: 420,
  });

  const [isAnnoyed, setIsAnnoyed] = useState<boolean>(false);
  const [tongueVisible, setTongueVisible] = useState<boolean>(false);

  // Dirección actual del recorrido: 1 (hacia adelante) o -1 (en reversa)
  const directionRef = useRef<1 | -1>(1);

  // Cantidad reactiva de eslabones según ancho
  const segmentCount = useMemo(() => getSegmentCount(dimensions.width), [dimensions.width]);

  // Posiciones de los eslabones
  const segmentsRef = useRef<Segment[]>(
    Array.from({ length: 24 }, () => ({ x: 100, y: 80, angle: 0 }))
  );

  // Sincroniza la cantidad de eslabones cuando cambia la resolución de pantalla
  useEffect(() => {
    const currentLen = segmentsRef.current.length;
    if (currentLen < segmentCount) {
      const lastSeg = segmentsRef.current[currentLen - 1] || { x: 100, y: 80, angle: 0 };
      const newItems: Segment[] = Array.from(
        { length: segmentCount - currentLen },
        () => ({ ...lastSeg })
      );
      segmentsRef.current = [...segmentsRef.current, ...newItems];
    } else if (currentLen > segmentCount) {
      segmentsRef.current = segmentsRef.current.slice(0, segmentCount);
    }
  }, [segmentCount]);

  const [, setRenderTrigger] = useState<number>(0);
  const progressRef = useRef<number>(0);
  const tongueTimerRef = useRef<number | null>(null);
  const annoyedTimerRef = useRef<number | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // Actualizar dimensiones con base en el contenedor de las tarjetas
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const el = containerRef.current;
        const w = el.clientWidth || el.offsetWidth || el.getBoundingClientRect().width;
        const h = el.clientHeight || el.offsetHeight || el.getBoundingClientRect().height;
        if (w > 0 && h > 0) {
          setDimensions({
            width: Math.max(300, Math.round(w)),
            height: Math.max(240, Math.round(h)),
          });
        }
      }
    };

    updateSize();

    // Verificaciones
    const t1 = window.setTimeout(updateSize, 120);
    const t2 = window.setTimeout(updateSize, 450);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        updateSize();
      });
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener('resize', updateSize);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener('resize', updateSize);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [containerRef]);

  // animación lengua
  useEffect(() => {
    if (!active) return;

    let innerTimeout: number | null = null;
    const scheduleTongue = () => {
      const delay = 2200 + Math.random() * 2600;
      tongueTimerRef.current = window.setTimeout(() => {
        if (!isAnnoyed) {
          setTongueVisible(true);
          innerTimeout = window.setTimeout(() => {
            if (!isAnnoyed) setTongueVisible(false);
            scheduleTongue();
          }, 450);
        } else {
          scheduleTongue();
        }
      }, delay);
    };

    scheduleTongue();
    return () => {
      if (tongueTimerRef.current) window.clearTimeout(tongueTimerRef.current);
      if (innerTimeout) window.clearTimeout(innerTimeout);
    };
  }, [active, isAnnoyed]);

  // Trayectoria
  const getCircuitPoint = useCallback(
    (prog: number, w: number, h: number): { point: Point; tangent: Point } => {
      // Márgenes
      const leftX = 16;
      const rightX = Math.max(260, w - 16);
      const topY = 16;
      const bottomY = Math.max(160, h - 17);
      const R = 18; // Radio de esquina

      const L_top = Math.max(0, rightX - leftX - 2 * R);
      const L_right = Math.max(0, bottomY - topY - 2 * R);
      const L_arc = (Math.PI / 2) * R;
      const totalLength = 2 * L_top + 2 * L_right + 4 * L_arc;

      let d = (((prog % 1) + 1) % 1) * totalLength;

      // 1. Lado superior
      if (d <= L_top) {
        return {
          point: { x: leftX + R + d, y: topY },
          tangent: { x: 1, y: 0 },
        };
      }
      d -= L_top;

      // Esquina superior derecha
      if (d <= L_arc) {
        const theta = (d / L_arc) * (Math.PI / 2);
        return {
          point: {
            x: rightX - R + R * Math.sin(theta),
            y: topY + R - R * Math.cos(theta),
          },
          tangent: { x: Math.cos(theta), y: Math.sin(theta) },
        };
      }
      d -= L_arc;

      // 2. Lado derecho
      if (d <= L_right) {
        return {
          point: { x: rightX, y: topY + R + d },
          tangent: { x: 0, y: 1 },
        };
      }
      d -= L_right;

      // Esquina inferior derecha
      if (d <= L_arc) {
        const theta = (d / L_arc) * (Math.PI / 2);
        return {
          point: {
            x: rightX - R + R * Math.cos(theta),
            y: bottomY - R + R * Math.sin(theta),
          },
          tangent: { x: -Math.sin(theta), y: Math.cos(theta) },
        };
      }
      d -= L_arc;

      // 3. Lado inferior
      if (d <= L_top) {
        return {
          point: { x: rightX - R - d, y: bottomY },
          tangent: { x: -1, y: 0 },
        };
      }
      d -= L_top;

      // Esquina inferior izquierda
      if (d <= L_arc) {
        const theta = (d / L_arc) * (Math.PI / 2);
        return {
          point: {
            x: leftX + R - R * Math.sin(theta),
            y: bottomY - R + R * Math.cos(theta),
          },
          tangent: { x: -Math.cos(theta), y: -Math.sin(theta) },
        };
      }
      d -= L_arc;

      // 4. Lado izquierdo
      if (d <= L_right) {
        return {
          point: { x: leftX, y: bottomY - R - d },
          tangent: { x: 0, y: -1 },
        };
      }
      d -= L_right;

      // Esquina superior izquierda
      const theta = Math.min(1, d / L_arc) * (Math.PI / 2);
      return {
        point: {
          x: leftX + R - R * Math.cos(theta),
          y: topY + R - R * Math.sin(theta),
        },
        tangent: { x: Math.sin(theta), y: -Math.cos(theta) },
      };
    },
    []
  );

  // Bucle principal de animación
  useEffect(() => {
    if (!active) return;

    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const animate = (currentTime: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = currentTime;
      const dt = Math.min(0.05, (currentTime - lastTimeRef.current) / 1000);
      lastTimeRef.current = currentTime;

      if (isVisible) {
        // Velocidad de avance
        const baseSpeed = isAnnoyed ? 0.062 : 0.034;
        const dir = directionRef.current;
        // Permitir avanzar o retroceder de forma continua en [0, 1)
        progressRef.current = (((progressRef.current + dt * baseSpeed * dir) % 1) + 1) % 1;

        const { width, height } = dimensions;
        const { point: basePoint, tangent } = getCircuitPoint(progressRef.current, width, height);

        // Vector tangente en la dirección de desplazamiento
        const moveTangentX = tangent.x * dir;
        const moveTangentY = tangent.y * dir;

        // Vector normal para movimiento ondulatorio
        const normalX = -moveTangentY;
        const normalY = moveTangentX;

        // Frecuencia y amplitud
        const waveFreq = isAnnoyed ? 0.016 : 0.0075;
        const waveAmp = isAnnoyed ? 2.4 : 1.4;
        const slitherWave = Math.sin(currentTime * waveFreq) * waveAmp;
        const headX = basePoint.x + normalX * slitherWave;
        const headY = basePoint.y + normalY * slitherWave;

        // Ángulo de la cabeza
        const currentHeadAngle = Math.atan2(moveTangentY, moveTangentX);

        const segments = segmentsRef.current;
        segments[0] = { x: headX, y: headY, angle: currentHeadAngle };

        // Cinemática inversa
        const count = segments.length;
        for (let i = 1; i < count; i++) {
          const prev = segments[i - 1];
          const curr = segments[i];

          const dx = prev.x - curr.x;
          const dy = prev.y - curr.y;
          const angle = Math.atan2(dy, dx);

          curr.x = prev.x - Math.cos(angle) * SEGMENT_DISTANCE;
          curr.y = prev.y - Math.sin(angle) * SEGMENT_DISTANCE;
          curr.angle = angle;
        }

        setRenderTrigger(currentTime);
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [active, dimensions, getCircuitPoint, isAnnoyed]);

  // Interacción al tocar la serpiente
  const handleTouchSnake = () => {
    // 1. Invierte el sentido del movimiento
    directionRef.current = directionRef.current === 1 ? -1 : 1;

    // 2. Activa animación
    setIsAnnoyed(true);
    setTongueVisible(true);

    // 3. Mantiene la animación por 2.6 segundos
    if (annoyedTimerRef.current) window.clearTimeout(annoyedTimerRef.current);
    annoyedTimerRef.current = window.setTimeout(() => {
      setIsAnnoyed(false);
      setTongueVisible(false);
    }, 2600);
  };

  if (!active) return null;

  const segments = segmentsRef.current;
  const head = segments[0] || { x: 100, y: 80, angle: 0 };
  const totalSegments = segments.length;

  return (
    <div
      className="absolute inset-0 pointer-events-none z-20 overflow-visible select-none outline-none"
      style={{
        outline: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full overflow-visible select-none outline-none"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        style={{
          outline: 'none',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          filter: 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.16))',
        }}
      >
        <defs>
          {/* Degradado para el cuerpo (azul) */}
          <linearGradient id="pythonBlueGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#387eb8" />
            <stop offset="100%" stopColor="#2b5b84" />
          </linearGradient>

          {/* Degradado para el cuerpo (amarillo) */}
          <linearGradient id="pythonYellowGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffe873" />
            <stop offset="100%" stopColor="#ffd43b" />
          </linearGradient>

          {/* Sombra */}
          <filter id="doodleGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.2" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* 1. Eslabones del cuerpo */}
        {segments
          .slice(1)
          .reverse()
          .map((seg, reversedIdx) => {
            const idx = totalSegments - 1 - reversedIdx; // Índice original del eslabón

            // Los primeros eslabones son azul  (#306998) y la segunda mitad amarillo  (#FFD43B)
            const isBlueSection = idx < totalSegments * 0.52;
            const fillColor = isBlueSection ? 'url(#pythonBlueGrad)' : 'url(#pythonYellowGrad)';
            const strokeColor = isBlueSection ? '#1e3a5f' : '#b45309';

            // Radio decreciente hacia la cola
            const progressToTail = idx / totalSegments;
            const radius = Math.max(3.5, 8.6 - progressToTail * 5.0);

            // Ojo de la serpiente
            const hasYellowSnakeEye = idx === Math.floor(totalSegments * 0.72);

            return (
              <g
                key={idx}
                transform={`translate(${seg.x}, ${seg.y})`}
                className="pointer-events-auto cursor-pointer select-none outline-none"
                style={{
                  outline: 'none',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  WebkitTapHighlightColor: 'transparent',
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleTouchSnake();
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleTouchSnake();
                }}
                onTouchStart={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleTouchSnake();
                }}
              >
                {/* Zona de impacto táctil */}
                <circle
                  r={Math.max(16, radius + 10)}
                  fill="transparent"
                  className="cursor-pointer"
                />

                {/* Conexión con eslabón anterior */}
                <circle
                  r={radius}
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Brillo */}
                <circle
                  cx={-radius * 0.25}
                  cy={-radius * 0.25}
                  r={Math.max(1, radius * 0.35)}
                  fill="#ffffff"
                  fillOpacity="0.3"
                />

                {/* Ojo */}
                {hasYellowSnakeEye && (
                  <g transform={`rotate(${((seg.angle * 180) / Math.PI) % 360})`}>
                    <circle cx="0" cy="-2.5" r="1.7" fill="#306998" />
                    <circle cx="-0.4" cy="-2.9" r="0.6" fill="#ffffff" />
                  </g>
                )}
              </g>
            );
          })}

        {/* 2. Cabeza */}
        <g
          transform={`translate(${head.x}, ${head.y}) rotate(${(head.angle * 180) / Math.PI})`}
          className="pointer-events-auto cursor-pointer select-none outline-none"
          style={{
            outline: 'none',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            WebkitTapHighlightColor: 'transparent',
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleTouchSnake();
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleTouchSnake();
          }}
          onTouchStart={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleTouchSnake();
          }}
          aria-label="Tocar serpiente Python"
        >
          {/* Zona de toque ampliada invisible */}
          <circle r="22" fill="transparent" className="cursor-pointer" />

          {/* Lengua */}
          {tongueVisible && (
            <path
              d={
                isAnnoyed
                  ? "M 11 0 L 26 0 M 26 0 L 32 -5 M 26 0 L 32 5"
                  : "M 11 0 L 22 0 M 22 0 L 26 -3.5 M 22 0 L 26 3.5"
              }
              stroke="#ef4444"
              strokeWidth={isAnnoyed ? 2.2 : 1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-pulse"
            />
          )}

          {/* Cabeza */}
          <path
            d="M 12 0 C 12 -7, 5 -8.5, -4 -8.5 C -8 -8.5, -10 -5.5, -10 0 C -10 5.5, -8 8.5, -4 8.5 C 5 8.5, 12 7, 12 0 Z"
            fill="url(#pythonBlueGrad)"
            stroke={isAnnoyed ? "#dc2626" : "#1e3a5f"}
            strokeWidth={isAnnoyed ? 2.2 : 1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <circle cx="7.5" cy="-2" r="0.8" fill="#1e3a5f" />
          <circle cx="7.5" cy="2" r="0.8" fill="#1e3a5f" />

          {/* Ojo */}
          <circle cx="0.5" cy="-4" r="2.4" fill="#ffd43b" stroke="#1e3a5f" strokeWidth="0.8" />
          <circle cx="1.2" cy="-4.2" r="1.1" fill="#1e293b" />
          <circle cx="0.7" cy="-4.7" r="0.5" fill="#ffffff" />

          {/* Ceño */}
          {isAnnoyed ? (
            <>
              {/* Ceja */}
              <line
                x1="-2.2"
                y1="-7.2"
                x2="3.8"
                y2="-4.6"
                stroke="#dc2626"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              {/* Símbolo de enfado */}
              <g transform="translate(-6, -14)">
                <path
                  d="M -3 -3 L 3 3 M 3 -3 L -3 3 M 0 -4 L 0 4 M -4 0 L 4 0"
                  stroke="#ef4444"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </g>
            </>
          ) : (
            /* Brillo superior */
            <path
              d="M -3 -6 C 1 -6, 5 -5, 7 -2"
              stroke="#ffffff"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeOpacity="0.45"
              fill="none"
            />
          )}
        </g>
      </svg>
    </div>
  );
};

export { PixelSnake as PythonSnakeDoodle, PixelSnake as SnakeDoodle };
