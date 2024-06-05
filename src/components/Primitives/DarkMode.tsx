'use client';
import React, { useEffect, useState } from 'react';
import Icon from 'components/Icons';
import { useTheme } from 'next-themes';

export function DarkMode() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <button
      aria-label='Toggle Dark Mode'
      type='button'
      className='duration-400 flex aspect-square h-10 items-center justify-center rounded-md p-3 text-[#72818b] transition-all hover:bg-pine-300 hover:font-bold hover:text-pine-700 dark:hover:bg-slate-800 dark:hover:text-pine-200'
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {mounted && (
        <div>
          {resolvedTheme === 'dark' ? (
            <Icon symbol='sun' />
          ) : (
            <Icon symbol='moon' />
          )}
        </div>
      )}
    </button>
  );
}
