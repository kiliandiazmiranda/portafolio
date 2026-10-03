// Dependencias de React
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

// Tipografías globales del proyecto
import '@fontsource/architects-daughter';
import '@fontsource/gochi-hand';
import '@fontsource/gloria-hallelujah';
import '@fontsource/caveat/400.css';
import '@fontsource/caveat/700.css';
import '@fontsource/kalam/400.css';
import '@fontsource/kalam/700.css';
import '@fontsource/patrick-hand';
import '@fontsource/cabin-sketch/400.css';
import '@fontsource/cabin-sketch/700.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/600.css';

// Componente raíz y estilos principales
import App from './app';
import './index.css';

// Montaje y renderizado de la aplicación en el DOM
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
