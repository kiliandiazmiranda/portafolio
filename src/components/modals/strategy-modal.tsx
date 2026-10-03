// Modal interactivo de videojuegos de estrategia con soporte bilingüe (ES / EN)

import React, { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import {
  DoodleCrown,
  DoodleGlobe,
  DoodleRocket,
  DoodleShield,
  DoodleShip,
  DoodleDice,
  DoodleFactory,
} from '../doodles/icons';
import { useLanguage } from '../../context/language';
import { TRANSLATIONS, STRATEGY_GAMES_I18N } from '../../data/translations';
import { Language } from '../../types';

const getGameIcon = (id: string) => {
  switch (id) {
    case 'ck':
      return <DoodleCrown className="w-5 h-5" />;
    case 'eu':
      return <DoodleShip className="w-5 h-5" />;
    case 'vic':
      return <DoodleFactory className="w-5 h-5" />;
    case 'hoi':
      return <DoodleShield className="w-5 h-5" />;
    case 'stel':
    case 'stellaris':
      return <DoodleRocket className="w-5 h-5" />;
    case 'civ':
      return <DoodleGlobe className="w-5 h-5" />;
    default:
      return <DoodleCrown className="w-5 h-5" />;
  }
};

interface StrategyRandomEvent {
  title: string;
  game: string;
  description: string;
  resolution: string;
}

const GAME_RANDOM_EVENTS_I18N: Record<Language, Record<string, StrategyRandomEvent[]>> = {
  es: {
    ck: [
      {
        title: '👑 Herencia Inesperada en Ultramar',
        game: 'Crusader Kings',
        description: 'Un pariente lejano de tu dinastía ha fallecido sin descendencia directa y lega un condado próspero a tu corona.',
        resolution: '+250 Ducados de oro y nuevas levas feudales leales a tu linaje.',
      },
      {
        title: '🏹 Gran Caza Real en el Bosque Ducal',
        game: 'Crusader Kings',
        description: 'Durante la cacería de otoño junto a tus vasallos principales, tus monteros rastrean una presa legendaria.',
        resolution: '+25 Opinión con todos los vasallos participantes y +1 Marcialidad temporal.',
      },
      {
        title: '📜 El Maestro de Espías Descubre una Trama',
        game: 'Crusader Kings',
        description: 'Tu consejero de espionaje intercepta una misiva sellada que revela las intenciones desleales de un noble rival.',
        resolution: 'Autoridad para encarcelar al conspirador con causa justa (+30 Autoridad de la Corona).',
      },
      {
        title: '🕊️ Alianza Matrimonial de Alto Linaje',
        game: 'Crusader Kings',
        description: 'Llega una delegación diplomática proponiendo un pacto dinástico sellado con matrimonio real.',
        resolution: '+200 Prestigio dinástico y tratado de no agresión mutuo garantizado.',
      },
    ],
    eu: [
      {
        title: '☄️ ¡Cometa Avistado en los Cielos!',
        game: 'Europa Universalis',
        description: 'Los campesinos y cortesanos observan la estela cósmica; tus astrónomos de la corte explican el fenómeno con rigor.',
        resolution: '¡El conocimiento triunfa! +1 Estabilidad nacional y +25 Puntos de Poder Administrativo.',
      },
      {
        title: '⛵ Auge del Monopolio Mercantil',
        game: 'Europa Universalis',
        description: 'Tus flotas de barcos ligeros logran capturar más del 75% del valor comercial en el nodo principal.',
        resolution: '+35 Ducados de ingresos inmediatos y +1.5 de Poder Mercantil continuo.',
      },
      {
        title: '🏛️ Ministro de Estado Ilustrado',
        game: 'Europa Universalis',
        description: 'Un talentoso estadista implementa una reforma tributaria que reduce la inflación y estimula la economía.',
        resolution: '-2% Inflación nacional y +50 Puntos de Poder Diplomático.',
      },
      {
        title: '🌟 Era de Esplendor y Edad de Oro',
        game: 'Europa Universalis',
        description: 'Tu nación cumple los objetivos históricos de la época y florecen las artes, las academias y el comercio.',
        resolution: '+10% Moral de ejércitos, +10% Eficiencia de producción y -10% Coste de ideas.',
      },
    ],
    vic: [
      {
        title: '🏭 Auge de la Revolución Industrial y Siderurgia',
        game: 'Victoria',
        description: 'Nuevos telares mecánicos y altos hornos de fundición disparan la productividad y las exportaciones de tus fábricas.',
        resolution: '+4,200 Libras esterlinas semanales y liderazgo en el mercado mundial de manufacturas.',
      },
      {
        title: '🚆 Gran Red Ferroviaria Estatal Inaugurada',
        game: 'Victoria',
        description: 'La primera locomotora une los centros mineros de carbón y hierro con las ciudades y puertos metropolitanos.',
        resolution: 'Cero congestión de infraestructura, +30% migración de trabajadores y acceso al mercado al 100%.',
      },
      {
        title: '🏛️ Conferencia Diplomática y Resolución de Crisis',
        game: 'Victoria',
        description: 'Tus embajadores logran una victoria diplomática en la crisis internacional sin necesidad de movilización militar.',
        resolution: '+60 Prestigio de Gran Potencia y pacto de libre comercio preferente asegurado.',
      },
      {
        title: '📈 Elevación del Nivel de Vida y Florecimiento Social',
        game: 'Victoria',
        description: 'La expansión del empleo industrial y el abaratamiento de bienes de consumo eleva el bienestar de las familias trabajadoras.',
        resolution: '+20% Atracción migratoria y prosperidad en todos los estratos de población (Pops).',
      },
    ],
    hoi: [
      {
        title: '🏭 Estandarización de Líneas de Fábricas',
        game: 'Hearts of Iron',
        description: 'Tus ingenieros industriales alcanzan el 100% de retención de eficiencia de producción en cadenas de montaje.',
        resolution: '+100% Eficiencia en fábricas militares y cero retraso en renovación de equipamiento.',
      },
      {
        title: '🚂 Red Ferroviaria y Suministro al 100%',
        game: 'Hearts of Iron',
        description: 'La nueva red de trenes de suministros y hubs logísticos abastece con precisión matemática a cada división.',
        resolution: 'Cero atrición de unidades en el frente, +20% Organización de combate y combustible garantizado.',
      },
      {
        title: '✈️ Superioridad Aérea y Radar Táctico',
        game: 'Hearts of Iron',
        description: 'Tus escuadrones de cazas pesados y radares de alerta temprana aseguran el dominio completo de los cielos.',
        resolution: '+25% Bono de combate terrestre y supresión total del apoyo aéreo enemigo.',
      },
      {
        title: '📻 Código Cifrado Enemigo Descifrado',
        game: 'Hearts of Iron',
        description: 'El departamento de criptografía desentraña las frecuencias y órdenes de operaciones del mando rival.',
        resolution: 'Visibilidad total del despliegue rival y +15% Ataque de división en combate activo.',
      },
    ],
    stel: [
      {
        title: '🌌 Descubrimiento Arqueológico Precursor',
        game: 'Stellaris',
        description: 'Una nave científica desentierra un archivo de datos intacto de una civilización que habitó la galaxia hace mil millones de años.',
        resolution: '+750 Puntos de Investigación en Física e Ingeniería y +1 Artefacto Menor.',
      },
      {
        title: '🪐 Ecos Sensoriales en Gigante Gaseoso',
        game: 'Stellaris',
        description: 'Las sondas automáticas detectan formas de vida gaseosas inteligentes que transmiten secuencias matemáticas armónicas.',
        resolution: '+15% Velocidad de Investigación en Sociedad y +10% Felicidad en el Imperio.',
      },
      {
        title: '⚡ Pico de Energía en la Esfera de Dyson',
        game: 'Stellaris',
        description: 'Tus ingenieros concluyen con éxito la sincronización de los mega-paneles colectores estelares.',
        resolution: '+2,500 Créditos Energéticos mensuales y capacidad naval colosal desbloqueada.',
      },
      {
        title: '🛸 Delegación del Senado Galáctico',
        game: 'Stellaris',
        description: 'Una federación interestelar aliada aprueba tu propuesta de libre investigación y cooperación cósmica.',
        resolution: '+25% Peso Diplomático Galáctico y libre tránsito por rutas hiperespaciales.',
      },
    ],
  },
  en: {
    ck: [
      {
        title: '👑 Unexpected Overseas Inheritance',
        game: 'Crusader Kings',
        description: 'A distant dynasty relative passed away with no direct heirs, leaving a prosperous county to your realm.',
        resolution: '+250 Gold Ducats and fresh feudal levies sworn directly to your house.',
      },
      {
        title: '🏹 Grand Royal Hunt in the Ducal Woods',
        game: 'Crusader Kings',
        description: 'During the autumn feast alongside principal vassals, your huntsmen track down a legendary white stag.',
        resolution: '+25 Vassal Opinion across all participants and +1 Martial prowess.',
      },
      {
        title: '📜 Spymaster Uncovers a Treasonous Plot',
        game: 'Crusader Kings',
        description: 'Your spymaster intercepts an encrypted raven letter exposing the treasonous schemes of a rival duke.',
        resolution: 'Rightful imprisonment reason granted with zero tyranny (+30 Crown Authority).',
      },
      {
        title: '🕊️ High-Lineage Matrimonial Alliance',
        game: 'Crusader Kings',
        description: 'A sovereign delegation arrives proposing a sacred dynastic marriage alliance.',
        resolution: '+200 Dynastic Renown and a guaranteed bilateral non-aggression pact.',
      },
    ],
    eu: [
      {
        title: '☄️ Comet Sighted in the Skies!',
        game: 'Europa Universalis',
        description: 'Peasants and courtiers marvel at the brilliant celestial tail; royal astronomers explain the phenomenon with empirical rigor.',
        resolution: 'Science prevails! +1 National Stability and +25 Administrative Power points.',
      },
      {
        title: '⛵ Mercantile Monopoly Boom',
        game: 'Europa Universalis',
        description: 'Light frigate squadrons capture more than 75% of total trade value across the regional maritime hub.',
        resolution: '+35 Immediate Ducat revenue and sustained +1.5 Trade Power.',
      },
      {
        title: '🏛️ Enlightened Minister of State',
        game: 'Europa Universalis',
        description: 'A talented statesman implements comprehensive tax reform, curbing inflation and stimulating enterprise.',
        resolution: '-2% National Inflation and +50 Diplomatic Power points.',
      },
      {
        title: '🌟 Age of Splendor & Golden Era',
        game: 'Europa Universalis',
        description: 'Your realm completes historical objectives, ushering in flourishing arts, academies, and global commerce.',
        resolution: '+10% Army Morale, +10% Production Efficiency, and -10% Idea Cost.',
      },
    ],
    vic: [
      {
        title: '🏭 Industrial Revolution & Foundry Boom',
        game: 'Victoria',
        description: 'Mechanized power looms and blast furnaces massively increase manufacture output and global trade competitiveness.',
        resolution: '+£4,200 Weekly revenue and commanding export market share.',
      },
      {
        title: '🚆 Grand State Railway Network Inauguration',
        game: 'Victoria',
        description: 'Steam locomotives link primary coal and iron mining basins directly to metropolitan ports.',
        resolution: 'Zero infrastructure penalty, +30% worker migration, and 100% market access.',
      },
      {
        title: '🏛️ Diplomatic Conference Peace Resolution',
        game: 'Victoria',
        description: 'Your veteran ambassadors achieve a peaceful diplomatic breakthrough in the international crisis without mobilization.',
        resolution: '+60 Great Power Prestige and preferential free trade access secured.',
      },
      {
        title: '📈 Rising Standard of Living & Social Flourishing',
        game: 'Victoria',
        description: 'Expanding industrial employment and cheaper everyday consumer goods lift working families across all strata.',
        resolution: '+20% Migration attraction and sustained prosperity across all social classes (Pops).',
      },
    ],
    hoi: [
      {
        title: '🏭 Production Line Efficiency Standardization',
        game: 'Hearts of Iron',
        description: 'Factory engineers achieve 100% retention on assembly lines with zero tooling downtime.',
        resolution: '+100% Military factory efficiency and instant gear replenishment.',
      },
      {
        title: '🚂 Logistics Rail Network Operating at 100%',
        game: 'Hearts of Iron',
        description: 'Upgraded supply hubs and motorized distribution feed every frontline division with clockwork precision.',
        resolution: 'Zero unit attrition, +20% Combat Organization, and guaranteed fuel supply.',
      },
      {
        title: '✈️ Air Superiority & Tactical Radar Arrays',
        game: 'Hearts of Iron',
        description: 'Fighter wings and early-warning stations secure complete uncontested control of the regional airspace.',
        resolution: '+25% Ground combat support bonus and total suppression of hostile strikes.',
      },
      {
        title: '📻 Hostile Cryptographic Cypher Decrypted',
        game: 'Hearts of Iron',
        description: 'Cryptanalysts crack the adversary’s radio command codes and battle directives.',
        resolution: 'Full tactical visibility of hostile troop movements and +15% Division Attack.',
      },
    ],
    stel: [
      {
        title: '🌌 Precursor Archaeological Breakthrough',
        game: 'Stellaris',
        description: 'A survey science vessel excavates an intact databank belonging to an extinct billion-year-old empire.',
        resolution: '+750 Physics & Engineering Research Points and +1 Minor Artifact.',
      },
      {
        title: '🪐 Sentient Gas Giant Resonances',
        game: 'Stellaris',
        description: 'Atmospheric probes discover intelligent atmospheric lifeforms broadcasting harmonic mathematical sequences.',
        resolution: '+15% Society Research speed and +10% Empire-wide Citizen Happiness.',
      },
      {
        title: '⚡ Dyson Sphere Megastructure Synchronized',
        game: 'Stellaris',
        description: 'Engineers achieve stable phase alignment across all stellar solar collectors.',
        resolution: '+2,500 Monthly Energy Credits and colossal naval capacity unlocked.',
      },
      {
        title: '🛸 Galactic Senate Resolution Passed',
        game: 'Stellaris',
        description: 'The interstellar council overwhelmingly votes in favor of your cosmic research and mutual defense charter.',
        resolution: '+25% Galactic Diplomatic Weight and open hyperlane transit privileges.',
      },
    ],
  },
};

interface StrategyModalProps {
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

export const StrategyModal: React.FC<StrategyModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].strategyModal;
  const games = STRATEGY_GAMES_I18N[language];

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
    games.find((g) => g.id === selectedGameId) || games[0];

  const handleExecuteAction = (actionName: string, impact: string) => {
    const timestamp = new Date().toLocaleTimeString(language === 'es' ? 'es-ES' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    const entry: ActionLogEntry = {
      id: `${Date.now()}-${Math.random()}`,
      time: timestamp,
      game: currentGame.shortTitle,
      action: actionName,
      impact: impact,
    };
    setActionLog((prev) => [entry, ...prev.slice(0, 5)]);
    setClickedActionName(actionName);
    setTimeout(() => {
      setClickedActionName(null);
    }, 750);
  };

  const handleTriggerRandomEvent = () => {
    const langEvents = GAME_RANDOM_EVENTS_I18N[language];
    const gameEvents = langEvents[selectedGameId] || langEvents['ck'];
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
          aria-label={t.close}
          title={t.close}
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
              <span>{t.title}</span>
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-mono">
              {t.subtitle}
            </p>
          </div>
        </div>

        {/* Selector de juegos */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">
          {games.map((game) => (
            <button
              key={game.id}
              onClick={() => handleSelectGame(game.id)}
              className={`px-2.5 sm:px-3 py-1.5 doodle-btn text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer min-h-[34px] border-2 ${
                selectedGameId === game.id
                  ? 'bg-amber-700 dark:bg-amber-500 text-white dark:text-neutral-950 border-amber-800 dark:border-amber-400 doodle-shadow-sm font-bold scale-[1.02]'
                  : 'bg-white/80 dark:bg-neutral-900/80 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700 hover:border-amber-500/70 hover:bg-amber-50/50 dark:hover:bg-amber-950/20'
              }`}
            >
              <span>{getGameIcon(game.id)}</span>
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
                {currentGame.era} •{' '}
                <span className="text-amber-700 dark:text-amber-400 font-medium">
                  {currentGame.genre}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3">
              {currentGame.description}
            </p>

            <div className="p-2.5 sm:p-3 doodle-box bg-amber-500/10 dark:bg-neutral-950/80 border-2 border-amber-500/30 text-xs mb-3 font-mono">
              <span className="font-bold text-neutral-900 dark:text-neutral-100 block mb-0.5">
                ⚙️ {t.mechanicLabel}:
              </span>
              <span className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {currentGame.favoriteMechanic}
              </span>
            </div>

            {/* Panel interactivo de decisiones */}
            <div className="pt-1">
              <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2 flex items-center justify-between font-mono">
                <span>⚡ {t.decisionsTitle}:</span>
                <button
                  onClick={handleTriggerRandomEvent}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 doodle-btn text-xs font-bold transition-all cursor-pointer select-none active:scale-90 active:-rotate-3 active:translate-y-0.5 border-2 ${
                    isEventBouncing
                      ? 'bg-amber-500 text-white border-amber-700 animate-doodle-tap scale-105'
                      : 'bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 border-amber-400 dark:border-amber-700 hover:bg-amber-200 dark:hover:bg-amber-900'
                  }`}
                  title={language === 'es' ? 'Generar evento aleatorio táctico' : 'Trigger random strategic event'}
                >
                  <DoodleDice
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${
                      isEventBouncing ? 'rotate-180 scale-125' : ''
                    }`}
                  />
                  <span>{language === 'es' ? '🎲 Evento Aleatorio' : '🎲 Random Event'}</span>
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
                        <span>{isClicked ? `✓ ${t.executedBtn}` : `⚡ ${t.executeBtn}`}</span>
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
                  <span className="font-doodle text-xs sm:text-sm">
                    {language === 'es' ? 'Evento' : 'Event'}: {currentEvent.title} ({currentEvent.game})
                  </span>
                </span>
                <button
                  onClick={() => setCurrentEvent(null)}
                  className="text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 text-xs px-1.5 py-0.5 font-bold cursor-pointer hover:scale-110 active:scale-95 transition-transform"
                  title={language === 'es' ? 'Cerrar evento' : 'Close event'}
                >
                  ✕
                </button>
              </div>
              <p className="text-neutral-800 dark:text-neutral-200 mb-2 leading-relaxed font-medium">
                {currentEvent.description}
              </p>
              <div className="p-2.5 doodle-box bg-white/90 dark:bg-neutral-900/90 font-mono text-[11px] sm:text-xs text-emerald-800 dark:text-emerald-300 font-bold border-2 border-emerald-500/50 flex items-center gap-1.5 animate-doodle-wiggle">
                <span className="shrink-0">⚡</span>
                <span>
                  {language === 'es' ? 'Resultado' : 'Outcome'}: {currentEvent.resolution}
                </span>
              </div>
            </div>
          )}

          {/* Registro de acciones de simulación */}
          {actionLog.length > 0 && (
            <div className="p-3 sm:p-4 doodle-card bg-neutral-900 text-neutral-100 dark:bg-[#0c0f14] border-2 border-neutral-700 doodle-shadow-sm">
              <div className="flex items-center justify-between gap-2 mb-2.5 pb-1.5 border-b border-neutral-800">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400">
                  <span>📜 {language === 'es' ? 'Registro de Órdenes' : 'Order Dispatch Log'}</span>
                  <span className="px-1.5 py-0.2 doodle-badge bg-amber-400/20 text-amber-300 text-[10px]">
                    {actionLog.length}
                  </span>
                </div>
                <button
                  onClick={() => setActionLog([])}
                  className="px-2.5 py-1 doodle-btn bg-neutral-800 hover:bg-neutral-700 text-[11px] font-mono text-neutral-300 hover:text-white transition-colors cursor-pointer min-h-[28px] border-2 border-neutral-700"
                >
                  {language === 'es' ? 'Limpiar' : 'Clear'}
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

export { StrategyModal as StrategyGamesModal };
