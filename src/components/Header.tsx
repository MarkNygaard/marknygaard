'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import NextLink from 'next/link';
import clsx from 'clsx';
import Icon from './Icon';
import MobileMenu from './MobileMenu';
import AlgoliaSearch from './AlgoliaSearch';
import { BsSearch } from 'react-icons/bs';
import Link from 'next/link';
import { AnimatePresence } from 'framer-motion';
import { PageRecord } from 'infrastructure/generated/graphql';

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
        'font-base underlined hidden p-1 sm:mx-5 sm:my-3 md:inline-block md:text-base lg:text-lg'
      )}
    >
      <span className="capsize">{text}</span>
    </NextLink>
  );
}

export default function Header({ allPages }: { allPages: any }) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const [menuIsOpen, setMenuIsOpen] = useState(false);
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
          <div className="-ml-3 flex flex-1 md:flex-initial">
            <button
              aria-label="menu"
              className="mobile-menu-button ml-3 inline-flex h-12 w-12 items-center justify-center rounded-full text-gray-500 focus:outline-none focus:ring-offset-2 active:bg-gray-200 dark:active:bg-gray-600  md:hidden"
              onClick={() => setMenuIsOpen(true)}
            >
              <svg
                className="block h-7 w-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <title>Open Menu</title>
              </svg>
            </button>
            <AnimatePresence>
              {menuIsOpen && (
                <MobileMenu
                  allPages={allPages}
                  onClose={() => setMenuIsOpen(false)}
                />
              )}
            </AnimatePresence>
            {allPages?.map((page: PageRecord) => {
              return (
                <NavItem
                  key={page.id}
                  href={`/${page.slug}`}
                  text={page.name}
                />
              );
            })}
          </div>
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
