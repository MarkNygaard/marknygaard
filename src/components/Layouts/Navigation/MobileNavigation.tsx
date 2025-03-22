import React from 'react';
import AlgoliaSearch from '@Primitives/AlgoliaSearch';
import { ThemeToggle } from '@Primitives/ThemeProvider';
import { PageRecord } from 'infrastructure/generated/graphql';
import { cn } from 'lib/utils';

import MobileNavigationMenu from './MobileNavigationMenu';

export default function MobileNavigation({
  allPages,
}: {
  allPages: PageRecord[];
}) {
  return (
    <nav
      className={cn(
        'container relative z-50 mx-auto px-4 md:hidden',
        'standalone:pt-safe-top standalone:w-screen',
      )}
    >
      <div className='-ml-3 mb-3 mt-1 flex flex-1 justify-between standalone:my-1'>
        <MobileNavigationMenu allPages={allPages} />
        <div className='ml-5 flex space-x-3'>
          <AlgoliaSearch />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
