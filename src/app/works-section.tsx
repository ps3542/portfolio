'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type WorkItem = {
  title: string;
  subtitle: string;
  year: string;
  href?: string;
};

export default function WorksSection({ works }: { works: WorkItem[] }) {
  const items_ref = useRef<Array<HTMLDivElement | null>>([]);
  const [active, set_active] = useState(0);

  const count = works.length;

  useEffect(() => {
    const els = items_ref.current.filter(Boolean) as HTMLDivElement[];
    if (!els.length) return;

    // 관찰 기준: 뷰포트 상단 근처를 "활성"으로 잡아서 왼쪽 숫자가 자연스럽게 따라오게 합니다.
    const io = new IntersectionObserver(
      (entries) => {
        // 현재 교차 중인 요소 중, 가장 위쪽에 가까운 것을 active로
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
        // 상단 25% 지점에 들어오면 활성화. (레퍼런스 느낌)
        rootMargin: '-25% 0px -65% 0px',
        threshold: 0.01,
      },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [count]);

  const active_digit = useMemo(() => String(active + 1).padStart(1, '0'), [active]);

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
            {works.map((w, idx) => (
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
                  rel={w.href && w.href !== '#' ? 'noopener noreferrer' : undefined}
                >
                  <div className="work-thumb" aria-hidden="true" />
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
