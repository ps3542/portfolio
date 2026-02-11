'use client';

import { useEffect, useRef, useState } from 'react';
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
  const [is_mobile, set_is_mobile] = useState(false);

  // ✅ 모바일 여부만 분기(PC 동작 그대로 유지)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mq = window.matchMedia('(max-width: 576px)');
    const apply = () => set_is_mobile(mq.matches);
    apply();

    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', apply);
      return () => mq.removeEventListener('change', apply);
    } else {
      mq.addListener(apply);
      return () => mq.removeListener(apply);
    }
  }, []);

  // scroll -> active index
  useEffect(() => {
    let raf = 0;

    const tick = () => {
      const el = scroller_ref.current;
      if (!el) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const vh = window.innerHeight;
      const start = get_page_top(el);
      const total = Math.max(1, el.offsetHeight - vh);
      const y = clamp((window.scrollY || 0) - start, 0, total);
      const progress = y / total;

      const idx = clamp(Math.floor(progress * count + 1e-9), 0, count - 1);
      set_active((prev) => (prev === idx ? prev : idx));

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [count]);

  const current = services[active];
  const is_on = (i: number) => i <= active; // ✅ PC/모바일 모두 누적 유지

  return (
    <section id="services" className="section services-ref">
      <div className="services-intro">
        <div className="services-intro-top">
          <div className="services-kicker">WHAT I DO /</div>
        </div>

        <div className="services-intro-main">
          <div className="services-intro-tag">(services)</div>
          <p className="services-intro-desc">
            기획 → 개발 → 배포까지 책임지고, 사용자 경험(UX)과 운영 안정성까지 함께 챙깁니다.
          </p>
          <p className="services-intro-desc">빠르게 만들되, 오래 가는 구조로 정리합니다.</p>
        </div>
      </div>

      <div className="services-scroller" ref={scroller_ref} style={{ height: `${count * 100}vh` }}>
        <div className="services-stage" aria-label="services stage">
          <div className="services-grid">
            {/* ======================
                PC: 기존 구조 그대로 유지
               ====================== */}
            {!is_mobile && (
              <>
                <div className="services-left" aria-label="services index">
                  <div className="idx-stack">
                    {services.map((s, i) => {
                      const on = is_on(i);
                      return (
                        <div
                          key={s.no}
                          className={'idx-item' + (on ? ' is-on' : '')}
                          style={{ opacity: on ? 1 : 0 }}
                        >
                          ({s.no})
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="services-right">
                  <div className="titles-stack" aria-label="services titles">
                    {services.map((s, i) => {
                      const on = is_on(i);
                      return (
                        <div
                          key={s.no}
                          className={'title-row' + (on ? ' is-on' : '')}
                          style={{ opacity: on ? 1 : 0 }}
                        >
                          <div className="title-text">{s.title}</div>
                          <div className="title-rule" />
                        </div>
                      );
                    })}
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
              </>
            )}

            {/* ======================
                Mobile: "번호+타이틀"을 같은 row로 묶어서 누적 쌓기
                -> (02) 옆에 UI/UX, (03) 옆에 Optimization 100% 고정
               ====================== */}
            {is_mobile && (
              <div className="services-right">
                <div className="titles-stack" aria-label="services titles (mobile paired)">
                  {services.map((s, i) => {
                    const on = is_on(i);
                    return (
                      <div
                        key={s.no}
                        className={'m-row' + (on ? ' is-on' : '')}
                        style={{ opacity: on ? 1 : 0 }}
                      >
                        <div className="m-idx">({s.no})</div>
                        <div className="m-title">
                          <div className="title-text">{s.title}</div>
                          <div className="title-rule" />
                        </div>
                      </div>
                    );
                  })}
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
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
