import React, { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import cn from 'classnames';

function NavItem({ href, text }) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <NextLink href={href}>
      <a
        className={cn(
          isActive
            ? 'font-base text-pine-900 dark:text-gray-200'
            : 'font-light text-pine-800 dark:text-gray-400',
          'flex p-2 my-1 mx-2 hover:bg-pine-100 dark:hover:bg-gray-900 rounded-md transition-all'
        )}
      >
        <span className="capsize">{text}</span>
      </a>
    </NextLink>
  );
}

export default function MobileMenu({ allPages }) {
  return (
    <Menu as="div" className="relative inline-block text-left md:hidden">
      {({ open }) => (
        <div
          className={open ? 'fixed w-full left-0 standalone:h-full' : 'visible'}
        >
          <Fragment>
            <Menu.Button
              className="justify-center bg-opacity-20 px-4 text-sm font-medium text-black focus:outline-none"
              aria-label="Menu"
            >
              {!open ? (
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
                <div className="standalone:pb-4 standalone:pl-1 standalone:hover:text-white standalone:text-white dark:standalone:text-white">
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
            </Menu.Button>
            <Transition
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
              show={open}
            >
              <Menu.Items className="absolute h-screen w-screen divide-y divide-gray-100 bg-white dark:bg-black focus:outline-none">
                {allPages?.map((page, i) => {
                  return (
                    <div className="mx-1 py-1" key={i}>
                      <Menu.Item>
                        <NavItem
                          key={page.id}
                          href={`/${page.slug}`}
                          text={page.name}
                        />
                      </Menu.Item>
                    </div>
                  );
                })}
              </Menu.Items>
            </Transition>
          </Fragment>
        </div>
      )}
    </Menu>
  );
}
