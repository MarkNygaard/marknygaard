'use client';

import ActiveSectionContextProvider from 'context/ActiveSectionContext';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ActiveSectionContextProvider>
      <ThemeProvider
        attribute='class'
        defaultTheme='light'
        enableSystem={false}
      >
        {children}
      </ThemeProvider>
    </ActiveSectionContextProvider>
  );
}
