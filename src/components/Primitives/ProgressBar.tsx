'use client';

import React from 'react';
import { motion, useScroll } from 'framer-motion';

export default function ProgressBar() {
  const { scrollYProgress } = useScroll();
  return (
    <>
      <div className='absolute left-0 top-0 h-4 w-full bg-gray-100 text-center dark:bg-gray-700' />
      <motion.div
        className='absolute left-0 top-0 z-50 h-4 w-full origin-left bg-pine-300/80 dark:bg-pine-500'
        style={{ scaleX: scrollYProgress }}
      />
    </>
  );
}
