# Portafolio Web Interactivo

Una plataforma web interactiva desarrollada con **React 19**, **TypeScript**, **Vite 6** y **Tailwind CSS 4**. El proyecto combina una interfaz moderna y profesional con un estilo visual inspirado en los *doodles* y el *pixel art*, incorporando pequeñas animaciones, microinteracciones y elementos interactivos.

---

## ✦ Características Principales

* **Presentación  & Acceso a CV**: Sección *Hero* con enlaces directos a perfil de LinkedIn y visualización/descarga de CV.
* **Diseño Responsivo**: Adaptado a móviles, tablets y escritorios utilizando una estética de cuaderno de bocetos (*doodle*), bordes orgánicos asimétricos y animaciones optimizadas.
* **Sistema de Tema Claro / Oscuro**: Detección automática de preferencias del sistema operativo (`prefers-color-scheme`), conmutador manual en el encabezado y persistencia en `localStorage` con prevención de destellos (*FOUC*).
* **Localización y Soporte Bilingüe (Español / Inglés)**: Detección automática y preferencial del idioma del navegador o sistema (español para cualquier variante `es-*` e inglés para otros idiomas), selector manual interactivo en la barra de navegación con estilo doodle y persistencia en `localStorage`, traduciendo de manera reactiva la totalidad del sitio (Hero, Hub, Sobre Mí, Habilidades, Repositorios GitHub, modales y fichas interactivas).
* **Hub Interactivo de Módulos**: Panel central que permite alternar y desbloquear secciones clave (*Sobre Mí*, *Habilidades*, *GitHub*) mediante microanimaciones fluidas.

* **Integraciones en Tiempo Real con Caché Local**:
  * **GitHub REST API**: Consulta de repositorios públicos, estadísticas de estrellas y forks, detección automática de imágenes de vista previa (`preview.png` / `preview.jpg`), búsqueda en vivo, filtros por lenguaje y paginación.
  * **Resiliencia & Caché**: Almacenamiento local temporal (`localStorage`) con expiración configurada para mitigar límites de tasa (*rate limits*) y asegurar disponibilidad sin conexión o ante fallas en APIs externas.

* **Optimización, SEO & Accesibilidad**:
  * Carga diferida de modales pesados mediante `React.lazy()` y `Suspense`.
  * Fuentes tipográficas empaquetadas localmente mediante paquetes `@fontsource` (cero solicitudes a CDNs externas).
  * Metadatos completos Open Graph, Twitter Cards, `robots.txt`, `sitemap.xml`, `site.webmanifest` y datos estructurados Schema.org (`Person` y `WebSite`).
  * Documentación para agentes de lenguaje mediante `llms.txt` y `llms-full.txt`.

---

## 🚀 Tecnologías y Herramientas

| Categoría | Tecnologías |
| :--- | :--- |
| **Núcleo & UI** | React 19, TypeScript, Vite 6, Motion |
| **Estilos & Maquetación** | Tailwind CSS 4, `@tailwindcss/vite`, CSS Variables |
| **Localización & i18n** | Context API multilingüe, detección automática de navegador, persistencia en `localStorage` |
| **Tipografías** | `@fontsource` (Architects Daughter, Gochi Hand, Gloria Hallelujah, JetBrains Mono, etc.) |
| **Iconografía** | Lucide React, SVGs estilo doodle |
| **Servicios & Datos** | GitHub REST API |
| **Almacenamiento del Cliente** | Web Storage API (`localStorage`) |

---

## 🏗️ Estructura del Proyecto

