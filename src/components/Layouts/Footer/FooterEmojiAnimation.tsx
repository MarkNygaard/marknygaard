'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function FooterEmojiAnimation() {
  return (
    <motion.li
      className='text-3xl'
      animate={{ opacity: [1, 1, 0, 1, 1] }}
      transition={{ duration: 3, repeat: Infinity }}
      drag
      dragConstraints={{
        top: -500,
        left: -150,
        right: 150,
        bottom: 50,
      }}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      dragElastic={0.5}
      whileTap={{ cursor: 'grabbing' }}
      whileDrag={{ opacity: 1 }}
    >
      ✌️
    </motion.li>
  );
}
