/**
 * Easter Egg: Sala de Mando y Consola Táctica de Juegos de Gran Estrategia.
 * Incluye simulaciones de decisiones geopolíticas, dinásticas, comerciales, industriales y operacionales
 * para Crusader Kings, Europa Universalis, Victoria, Stellaris, Hearts of Iron y Port Royale,
 * con generador de eventos aleatorios históricos/cósmicos y registro de órdenes.
 */

import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles
} from 'lucide-react';
import {
  DoodleCrown,
  DoodleGlobe,
  DoodleRocket,
  DoodleShield,
  DoodleShip,
  DoodleDice,
  DoodleFactory
} from './DoodleIcons';

interface StrategyGame {
  id: string;
  title: string;
  shortTitle: string;
  era: string;
  genre: string;
  icon: React.ReactNode;
  badgeColor: string;
  description: string;
  favoriteMechanic: string;
  actions: {
    name: string;
    description: string;
    impact: string;
  }[];
}

const STRATEGY_GAMES: StrategyGame[] = [
  {
    id: 'ck',
    title: 'Crusader Kings',
    shortTitle: 'CK',
    era: 'Edad Media (769 - 1453)',
    genre: 'Estrategia Dinástica & Rol',
    icon: <DoodleCrown className="w-5 h-5" />,
    badgeColor: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30',
    description: 'Gestión de dinastías medievales, intrigas palaciegas, alianzas matrimoniales, sucesiones feudales complejas y cruzadas.',
    favoriteMechanic: 'Genética de linajes, microgestión de vasallos y relaciones diplomáticas entre casas nobles.',
    actions: [
      {
        name: '👑 Concertar Matrimonio Real',
        description: 'Forjar alianza con el Reino vecino para asegurar la frontera norte.',
        impact: '+30 Opinión de Vasallos • +100 Prestigio Dinástico'
      },
      {
        name: '📜 Promulgar Ley de Sucesión Primogenitura',
        description: 'Evitar la fragmentación del reino tras el cambio generacional.',
        impact: 'Estabilidad del Reino asegurada • -15 Opinión temporal'
      },
      {
        name: '🏰 Fortificar el Castillo Feudal',
        description: 'Invertir oro en murallas concéntricas y torres de asedio.',
        impact: '+25% Defensa de Guarnición • +0.5 Oro mensual'
      }
    ]
  },
  {
    id: 'eu',
    title: 'Europa Universalis',
    shortTitle: 'EU',
    era: 'Era Moderna & Descubrimientos (1444 - 1821)',
    genre: 'Estrategia Global & Diplomacia',
    icon: <DoodleGlobe className="w-5 h-5" />,
    badgeColor: 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30',
    description: 'Control de cualquier nación del mundo durante cuatro siglos: colonización, nodos comerciales, ideas nacionales y guerras de coalición.',
    favoriteMechanic: 'Dirección de flujos comerciales hacia nodos dominados y equilibrio de poder geopolítico.',
    actions: [
      {
        name: '⛵ Monopolizar Nodo Comercial',
        description: 'Desplegar barcos ligeros para proteger rutas marítimas mercantes.',
        impact: '+45% Poder Comercial • +12.5 Ducados / mes'
      },
      {
        name: '🕊️ Forjar Alianza de Equilibrio Europeo',
        description: 'Evitar que una superpotencia vecina gane demasiada expansión agresiva.',
        impact: 'Disuasión de Coalición • +2 Reputación Diplomática'
      },
      {
        name: '⚙️ Adoptar Innovación & Ideas de Calidad',
        description: 'Optimizar la disciplina militar y la eficiencia administrativa.',
        impact: '+5% Disciplina • -10% Coste Tecnológico'
      }
    ]
  },
  {
    id: 'victoria',
    title: 'Victoria',
    shortTitle: 'Victoria',
    era: 'Era Victoriana & Revolución Industrial (1836 - 1936)',
    genre: 'Estrategia Económica, Política & Social',
    icon: <DoodleFactory className="w-5 h-5" />,
    badgeColor: 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30',
    description: 'Simulación sociopolítica y económica del siglo XIX: estratos de población (Pops), cadenas de producción fabriles, ferrocarriles, grupos de interés, leyes parlamentarias y diplomacia de crisis.',
    favoriteMechanic: 'Economía de mercado, nivel de vida (SoL), industrialización por estados y equilibrio de grupos de interés.',
    actions: [
      {
        name: '🏭 Construir Fábricas y Red Ferroviaria',
        description: 'Expandir la capacidad manufacturera y la infraestructura de transporte en los estados clave.',
        impact: '+45% Producción Manufacturera • Infraestructura Estatal al 100%'
      },
      {
        name: '📜 Promulgar Ley de Educación Pública y Salud',
        description: 'Aumentar la alfabetización nacional y la cualificación de los estratos trabajadores.',
        impact: '+25% Tasa de Alfabetización • +1.5 Nivel de Vida (SoL)'
      },
      {
        name: '⚖️ Equilibrar Grupos de Interés y Reforma Electoral',
        description: 'Consensuar con industriales e intelectuales para modernizar el parlamento.',
        impact: '+20% Estabilidad Política • Aprobación de Leyes Acelerada'
      }
    ]
  },
  {
    id: 'stellaris',
    title: 'Stellaris',
    shortTitle: 'Stellaris',
    era: 'Era Espacial Futurista (2200+)',
    genre: 'Estrategia 4X Espacial & Ciencia Ficción',
    icon: <DoodleRocket className="w-5 h-5" />,
    badgeColor: 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30',
    description: 'Exploración galáctica, diseño de naves, megaestructuras como la Esfera de Dyson y diplomacia con federaciones alienígenas.',
    favoriteMechanic: 'Desarrollo de megaestructuras, optimización de especies biológicas/sintéticas y Senado Galáctico.',
    actions: [
      {
        name: '🌌 Construir Esfera de Dyson',
        description: 'Encapsular una estrella para recolectar energía ilimitada para la federación.',
        impact: '+4000 Créditos Energéticos • Capacidad Imperial Desbloqueada'
      },
      {
        name: '🛸 Investigar Impulsores Hiperespaciales',
        description: 'Permitir a las flotas científicas explorar anomalías en sistemas lejanos.',
        impact: '+25% Velocidad de Exploración • Nuevas Tecnologías Raras'
      },
      {
        name: '🏛️ Liderar Resolución en el Senado Galáctico',
        description: 'Aprobar directivas de protección comercial y libre investigación cósmica.',
        impact: '+20% Peso Diplomático • Reconocimiento Galáctico'
      }
    ]
  },
  {
    id: 'hoi',
    title: 'Hearts of Iron',
    shortTitle: 'HOI',
    era: 'Siglo XX & Gran Conflicto (1936 - 1948)',
    genre: 'Estrategia Operacional & Logística',
    icon: <DoodleShield className="w-5 h-5" />,
    badgeColor: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
    description: 'Simulación detallada de la Segunda Guerra Mundial: líneas de suministro férreas, diseño de divisiones de combate y producción industrial.',
    favoriteMechanic: 'Planificación de líneas de frente, control del espacio aéreo y balance de fábricas militares.',
    actions: [
      {
        name: '🏭 Optimizar Líneas de Fábricas Militares',
        description: 'Estandarizar la producción de equipamiento de infantería y artillería.',
        impact: '+100% Eficiencia de Producción • Suministro Garantizado'
      },
      {
        name: '🚂 Extender Red Ferroviaria y Centros de Suministro',
        description: 'Asegurar que las divisiones en vanguardia nunca sufran atrición.',
        impact: 'Cero Atrición • 100% Organización de Combate'
      },
      {
        name: '🛡️ Trazar Plan de Batalla Estratégico',
        description: 'Establecer puntas de lanza con apoyo aéreo táctico coordinado.',
        impact: '+30% Bonificación de Planificación • Maniobras Envolventes'
      }
    ]
  },
  {
    id: 'portroyale',
    title: 'Port Royale',
    shortTitle: 'Port Royale',
    era: 'Siglo XVII (El Caribe Colonial)',
    genre: 'Simulación Comercial Naval & Gestión Portuaria',
    icon: <DoodleShip className="w-5 h-5" />,
    badgeColor: 'bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-500/30',
    description: 'Comercio mercantil en el Caribe: gestión de convoyes, construcción de plantaciones, tabaco, ron y rutas comerciales automatizadas.',
    favoriteMechanic: 'Diseño de rutas de comercio circulares entre puertos con oferta/demanda complementaria.',
    actions: [
      {
        name: '⚓ Establecer Ruta Mercantil La Habana - San Juan',
        description: 'Comprar materias primas en puertos productores y vender manufacturas con alto margen.',
        impact: '+1,800 Monedas de Oro semanales • Reputación con el Gobernador'
      },
      {
        name: '🪓 Construir Aserraderos y Plantaciones de Cacao',
        description: 'Integración vertical para no depender de suministros de terceros.',
        impact: '-40% Coste de Mercancía • Empleo Portuario +120'
      },
      {
        name: '🏴‍☠️ Proteger Convoy con Galeones de Guerra',
        description: 'Patrullar las rutas del Caribe contra corsarios y tormentas tropicales.',
        impact: '100% Seguridad de la Carga • Rango de Almirante'
      }
    ]
  }
];

