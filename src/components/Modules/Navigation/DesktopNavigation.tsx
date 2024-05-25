'use client';

import React from 'react';
import AlgoliaSearch from '@ui/AlgoliaSearch';
import { DarkMode } from '@ui/DarkMode';
import clsx from 'clsx';
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
          ? 'active border-pine-900 text-pine-900 transition dark:text-gray-100'
          : 'text-pine-600 transition-all duration-300 ease-out hover:text-pine-900 hover:ease-in dark:text-gray-500 dark:hover:text-gray-100',
        'font-base underlined h-fit text-base lg:text-lg',
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
        <div className='relative my-4 rounded-xl bg-pine-300/80 shadow-sm backdrop-blur-sm dark:bg-slate-900/60'>
          <div className='mx-auto flex max-w-5xl py-4'>
            <div className='flex flex-1 items-center text-xl'>
              <Link
                href='/'
                passHref
                className='text-sm font-light uppercase tracking-tight md:text-base lg:text-xl'
              >
                Mark
                <span className='font-semibold'>Nygaard</span>
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
