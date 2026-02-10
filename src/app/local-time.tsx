'use client';

import { useEffect, useState } from 'react';

export default function LocalTime() {
  const [value, setValue] = useState<string>('loading...');

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    const tick = () => setValue(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000 * 30);
    return () => window.clearInterval(id);
  }, []);

  return <span>{value}</span>;
}
