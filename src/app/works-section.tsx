'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type WorkItem = {
  title: string;
  subtitle: string;
  year: string;
  href?: string;
  video?: string;
};



function toYoutubeEmbedUrl(url?: string) {
  if (!url) return null;

  const base =
  'rel=0&modestbranding=1&playsinline=1&mute=1&controls=0';


  try {
    const u = new URL(url);

    if (u.hostname === 'youtu.be') {
      const id = u.pathname.replace('/', '');
      return id ? `https://www.youtube.com/embed/${id}?${base}` : null;
    }

    if (u.hostname.includes('youtube.com')) {
      const v = u.searchParams.get('v');
      if (v) return `https://www.youtube.com/embed/${v}?${base}`;

      const shorts = u.pathname.match(/^\/shorts\/([^/]+)/);
      if (shorts?.[1]) return `https://www.youtube.com/embed/${shorts[1]}?${base}`;

      const embed = u.pathname.match(/^\/embed\/([^/]+)/);
      if (embed?.[1]) return `https://www.youtube.com/embed/${embed[1]}?${base}`;
    }

    return null;
  } catch {
    return null;
  }
}

export default function WorksSection({ works }: { works: WorkItem[] }) {
  const items_ref = useRef<Array<HTMLDivElement | null>>([]);
  const [active, set_active] = useState(0);

  const count = works.length;

  useEffect(() => {
    const els = items_ref.current.filter(Boolean) as HTMLDivElement[];
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .map((e) => ({
            idx: Number((e.target as HTMLElement).dataset.index ?? '0'),
            top: (e.target as HTMLElement).getBoundingClientRect().top,
          }))
          .sort((a, b) => a.top - b.top);

        if (visible.length) set_active(visible[0].idx);
      },
      {
        root: null,
        rootMargin: '-25% 0px -65% 0px',
        threshold: 0.01,
      },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [count]);

  const active_digit = useMemo(
    () => String(active + 1).padStart(1, '0'),
    [active]
  );

  return (
    <section id="works" className="works-ref" aria-label="selected works">
      <div className="container">
        <div className="ref-heading">
          <div>
            <h2>selected projects /</h2>
          </div>
        </div>

        <div className="works-grid">
          <div className="works-counter" aria-label="works counter">
            <span className="works-counter-zero">0</span>
            <span className="works-counter-digit" aria-live="polite">
              {active_digit}
            </span>
          </div>

          <div className="works-list">
            {works.map((w, idx) => {
              const embed = toYoutubeEmbedUrl(w.video);

              return (
                <div
                  key={w.title + idx}
                  className="work-card"
                  ref={(el) => {
                    items_ref.current[idx] = el;
                  }}
                  data-index={idx}
                >
                  <a
                    className="work-card-inner"
                    href={w.href ?? '#'}
                    target={w.href && w.href !== '#' ? '_blank' : undefined}
                    rel={
                      w.href && w.href !== '#'
                        ? 'noopener noreferrer'
                        : undefined
                    }
                  >
                    <div className="work-thumb">
                      {embed && (
                        <iframe
                          src={active === idx ? `${embed}&autoplay=1` : embed}
                          title={`${w.title} demo`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen                        
                        />
                      )}
                    </div>

                    <div className="work-meta-row">
                      <div>
                        <div className="work-subtitle">{w.subtitle}</div>
                        <div className="work-title">{w.title}</div>
                      </div>
                      <div className="work-tags">
                        <span className="tag">{w.subtitle}</span>
                        <span className="tag tag-solid">{w.year}</span>
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
