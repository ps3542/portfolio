'use client';

import { useEffect, useRef } from 'react';
import { services } from './services-data';

function clamp(n: number, a: number, b: number) {
  return Math.min(b, Math.max(a, n));
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

export default function ServicesScroll() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = document.getElementById('services') as HTMLElement | null;
    if (!root) return;
    rootRef.current = root;
    root.style.setProperty('--services-count', String(services.length));

    const leftRows = Array.from(root.querySelectorAll<HTMLElement>('.idx-row'));
    const slides = Array.from(root.querySelectorAll<HTMLElement>('.slide'));

    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight;

      const max = Math.max(1, rect.height - vh); // avoid divide by zero
      const y = clamp(-rect.top, 0, max);
      const progress = y / max;

      const t = progress * (services.length - 1);
      const active = Math.floor(t);
      const local = t - active;

      // left list highlight
      leftRows.forEach((row, i) => {
        const isActive = i === active;
        row.classList.toggle('is-active', isActive);
        // subtle crossfade to next like reference
        const d = Math.abs(t - i);
        const op = clamp(1 - d * 1.2, 0.18, 1);
        const no = row.querySelector<HTMLElement>('.idx-no');
        if (no) no.style.opacity = String(op);
      });

      // slides: overlap titles; body collapses near the end of each step
      slides.forEach((slide, i) => {
        const d = Math.abs(t - i);
        const op = clamp(1 - d * 1.25, 0, 1);
        const visible = op > 0.02;
        slide.classList.toggle('is-visible', visible);
        slide.style.opacity = String(op);

        const body = slide.querySelector<HTMLElement>('.slide-body');
        if (!body) return;

        if (i < active) {
          body.style.opacity = '0';
          body.style.transform = 'scaleY(0)';
        } else if (i === active) {
          const k = 1 - smoothstep(0.55, 0.96, local); // 1 -> 0
          body.style.opacity = String(clamp(k * 1.1, 0, 1));
          body.style.transform = `scaleY(${clamp(k, 0, 1)})`;
        } else {
          body.style.opacity = '0';
          body.style.transform = 'scaleY(0.9)';
        }
      });
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
