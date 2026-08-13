import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

// Las fuentes se empaquetan localmente para evitar dependencias externas.
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

import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
