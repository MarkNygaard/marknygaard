import React, { useState } from 'react';
import NextLink from 'next/link';
import { Dialog } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';

function NavItem({ href, text, setIsOpen, isOpen }) {
  return (
    <NextLink href={href}>
      <a
        onClick={() => setIsOpen(!isOpen)}
        className="block w-full py-10 mx-2 text-2xl font-semibold text-center text-gray-900 bg-white dark:bg-black dark:text-gray-100 rounded-lg shadow-md"
      >
        <span className="capsize">{text}</span>
      </a>
    </NextLink>
  );
}

export default function MobileMenu2({ allPages }) {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button
        className="md:hidden mobile-menu-button inline-flex items-center justify-center pl-4 text-gray-500 focus:outline-none focus:ring-offset-2"
        onClick={openModal}
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
            transition: { duration: 0.3, ease: [0.36, 0.66, 0.04, 1] },
          }}
          className="md:hidden fixed inset-0 top-0 h-screen bg-[#787878]/30 backdrop-blur z-20"
          open={isOpen}
          onClose={closeModal}
        >
          <Dialog.Panel
            className="w-full h-full max-w-lg p-4 m-0 mx-auto"
            onClick={closeModal}
          >
            <button
              onClick={closeModal}
              className="flex flex-wrap focus:outline-none w-full mt-20"
            >
              {allPages?.map((page, i) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{
                    duration: 0.2,
                    delay: 0.1 * i,
                    type: 'spring',
                  }}
                  className="flex items-center justify-center w-full mt-6"
                  key={i}
                >
                  <NavItem
                    key={page.id}
                    href={`/${page.slug}`}
                    text={page.name}
                    setIsOpen={setIsOpen}
                    isOpen={isOpen}
                  />
                </motion.div>
              ))}
            </button>
          </Dialog.Panel>
        </Dialog>
      </AnimatePresence>
    </>
  );
}
