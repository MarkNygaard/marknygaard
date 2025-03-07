'use client';

import { ThemeProvider } from '@Primitives/ThemeProvider';
import ActiveSectionContextProvider from 'context/ActiveSectionContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      <ActiveSectionContextProvider>{children}</ActiveSectionContextProvider>
    </ThemeProvider>
  );
}
