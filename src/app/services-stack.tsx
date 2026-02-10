'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { services } from './services-data';

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function get_page_top(el: HTMLElement) {
  let top = 0;
  let cur: HTMLElement | null = el;
  while (cur) {
    top += cur.offsetTop;
    cur = cur.offsetParent as HTMLElement | null;
  }
  return top;
}

export default function ServicesStack() {
  const count = services.length;
  const scroller_ref = useRef<HTMLDivElement | null>(null);
  const [active, set_active] = useState(0);

  useEffect(() => {
    let raf = 0;

    const tick = () => {
      const el = scroller_ref.current;
      if (!el) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const vh = window.innerHeight;

      // layout-based scroll progress (stable even if ancestors are transformed)
      const start = get_page_top(el);
      const total = Math.max(1, el.offsetHeight - vh);
      const y = clamp((window.scrollY || 0) - start, 0, total);
      const progress = y / total;

      // 0..count-1
      const idx = clamp(Math.floor(progress * count + 1e-9), 0, count - 1);

      set_active((prev) => (prev === idx ? prev : idx));
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [count]);

  const current = services[active];

  return (
    <section id="services" className="section services-ref">
      <div className="services-intro">
        <div className="services-intro-top">
          <div className="services-kicker">WHAT I DO /</div>
        </div>

        <div className="services-intro-main">
          <div className="services-intro-tag">(services)</div>
          <p className="services-intro-desc">
            기획 → 개발 → 배포까지 end-to-end로 책임지고, 사용자 경험(ux)과 운영 안정성까지 함께 챙깁니다. 빠르게 만들되, 오래 가는 구조로 정리합니다.
          </p>
        </div>
      </div>

      <div className="services-scroller" ref={scroller_ref} style={{ height: `${count * 100}vh` }}>
        <div className="services-stage" aria-label="services stage">
          <div className="services-grid">
            <div className="services-left" aria-label="services index">
              <div className="idx-stack">
                {services.map((s, i) => (
                  <div
                    key={s.no}
                    className={'idx-item' + (i <= active ? ' is-on' : '')}
                    style={{ opacity: i <= active ? 1 : 0 }}
                  >
                    ({s.no})
                  </div>
                ))}
              </div>
            </div>

            <div className="services-right">
              <div className="titles-stack" aria-label="services titles">
                {services.map((s, i) => (
                  <div
                    key={s.no}
                    className={'title-row' + (i <= active ? ' is-on' : '')}
                    style={{ opacity: i <= active ? 1 : 0 }}
                  >
                    <div className="title-text">{s.title}</div>
                    <div className="title-rule" />
                  </div>
                ))}
              </div>

              <div className="service-body" aria-label="active service body">
                <div className="service-sub">{current.subtitle}</div>
                <p className="service-desc">{current.desc}</p>

                <div className="service-lines">
                  {current.lines.map((l, idx) => (
                    <div key={l} className="line-row">
                      <div className="line-no">{String(idx + 1).padStart(2, '0')}</div>
                      <div className="line-text">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
