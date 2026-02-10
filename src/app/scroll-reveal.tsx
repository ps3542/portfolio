'use client';

import { useEffect } from 'react';

type Props = {
  selector?: string;
  rootMargin?: string;
  threshold?: number;
};

/**
 * Finds elements with data-reveal and adds 'is-inview' when they enter viewport.
 * - subtle, one-time reveal
 * - respects prefers-reduced-motion via CSS
 */
export default function ScrollReveal({
  selector = '[data-reveal]',
  rootMargin = '0px 0px -10% 0px',
  threshold = 0.15,
}: Props) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (els.length === 0) return;

    // If IntersectionObserver not supported, just show everything
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-inview'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.classList.add('is-inview');
          io.unobserve(el); // one-shot
        }
      },
      { root: null, rootMargin, threshold }
    );

    els.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, [selector, rootMargin, threshold]);

  return null;
}
