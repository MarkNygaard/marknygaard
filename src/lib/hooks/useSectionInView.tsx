'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useActiveSectionContext } from 'context/ActiveSectionContext';

export default function useSectionInView({ sectionId }: { sectionId: string }) {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '-30% 0% -70% 0%',
  });
  const { setActiveSection, timeOfLastClick } = useActiveSectionContext();

  useEffect(() => {
    if (inView && Date.now() - timeOfLastClick > 1000) {
      setActiveSection(sectionId);
    }
  }, [inView, setActiveSection, sectionId, timeOfLastClick]);

  return {
    ref,
  };
}
