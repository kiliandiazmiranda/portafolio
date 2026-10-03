// Fuente de datos para contenidos e informacion del portafolio

import { SkillCategory, PrehistoricCreature, AstronomyObject } from '../types';

// Informacion personal y enlaces de contacto
export const PERSONAL_INFO = {
  name: "Kilian Diaz Miranda",
  title: "Ingeniero de Sistemas y Computación | Desarrollador Full Stack",
  tagline: "Construyendo soluciones web robustas, arquitecturas limpias y sistemas escalables.",
  bio: "Me apasiona la tecnología y el desarrollo de aplicaciones web. En mi tiempo libre disfruto estudiando sobre animales prehistóricos y la astronomía. Soy fan de los gatos y los juegos de estrategia.",
  passions: [
    {
      title: "Juegos de Estrategia",
      description: "Me gustan los juegos de estrategia, en especial los de Paradox.",
      icon: "Gamepad2"
    },
    {
      title: "Gatos",
      description: "Tengo un gato y disfruto mucho de su compañía.",
      icon: "Cat"
    },
    {
      title: "Prehistoria",
      description: "Me fascina conocer los animales que habitaron la Tierra en la prehistoria.",
      icon: "Bone"
    },
    {
      title: "Astronomía",
      description: "Me fascina aprender sobre el universo y sus misterios.",
      icon: "Telescope"
    }
  ],
  githubUrl: "https://github.com/KilianDiazMiranda",
  githubUser: "KilianDiazMiranda",
  linkedinUrl: "https://www.linkedin.com/in/kiliandiazmiranda/",
  email: "kiliandiazmiranda@outlook.com",
  cvUrl: "https://srrtubtwzrawemtlxoia.supabase.co/storage/v1/object/public/cv/CV%20Kilian%20Diaz%20Miranda.pdf",
  location: "Disponible Presencial & Remoto",
  availability: "Abierto a proyectos de desarrollo web",
  stats: [
    { label: "Áreas de Dominio", value: "6", change: "Full-Stack & Cloud" },
    { label: "Perfil GitHub", value: "Activo", change: "Código abierto" },
    { label: "Enfoque", value: "Creación de aplicaciones Web", change: "Código limpio y mantenible" },
  ]
};

// Catalogo de categorias tecnicas y herramientas
export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "languages",
    number: "01",
    title: "Lenguajes",
    description:
      "Lenguajes de programación y consulta utilizados para el desarrollo de aplicaciones web, automatizaciones y gestión de datos.",
    iconName: "Code2",
    color:
      "from-blue-500/10 to-indigo-500/10 text-blue-600 dark:text-blue-400",
    technologies: [
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "Java" },
      { name: "Python" },
      { name: "SQL" },
    ],
  },
  {
    id: "frontend",
    number: "02",
    title: "Front-End",
    description:
      "Desarrollo de aplicaciones web modernas, interfaces reactivas y componentes accesibles, visualmente atractivos y optimizados.",
    iconName: "Layout",
    color:
      "from-cyan-500/10 to-blue-500/10 text-cyan-600 dark:text-cyan-400",
    technologies: [
      { name: "React" },
      { name: "Vue.js" },
      { name: "Vite" },
      { name: "Next.js" },
      { name: "Angular" },
      { name: "Tailwind CSS" },
      { name: "Bootstrap" },
    ],
  },
  {
    id: "backend",
    number: "03",
    title: "Back-End",
    description:
      "Desarrollo de servicios y lógica del lado del servidor, creación de APIs REST y arquitecturas backend escalables.",
    iconName: "Server",
    color:
      "from-amber-500/10 to-orange-500/10 text-amber-600 dark:text-amber-400",
    technologies: [
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "NestJS" },
      { name: "Spring Boot" },
    ],
  },
  {
    id: "databases",
    number: "04",
    title: "Bases de Datos",
    description:
      "Modelado, diseño, administración y consulta de bases de datos relacionales y no relacionales, junto a herramientas de gestión.",
    iconName: "Database",
    color:
      "from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400",
    technologies: [
      { name: "MySQL" },
      { name: "PostgreSQL" },
      { name: "MongoDB" },
      { name: "MySQL Workbench" },
    ],
  },
  {
    id: "testing_cloud",
    number: "05",
    title: "Pruebas y Cloud",
    description:
      "Diseño y ejecución de pruebas automatizadas para asegurar la confiabilidad del código, junto con despliegue e infraestructura en servicios en la nube.",
    iconName: "Cloud",
    color:
      "from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400",
    technologies: [
      { name: "Jest" },
      { name: "Vitest" },
      { name: "Playwright" },
      { name: "AWS" },
      { name: "Azure" },
      { name: "Vercel" },
      { name: "Cloudflare" },
    ],
  },
  {
    id: "tools",
    number: "06",
    title: "Herramientas",
    description:
      "Entornos de desarrollo, sistemas de control de versiones, diseño de interfaces y administración de sistemas.",
    iconName: "Tools",
    color:
      "from-orange-500/10 to-amber-500/10 text-orange-600 dark:text-orange-400",
    technologies: [
      { name: "VS Code" },
      { name: "WordPress" },
      { name: "Figma" },
      { name: "Git" },
      { name: "Linux" },
    ],
  },
];

