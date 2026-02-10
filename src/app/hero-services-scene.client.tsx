'use client';

import React, { useEffect, useRef } from 'react';

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

type Props = {
  hero: React.ReactNode;
  services: React.ReactNode;
};

export default function HeroServicesScene({ hero, services }: Props) {
  const scene_ref = useRef<HTMLDivElement | null>(null);
  const services_ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scene = scene_ref.current;
    if (!scene) return;

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (reduce) {
      scene.style.setProperty('--hs-p', '1');
      return;
    }

    let raf = 0;

    const tick = () => {
      const svc_el = services_ref.current;
      if (!svc_el) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const y0 = window.scrollY || 0;

      // ensure the very first frame is perfectly crisp (no opacity/transform)
      if (y0 < 2) {
        scene.style.setProperty('--hs-p', '0');
        scene.dataset.hsDone = '0';
        scene.dataset.hsStarted = '0';
        raf = requestAnimationFrame(tick);
        return;
      }

      scene.dataset.hsStarted = '1';

      const rect = svc_el.getBoundingClientRect();
      const vh = window.innerHeight || 1;

      // start when services top reaches bottom of viewport
      const start = vh;
      // end when services top reaches just under the topbar
      const topbar = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--topbar-h')) || 60;
      const end = topbar + 8;

      const p = clamp((start - rect.top) / Math.max(1, start - end), 0, 1);
      scene.style.setProperty('--hs-p', String(p));

      // helpful for CSS (disable clicks when invisible)
      scene.dataset.hsDone = p >= 0.999 ? '1' : '0';

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={scene_ref} className="hs-scene">
      <div className="hs-hero-sticky">
        {hero}
      </div>

      <div ref={services_ref} className="hs-services-flow">
        {services}
      </div>
    </div>
  );
}
