'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';

export function ThemeColorUpdater() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const themeColor = resolvedTheme === 'dark' ? '#000000' : '#ffffff';
    const meta = document.querySelector('meta[name="theme-color"]');

    if (meta) {
      meta.setAttribute('content', themeColor);
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'theme-color';
      newMeta.content = themeColor;
      document.head.appendChild(newMeta);
    }
  }, [resolvedTheme]);

  return null;
}