// Datos del cuaderno paleontológico interactivo
export const PREHISTORIC_CREATURES: PrehistoricCreature[] = [
  {
    id: "tyrannosaurus",
    name: "Tyrannosaurus Rex",
    period: "Cretácico Tardío (~68 a 66 Ma)",
    diet: "Carnívoro ápice",
    funFact: "Poseía una de las fuerzas de mordida más potentes de cualquier animal terrestre (~35,000 N) y una visión binocular aguda.",
    icon: "tyrannosaurus"
  },
  {
    id: "stegosaurus",
    name: "Estegosaurio (Stegosaurus)",
    period: "Jurásico Tardío (~155 a 150 Ma)",
    diet: "Herbívoro blindado",
    funFact: "Famoso por su doble fila de placas óseas defensivas/termorreguladoras a lo largo del lomo y sus cuatro púas caudales (thagomizer).",
    icon: "stegosaurus"
  },
  {
    id: "triceratops",
    name: "Triceratops",
    period: "Cretácico Tardío (~68 a 66 Ma)",
    diet: "Herbívoro robusto",
    funFact: "Provisto de tres cuernos prominentes y una sólida gola ósea que protegía su cuello y servía de defensa contra grandes depredadores.",
    icon: "triceratops"
  },
  {
    id: "velociraptor",
    name: "Velociraptor",
    period: "Cretácico Tardío (~75 a 71 Ma)",
    diet: "Carnívoro ágil y emplumado",
    funFact: "Dromeosáurido bípedo muy ágil cubierto de plumas, armado con una garra curva retráctil en forma de hoz en cada pie.",
    icon: "velociraptor"
  },
  {
    id: "carnotaurus",
    name: "Carnotaurus",
    period: "Cretácico Tardío (~72 a 69 Ma)",
    diet: "Carnívoro de aceleración extrema",
    funFact: "Terópodo sudamericano conocido como 'toro carnívoro' por sus dos cuernos frontales sobre los ojos y su anatomía adaptada para sprints de alta velocidad.",
    icon: "carnotaurus"
  },
  {
    id: "smilodon",
    name: "Smilodon (Dientes de Sable)",
    period: "Pleistoceno (~2.5 Ma a 10,000 años)",
    diet: "Hipercarnívoro de la megafauna",
    funFact: "Famoso por sus impresionantes caninos superiores alargados de hasta 28 cm y su poderosa musculatura anterior adaptada para cazar presas grandes.",
    icon: "smilodon"
  },
  {
    id: "megatherium",
    name: "Megatherium (Perezoso Gigante)",
    period: "Plioceno - Pleistoceno (~5.3 Ma a 10,000 años)",
    diet: "Herbívoro colosal terrestre",
    funFact: "Uno de los mamíferos terrestres más grandes conocidos, alcanzando hasta 6 metros de longitud y 4 toneladas de peso con garras gigantes.",
    icon: "megatherium"
  },
  {
    id: "mammoth",
    name: "Mamut Lanudo (Mammuthus primigenius)",
    period: "Pleistoceno al Holoceno (~400,000 a 4,000 años)",
    diet: "Herbívoro colosal de la tundra",
    funFact: "Icónico gigante de la Era de Hielo provisto de un espeso manto de pelo lanudo y colmillos curvados de hasta 4.2 metros para apartar la nieve y buscar vegetación.",
    icon: "mammoth"
  },
  {
    id: "megalodon",
    name: "Megalodón (Otodus Megalodon)",
    period: "Mioceno al Plioceno (~23 a 3.6 Ma)",
    diet: "Superdepredador marino",
    funFact: "El tiburón más grande que jamás existió, con una longitud estimada de 15 a 20 metros y dientes fósiles que superan los 18 cm.",
    icon: "megalodon"
  },
  {
    id: "mosasaurus",
    name: "Mosasaurio (Mosasaurus)",
    period: "Cretácico Tardío (~82 a 66 Ma)",
    diet: "Reptil marino ápice",
    funFact: "Reptil acuático gigante de hasta 17 metros con mandíbulas articuladas que le permitían engullir grandes presas en los mares mesozoicos.",
    icon: "mosasaurus"
  }
];

