import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Dialog } from '@headlessui/react';
import cn from 'classnames';

function NavItem({ href, text, setIsOpen, isOpen }) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <NextLink href={href}>
      <a
        onClick={() => setIsOpen(!isOpen)}
        className="block w-full py-10 mx-2 text-2xl font-semibold text-center text-gray-800 bg-white rounded-lg shadow-md"
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

      <Dialog
        as="div"
        className="md:hidden fixed inset-0 top-0 h-screen bg-[#787878]/30 backdrop-blur z-20"
        open={isOpen}
        onClose={closeModal}
      >
        <Dialog.Panel className="w-full max-w-lg p-4 m-0 mx-auto mt-20">
          <button
            onClick={closeModal}
            className="flex flex-wrap focus:outline-none w-full"
          >
            {allPages?.map((page, i) => (
              <div
                className="flex items-center justify-center w-1/2 mt-6"
                key={i}
              >
                <NavItem
                  key={page.id}
                  href={`/${page.slug}`}
                  text={page.name}
                  setIsOpen={setIsOpen}
                  isOpen={isOpen}
                />
              </div>
            ))}
          </button>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
