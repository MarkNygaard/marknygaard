import React from 'react';
import AlgoliaSearch from '@Primitives/AlgoliaSearch';
import { ThemeToggle } from '@Primitives/ThemeProvider';
import { PageRecord } from 'infrastructure/generated/graphql';

import MobileNavigationMenu from './MobileNavigationMenu';
import { cn } from 'lib/utils';

export default function MobileNavigation({
  allPages,
}: {
  allPages: PageRecord[];
}) {
  return (
    <nav
      className={cn(
        'container relative z-10 mx-auto px-4 md:hidden',
        'standalone:fixed standalone:w-screen standalone:pb-0 standalone:pt-8 standalone:md:relative standalone:md:max-w-none standalone:md:pt-0',
        'standalone:bg-gradient-to-r standalone:from-pine-300 standalone:to-pine-300/80',
        'dark:standalone:from-gray-950/90 dark:standalone:to-gray-950/90',
      )}
    >
      <div className='-ml-3 mb-4 mt-4 flex flex-1 justify-between standalone:mb-1 standalone:mt-2'>
        <MobileNavigationMenu allPages={allPages} />
        <div className='ml-5 flex space-x-3'>
          <AlgoliaSearch />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
