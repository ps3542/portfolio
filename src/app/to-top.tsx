'use client';

import { useEffect, useState } from 'react';

type Props = {
  href?: string;
  show_after_px?: number;
};

export default function ToTop({ href = '#top', show_after_px = 300 }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > show_after_px);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [show_after_px]);

  return (
    <a
      className="to-top"
      href={href}
      aria-label="scroll to top"
      data-show={show ? '1' : '0'}
    >
      ↑
    </a>
  );
}
