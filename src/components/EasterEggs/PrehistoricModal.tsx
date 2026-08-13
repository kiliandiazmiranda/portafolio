/**
 * Cuaderno paleontológico interactivo con galería y lienzo de dibujo.
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { X } from 'lucide-react';
import { PREHISTORIC_CREATURES } from '../../data/portfolioData';
import { DinosaurDoodle } from './DinosaurDoodles';
import {
  DoodleBone,
  DoodlePencil,
  DoodleVolume,
  DoodleUndo,
  DoodleRedo,
  DoodleEraser,
  DoodleChevronDown,
  DoodleCheck,
  DoodleDownload,
  DoodleSliders,
  DoodleSparkles
} from './DoodleIcons';

interface PrehistoricModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PREHISTORIC_ROARS: Record<string, string> = {
  tyrannosaurus: '¡ROOOOAAAAR! (Doodle-saurus rugiendo a los bugs)',
  stegosaurus: '*Thud thud* ¡Placas solares cargadas al 100%!',
  triceratops: '*¡Embestida con 3 cuernos y escudo indestructible!*',
  velociraptor: '*¡Screeeech! Microservicio veloz corriendo a 80 km/h*',
  carnotaurus: '*¡Muuu-raptor sprintando sin frenos!*',
  smilodon: '¡Rugido de sable con colmillos de 28 centímetros!',
  megatherium: '*Abrazo gigante y pacífico de 4 toneladas de pereza*',
  mammoth: '*¡Barrito colosal del mamut lanudo en la era de hielo!*',
  mamut: '*¡Barrito colosal del mamut lanudo en la era de hielo!*',
  megalodon: '¡CHOMP CHOMP en las profundidades del océano prehistórico!',
  mosasaurus: '¡Splash colosal dominando los mares mesozoicos!'
};

export const PrehistoricModal: React.FC<PrehistoricModalProps> = ({
  isOpen,
  onClose,
}) => {

  const [selectedCreatureId, setSelectedCreatureId] = useState<string>(
    PREHISTORIC_CREATURES[0]?.id || 'tyrannosaurus'
  );
  const [doodleRoarText, setDoodleRoarText] = useState<string | null>(null);
  const [isRoaring, setIsRoaring] = useState<boolean>(false);
  const [showCanvas, setShowCanvas] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

// Estado del lienzo Doodle con historial de deshacer/rehacer, deslizador de intensidad y exportación a PNG
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [intensity, setIntensity] = useState<number>(75); // Control de tonos cálidos y sombras (5% a 100%)
  const [exportSuccess, setExportSuccess] = useState<boolean>(false);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [historyStep, setHistoryStep] = useState<number>(-1);

  // Helper de tonos cálidos para sombreados, luces y contornos
  const currentTone = useMemo(() => {
    const t = Math.max(5, Math.min(100, intensity)) / 100;
    let r: number, g: number, b: number;
    let label: string;

    if (t <= 0.30) {
      // 5% - 30%: Luces suaves y boceto inicial
      const k = t / 0.30;
      r = Math.round(253 * (1 - k) + 245 * k);
      g = Math.round(210 * (1 - k) + 158 * k);
      b = Math.round(105 * (1 - k) + 11 * k);
      label = 'Luz suave';
    } else if (t <= 0.65) {
      // 31% - 65%: Naranja Doodle estándar
      const k = (t - 0.30) / 0.35;
      r = Math.round(245 * (1 - k) + 217 * k);
      g = Math.round(158 * (1 - k) + 119 * k);
      b = Math.round(11 * (1 - k) + 6 * k);
      label = 'Tono medio';
    } else if (t <= 0.85) {
      // 66% - 85%: Sombras intermedias y volumen
      const k = (t - 0.65) / 0.20;
      r = Math.round(217 * (1 - k) + 154 * k);
      g = Math.round(119 * (1 - k) + 52 * k);
      b = Math.round(6 * (1 - k) + 18 * k);
      label = 'Sombra';
    } else {
      // 86% - 100%: Sombras profundas y contornos oscuros
      const k = (t - 0.85) / 0.15;
      r = Math.round(154 * (1 - k) + 67 * k);
      g = Math.round(52 * (1 - k) + 20 * k);
      b = Math.round(18 * (1 - k) + 7 * k);
      label = 'Sombra profunda';
    }

    const strokeAlpha = +(0.5 + 0.5 * (intensity / 100)).toFixed(2);
    const rgba = `rgba(${r}, ${g}, ${b}, ${strokeAlpha})`;
    const solidRgb = `rgb(${r}, ${g}, ${b})`;
    return { r, g, b, rgba, solidRgb, label };
  }, [intensity]);

  // Cierre al hacer clic fuera del menú desplegable móvil
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('touchstart', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [isDropdownOpen]);

  // Inicializar o restaurar el lienzo cuando se activa el modo de dibujo
  useEffect(() => {
    if (showCanvas && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        if (history.length === 0) {
          const blankSnapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
          setHistory([blankSnapshot]);
          setHistoryStep(0);
        } else if (historyStep >= 0 && history[historyStep]) {
          ctx.putImageData(history[historyStep], 0, 0);
        }
      }
    }
  }, [showCanvas]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isDropdownOpen) {
          setIsDropdownOpen(false);
        } else {
          onClose();
        }
      }
      // Atajo para deshacer (Ctrl+Z o Cmd+Z)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && !e.shiftKey && showCanvas) {
        e.preventDefault();
        handleUndo();
      }
      // Atajo para rehacer (Ctrl+Y o Cmd+Shift+Z)
      if (
        showCanvas &&
        (((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') ||
          ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'z'))
      ) {
        e.preventDefault();
        handleRedo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, showCanvas, historyStep, history, isDropdownOpen]);

  const currentCreature =
    PREHISTORIC_CREATURES.find((c) => c.id === selectedCreatureId) ||
    PREHISTORIC_CREATURES[0];

  const handleRoar = () => {
    setIsRoaring(false);
    setTimeout(() => {
      setIsRoaring(true);
    }, 10);
    setDoodleRoarText(PREHISTORIC_ROARS[selectedCreatureId] || '¡Doodle prehistórico activado!');
    setTimeout(() => {
      setIsRoaring(false);
    }, 700);
  };

  // Funciones de dibujo interactivo en el lienzo
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Garantizar la existencia de una instantánea inicial si la historia está vacía
    if (history.length === 0) {
      const initial = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setHistory([initial]);
      setHistoryStep(0);
    }

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.strokeStyle = currentTone.rgba;
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const newHistory = history.slice(0, historyStep + 1);
    newHistory.push(snapshot);
    setHistory(newHistory);
    setHistoryStep(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyStep <= 0) return;
    const newStep = historyStep - 1;
    setHistoryStep(newStep);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx || !history[newStep]) return;
    ctx.putImageData(history[newStep], 0, 0);
  };

  const handleRedo = () => {
    if (historyStep >= history.length - 1) return;
    const newStep = historyStep + 1;
    setHistoryStep(newStep);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx || !history[newStep]) return;
    ctx.putImageData(history[newStep], 0, 0);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const newHistory = history.slice(0, historyStep + 1);
    newHistory.push(snapshot);
    setHistory(newHistory);
    setHistoryStep(newHistory.length - 1);
  };

  // Exportar el dibujo como archivo PNG en alta calidad con fondo de cuaderno doodle
  const handleExportPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Crear lienzo temporal de exportación
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = canvas.width;
    exportCanvas.height = canvas.height;
    const exportCtx = exportCanvas.getContext('2d');
    if (!exportCtx) return;

    // Fondo cálido pergamino doodle según el modo de color o estándar ilustrado
    const isDark = document.documentElement.classList.contains('dark');
    exportCtx.fillStyle = isDark ? '#1a1209' : '#fff7ed';
    exportCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

    // Marco y textura sutil de cuaderno
    exportCtx.strokeStyle = 'rgba(217, 119, 6, 0.4)';
    exportCtx.lineWidth = 3;
    exportCtx.setLineDash([6, 4]);
    exportCtx.strokeRect(6, 6, exportCanvas.width - 12, exportCanvas.height - 12);
    exportCtx.setLineDash([]); // reset

    // Dibujar los trazos del lienzo
    exportCtx.drawImage(canvas, 0, 0);

    // Marca de agua y firma paleontológica
    exportCtx.font = 'bold 11px monospace';
    exportCtx.fillStyle = 'rgba(217, 119, 6, 0.75)';
    exportCtx.textAlign = 'right';
    exportCtx.fillText('🦖 Boceto Doodle Prehistórico • Kilian', exportCanvas.width - 18, exportCanvas.height - 18);

    // Descarga automática como PNG
    const dataUrl = exportCanvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `boceto-dinosaurio-${Date.now()}.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Feedback visual al usuario
    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 3000);
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-neutral-950/70 backdrop-blur-xs animate-in fade-in duration-200 cursor-pointer touch-none"
      id="prehistoric-modal-backdrop"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl max-h-[92vh] overflow-y-auto no-scrollbar rounded-3xl bg-[#fffbf5] dark:bg-[#140f09] border-2 border-dashed border-amber-600/50 dark:border-amber-400/50 shadow-2xl p-4 sm:p-7 text-neutral-900 dark:text-neutral-100 relative animate-in zoom-in-95 duration-200 cursor-default"
        id="prehistoric-easter-egg-modal"
      >
        {/* Botón de cierre */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-5 sm:right-5 p-2 doodle-btn text-red-700 dark:text-red-300 hover:text-white dark:hover:text-white active:text-white bg-red-100 hover:bg-red-500 active:bg-red-600 dark:bg-red-950/80 dark:hover:bg-red-600 dark:active:bg-red-700 transition-all cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center border-2 border-red-400 hover:border-red-600 active:border-red-700 dark:border-red-600 dark:hover:border-red-500 dark:active:border-red-400 active:scale-90 touch-manipulation z-20"
          aria-label="Cerrar cuaderno prehistórico"
          title="Cerrar cuaderno prehistórico"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Encabezado con insignia doodle del dinosaurio */}
        <div className="flex items-center gap-3 mb-5 pr-10">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-amber-500/15 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0 border-2 border-dashed border-amber-600/30 p-1">
            <DinosaurDoodle id="tyrannosaurus" className="w-8 h-8 sm:w-9 sm:h-9" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              Dinosaurios & Fauna Prehistórica
            </h3>
          </div>
        </div>

        {/* Mode Toggle: Galería vs Dibujar */}
        <div className="flex items-center justify-between gap-2 mb-4 pb-2 border-b-2 border-dashed border-neutral-300 dark:border-neutral-800">
          <div className="text-xs font-mono text-neutral-700 dark:text-neutral-300 font-bold flex items-center gap-1.5">
            {showCanvas ? (
              <>
                <DoodlePencil className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Lienzo de Bocetos</span>
              </>
            ) : (
              <>
                <DoodleBone className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Galería de Fichas Paleontológicas</span>
              </>
            )}
          </div>
          <button
            onClick={() => setShowCanvas(!showCanvas)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 doodle-btn text-xs font-bold bg-amber-500/15 text-amber-800 dark:text-amber-300 border-2 border-amber-500/40 hover:bg-amber-500/25 transition-all cursor-pointer min-h-[34px]"
          >
            {showCanvas ? (
              <>
                <DoodleBone className="w-3.5 h-3.5" />
                <span>Volver a la Galería</span>
              </>
            ) : (
              <>
                <DoodlePencil className="w-3.5 h-3.5" />
                <span>Abrir Lienzo de Dibujo</span>
              </>
            )}
          </button>
        </div>

        {/* Vista 1: Galería de criaturas y bocetos */}
        {!showCanvas ? (
          <div className="space-y-4 sm:space-y-5">
            {/* Selector desplegable personalizado para pantallas móviles y tabletas */}
            <div className="block lg:hidden relative" ref={dropdownRef}>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 font-mono">
                  Seleccionar criatura:
                </label>
                <span className="text-[11px] text-amber-700 dark:text-amber-400 font-mono">
                  {PREHISTORIC_CREATURES.length} animales
                </span>
              </div>

              {/* Botón interactivo de apertura */}
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-expanded={isDropdownOpen}
                aria-haspopup="listbox"
                className={`w-full p-2.5 doodle-btn bg-white dark:bg-neutral-900 border-2 transition-all flex items-center justify-between gap-3 text-left doodle-shadow-sm cursor-pointer min-h-[52px] ${
                  isDropdownOpen
                    ? 'border-amber-600 dark:border-amber-400 ring-2 ring-amber-500/20'
                    : 'border-amber-500/50 hover:border-amber-600 dark:hover:border-amber-400'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Icono de boceto en miniatura */}
                  <div className="w-9 h-9 doodle-box bg-amber-500/15 border-2 border-amber-500/40 text-amber-700 dark:text-amber-400 flex items-center justify-center p-1 shrink-0">
                    <DinosaurDoodle id={currentCreature.id} className="w-7 h-7" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100 truncate">
                      {currentCreature.name}
                    </div>
                    <div className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono truncate">
                      {currentCreature.period.split(' ')[0]} • {currentCreature.diet.split(' ')[0]}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 pl-1">
                  <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 doodle-badge font-mono border border-amber-500/30">
                    Elegir
                  </span>
                  <DoodleChevronDown
                    className={`w-4 h-4 text-amber-600 dark:text-amber-400 transition-transform duration-200 ${
                      isDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>

              {/* Panel del menú desplegable */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 z-30 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md doodle-card border-2 border-amber-600/40 dark:border-amber-400/40 doodle-shadow-lg p-1.5 space-y-1 max-h-72 overflow-y-auto no-scrollbar overscroll-contain animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-2.5 py-1 text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-wider flex items-center justify-between border-b-2 border-dashed border-neutral-200 dark:border-neutral-800 mb-1">
                    <span>Lista Paleontológica</span>
                    <span>Bocetos</span>
                  </div>

                  {PREHISTORIC_CREATURES.map((creature) => {
                    const isSelected = selectedCreatureId === creature.id;
                    return (
                      <button
                        key={creature.id}
                        type="button"
                        onClick={() => {
                          setSelectedCreatureId(creature.id);
                          setDoodleRoarText(null);
                          setIsRoaring(false);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left p-2 doodle-btn transition-all flex items-center justify-between gap-2.5 min-h-[44px] cursor-pointer ${
                          isSelected
                            ? 'bg-amber-600 dark:bg-amber-500 text-white dark:text-neutral-950 font-bold doodle-shadow-sm border-2 border-amber-700'
                            : 'hover:bg-amber-500/10 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-200 border-2 border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {/* Icono de boceto ilustrado en miniatura */}
                          <div
                            className={`w-7 h-7 doodle-box flex items-center justify-center p-0.5 shrink-0 border-2 ${
                              isSelected
                                ? 'bg-white/20 dark:bg-black/20 border-white/40 dark:border-black/40 text-white dark:text-neutral-950'
                                : 'bg-amber-500/10 dark:bg-neutral-800 border-amber-500/30 text-amber-700 dark:text-amber-400'
                            }`}
                          >
                            <DinosaurDoodle id={creature.id} className="w-5 h-5" />
                          </div>

                          <div className="min-w-0">
                            <div className="text-xs font-semibold truncate leading-tight">
                              {creature.name}
                            </div>
                            <div
                              className={`text-[10px] font-mono truncate leading-tight mt-0.5 ${
                                isSelected
                                  ? 'text-white/80 dark:text-neutral-900/80'
                                  : 'text-neutral-400 dark:text-neutral-500'
                              }`}
                            >
                              {creature.period.split('(')[0].trim()}
                            </div>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="shrink-0 p-1 bg-white/20 dark:bg-black/20 doodle-box">
                            <DoodleCheck className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Etiquetas de selección para pantallas de escritorio amplias */}
            <div className="hidden lg:flex flex-wrap gap-1.5 sm:gap-2">
              {PREHISTORIC_CREATURES.map((creature) => {
                const isSelected = selectedCreatureId === creature.id;
                return (
                  <button
                    key={creature.id}
                    onClick={() => {
                      setSelectedCreatureId(creature.id);
                      setDoodleRoarText(null);
                      setIsRoaring(false);
                    }}
                    className={`px-3 py-1.5 doodle-btn text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer min-h-[36px] border-2 ${
                      isSelected
                        ? 'bg-amber-700 dark:bg-amber-500 text-white dark:text-neutral-950 border-amber-800 dark:border-amber-400 doodle-shadow-sm font-bold scale-[1.02]'
                        : 'bg-white/80 dark:bg-neutral-900/80 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-800 hover:border-amber-500/50 hover:bg-amber-50/50 dark:hover:bg-amber-950/20'
                    }`}
                  >
                    {/* Pequeño icono de vector ilustrado */}
                    <div
                      className={`w-5 h-5 flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'text-white dark:text-neutral-950'
                          : 'text-amber-700 dark:text-amber-400'
                      }`}
                    >
                      <DinosaurDoodle id={creature.id} className="w-5 h-5" />
                    </div>
                    <span>{creature.name.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* Tarjeta de la criatura seleccionada */}
            <div className="p-4 sm:p-6 doodle-card bg-white/90 dark:bg-neutral-900/80 border-2 border-neutral-300 dark:border-neutral-800 relative overflow-hidden doodle-shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                {/* Izquierda: Ilustración SVG dibujada a mano (5 columnas) */}
                <div className="md:col-span-5 flex flex-col items-center justify-center p-4 doodle-box bg-amber-500/5 dark:bg-neutral-950/60 border-2 border-amber-500/30 text-amber-700 dark:text-amber-400 group">
                  <div
                    className={`w-full flex items-center justify-center py-2 transition-transform duration-300 ${
                      isRoaring
                        ? 'animate-doodle-roar'
                        : 'group-hover:scale-105 group-hover:rotate-1'
                    }`}
                  >
                    <DinosaurDoodle
                      id={currentCreature.id}
                      className="w-44 h-36 sm:w-48 sm:h-40"
                      wobbly={true}
                    />
                  </div>
                  <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 mt-1 flex items-center gap-1">
                    <span>✎ Dibujo: {currentCreature.name.split(' ')[0]}</span>
                  </div>

                  {/* Botón de rugido */}
                  <button
                    onClick={handleRoar}
                    className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 doodle-btn bg-amber-600 hover:bg-amber-700 active:scale-95 text-white text-xs font-bold transition-all doodle-shadow-sm cursor-pointer min-h-[34px] border-2 border-amber-700"
                  >
                    <DoodleVolume className="w-3.5 h-3.5" />
                    <span>¡Rugido Doodle!</span>
                  </button>
                </div>

                {/* Derecha: Datos paleontológicos (7 columnas) */}
                <div className="md:col-span-7 space-y-3">
                  <div>
                    <div className="flex items-center gap-2.5">
                      {/* Pequeño icono en el título de la tarjeta */}
                      <div className="w-8 h-8 sm:w-9 sm:h-9 doodle-box bg-amber-500/10 dark:bg-amber-950/40 border-2 border-amber-500/30 flex items-center justify-center p-1 text-amber-700 dark:text-amber-400 shrink-0">
                        <DinosaurDoodle id={currentCreature.id} className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-neutral-100">
                        {currentCreature.name}
                      </h4>
                    </div>
                    <div className="text-xs font-mono text-amber-700 dark:text-amber-400 mt-1">
                      {currentCreature.period} • {currentCreature.diet}
                    </div>
                  </div>

                  {/* Bloque de curiosidades */}
                  <div className="p-3.5 doodle-box bg-amber-500/10 dark:bg-neutral-950/80 border-2 border-amber-500/30 text-xs">
                    <span className="font-bold text-neutral-900 dark:text-neutral-100 mb-1 flex items-center gap-1.5 font-mono">
                      <DoodleBone className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                      <span>Hecho Paleontológico:</span>
                    </span>
                    <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      {currentCreature.funFact}
                    </p>
                  </div>
                </div>
              </div>

              {/* Notificación del mensaje de rugido */}
              {doodleRoarText && (
                <div className="mt-4 p-3 doodle-card bg-amber-500/20 border-2 border-amber-500 text-amber-900 dark:text-amber-200 text-xs font-bold font-mono animate-in fade-in zoom-in-95 duration-200 flex items-center justify-between">
                  <span>{doodleRoarText}</span>
                  <button onClick={() => setDoodleRoarText(null)} className="text-neutral-500 hover:text-neutral-800 text-xs px-2 cursor-pointer">
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Vista 2: Lienzo interactivo de dibujo */
          <div className="space-y-3">
            {/* Barra de herramientas y controles */}
            <div className="p-3 sm:p-3.5 rounded-2xl bg-amber-500/10 dark:bg-amber-950/40 border-2 border-dashed border-amber-600/40 dark:border-amber-400/40 space-y-2.5">
              {/* Fila 1: Control de intensidad de trazo, muestra de tono y botón de exportación PNG */}
              <div className="flex items-center justify-between gap-2 sm:gap-3">
                <div className="flex items-center gap-1.5 sm:gap-2.5 flex-1 min-w-0">
                  <span className="font-bold text-neutral-800 dark:text-neutral-200 font-mono text-xs flex items-center gap-1 shrink-0 select-none">
                    <DoodleSliders className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span className="hidden sm:inline">Intensidad:</span>
                  </span>

                  <input
                    type="range"
                    min="5"
                    max="100"
                    step="1"
                    value={intensity}
                    onChange={(e) => setIntensity(Number(e.target.value))}
                    className="flex-1 min-w-[70px] sm:min-w-[130px] h-2 sm:h-2.5 rounded-lg cursor-pointer appearance-none bg-gradient-to-r from-amber-200 via-amber-600 to-amber-950 dark:from-amber-300 dark:via-orange-600 dark:to-orange-950 accent-amber-600 dark:accent-amber-400"
                    title={`Intensidad: ${intensity}% (${currentTone.label})`}
                    aria-label="Selector de intensidad de tono"
                  />

                  {/* Vista previa circular del tono */}
                  <div
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-amber-600/50 dark:border-amber-400/50 flex items-center justify-center bg-white dark:bg-neutral-900 shadow-xs shrink-0"
                    title={`Tono: ${currentTone.label} (${intensity}%)`}
                    aria-label={`Muestra de tono actual: ${currentTone.label}`}
                  >
                    <span
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border border-amber-900/30 dark:border-amber-200/50 shadow-inner transition-colors duration-100"
                      style={{ backgroundColor: currentTone.rgba }}
                    />
                  </div>

                  <span className="text-[11px] font-mono font-bold text-amber-800 dark:text-amber-300 shrink-0 hidden sm:inline tabular-nums">
                    {intensity}%
                  </span>
                </div>

                {/* Botón de exportación PNG */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={handleExportPNG}
                    className="inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 doodle-btn bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold transition-all cursor-pointer text-xs min-h-[32px] border border-amber-800 dark:border-amber-400 doodle-shadow-xs whitespace-nowrap shrink-0"
                    title="Exportar dibujo como imagen PNG"
                    aria-label="Exportar PNG"
                  >
                    <DoodleDownload className="w-3.5 h-3.5 shrink-0" />
                    <span className="hidden sm:inline">Exportar </span>
                    <span>PNG</span>
                  </button>

                  {exportSuccess && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-amber-800 dark:text-amber-300 bg-amber-500/20 px-2 py-1 rounded-md animate-in fade-in zoom-in-95">
                      <DoodleSparkles className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                      <span className="hidden sm:inline">¡Guardado!</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Fila 2: Botones de acción (Deshacer, Rehacer, Borrar) */}
              <div className="flex items-center justify-between pt-2 border-t border-dashed border-amber-500/30 dark:border-amber-400/20 gap-2">
                <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 flex items-center gap-1 shrink-0 whitespace-nowrap">
                  <span>Trazos:</span>
                  <span className="font-bold text-neutral-700 dark:text-neutral-300 tabular-nums">
                    {historyStep} / {Math.max(0, history.length - 1)}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <button
                    onClick={handleUndo}
                    disabled={historyStep <= 0}
                    className="inline-flex items-center justify-center gap-1 px-2 sm:px-3 py-1.5 doodle-btn bg-white dark:bg-neutral-900 hover:bg-amber-50 dark:hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed text-neutral-700 dark:text-neutral-300 font-medium transition-colors cursor-pointer text-xs min-h-[30px] border border-neutral-300 dark:border-neutral-700 whitespace-nowrap"
                    title="Deshacer trazo (Ctrl+Z)"
                    aria-label="Deshacer trazo"
                  >
                    <DoodleUndo className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400 shrink-0" />
                    <span className="hidden sm:inline">Deshacer</span>
                  </button>

                  <button
                    onClick={handleRedo}
                    disabled={historyStep >= history.length - 1}
                    className="inline-flex items-center justify-center gap-1 px-2 sm:px-3 py-1.5 doodle-btn bg-white dark:bg-neutral-900 hover:bg-amber-50 dark:hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed text-neutral-700 dark:text-neutral-300 font-medium transition-colors cursor-pointer text-xs min-h-[30px] border border-neutral-300 dark:border-neutral-700 whitespace-nowrap"
                    title="Rehacer trazo (Ctrl+Y)"
                    aria-label="Rehacer trazo"
                  >
                    <DoodleRedo className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400 shrink-0" />
                    <span className="hidden sm:inline">Rehacer</span>
                  </button>

                  <button
                    onClick={clearCanvas}
                    className="inline-flex items-center justify-center gap-1 px-2 sm:px-3 py-1.5 doodle-btn bg-white dark:bg-neutral-900 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-neutral-700 hover:text-rose-700 dark:text-neutral-300 dark:hover:text-rose-300 font-medium transition-colors cursor-pointer text-xs min-h-[30px] border border-neutral-300 dark:border-neutral-700 hover:border-rose-300 dark:hover:border-rose-700 whitespace-nowrap"
                    title="Borrar todo el lienzo"
                    aria-label="Borrar lienzo"
                  >
                    <DoodleEraser className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400 shrink-0" />
                    <span className="hidden sm:inline">Borrar</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Lienzo de dibujo */}
            <div className="relative rounded-2xl bg-amber-500/10 dark:bg-amber-950/30 border-2 border-dashed border-amber-600/40 dark:border-amber-400/40 p-2 sm:p-2.5 overflow-hidden touch-none flex justify-center doodle-shadow-sm">
              <canvas
                ref={canvasRef}
                width={650}
                height={320}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full max-w-full h-[280px] sm:h-[320px] cursor-crosshair rounded-xl bg-[#fff7ed] dark:bg-[#1a1209] border border-amber-500/40 dark:border-amber-500/40 shadow-inner"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};