```text
portafolio/
├── public/
│   ├── favicon.ico                  # Favicon principal
│   ├── llms.txt                     # Resumen estructurado del sitio para agentes LLM
│   ├── llms-full.txt                # Información completa del perfil y habilidades para LLMs
│   ├── og-image.png                 # Imagen para previsualización social (Open Graph)
│   ├── robots.txt                   # Reglas de indexación para buscadores
│   ├── site.webmanifest             # Manifiesto para Progressive Web Apps (PWA)
│   └── sitemap.xml                  # Mapa de URLs del sitio web
├── src/
│   ├── components/
│   │   ├── doodles/
│   │   │   ├── astrodoodle.tsx      # Ilustraciones vectoriales de cuerpos astronómicos
│   │   │   ├── dinodoodle.tsx       # Ilustraciones vectoriales de criaturas prehistóricas
│   │   │   └── Icons.tsx            # Biblioteca de iconos SVG
│   │   ├── layout/
│   │   │   ├── footer.tsx           # Pie de página con créditos y enlaces
│   │   │   └── navbar.tsx           # Encabezado superior con conmutador de tema e idioma
│   │   ├── modals/
│   │   │   ├── astromodal.tsx       # Modal del Observatorio Astronómico
│   │   │   ├── catcompanion.tsx     # Ventana emergente del Michi de Debugging
│   │   │   ├── prehistoricmodal.tsx # Modal de Paleontología y lienzo de dibujo
│   │   │   └── strategymodal.tsx    # Modal de simulación de juegos de estrategia
│   │   ├── pixel/
│   │   │   ├── pixelcat.tsx         # Gato interactivo
│   │   │   ├── Pixelmonkey.tsx      # Animación de mono
│   │   │   └── Pixelsnake.tsx       # Serpiente Python interactiva para la sección de Skills
│   │   ├── sections/
│   │   │   ├── about.tsx            # Sección "Sobre Mí" y tarjetas de intereses
│   │   │   ├── github.tsx           # Sección de repositorios con búsqueda y paginación
│   │   │   ├── hero.tsx             # Sección de presentación principal y accesos directos
│   │   │   ├── hub.tsx              # Hub central interactivo con selector de módulos
│   │   │   └── skills.tsx           # Carrusel agrupado de habilidades técnicas
│   │   └── ui/
│   │       ├── banner.tsx           # Componente para la campaña Keep Android Open
│   │       └── loader.tsx           # Preloader animado estilo Chrome Dino Runner
│   ├── context/
│   │   ├── language.tsx             # Proveedor de contexto y hook para gestión y persistencia del idioma (ES / EN)
│   │   └── theme.tsx                # Proveedor de contexto y hook para gestión del tema
│   ├── data/
│   │   ├── portfolio.ts             # Fuente única de datos personales, habilidades y contenido
│   │   └── translations.ts          # Diccionario centralizado de traducciones y datasets bilingües (ES / EN)
│   ├── services/
│   │   └── githubapi.ts                # Cliente para la API de GitHub
│   ├── app.tsx                      # Componente raíz y orquestador de modales diferidos
│   ├── index.css                    # Definición de Tailwind, temas, tipografías y animaciones
│   ├── main.tsx                     # Punto de entrada de React en el DOM
│   └── types.ts                     # Interfaces y tipos compartidos de TypeScript
├── .gitattributes                   # Configuración de saltos de línea y atributos de Git
├── .gitignore                       # Directorios y artefactos excluidos del repositorio
├── index.html                       # Plantilla HTML con SEO, Schema JSON-LD y pre-conexiones
├── LICENSE                          # Términos de la Licencia MIT
├── metadata.json                    # Metadatos del entorno y capacidades de la app
├── package.json                     # Manifiesto de paquetes y scripts de compilación
├── README.md                        # Documentación y descripción del proyecto
├── tsconfig.json                    # Configuración estricta del compilador TypeScript
└── vite.config.ts                   # Configuración de compilación con Vite y Tailwind CSS
```

---

## ⚙️ Flujo de Datos y Caché de APIs

La integración de **GitHub** implementa una estrategia de caché de lectura en dos niveles:

```text
Solicitud de Datos (Usuario / Montaje)
          │
          ▼
   ¿Existe caché válida en localStorage?
     ├── SÍ (Dentro de ventana TTL) ──► Retorna datos desde caché instantáneamente
     └── NO (Expirada o inexistente)
               │
               ▼
       Llamada HTTP a la API Pública
               │
               ├── 200 OK ──────► Normalización de datos ──► Actualiza caché en localStorage
               │
               └── Error / Fallo de Red
                         │
                         ├── ¿Hay datos previos en caché? ──► Muestra datos previos + notificación
                         └── Caché vacía ───────────────────► Presenta estado de error con reintento
```

* **GitHub**: TTL de 15 minutos en caché local; filtra bifurcaciones irrelevantes y busca dinámicamente recursos de previsualización en las ramas principales.

---

## 💻 Instalación y Ejecución Local

### Prerrequisitos

* **Node.js**: versión 18.0.0 o superior recomendada.
* **npm** o **bun** como gestor de paquetes.

### Pasos

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/KilianDiazMiranda/portafolio.git
   cd portafolio
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Iniciar servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   La aplicación se iniciará en `http://localhost:3000`.

4. **Verificación de tipos (Linter)**:
   ```bash
   npm run lint
   ```
   Ejecuta `tsc --noEmit` para validar la integridad del tipado estricto.

5. **Compilar para producción**:
   ```bash
   npm run build
   ```
   Genera los archivos optimizados listos para despliegue en la carpeta `dist/`.

6. **Previsualizar la compilación de producción**:
   ```bash
   npm run preview
   ```

---

## 🛡️ Calidad de Código y Buenas Prácticas

* **Cero variables globales o claves expuestas**: Todas las peticiones consumen endpoints públicos sin requerir credenciales sensibles del lado del cliente.
* **Modularidad y Separación de Responsabilidades**: Desacoplamiento estricto entre lógica de servicios (`services/`), estado (`context/`), estructura de datos (`data/`) y componentes de presentación (`components/`).
* **Optimización de Renderizado**: Uso de `useMemo` y `useCallback` en componentes con cálculos frecuentes (como el movimiento de la serpiente con cinemática inversa y la paginación de repositorios).
* **Accesibilidad (a11y)**: Etiquetas descriptivas `aria-label`, gestión de foco en modales y navegación optimizada.

---

## 📄 Licencia

Este proyecto está distribuido bajo la **MIT License**.

Consulta [`LICENSE`](./LICENSE) para los términos completos.

---

## 📬 Contacto

**Kilian Diaz Miranda**

- LinkedIn: [kiliandiazmiranda](https://www.linkedin.com/in/kiliandiazmiranda/)
- Correo: [kiliandiazmiranda@outlook.com](mailto:kiliandiazmiranda@outlook.com)
