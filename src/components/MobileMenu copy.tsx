import React, { useState } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import cn from 'classnames';

function NavItem({ href, text, setIsOpen, isOpen }) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <NextLink href={href}>
      <a
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          isActive
            ? 'font-base text-pine-900 dark:text-gray-200'
            : 'font-light text-pine-800 dark:text-gray-400',
          'flex p-2 my-1 rounded-md hover:bg-pine-100 dark:hover:bg-gray-900 transition-all'
        )}
      >
        <span className="capsize">{text}</span>
      </a>
    </NextLink>
  );
}

export default function MobileMenu({ allPages }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="visible md:hidden -my-6">
      <nav
        className={isOpen ? 'fixed w-full left-0 standalone:h-full' : 'visible'}
      >
        <div className="absolute z-10">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="pt-6 mobile-menu-button inline-flex items-center justify-center pl-4 text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-offset-2"
          >
            <span className="sr-only">Open main menu</span>
            {!isOpen ? (
              <div className="standalone:text-white standalone:hover:text-white">
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
              </div>
            ) : (
              <div className="standalone:pt-9 standalone:pl-1 standalone:hover:text-black standalone:text-black dark:standalone:text-white">
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                  <title>Close Menu</title>
                </svg>
              </div>
            )}
          </button>
        </div>
        <div className={isOpen ? 'flex' : 'hidden'}>
          <div className="flex h-screen w-full flex-col dark:bg-black bg-white standalone:pt-12 pt-4">
            <div className="w-full space-y-1 dark:bg-black bg-white px-3 pt-12 py-3 flex-col">
              {allPages?.map((page, i) => {
                return (
                  <ul key={i}>
                    <li
                      className="border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm font-semibold"
                      style={{ transitionDelay: '150ms' }}
                    >
                      <NavItem
                        key={page.id}
                        href={`/${page.slug}`}
                        text={page.name}
                        setIsOpen={setIsOpen}
                        isOpen={isOpen}
                      />
                    </li>
                  </ul>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
