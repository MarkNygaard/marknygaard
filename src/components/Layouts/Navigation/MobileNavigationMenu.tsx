'use client';

import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalPortal,
  ModalTrigger,
} from '@Primitives/Modal';
import { AnimatePresence, motion } from 'framer-motion';
import { PageRecord } from 'infrastructure/generated/graphql';
import { cn } from 'lib/utils';
import NextLink from 'next/link';

function NavItem({
  href,
  text,
  onClose,
}: {
  href: string;
  text: string;
  onClose: () => void;
}) {
  return (
    <NextLink
      href={href}
      onClick={onClose}
      className='mx-2 block w-full rounded-lg bg-white py-10 text-center text-2xl font-semibold text-gray-900 shadow-md dark:bg-gray-900 dark:text-gray-100'
    >
      <span className='capsize'>{text}</span>
    </NextLink>
  );
}

export default function MobileNavigationMenu({
  allPages,
}: {
  allPages: PageRecord[];
}) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <Modal open={menuIsOpen} onOpenChange={setMenuIsOpen}>
      <ModalTrigger asChild>
        <button
          aria-label='menu'
          className='mobile-menu-button ml-3 inline-flex h-12 w-12 items-center justify-center rounded-full text-gray-500 focus:outline-none focus:ring-offset-2 active:bg-gray-200 dark:active:bg-gray-600'
        >
          <svg
            className='block h-7 w-7'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            aria-hidden='true'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M4 6h16M4 12h16M4 18h16'
            />
            <title>Open Menu</title>
          </svg>
        </button>
      </ModalTrigger>
      <AnimatePresence>
        {menuIsOpen && (
          <ModalPortal forceMount>
            <ModalOverlay asChild className='bg-[#787878]/30 backdrop-blur'>
              <motion.div
                key='modal'
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: {
                    duration: 0.4,
                    ease: [0.36, 0.66, 0.04, 1],
                  },
                }}
                exit={{
                  opacity: 0,
                  transition: {
                    duration: 0.3,
                    ease: [0.36, 0.66, 0.04, 1],
                    delay: 0.15,
                  },
                }}
              ></motion.div>
            </ModalOverlay>
            <ModalContent
              className='m-0 mx-auto w-full max-w-lg p-4 shadow-none'
              onClick={() => setMenuIsOpen(false)}
            >
              <button
                onClick={() => setMenuIsOpen(false)}
                className='mt-20 flex w-full flex-wrap focus:outline-none'
              >
                {allPages?.map((page, i) => (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      transition: {
                        duration: 0.2,
                        delay: 0.1 * i,
                        type: 'spring',
                      },
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0,
                      transition: {
                        duration: 0.1,
                        delay: 0.05 * i,
                        type: 'spring',
                      },
                    }}
                    className={cn(
                      allPages.length <= 3 ? 'w-full' : 'w-1/2',
                      'mt-6 flex items-center justify-center',
                    )}
                    key={page.id}
                  >
                    <NavItem
                      href={`/${page.slug}`}
                      text={page.name as string}
                      onClose={() => setMenuIsOpen(false)}
                    />
                  </motion.div>
                ))}
              </button>
            </ModalContent>
          </ModalPortal>
        )}
      </AnimatePresence>
    </Modal>
  );
}
