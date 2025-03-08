import React from 'react';
import PageBlocks from '@Blocks/PageBlocks';
import { GridRecord } from 'infrastructure/generated/graphql';
import { cn } from 'lib/utils';

export default function GridBlock({
  showOnMobile,
  showOnTablet,
  showOnDesktop,
  sections,
}: GridRecord) {
  return (
    <div
      className={cn(
        'relative mx-auto grid max-w-6xl grid-cols-4 md:grid md:grid-cols-8 lg:grid lg:grid-cols-12',
        {
          hidden: showOnMobile === false,
          'md:hidden': showOnTablet === false,
          'lg:hidden': showOnDesktop === false,
        },
      )}
    >
      {sections?.map((section, i) => {
        return (
          <div
            key={i}
            className={`col-span-${section.spanMobile} md:col-span-${section.spanTablet} lg:col-span-${section.spanDesktop}`}
          >
            <PageBlocks
              blocks={section.content}
              posts={section.content as any}
            />
          </div>
        );
      })}
    </div>
  );
}
