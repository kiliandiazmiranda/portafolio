/**
 * Componente interactivo para la campaña Keep Android Open.
 */

import React, { useEffect, useRef } from 'react';

export const KeepAndroidOpenBanner: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const containerId = 'keep-android-open-banner';
    const container = containerRef.current || document.getElementById(containerId);

    // Limpiar cualquier banner previo
    document.querySelectorAll('.kao-banner').forEach((node) => {
      if (container && container.contains(node)) {
        return;
      }
      node.remove();
    });

    if (container && container.querySelector('.kao-banner')) {
      return;
    }

    // Remover banner anterior si existiera
    document.querySelectorAll('script[src*="keepandroidopen.org/banner.js"]').forEach((s) => s.remove());

    try {
      localStorage.removeItem('kao-banner-hidden');
    } catch {
    }

    const script = document.createElement('script');
    script.id = 'kao-script';
    script.src = `https://keepandroidopen.org/banner.js?id=${containerId}&lang=es&hidebutton=off`;
    script.async = true;

    script.onload = () => {
      document.querySelectorAll('body > .kao-banner').forEach((b) => b.remove());
      document.querySelectorAll('.kao-banner-close').forEach((btn) => btn.remove());
      if (container) {
        const banners = container.querySelectorAll('.kao-banner');
        for (let i = 1; i < banners.length; i++) {
          banners[i].remove();
        }
      }
    };

    document.body.appendChild(script);

    // Intervalo de seguridad para remover duplicados si el script tarda o se ejecuta en segundo plano
    const checkTimer = setInterval(() => {
      document.querySelectorAll('body > .kao-banner').forEach((b) => b.remove());
      document.querySelectorAll('.kao-banner-close').forEach((btn) => btn.remove());
      if (container) {
        const banners = container.querySelectorAll('.kao-banner');
        if (banners.length > 1) {
          for (let i = 1; i < banners.length; i++) {
            banners[i].remove();
          }
        }
      }
    }, 500);

    const timeoutTimer = setTimeout(() => {
      clearInterval(checkTimer);
    }, 5000);

    return () => {
      clearInterval(checkTimer);
      clearTimeout(timeoutTimer);
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <aside
      id="keep-android-open-section"
      aria-label="Campaña Keep Android Open"
      className="w-full max-w-4xl mx-auto px-4 sm:px-6 my-6 relative z-10 transition-all duration-300"
    >
      <div
        id="keep-android-open-banner"
        ref={containerRef}
        className="w-full flex items-center justify-center transition-all duration-300 min-h-[60px]"
      />
    </aside>
  );
};