// Datos del compañero felino interactivo
export const CAT_FACTS = [
  "🐾 Los gatos duermen entre 12 y 16 horas al día, aunque algunos pueden dormir incluso más.",
  "🐱 Los gatos tienen alrededor de 230 huesos, más que los seres humanos.",
  "🐾 Los bigotes de los gatos les ayudan a orientarse y detectar si pueden pasar por un espacio.",
  "😺 Los gatos pueden girar sus orejas hasta unos 180 grados para localizar sonidos.",
  "🐾 Los gatos pasan una buena parte del día acicalándose para mantener limpio su pelaje.",
  "🐱 Cada gato tiene una nariz con un patrón único, parecido a una huella dactilar.",
  "😸 Los gatos pueden saltar varias veces la longitud de su propio cuerpo.",
  "🐾 Los gatos utilizan el ronroneo para expresar bienestar, aunque también pueden ronronear cuando están nerviosos o sienten dolor.",
  "🐱 Los gatos tienen una excelente visión nocturna y pueden ver con mucha menos luz que los humanos.",
  "😺 Los gatos pueden reconocer la voz de su dueño, aunque no siempre deciden responder.",
  "🐾 Las patas delanteras de muchos gatos tienen cinco dedos, mientras que las traseras normalmente tienen cuatro.",
  "🐱 Los gatos domésticos comparten gran parte de su comportamiento con sus antepasados salvajes, como acechar, perseguir y esconderse.",
  "😸 Los gatos pueden mover cada oreja de manera independiente para localizar mejor los sonidos.",
  "🐾 Los gatos tienen una lengua cubierta de pequeñas estructuras ásperas llamadas papilas, que les ayudan a limpiar su pelaje.",
  "🐱 Cuando un gato amasa con sus patas, suele estar mostrando comodidad, confianza o afecto."
];

