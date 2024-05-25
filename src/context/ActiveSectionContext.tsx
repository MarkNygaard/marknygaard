'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';

type ActiveSectionContextType = {
  activeSection: string | null;
  setActiveSection: React.Dispatch<React.SetStateAction<string | null>>;
  timeOfLastClick: number;
  setTimeOfLastClick: React.Dispatch<React.SetStateAction<number>>;
};

export const ActiveSectionContext =
  createContext<ActiveSectionContextType | null>(null);

export default function ActiveSectionContextProvider({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const [activeSection, setActiveSection] = useState<string | null>('Home');
  const [timeOfLastClick, setTimeOfLastClick] = useState(0);

  const contextValue = useMemo(
    () => ({
      activeSection,
      setActiveSection,
      timeOfLastClick,
      setTimeOfLastClick,
    }),
    [activeSection, setActiveSection, timeOfLastClick, setTimeOfLastClick],
  );

  return (
    <ActiveSectionContext.Provider value={contextValue}>
      {children}
    </ActiveSectionContext.Provider>
  );
}

export function useActiveSectionContext() {
  const context = useContext(ActiveSectionContext);

  if (context === null) {
    throw new Error(
      'useActiveSectionContext must be used within an ActiveSectionContextProvider',
    );
  }

  return context;
}
