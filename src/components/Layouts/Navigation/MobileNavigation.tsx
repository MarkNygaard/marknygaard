import React from 'react';
import AlgoliaSearch from '@Primitives/AlgoliaSearch';
import { ThemeToggle } from '@Primitives/ThemeProvider';
import { PageRecord } from 'infrastructure/generated/graphql';

import MobileNavigationMenu from './MobileNavigationMenu';

export default function MobileNavigation({
  allPages,
}: {
  allPages: PageRecord[];
}) {
  return (
    <nav className='container relative z-10 mx-auto px-4 md:hidden standalone:fixed standalone:mb-6 standalone:w-screen standalone:bg-gradient-to-r standalone:from-pine-400 standalone:via-pine-300 standalone:to-pine-200 standalone:pb-0 standalone:pt-10 dark:standalone:from-gray-900 dark:standalone:via-gray-900 dark:standalone:to-gray-900 standalone:md:relative standalone:md:max-w-none standalone:md:pt-0'>
      <div className='my-4 -ml-3 flex flex-1 justify-between'>
        <MobileNavigationMenu allPages={allPages} />
        <div className='ml-5 flex space-x-3'>
          <AlgoliaSearch />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
