'use client';

import React from 'react';
import AlgoliaSearch from '@Primitives/AlgoliaSearch';
import { DarkMode } from '@Primitives/DarkMode';
import clsx from 'clsx';
import Icon from 'components/Icons';
import { PageRecord } from 'infrastructure/generated/graphql';
import NextLink from 'next/link';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function NavItem({ href, text }: { href: string; text: string }) {
  const path = usePathname();
  const isActive = path === href;

  return (
    <NextLink
      href={href}
      className={clsx(
        isActive
          ? 'active border-red-500 text-pine-900 transition dark:text-gray-200'
          : 'text-pine-600 transition-all duration-300 ease-out hover:text-pine-900 hover:ease-in dark:text-gray-500 dark:hover:text-gray-100',
        'underlined h-fit text-base font-light',
      )}
    >
      <span className='capsize'>{text}</span>
    </NextLink>
  );
}

export default function DesktopNavigation({ allPages }: any) {
  return (
    <nav className='container sticky top-0 z-10 mx-auto max-w-6xl'>
      <div className='hidden md:block'>
        <div className='relative my-4 rounded-sm bg-pine-300/80 shadow-sm backdrop-blur-sm dark:bg-gray-800/60'>
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
            <div className='flex divide-x divide-pine-400'>
              <div className='flex items-center space-x-8 pr-5'>
                {allPages?.map((page: PageRecord) => {
                  return (
                    <NavItem
                      key={page.id}
                      href={`/${page.slug}`}
                      text={page.name as string}
                    />
                  );
                })}
              </div>
              <div className='flex items-center space-x-2 pl-3'>
                <AlgoliaSearch />
                <DarkMode />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