interface StrategyRandomEvent {
  title: string;
  game: string;
  description: string;
  resolution: string;
}

const GAME_RANDOM_EVENTS: Record<string, StrategyRandomEvent[]> = {
  ck: [
    {
      title: '👑 Herencia Inesperada en Ultramar',
      game: 'Crusader Kings',
      description: 'Un pariente lejano de tu dinastía ha fallecido sin descendencia directa y lega un condado próspero a tu corona.',
      resolution: '+250 Ducados de oro y nuevas levas feudales leales a tu linaje.'
    },
    {
      title: '🏹 Gran Caza Real en el Bosque Ducal',
      game: 'Crusader Kings',
      description: 'Durante la cacería de otoño junto a tus vasallos principales, tus monteros rastrean una presa legendaria.',
      resolution: '+25 Opinión con todos los vasallos participantes y +1 Marcialidad temporal.'
    },
    {
      title: '📜 El Maestro de Espías Descubre una Trama',
      game: 'Crusader Kings',
      description: 'Tu consejero de espionaje intercepta una misiva sellada que revela las intenciones desleales de un noble rival.',
      resolution: 'Autoridad para encarcelar al conspirador con causa justa (+30 Autoridad de la Corona).'
    },
    {
      title: '🕊️ Alianza Matrimonial de Alto Linaje',
      game: 'Crusader Kings',
      description: 'Llega una delegación diplomática proponiendo un pacto dinástico sellado con matrimonio real.',
      resolution: '+200 Prestigio dinástico y tratado de no agresión mutuo garantizado.'
    }
  ],
  eu: [
    {
      title: '☄️ ¡Cometa Avistado en los Cielos!',
      game: 'Europa Universalis',
      description: 'Los campesinos y cortesanos observan la estela cósmica; tus astrónomos de la corte explican el fenómeno con rigor.',
      resolution: '¡El conocimiento triunfa! +1 Estabilidad nacional y +25 Puntos de Poder Administrativo.'
    },
    {
      title: '⛵ Auge del Monopolio Mercantil',
      game: 'Europa Universalis',
      description: 'Tus flotas de barcos ligeros logran capturar más del 75% del valor comercial en el nodo principal.',
      resolution: '+35 Ducados de ingresos inmediatos y +1.5 de Poder Mercantil continuo.'
    },
    {
      title: '🏛️ Ministro de Estado Ilustrado',
      game: 'Europa Universalis',
      description: 'Un talentoso estadista implementa una reforma tributaria que reduce la inflación y estimula la economía.',
      resolution: '-2% Inflación nacional y +50 Puntos de Poder Diplomático.'
    },
    {
      title: '🌟 Era de Esplendor y Edad de Oro',
      game: 'Europa Universalis',
      description: 'Tu nación cumple los objetivos históricos de la época y florecen las artes, las academias y el comercio.',
      resolution: '+10% Moral de ejércitos, +10% Eficiencia de producción y -10% Coste de ideas.'
    }
  ],
  victoria: [
    {
      title: '🏭 Auge de la Revolución Industrial y Siderurgia',
      game: 'Victoria',
      description: 'Nuevos telares mecánicos y altos hornos de fundición disparan la productividad y las exportaciones de tus fábricas.',
      resolution: '+4,200 Libras esterlinas semanales y liderazgo en el mercado mundial de manufacturas.'
    },
    {
      title: '🚆 Gran Red Ferroviaria Estatal Inaugurada',
      game: 'Victoria',
      description: 'La primera locomotora une los centros mineros de carbón y hierro con las ciudades y puertos metropolitanos.',
      resolution: 'Cero congestión de infraestructura, +30% migración de trabajadores y acceso al mercado al 100%.'
    },
    {
      title: '🏛️ Conferencia Diplomática y Resolución de Crisis',
      game: 'Victoria',
      description: 'Tus embajadores logran una victoria diplomática en la crisis internacional sin necesidad de movilización militar.',
      resolution: '+60 Prestigio de Gran Potencia y pacto de libre comercio preferente asegurado.'
    },
    {
      title: '📈 Elevación del Nivel de Vida y Florecimiento Social',
      game: 'Victoria',
      description: 'La expansión del empleo industrial y el abaratamiento de bienes de consumo eleva el bienestar de las familias trabajadoras.',
      resolution: '+20% Atracción migratoria y prosperidad en todos los estratos de población (Pops).'
    }
  ],
  stellaris: [
    {
      title: '🌌 Descubrimiento Arqueológico Precursor',
      game: 'Stellaris',
      description: 'Una nave científica desentierra un archivo de datos intacto de una civilización que habitó la galaxia hace mil millones de años.',
      resolution: '+750 Puntos de Investigación en Física e Ingeniería y +1 Artefacto Menor.'
    },
    {
      title: '🪐 Ecos Sensoriales en Gigante Gaseoso',
      game: 'Stellaris',
      description: 'Las sondas automáticas detectan formas de vida gaseosas inteligentes que transmiten secuencias matemáticas armónicas.',
      resolution: '+15% Velocidad de Investigación en Sociedad y +10% Felicidad en el Imperio.'
    },
    {
      title: '⚡ Pico de Energía en la Esfera de Dyson',
      game: 'Stellaris',
      description: 'Tus ingenieros concluyen con éxito la sincronización de los mega-paneles colectores estelares.',
      resolution: '+2,500 Créditos Energéticos mensuales y capacidad naval colosal desbloqueada.'
    },
    {
      title: '🛸 Delegación del Senado Galáctico',
      game: 'Stellaris',
      description: 'Una federación interestelar aliada aprueba tu propuesta de libre investigación y cooperación cósmica.',
      resolution: '+25% Peso Diplomático Galáctico y libre tránsito por rutas hiperespaciales.'
    }
  ],
  hoi: [
    {
      title: '🏭 Estandarización de Líneas de Fábricas',
      game: 'Hearts of Iron',
      description: 'Tus ingenieros industriales alcanzan el 100% de retención de eficiencia de producción en cadenas de montaje.',
      resolution: '+100% Eficiencia en fábricas militares y cero retraso en renovación de equipamiento.'
    },
    {
      title: '🚂 Red Ferroviaria y Suministro al 100%',
      game: 'Hearts of Iron',
      description: 'La nueva red de trenes de suministros y hubs logísticos abastece con precisión matemática a cada división.',
      resolution: 'Cero atrición de unidades en el frente, +20% Organización de combate y combustible garantizado.'
    },
    {
      title: '✈️ Superioridad Aérea y Radar Táctico',
      game: 'Hearts of Iron',
      description: 'Tus escuadrones de cazas pesados y radares de alerta temprana aseguran el dominio completo de los cielos.',
      resolution: '+25% Bono de combate terrestre y supresión total del apoyo aéreo enemigo.'
    },
    {
      title: '📻 Código Cifrado Enemigo Descifrado',
      game: 'Hearts of Iron',
      description: 'El departamento de criptografía desentraña las frecuencias y órdenes de operaciones del mando rival.',
      resolution: 'Visibilidad total del despliegue rival y +15% Ataque de división en combate activo.'
    }
  ],
  portroyale: [
    {
      title: '🌊 Vientos Alisios Favorables en el Caribe',
      game: 'Port Royale',
      description: 'Tu convoy de galeones mercantes navega a toda vela y arriba 4 días antes con la bodega repleta de azúcar y ron.',
      resolution: '+3,500 Monedas de Oro en beneficios netos y alta estima del Gobernador.'
    },
    {
      title: '🪓 Cosecha Dorada en Plantaciones y Aserraderos',
      game: 'Port Royale',
      description: 'El clima tropical perfecto genera una producción récord de materias primas en tus haciendas coloniales.',
      resolution: '-50% Coste de producción y almacenes portuarios operando al 100% de capacidad.'
    },
    {
      title: '🏴‍☠️ Victoria Naval y Captura de Corsarios',
      game: 'Port Royale',
      description: 'Tus fragatas de guerra derrotan a una escuadra pirata y capturan dos bergantines intactos.',
      resolution: '+2 Navíos incorporados a tu flota mercantil y rango de Capitán General de la Mar.'
    },
    {
      title: '⚓ Inauguración de Diques Secos y Astillero Mayor',
      game: 'Port Royale',
      description: 'Concluyes la construcción de astilleros de gran calado capaces de botar Galeones de Guerra de 60 cañones.',
      resolution: '-25% Coste de reparación de barcos y construcción de Galeones de Guerra desbloqueada.'
    }
  ]
};

