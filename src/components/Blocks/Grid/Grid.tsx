import React from 'react';
import PageBlocks from '@Blocks/PageBlocks';
import { GridRecord } from 'infrastructure/generated/graphql';
import { cn } from 'lib/utils';

// Map numeric span values to Tailwind classes
const colSpanMap: Record<number, string> = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  5: 'col-span-5',
  6: 'col-span-6',
  7: 'col-span-7',
  8: 'col-span-8',
  9: 'col-span-9',
  10: 'col-span-10',
  11: 'col-span-11',
  12: 'col-span-12',
};

const mdColSpanMap: Record<number, string> = {
  1: 'md:col-span-1',
  2: 'md:col-span-2',
  3: 'md:col-span-3',
  4: 'md:col-span-4',
  5: 'md:col-span-5',
  6: 'md:col-span-6',
  7: 'md:col-span-7',
  8: 'md:col-span-8',
  9: 'md:col-span-9',
  10: 'md:col-span-10',
  11: 'md:col-span-11',
  12: 'md:col-span-12',
};

const lgColSpanMap: Record<number, string> = {
  1: 'lg:col-span-1',
  2: 'lg:col-span-2',
  3: 'lg:col-span-3',
  4: 'lg:col-span-4',
  5: 'lg:col-span-5',
  6: 'lg:col-span-6',
  7: 'lg:col-span-7',
  8: 'lg:col-span-8',
  9: 'lg:col-span-9',
  10: 'lg:col-span-10',
  11: 'lg:col-span-11',
  12: 'lg:col-span-12',
};

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
            className={cn(
              colSpanMap[section.spanMobile as number] || 'col-span-4',
              mdColSpanMap[section.spanTablet as number] || 'md:col-span-8',
              lgColSpanMap[section.spanDesktop as number] || 'lg:col-span-12',
            )}
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
