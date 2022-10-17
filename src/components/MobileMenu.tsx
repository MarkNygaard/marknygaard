import React from 'react';
import NextLink from 'next/link';
import cn from 'classnames';
import { motion } from 'framer-motion';
import Modal from './Modal';

function NavItem({ href, text, onClose }) {
  return (
    <NextLink href={href}>
      <a
        onClick={onClose}
        className="block w-full py-10 mx-2 text-2xl font-semibold text-center text-gray-900 bg-white dark:bg-black dark:text-gray-100 rounded-lg shadow-md"
      >
        <span className="capsize">{text}</span>
      </a>
    </NextLink>
  );
}

export default function MobileMenu({ allPages, onClose }) {
  return (
    <Modal onClose={onClose} type="blur">
      <div className="w-full h-full max-w-lg p-4 m-0 mx-auto">
        <button
          onClick={onClose}
          className="flex flex-wrap focus:outline-none w-full mt-20"
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
                  delay: 0.5 * i,
                  type: 'spring',
                },
              }}
              className={cn(
                allPages.length <= 3 ? 'w-full' : 'w-1/2',
                'flex items-center justify-center mt-6'
              )}
              key={i}
            >
              {/* {console.log(allPages.length)} */}
              <NavItem
                key={page.id}
                href={`/${page.slug}`}
                text={page.name}
                onClose={onClose}
              />
            </motion.div>
          ))}
        </button>
      </div>
    </Modal>
  );
}
