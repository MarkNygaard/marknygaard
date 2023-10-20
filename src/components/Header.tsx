'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Icon from './Icon';
import MobileNavigation from './Navigation/MobileNavigation';
import AlgoliaSearch from './AlgoliaSearch';
import { BsSearch } from 'react-icons/bs';
import Link from 'next/link';
import { AnimatePresence } from 'framer-motion';
import DesktopNavigation from './Navigation/DesktopNavigation';

export default function Header({ allPages }: { allPages: any }) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const [searchIsOpen, setSearchIsOpen] = useState(false);

  return (
    <nav className="container relative z-10 mx-auto px-4 pb-6 lg:pt-2 standalone:fixed standalone:mb-6 standalone:w-screen standalone:bg-gradient-to-r standalone:from-pine-400 standalone:via-pine-300 standalone:to-pine-200 standalone:pb-0 standalone:pt-10 dark:standalone:from-gray-900 dark:standalone:via-gray-900 dark:standalone:to-gray-900 standalone:md:relative standalone:md:max-w-none standalone:md:pt-0">
      <div className="mx-auto py-5 standalone:md:py-2">
        <div className="flex">
          <div className="hidden flex-1 items-center text-xl sm:py-2 md:flex standalone:md:pl-6 standalone:md:font-semibold">
            <Link
              href="/"
              passHref
              className="text-sm font-light uppercase tracking-tight md:text-base lg:text-xl"
            >
              Mark
              <span className="font-semibold">Nygaard</span>
            </Link>
          </div>
          <DesktopNavigation allPages={allPages} />
          <MobileNavigation allPages={allPages} />
          <div className="ml-5 flex space-x-3">
            <button
              aria-label="Search"
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-solid border-pine-200 text-[#72818b] transition-all duration-300 hover:border-pine-500 hover:font-bold hover:text-pine-700 dark:border-gray-700 hover:dark:border-gray-500 dark:hover:text-pine-200 sm:h-14 sm:w-14"
              onClick={() => setSearchIsOpen(true)}
            >
              <BsSearch />
            </button>
            <AnimatePresence>
              {searchIsOpen && (
                <AlgoliaSearch onClose={() => setSearchIsOpen(false)} />
              )}
            </AnimatePresence>
            <button
              aria-label="Toggle Dark Mode"
              type="button"
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-solid border-pine-200 text-[#91a3b0] transition-all duration-300 hover:border-pine-500 hover:font-bold hover:text-[#72818b] active:bg-gray-200 dark:border-gray-700 dark:text-[#FDB813] hover:dark:border-gray-500 dark:hover:text-[#FFD87A] dark:active:bg-gray-600 sm:h-14 sm:w-14"
              onClick={() =>
                setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
              }
            >
              {mounted && (
                <div>
                  {resolvedTheme === 'dark' ? (
                    <Icon symbol="sun" />
                  ) : (
                    <Icon symbol="moon" />
                  )}
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
