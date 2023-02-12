import React from 'react';
import { useTheme } from 'next-themes';
import Giscus, { Repo, Theme } from '@giscus/react';

export default function Comment() {
  const { theme } = useTheme();

  return (
    <Giscus
      key={theme}
      repo={process.env.NEXT_PUBLIC_GISCUS_REPO as Repo}
      repoId={process.env.NEXT_PUBLIC_GISCUS_REPO_ID}
      category="General"
      categoryId="DIC_kwDOHWhC584CUJH4"
      mapping="pathname"
      reactionsEnabled="0"
      emitMetadata="0"
      theme={theme as Theme}
    />
  );
}
