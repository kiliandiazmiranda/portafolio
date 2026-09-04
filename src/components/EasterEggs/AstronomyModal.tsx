/**
 * Observatorio interactivo con 10 objetos astronómicos y un escáner de datos.
 */

import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { ASTRONOMY_OBJECTS } from '../../data/portfolioData';
import { AstronomyDoodle } from './AstronomyDoodles';
import {
  DoodleTelescope,
  DoodlePlanet,
  DoodleRadar,
  DoodleOrbit,
  DoodleChevronDown,
  DoodleCheck,
  DoodleSparkles
} from './DoodleIcons';

interface AstronomyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AstronomyModal: React.FC<AstronomyModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedObjectId, setSelectedObjectId] = useState<string>(
    ASTRONOMY_OBJECTS[0]?.id || 'sun'
  );

  // Estado del escáner y datos no consecutivos
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [lastFactIndexMap, setLastFactIndexMap] = useState<Record<string, number>>({});
  const [activeFact, setActiveFact] = useState<{
    text: string;
    index: number;
    objectId: string;
  } | null>(null);
  const [scanPulse, setScanPulse] = useState<boolean>(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Cierre al hacer clic fuera del dropdown
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

  // Atajos de teclado
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
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, isDropdownOpen]);

  const currentObject =
    ASTRONOMY_OBJECTS.find((o) => o.id === selectedObjectId) ||
    ASTRONOMY_OBJECTS[0];

  const handleSelectObject = (objectId: string) => {
    if (objectId !== selectedObjectId) {
      setSelectedObjectId(objectId);
      setActiveFact(null);
      setIsDropdownOpen(false);
    }
  };

  /**
   * Lógica de escaneo no consecutivo:
   * Cada doodle tiene 4 datos cortos. Cada escaneo entrega un dato de ese doodle.
   * Si se muestra el dato 1, el próximo escaneo mostrará otro (2, 3 o 4).
   * Una vez mostrado otro, el dato 1 puede volver a salir, pero nunca el recién mostrado.
   */
  const handleScan = () => {
    if (isScanning) return;

    setIsScanning(true);
    setScanPulse(true);

    setTimeout(() => {
      const facts = currentObject.facts; // 4 datos
      const lastIndex = lastFactIndexMap[currentObject.id];

      let nextIndex: number;
      if (lastIndex === undefined) {
        // Primer escaneo para este cuerpo celeste: elegimos aleatoriamente entre 0..3
        nextIndex = Math.floor(Math.random() * facts.length);
      } else {
        // Escaneos subsiguientes: excluimos estrictamente el último dato mostrado
        const availableIndices = [0, 1, 2, 3].filter((i) => i !== lastIndex);
        nextIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
      }

      setLastFactIndexMap((prev) => ({
        ...prev,
        [currentObject.id]: nextIndex,
      }));

      setActiveFact({
        text: facts[nextIndex],
        index: nextIndex,
        objectId: currentObject.id,
      });

      setIsScanning(false);

      // Pequeño pulso visual
      setTimeout(() => {
        setScanPulse(false);
      }, 600);
    }, 550);
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-neutral-950/70 backdrop-blur-xs animate-in fade-in duration-200 cursor-pointer touch-none"
      id="astronomy-observatory-modal-overlay"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl h-[88vh] sm:h-auto sm:max-h-[92vh] sm:min-h-[580px] flex flex-col doodle-card bg-[#faf9f5] dark:bg-[#12151b] border-2 border-neutral-800 dark:border-neutral-200 doodle-shadow-lg p-3.5 sm:p-6 text-neutral-900 dark:text-neutral-100 relative animate-in zoom-in-95 duration-200 cursor-default overflow-hidden"
        id="astronomy-observatory-modal-container"
      >
        {/* Botón de cierre superior con diseño idéntico en rojo */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-5 sm:right-5 p-2 doodle-btn text-red-700 dark:text-red-300 hover:text-white dark:hover:text-white active:text-white bg-red-100 hover:bg-red-500 active:bg-red-600 dark:bg-red-950/80 dark:hover:bg-red-600 dark:active:bg-red-700 transition-all cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center border-2 border-red-400 hover:border-red-600 active:border-red-700 dark:border-red-600 dark:hover:border-red-500 dark:active:border-red-400 active:scale-90 touch-manipulation z-20"
          aria-label="Cerrar observatorio astronómico"
          title="Cerrar observatorio"
          id="astronomy-modal-close-btn"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Encabezado */}
        <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4 pr-10 shrink-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 doodle-box bg-blue-500/20 text-blue-700 dark:text-blue-400 flex items-center justify-center font-bold text-lg sm:text-2xl shrink-0 border-2 border-blue-600/40">
            <DoodleTelescope className="w-6 h-6" />
          </div>
          <div>
            <h3
              id="astronomy-modal-title"
              className="text-lg sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 leading-tight"
            >
              <span>Observatorio Astronómico</span>
            </h3>
          </div>
        </div>

        {/* Selector de Cuerpos Celestes: Móvil y Tablet Dropdown */}
        <div className="block lg:hidden mb-3 relative shrink-0" ref={dropdownRef}>
          <label
            htmlFor="astronomy-mobile-select-btn"
            className="block text-xs font-bold font-mono text-neutral-700 dark:text-neutral-300 mb-1"
          >
            Seleccionar cuerpo celeste:
          </label>
          <button
            id="astronomy-mobile-select-btn"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between p-2.5 bg-white dark:bg-neutral-900 border-2 border-neutral-300 dark:border-neutral-700 doodle-btn text-sm font-bold text-left doodle-shadow-sm min-h-[42px]"
          >
            <div className="flex items-center gap-2 truncate">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
              <span className="truncate">{currentObject.name}</span>
            </div>
            <DoodleChevronDown
              className={`w-4 h-4 text-neutral-500 transition-transform duration-200 shrink-0 ${
                isDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-neutral-900 border-2 border-neutral-800 dark:border-neutral-200 rounded-xl shadow-xl z-30 max-h-56 overflow-y-auto p-1.5 divide-y divide-neutral-100 dark:divide-neutral-800">
              {ASTRONOMY_OBJECTS.map((obj) => {
                const isSelected = obj.id === selectedObjectId;
                return (
                  <button
                    key={obj.id}
                    onClick={() => handleSelectObject(obj.id)}
                    className={`w-full text-left px-3 py-2 text-xs font-bold flex items-center justify-between transition-colors rounded-lg ${
                      isSelected
                        ? 'bg-blue-100 dark:bg-blue-950/80 text-blue-900 dark:text-blue-100 font-black'
                        : 'hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200'
                    }`}
                  >
                    <span className="truncate">{obj.name}</span>
                    {isSelected && <DoodleCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Selector de Cuerpos Celestes: Escritorio Amplio Pills */}
        <div className="hidden lg:flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4 shrink-0">
          {ASTRONOMY_OBJECTS.map((obj) => {
            const isSelected = selectedObjectId === obj.id;
            return (
              <button
                key={obj.id}
                onClick={() => handleSelectObject(obj.id)}
                className={`px-2.5 sm:px-3 py-1.5 doodle-btn text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer min-h-[34px] border-2 ${
                  isSelected
                    ? 'bg-blue-600 dark:bg-blue-500 text-white dark:text-neutral-950 border-blue-800 dark:border-blue-400 doodle-shadow-sm font-bold scale-[1.02]'
                    : 'bg-white/80 dark:bg-neutral-900/80 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700 hover:border-blue-500/70 hover:bg-blue-50/50 dark:hover:bg-blue-950/20'
                }`}
                id={`astronomy-tab-${obj.id}`}
              >
                <span>{obj.name}</span>
              </button>
            );
          })}
        </div>

        {/* Ficha Astronómica Central + Visualizador Doodle */}
        <div className="flex-1 flex flex-col justify-between overflow-y-auto no-scrollbar p-3.5 sm:p-5 doodle-card bg-white/90 dark:bg-neutral-900/80 border-2 border-neutral-300 dark:border-neutral-700 doodle-shadow-sm">
          {/* Fila Superior: Ilustración Doodle y Telemetría básica */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-5 pb-3.5 sm:pb-4 border-b-2 border-dashed border-neutral-200 dark:border-neutral-800">
            <div className="relative p-2.5 sm:p-3.5 bg-blue-50/80 dark:bg-neutral-950/80 border-2 border-blue-300 dark:border-blue-800 rounded-2xl shrink-0 flex items-center justify-center shadow-inner group">
              <AstronomyDoodle
                id={currentObject.id}
                className="w-24 h-24 sm:w-32 sm:h-32 text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform duration-300"
                wobbly={isScanning || scanPulse}
              />
            </div>

            <div className="flex-1 text-center sm:text-left flex flex-col gap-1.5 w-full">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-mono font-bold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200 border border-blue-300 dark:border-blue-700 inline-flex items-center gap-1">
                  <DoodlePlanet className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{currentObject.type}</span>
                </span>
              </div>

              <h4 className="text-lg sm:text-2xl font-black font-mono text-neutral-950 dark:text-neutral-50 tracking-tight leading-tight">
                {currentObject.name}
              </h4>

              {/* Distancia destacada */}
              {currentObject.distance && (
                <div className="p-2 bg-neutral-100/90 dark:bg-neutral-950/70 border border-neutral-300 dark:border-neutral-700 rounded-xl flex items-center justify-center sm:justify-start gap-2 text-[11px] sm:text-xs font-mono">
                  <DoodleOrbit className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <div className="truncate">
                    <span className="font-bold text-neutral-500 dark:text-neutral-400">Distancia: </span>
                    <span className="font-bold text-neutral-900 dark:text-neutral-100">{currentObject.distance}</span>
                  </div>
                </div>
              )}

              {/* Descripción corta estandarizada con min-height consistente */}
              <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium min-h-[2.5rem] sm:min-h-[2.25rem] flex items-center">
                {currentObject.shortDescription}
              </p>
            </div>
          </div>

          {/* Sección del Escáner y Datos Cortos con contenedor de altura fija */}
          <div className="flex flex-col gap-2.5 pt-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <DoodleRadar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                <h5 className="text-xs sm:text-base font-black font-mono">Escáner de Telemetría Cósmica</h5>
              </div>

              {/* Botón Escanear */}
              <button
                onClick={handleScan}
                disabled={isScanning}
                className={`w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 doodle-btn border-2 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[36px] ${
                  isScanning
                    ? 'bg-amber-400 dark:bg-amber-500 text-neutral-950 border-amber-600 animate-pulse scale-95 shadow-inner'
                    : 'bg-blue-600 hover:bg-blue-700 text-white border-blue-800 dark:border-blue-400 doodle-shadow-sm hover:scale-[1.02]'
                }`}
                id="astronomy-scan-btn"
                title="Escanear telemetría de este cuerpo celeste"
              >
                <DoodleSparkles className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
                <span>{isScanning ? 'Escaneando...' : 'Escanear'}</span>
              </button>
            </div>

            {/* Caja de Datos Cortos Revelados con altura consistente para evitar saltos */}
            <div className="min-h-[74px] sm:min-h-[76px] flex flex-col justify-center">
              {isScanning ? (
                <div className="p-3 sm:p-3.5 bg-blue-50/80 dark:bg-blue-950/40 border-2 border-dashed border-blue-400 dark:border-blue-600 rounded-xl flex items-center justify-center gap-2.5 animate-pulse text-blue-800 dark:text-blue-200 min-h-[74px] sm:min-h-[76px] text-center">
                  <div className="w-4 h-4 rounded-full border-2 border-blue-600 dark:border-blue-300 border-t-transparent animate-spin shrink-0" />
                  <span className="font-mono text-xs sm:text-sm font-bold">
                    Sintonizando frecuencia y decodificando telemetría...
                  </span>
                </div>
              ) : activeFact && activeFact.objectId === currentObject.id ? (
                <div className="p-3 sm:p-3.5 bg-gradient-to-br from-blue-50 to-amber-50/50 dark:from-neutral-900 dark:to-blue-950/40 border-2 border-blue-400 dark:border-blue-600 rounded-xl doodle-shadow-sm flex flex-col justify-center gap-1 animate-in slide-in-from-top-2 duration-300 min-h-[74px] sm:min-h-[76px]">
                  <div className="flex items-center justify-between gap-2 border-b border-blue-200 dark:border-blue-900/80 pb-1">
                    <span className="font-mono text-[11px] font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <span>Dato Cósmico #{activeFact.index + 1}</span>
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 leading-snug font-mono">
                    "{activeFact.text}"
                  </p>
                </div>
              ) : (
                <div className="p-3 sm:p-3.5 bg-neutral-100/60 dark:bg-neutral-950/40 border-2 border-dashed border-neutral-300 dark:border-neutral-800 rounded-xl flex items-center justify-center gap-2 text-neutral-500 dark:text-neutral-400 text-xs font-mono text-center min-h-[74px] sm:min-h-[76px]">
                  <DoodleRadar className="w-4 h-4 opacity-50 shrink-0" />
                  <span>Pulsa "Escanear" para sintonizar telemetría y datos cósmicos</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
