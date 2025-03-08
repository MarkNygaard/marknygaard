import React from 'react';
import AlgoliaSearch from '@Primitives/AlgoliaSearch';
import { ThemeToggle } from '@Primitives/ThemeProvider';
import Icon from 'components/Icons';
import { PageRecord } from 'infrastructure/generated/graphql';
import Link from 'next/link';

import NavItemDesktop from './NavItemDesktop';

export default function DesktopNavigation({
  allPages,
}: {
  allPages: PageRecord[];
}) {
  return (
    <nav className='container sticky top-0 z-10 mx-auto'>
      <div className='mx-auto max-w-6xl'>
        <div className='hidden md:block'>
          <div className='relative w-full'>
            <div className='my-3 items-center justify-center rounded-sm border-gray-700/80 bg-gradient-to-b from-pine-300 to-pine-300/80 px-3 dark:border dark:border-gray-700/50 dark:from-zinc-950/90 dark:to-zinc-950/90'>
              <div className='mx-auto flex max-w-5xl py-4'>
                <div className='flex flex-1 items-center text-xl'>
                  <Link
                    href='/'
                    passHref
                    className='text-sm font-light uppercase tracking-tight dark:text-gray-200 md:text-base lg:text-xl'
                  >
                    <Icon symbol='logo' />
                  </Link>
                </div>
                <div className='flex divide-x divide-pine-400 dark:divide-pine-500'>
                  <div className='flex items-center space-x-8 pr-5'>
                    {allPages?.map((page: PageRecord) => {
                      return (
                        <NavItemDesktop
                          key={page.id}
                          href={`/${page.slug}`}
                          text={page.name as string}
                        />
                      );
                    })}
                  </div>
                  <div className='flex items-center space-x-2 pl-3'>
                    <AlgoliaSearch />
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
