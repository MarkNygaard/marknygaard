import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import NextLink from 'next/link';
import cn from 'classnames';
import Icon from './Icon';
import MobileMenu from './MobileMenu';

function NavItem({ href, text }) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <NextLink href={href}>
      <a
        className={cn(
          isActive
            ? 'font-medium text-pine-900 dark:text-gray-200 border-pine-900 dark:bg-gray-900'
            : 'font-light text-pine-700 dark:text-gray-400 duration-300 hover:bg-pine-100 dark:hover:bg-gray-900 hover:ease-in ease-out transition-all',
          'hidden md:inline-block p-1 sm:px-4 sm:mx-1 sm:py-3'
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

  return (
    <div className="relative z-10 px-4 container mx-auto standalone:w-screen dark:standalone:from-gray-900 dark:standalone:via-gray-900 dark:standalone:to-gray-900 standalone:bg-gradient-to-r standalone:from-pine-500 standalone:via-pine-300 standalone:to-pine-200 standalone:pt-10 standalone:md:pt-0 standalone:md:max-w-none standalone:fixed standalone:md:relative">
      <div className="py-5 max-w-5xl mx-auto standalone:md:py-2">
        <div className="flex">
          <div className="hidden md:flex flex-1 text-xl sm:py-2 standalone:md:pl-6 standalone:md:font-semibold">
            Mark.
          </div>
          <div className="flex flex-1 md:flex-initial -ml-3">
            <MobileMenu allPages={allPages} />
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
            aria-label="Toggle Dark Mode"
            type="button"
            className="flex items-center justify-center hover:font-bold transition-all rounded-full text-[#91a3b0] duration-300 hover:text-[#72818b] p-1 sm:px-4 sm:mx-1 sm:py-2 dark:text-[#FDB813] dark:hover:text-[#FFD87A]"
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
  );
}
