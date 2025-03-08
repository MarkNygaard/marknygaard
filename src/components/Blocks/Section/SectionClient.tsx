'use client';

import React from 'react';
import useSectionInView from 'lib/hooks/useSectionInView';

interface SectionClientProps {
  id?: string;
  name?: string | null;
  level: number;
  indentationStyle: React.CSSProperties;
  children: React.ReactNode;
}

export default function SectionClient({
  id,
  name,
  indentationStyle,
  children,
}: SectionClientProps) {
  const { ref } = useSectionInView({ sectionId: name as string });

  return (
    <div
      key={id}
      ref={ref}
      id={name ?? ''}
      className='scroll-mt-[9vh]'
      style={indentationStyle}
    >
      {children}
    </div>
  );
}
