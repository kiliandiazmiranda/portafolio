# Portafolio web interactivo

Una experiencia web moderna e interactiva para presentar proyectos, habilidades, experiencia y otros contenidos profesionales de forma clara, dinámica y accesible.

---

## ✦ Características

* Interfaz responsive para escritorio, tablet y móvil.
* Tema claro y oscuro con persistencia local y detección de preferencia del sistema.
* Secciones de presentación, intereses, habilidades, GitHub y ORCID.
* Integración con las APIs públicas de **GitHub** y **ORCID**.
* Caché local temporal para reducir solicitudes repetidas y mantener datos recientes disponibles cuando una API no responde.
* Carga diferida de los modales interactivos mediante `React.lazy()` y `Suspense`.
* SVG personalizados con estilo doodle.
* Metadatos SEO, Open Graph, sitemap, robots.txt, manifest y datos estructurados JSON-LD.
* Fuentes empaquetadas localmente mediante `@fontsource`.

---

## 🚀 Tecnologías del proyecto

| Área               | Tecnología                         |
| ------------------ | ---------------------------------- |
| UI                 | React 19                           |
| Lenguaje           | TypeScript                         |
| Build              | Vite 6                             |
| CSS                | Tailwind CSS 4                     |
| Iconos             | Lucide React + SVG personalizados  |
| Fuentes            | `@fontsource`                      |
| APIs               | GitHub REST API + ORCID Public API |
| Persistencia local | `localStorage`                     |

---

## 🏗️ Arquitectura

```text
portafolio/
├── public/
│   ├── favicon.ico
│   ├── llms.txt
│   ├── llms-full.txt
│   ├── og-image.png
│   ├── robots.txt
│   ├── site.webmanifest
│   └── sitemap.xml
│
├── src/
│   ├── components/
│   │   ├── EasterEggs/
│   │   ├── AboutSection.tsx
│   │   ├── Footer.tsx
│   │   ├── GithubReposSection.tsx
│   │   ├── Hero.tsx
│   │   ├── InitialPageLoader.tsx
│   │   ├── Navbar.tsx
│   │   ├── OrcidSection.tsx
│   │   └── SkillsSection.tsx
│   │
│   ├── context/
│   │   └── ThemeContext.tsx
│   │
│   ├── data/
│   │   └── portfolioData.ts
│   │
│   ├── services/
│   │   ├── githubService.ts
│   │   └── orcidService.ts
│   │
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── types.ts
│
├── .gitignore
├── LICENSE.txt
├── package.json
├── README.md
├── tsconfig.json
└── vite.config.ts
```

### Responsabilidades principales

* **`portfolioData.ts`**: fuente única de los datos estáticos del portafolio y de las experiencias interactivas.
* **`services/`**: integración y normalización de datos externos.
* **`components/`**: presentación e interacción de cada sección.
* **`context/`**: gestión global del tema.
* **`types.ts`**: contratos compartidos de TypeScript.
* **`App.tsx`**: composición de la aplicación y carga diferida de los modales.

---

## ✨ Experiencias interactivas

### 🐱 Michi de Debugging

Compañero felino interactivo con contador de caricias, curiosidades y mensajes relacionados con programación.

### 🦖 Cuaderno Paleontológico

* 10 criaturas prehistóricas.
* Fichas informativas e ilustraciones SVG.
* Mensajes interactivos.
* Lienzo de dibujo compatible con ratón y dispositivos táctiles.
* Deshacer, rehacer, borrado y exportación a PNG.

### 👑 Sala de videojuegos de Estrategia

Experiencia inspirada en juegos de gran estrategia como:

* Crusader Kings
* Europa Universalis
* Victoria
* Stellaris
* Hearts of Iron
* Port Royale

Incluye decisiones, eventos y registro de acciones.

### 🔭 Observatorio Astronómico

Explorador interactivo con **10 objetos astronómicos**, ilustraciones SVG, distancias, descripciones y un escáner de datos.

### 🎮 Preloader Doodle

Pantalla inicial inspirada en Chrome Dino con T-Rex, cactus, nubes, pterodáctilo y una transición de salida.

---

## ⚡ Datos externos y caché

GitHub y ORCID utilizan el mismo principio general:

```text
API pública
    │
    ├── respuesta válida ──► normalización ──► caché local
    │
    └── error
          │
          ▼
      caché reciente
          │
          ├── disponible ──► mostrar datos almacenados
          │
          └── ausente ──► mostrar error + reintentar + enlace al perfil
```

### GitHub

* API pública de GitHub.
* Hasta 100 repositorios por consulta.
* Caché local de 15 minutos.
* Búsqueda por nombre, descripción, lenguaje y tópicos.
* Filtro por lenguaje.
* Orden por fecha o nombre.
* Muestra 4 repositorios por página.

### ORCID

* API pública de ORCID v3.0.
* Caché local de 30 minutos.
* Solo se muestran trabajos de ORCID con información suficiente para identificarlos correctamente.
* DOI y URL se utilizan únicamente cuando ORCID proporciona esos datos.

---

## 📦 Requisitos

* Node.js 18 o superior.
* npm.

---

## 🛠️ Instalación

```bash
git clone https://github.com/KilianDiazMiranda/portafolio.git
cd portafolio
npm install
```

### Desarrollo

```bash
npm run dev
```

El servidor de desarrollo utiliza el puerto `3000`.

### Comprobación de tipos

```bash
npm run lint
```

Ejecuta TypeScript en modo `--noEmit` para comprobar los tipos sin generar archivos.

### Compilación de producción

```bash
npm run build
```

### Vista previa de producción

```bash
npm run preview
```

---

## 🔍 Calidad del código

El proyecto busca mantener:

* TypeScript estricto.
* Componentes con responsabilidades claras.
* Tipos compartidos para datos externos.
* Validación de respuestas de APIs antes de utilizarlas.
* Caché local para conservar datos recientes cuando las APIs no están disponibles.
* Limpieza de recursos y listeners en efectos de React.
* Carga diferida de experiencias pesadas.
* Sin `any` en los servicios externos.
* Código documentado para facilitar la comprensión de su funcionamiento.

---

## 📄 Licencia

Este proyecto está distribuido bajo la **GNU General Public License v3.0 (GPLv3)**.

Consulta [`LICENSE`](./LICENSE) para los términos completos.

---

## 📬 Contacto

**Kilian Diaz Miranda**

* LinkedIn: https://www.linkedin.com/in/kiliandiazmiranda/
* Correo: [kiliandiazmiranda@outlook.com](mailto:kiliandiazmiranda@outlook.com)
