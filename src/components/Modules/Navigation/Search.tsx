import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import AlgoliaSearch from 'components/AlgoliaSearch';
import { AnimatePresence } from 'framer-motion';

export default function Search() {
  const [searchIsOpen, setSearchIsOpen] = useState(false);

  return (
    <>
      <button
        aria-label='Search'
        className='duration-400 flex aspect-square h-fit items-center justify-center rounded-md p-3 text-[#72818b] transition-all hover:bg-pine-300 hover:font-bold hover:text-pine-700 dark:hover:bg-slate-800 dark:hover:text-pine-200'
        onClick={() => setSearchIsOpen(true)}
      >
        <BsSearch />
      </button>
      <AnimatePresence>
        {searchIsOpen && (
          <AlgoliaSearch onClose={() => setSearchIsOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
