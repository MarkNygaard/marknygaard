import React, { useState } from 'react';
import NextLink from 'next/link';
import clsx from 'clsx';
import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
import { PageRecord } from 'infrastructure/generated/graphql';

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
      className="mx-2 block w-full rounded-lg bg-white py-10 text-center text-2xl font-semibold text-gray-900 shadow-md dark:bg-gray-900 dark:text-gray-100"
    >
      <span className="capsize">{text}</span>
    </NextLink>
  );
}

export default function MobileMenu({
  allPages,
  onClose,
}: {
  allPages: any;
  onClose: () => void;
}) {
  return (
    <Dialog
      as={motion.div}
      key="modal"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 0.4, ease: [0.36, 0.66, 0.04, 1] },
      }}
      exit={{
        opacity: 0,
        transition: { duration: 0.3, ease: [0.36, 0.66, 0.04, 1], delay: 0.15 },
      }}
      className="fixed inset-0 top-0 z-20 h-screen bg-[#787878]/30 backdrop-blur md:hidden"
      open={true}
      onClose={onClose}
    >
      <Dialog.Panel
        className="m-0 mx-auto h-full w-full max-w-lg p-4"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="mt-20 flex w-full flex-wrap focus:outline-none"
        >
          {allPages?.map(({ page, i }: { page: PageRecord; i: any }) => (
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
              className={clsx(
                allPages.length <= 3 ? 'w-full' : 'w-1/2',
                'mt-6 flex items-center justify-center'
              )}
              key={i}
            >
              {/* {console.log(allPages.length)} */}
              <NavItem
                key={page.id}
                href={`/${page.slug}`}
                text={page.name as string}
                onClose={onClose}
              />
            </motion.div>
          ))}
        </button>
      </Dialog.Panel>
    </Dialog>
  );
}
