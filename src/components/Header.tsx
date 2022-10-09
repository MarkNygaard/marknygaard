import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import NextLink from 'next/link';
import cn from 'classnames';
import Icon from './Icon';
import MobileMenu from './MobileMenu';
import AlgoliaSearch from './AlgoliaSearch';
import { BsSearch } from 'react-icons/bs';
import Link from 'next/link';
import { AnimatePresence } from 'framer-motion';

function NavItem({ href, text }) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <NextLink href={href}>
      <a
        className={cn(
          isActive
            ? 'text-pine-900 dark:text-gray-100 border-pine-900'
            : 'text-pine-500 dark:text-gray-500 duration-300 hover:text-pine-900 dark:hover:text-gray-100 hover:ease-in ease-out transition-all',
          'hidden font-light md:text-base lg:text-lg md:inline-block p-1 sm:px-4 sm:mx-1 sm:py-3'
        )}
      >
        <span className="capsize">{text}</span>
      </a>
    </NextLink>
  );
}

export default function Header({ allPages }) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [searchIsOpen, setSearchIsOpen] = useState(false);

  return (
    <nav className="relative z-10 px-4 pb-6 standalone:pb-0 standalone:mb-6 container mx-auto standalone:w-screen dark:standalone:from-gray-900 dark:standalone:via-gray-900 dark:standalone:to-gray-900 standalone:bg-gradient-to-r standalone:from-pine-400 standalone:via-pine-300 standalone:to-pine-200 standalone:pt-10 standalone:md:pt-0 standalone:md:max-w-none standalone:fixed standalone:md:relative">
      <div className="py-5 max-w-5xl mx-auto standalone:md:py-2">
        <div className="flex">
          <div className="hidden md:flex flex-1 text-xl sm:py-2 standalone:md:pl-6 standalone:md:font-semibold items-center">
            <Link href="/" passHref>
              <a className="text-sm font-light tracking-tight uppercase md:text-base lg:text-xl">
                Mark
                <span className="font-semibold">Nygaard</span>
              </a>
            </Link>
          </div>
          <div className="flex flex-1 md:flex-initial -ml-3">
            <button
              className="md:hidden mobile-menu-button inline-flex items-center justify-center ml-3 p-1 text-gray-500 focus:outline-none focus:ring-offset-2 active:bg-gray-200 dark:active:bg-gray-600  rounded-full"
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
            {allPages?.map((page) => {
              return (
                <NavItem
                  key={page.id}
                  href={`/${page.slug}`}
                  text={page.name}
                />
              );
            })}
          </div>
          <button
            className="flex items-center justify-center hover:font-bold transition-all rounded-full text-[#72818b] duration-300 hover:text-pine-700 dark:hover:text-pine-200 p-1 sm:-pr-4 sm:pl-4 mx-1 sm:py-2"
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
            className="active:bg-gray-200 dark:active:bg-gray-600 px-[6px] flex items-center justify-center hover:font-bold transition-all rounded-full text-[#91a3b0] duration-300 hover:text-[#72818b] p-1 sm:-px-4 sm:mx-1 sm:py-2 dark:text-[#FDB813] dark:hover:text-[#FFD87A]"
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
    </nav>
  );
}