interface StrategyGamesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ActionLogEntry {
  id: string;
  time: string;
  game: string;
  action: string;
  impact: string;
}

export const StrategyGamesModal: React.FC<StrategyGamesModalProps> = ({
  isOpen,
  onClose
}) => {
  const [selectedGameId, setSelectedGameId] = useState<string>('ck');
  const [actionLog, setActionLog] = useState<ActionLogEntry[]>([]);
  const [currentEvent, setCurrentEvent] = useState<StrategyRandomEvent | null>(null);
  const [eventTapKey, setEventTapKey] = useState<number>(0);
  const [isEventBouncing, setIsEventBouncing] = useState<boolean>(false);
  const [clickedActionName, setClickedActionName] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentGame =
    STRATEGY_GAMES.find((g) => g.id === selectedGameId) || STRATEGY_GAMES[0];

  const handleExecuteAction = (actionName: string, impact: string) => {
    const timestamp = new Date().toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    const entry: ActionLogEntry = {
      id: `${Date.now()}-${Math.random()}`,
      time: timestamp,
      game: currentGame.shortTitle,
      action: actionName,
      impact: impact
    };
    setActionLog((prev) => [entry, ...prev.slice(0, 5)]);
    setClickedActionName(actionName);
    setTimeout(() => {
      setClickedActionName(null);
    }, 750);
  };

  const handleTriggerRandomEvent = () => {
    const gameEvents = GAME_RANDOM_EVENTS[selectedGameId] || GAME_RANDOM_EVENTS['ck'];
    let availableEvents = gameEvents;
    if (currentEvent && gameEvents.length > 1) {
      availableEvents = gameEvents.filter((e) => e.title !== currentEvent.title);
    }
    const randomEvt = availableEvents[Math.floor(Math.random() * availableEvents.length)];
    setCurrentEvent(randomEvt);
    setEventTapKey((prev) => prev + 1);
    setIsEventBouncing(true);
    setTimeout(() => setIsEventBouncing(false), 500);
  };

  const handleSelectGame = (gameId: string) => {
    if (gameId !== selectedGameId) {
      setSelectedGameId(gameId);
      setActionLog([]);
      setCurrentEvent(null);
      setClickedActionName(null);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-neutral-950/70 backdrop-blur-xs animate-in fade-in duration-200 cursor-pointer touch-none"
      id="strategy-games-easter-egg-backdrop"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl max-h-[92vh] overflow-y-auto no-scrollbar doodle-card bg-[#faf9f5] dark:bg-[#12151b] border-2 border-neutral-800 dark:border-neutral-200 doodle-shadow-lg p-3.5 sm:p-6 text-neutral-900 dark:text-neutral-100 relative animate-in zoom-in-95 duration-200 cursor-default"
        id="strategy-games-modal"
      >
        {/* Botón de cierre */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-5 sm:right-5 p-2 doodle-btn text-red-700 dark:text-red-300 hover:text-white dark:hover:text-white active:text-white bg-red-100 hover:bg-red-500 active:bg-red-600 dark:bg-red-950/80 dark:hover:bg-red-600 dark:active:bg-red-700 transition-all cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center border-2 border-red-400 hover:border-red-600 active:border-red-700 dark:border-red-600 dark:hover:border-red-500 dark:active:border-red-400 active:scale-90 touch-manipulation z-20"
          aria-label="Cerrar modal de juegos"
          title="Cerrar sala de mando"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Encabezado */}
        <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-5 pr-10">
          <div className="w-10 h-10 sm:w-12 sm:h-12 doodle-box bg-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold text-lg sm:text-2xl shrink-0 border-2 border-amber-600/40">
            <DoodleCrown className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <span>Sala de Mando</span>
            </h3>
          </div>
        </div>

        {/* Selector de juegos */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">
          {STRATEGY_GAMES.map((game) => (
            <button
              key={game.id}
              onClick={() => handleSelectGame(game.id)}
              className={`px-2.5 sm:px-3 py-1.5 doodle-btn text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer min-h-[34px] border-2 ${
                selectedGameId === game.id
                  ? 'bg-amber-700 dark:bg-amber-500 text-white dark:text-neutral-950 border-amber-800 dark:border-amber-400 doodle-shadow-sm font-bold scale-[1.02]'
                  : 'bg-white/80 dark:bg-neutral-900/80 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700 hover:border-amber-500/70 hover:bg-amber-50/50 dark:hover:bg-amber-950/20'
              }`}
            >
              <span>{game.icon}</span>
              <span>{game.shortTitle}</span>
            </button>
          ))}
        </div>

        {/* Detalles del juego actual */}
        <div className="space-y-3.5 sm:space-y-4">
          <div className="p-3.5 sm:p-5 doodle-card bg-white/90 dark:bg-neutral-900/80 border-2 border-neutral-300 dark:border-neutral-700 doodle-shadow-sm">
            <div className="mb-2">
              <h4 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                <span>{currentGame.title}</span>
              </h4>
              <div className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 font-mono mt-0.5">
                {currentGame.era} • <span className="text-amber-700 dark:text-amber-400 font-medium">{currentGame.genre}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3">
              {currentGame.description}
            </p>

            <div className="p-2.5 sm:p-3 doodle-box bg-amber-500/10 dark:bg-neutral-950/80 border-2 border-amber-500/30 text-xs mb-3 font-mono">
              <span className="font-bold text-neutral-900 dark:text-neutral-100 block mb-0.5">
                ⚙️ Mecánica favorita:
              </span>
              <span className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {currentGame.favoriteMechanic}
              </span>
            </div>

            {/* Panel interactivo de decisiones */}
            <div className="pt-1">
              <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2 flex items-center justify-between font-mono">
                <span>⚡ Órdenes de mando:</span>
                <button
                  onClick={handleTriggerRandomEvent}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 doodle-btn text-xs font-bold transition-all cursor-pointer select-none active:scale-90 active:-rotate-3 active:translate-y-0.5 border-2 ${
                    isEventBouncing
                      ? 'bg-amber-500 text-white border-amber-700 animate-doodle-tap scale-105'
                      : 'bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 border-amber-400 dark:border-amber-700 hover:bg-amber-200 dark:hover:bg-amber-900'
                  }`}
                  title="Generar evento aleatorio táctico"
                >
                  <DoodleDice className={`w-3.5 h-3.5 transition-transform duration-300 ${isEventBouncing ? 'rotate-180 scale-125' : ''}`} />
                  <span>🎲 Evento Aleatorio</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {currentGame.actions.map((act, idx) => {
                  const isClicked = clickedActionName === act.name;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleExecuteAction(act.name, act.impact)}
                      className={`p-2.5 sm:p-3 doodle-card border-2 text-left transition-all group cursor-pointer flex flex-col justify-between select-none active:scale-95 active:translate-y-1 active:rotate-1 ${
                        isClicked
                          ? 'bg-amber-100 dark:bg-amber-950/70 border-amber-600 dark:border-amber-400 doodle-shadow animate-doodle-tap'
                          : 'bg-[#faf8f2] dark:bg-neutral-950 hover:bg-amber-50/80 dark:hover:bg-amber-950/40 border-neutral-300 dark:border-neutral-700 hover:border-amber-500/70'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 mb-1 leading-snug">
                          {act.name}
                        </div>
                        <div className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-snug">
                          {act.description}
                        </div>
                      </div>
                      <div
                        className={`mt-2.5 text-[11px] font-mono font-bold flex items-center gap-1.5 transition-all ${
                          isClicked
                            ? 'text-amber-800 dark:text-amber-300 animate-doodle-wiggle scale-105'
                            : 'text-emerald-700 dark:text-emerald-400 group-hover:text-emerald-800 dark:group-hover:text-emerald-300 group-hover:translate-x-1'
                        }`}
                      >
                        <span>{isClicked ? '✓ ¡Orden emitida!' : '⚡ Emitir orden'}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Ventana emergente de evento aleatorio */}
          {currentEvent && (
            <div
              key={`event-${eventTapKey}-${currentEvent.title}`}
              className="p-3 sm:p-4 doodle-card bg-amber-500/15 border-2 border-amber-500 text-xs animate-doodle-pop doodle-shadow-amber"
            >
              <div className="flex items-center justify-between gap-2 font-bold text-amber-900 dark:text-amber-300 mb-1">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0 animate-bounce" />
                  <span className="font-doodle text-xs sm:text-sm">Evento: {currentEvent.title} ({currentEvent.game})</span>
                </span>
                <button
                  onClick={() => setCurrentEvent(null)}
                  className="text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 text-xs px-1.5 py-0.5 font-bold cursor-pointer hover:scale-110 active:scale-95 transition-transform"
                  title="Cerrar evento"
                >
                  ✕
                </button>
              </div>
              <p className="text-neutral-800 dark:text-neutral-200 mb-2 leading-relaxed font-medium">
                {currentEvent.description}
              </p>
              <div className="p-2.5 doodle-box bg-white/90 dark:bg-neutral-900/90 font-mono text-[11px] sm:text-xs text-emerald-800 dark:text-emerald-300 font-bold border-2 border-emerald-500/50 flex items-center gap-1.5 animate-doodle-wiggle">
                <span className="shrink-0">⚡</span>
                <span>Resultado: {currentEvent.resolution}</span>
              </div>
            </div>
          )}

          {/* Registro de acciones de simulación - Totalmente responsivo en todos los dispositivos */}
          {actionLog.length > 0 && (
            <div className="p-3 sm:p-4 doodle-card bg-neutral-900 text-neutral-100 dark:bg-[#0c0f14] border-2 border-neutral-700 doodle-shadow-sm">
              <div className="flex items-center justify-between gap-2 mb-2.5 pb-1.5 border-b border-neutral-800">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400">
                  <span>📜 Registro de Órdenes</span>
                  <span className="px-1.5 py-0.2 doodle-badge bg-amber-400/20 text-amber-300 text-[10px]">
                    {actionLog.length}
                  </span>
                </div>
                <button
                  onClick={() => setActionLog([])}
                  className="px-2.5 py-1 doodle-btn bg-neutral-800 hover:bg-neutral-700 text-[11px] font-mono text-neutral-300 hover:text-white transition-colors cursor-pointer min-h-[28px] border-2 border-neutral-700"
                >
                  Limpiar
                </button>
              </div>

              <div className="space-y-2 max-h-52 overflow-y-auto no-scrollbar pr-1">
                {actionLog.map((log) => (
                  <div
                    key={log.id}
                    className="p-2.5 doodle-box bg-neutral-950/80 border-2 border-neutral-800 text-xs font-mono space-y-1 animate-doodle-pop"
                  >
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] text-neutral-400 font-semibold">
                        [{log.time}]
                      </span>
                      <span className="px-1.5 py-0.2 doodle-badge bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                        {log.game}
                      </span>
                      <span className="font-semibold text-neutral-100 break-words">
                        {log.action}
                      </span>
                    </div>
                    <div className="text-[11px] text-emerald-400 font-medium pl-2 border-l-2 border-emerald-500/50 break-words leading-relaxed">
                      {log.impact}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