// Datos del observatorio astronómico interactivo
export const ASTRONOMY_OBJECTS: AstronomyObject[] = [
  {
    id: "sun",
    name: "Sol",
    type: "Estrella Enana Amarilla (G2V)",
    distance: "149.6 millones de km",
    shortDescription: "El corazón termonuclear y centro gravitacional del Sistema Solar que sostiene la vida en la Tierra.",
    facts: [
      "Contiene el 99.86% de toda la masa existente en el Sistema Solar.",
      "La energía producida en su núcleo tarda más de 100,000 años en viajar hasta la superficie.",
      "Su temperatura interna en el núcleo alcanza los 15 millones de grados Celsius.",
      "Cada segundo fusiona unas 600 millones de toneladas de hidrógeno en helio mediante fusión nuclear."
    ]
  },
  {
    id: "moon",
    name: "La Luna",
    type: "Satélite Natural Terrestre",
    distance: "384,400 km",
    shortDescription: "El satélite natural de la Tierra y el único cuerpo celeste extraterrestre explorado a pie por la humanidad.",
    facts: [
      "Se aleja paulatinamente de la Tierra a una tasa aproximada de 3.8 cm cada año.",
      "Su período de rotación y traslación coinciden exactamente, mostrando siempre la misma cara (acoplamiento de marea).",
      "Estabiliza la inclinación axial del planeta y genera el ciclo de las mareas oceánicas terrestres.",
      "Las extensas llanuras oscuras visibles en su superficie son antiguos mares de lava basáltica solidificada."
    ]
  },
  {
    id: "mars",
    name: "Marte",
    type: "Planeta Telúrico / Rocoso",
    distance: "~225 millones de km",
    shortDescription: "Mundo desértico y frío de tonos rojizos por óxido de hierro que albergó agua líquida en su pasado.",
    facts: [
      "Alberga el Monte Olimpo, el volcán escudo más colosal del Sistema Solar con 21.9 km de altura.",
      "Posee dos diminutas lunas irregulares capturadas gravitacionalmente: Fobos y Deimos.",
      "Sus atardeceres se aprecian de un sutil color azulado debido a la dispersión de luz por el polvo fino atmosférico.",
      "Un día marciano o 'Sol' dura exactamente 24 horas, 39 minutos y 35 segundos terrestres."
    ]
  },
  {
    id: "jupiter",
    name: "Júpiter",
    type: "Gigante Gaseoso Joviano",
    distance: "~778 millones de km",
    shortDescription: "El titán del Sistema Solar con una masa 2.5 veces superior a la de todos los demás planetas combinados.",
    facts: [
      "La Gran Mancha Roja es una descomunal tormenta anticiclónica activa desde hace más de 350 años.",
      "Tiene 95 lunas reconocidas oficialmente, incluyendo a Ganímedes, que es más grande que el planeta Mercurio.",
      "Completa una rotación sobre su eje en tan solo 9 horas y 56 minutos, el día más veloz del Sistema Solar.",
      "Genera un campo magnético colosal 14 veces más potente que el escudo magnético de la Tierra."
    ]
  },
  {
    id: "saturn",
    name: "Saturno",
    type: "Gigante Gaseoso Anillado",
    distance: "~1,433 millones de km",
    shortDescription: "La joya anillada del cosmos, distinguida por sus majestuosos anillos concéntricos de hielo y polvo.",
    facts: [
      "Sus espectaculares anillos están conformados en un 99% por miles de millones de fragmentos de hielo de agua pura.",
      "Es el único planeta del Sistema Solar con una densidad promedio menor a la del agua líquida (flotaría en un océano gigante).",
      "Su luna gigante Titán posee una densa atmósfera con nubes, lluvias y lagos estables de hidrocarburos líquidos.",
      "En su polo norte opera una persistente corriente en chorro atmosférica con una geométrica forma hexagonal."
    ]
  },
  {
    id: "orion_nebula",
    name: "Nebulosa de Orión",
    type: "Nebulosa Difusa / Maternidad Estelar",
    distance: "~1,344 años luz",
    shortDescription: "Inmensa nube de gas ionizado y polvo cósmico donde se gestan activamente cientos de sistemas estelares.",
    facts: [
      "Es la maternidad y región de formación estelar masiva más cercana a nuestro Sistema Solar.",
      "En noches despejadas de invierno puede observarse a simple vista como una mancha difusa en la espada de Orión.",
      "En su núcleo se encuentra el Cúmulo del Trapecio, compuesto por cuatro estrellas masivas jóvenes y ardientes.",
      "Abarca una extensión espacial de aproximadamente 24 años luz de extremo a extremo."
    ]
  },
  {
    id: "andromeda",
    name: "Galaxia de Andrómeda",
    type: "Galaxia Espiral Gigante",
    distance: "~2.537 millones de años luz",
    shortDescription: "La galaxia espiral más cercana a la Vía Láctea y el objeto más lejano observable a simple vista en el cielo.",
    facts: [
      "Contiene aproximadamente un billón (1,000,000,000,000) de estrellas, el doble que nuestra Vía Láctea.",
      "Se aproxima hacia nuestra galaxia a una velocidad de unos 110 kilómetros por segundo.",
      "En unos 4,500 millones de años colisionará y se fusionará con la Vía Láctea formando una mega-galaxia elíptica.",
      "Su halo estelar exterior se extiende por más de un millón de años luz a través del espacio intergaláctico."
    ]
  },
  {
    id: "black_hole",
    name: "Sagitario A*",
    type: "Singularidad Supermasiva Central",
    distance: "~26,670 años luz",
    shortDescription: "El monstruo gravitacional en el centro de nuestra galaxia que mantiene unida la estructura de la Vía Láctea.",
    facts: [
      "Posee una masa equivalente a 4.1 millones de soles comprimida en un volumen espacial extremadamente compacto.",
      "Su atracción gravitatoria es tan descomunal que curva el tejido del espacio-tiempo y no permite que escape ni la luz.",
      "Fue fotografiado por primera vez en la historia en mayo de 2022 por la red de radiotelescopios Event Horizon Telescope.",
      "El diámetro de su horizonte de sucesos mide cerca de 24 millones de kilómetros (unas 17 veces el diámetro del Sol)."
    ]
  },
  {
    id: "pulsar",
    name: "Púlsar",
    type: "Estrella de Neutrones Magnética",
    distance: "~1,000 a 6,500 años luz",
    shortDescription: "Remanente ultra denso de supernova que rota a velocidades extremas emitiendo haces periódicos de radiación como un faro cósmico.",
    facts: [
      "Gira sobre su eje decenas o cientos de veces por segundo, barriendo el espacio con potentes haces de radiación electromagnética.",
      "Una sola cucharadita de materia de una estrella de neutrones pesaría cerca de mil millones de toneladas en la superficie terrestre.",
      "Genera campos magnéticos billones de veces más intensos que el terrestre, acelerando partículas cargadas casi a la velocidad de la luz.",
      "La regularidad de sus pulsos es tan asombrosamente precisa que compite con la exactitud de los mejores relojes atómicos creados."
    ]
  },
  {
    id: "messier_87",
    name: "Messier 87",
    type: "Galaxia Elíptica Supergigante",
    distance: "~53.5 millones de años luz",
    shortDescription: "Una de las galaxias más masivas del universo conocido, célebre por su descomunal chorro relativista y su colosal agujero negro supermasivo.",
    facts: [
      "Alberga en su núcleo el agujero negro supermasivo M87*, con una masa astronómica de 6,500 millones de veces la del Sol.",
      "Protagonizó en 2019 la primera fotografía directa y real en la historia de la humanidad de la silueta de un agujero negro.",
      "Expulsa un chorro de plasma relativista de más de 5,000 años luz de extensión que viaja a velocidades cercanas a la de la luz.",
      "Contiene una corte de más de 12,000 cúmulos globulares de estrellas orbitando a su alrededor (la Vía Láctea tiene solo unos 150)."
    ]
  }
];
