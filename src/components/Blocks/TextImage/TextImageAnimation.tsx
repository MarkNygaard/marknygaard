'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from 'lib/utils';

type Props = {
  fadeIn?: boolean;
  fadeInDelay?: number;
  className?: string;
  children: React.ReactNode;
};

export default function TextImageAnimation({
  fadeIn,
  fadeInDelay,
  className,
  children,
}: Props) {
  return (
    <motion.div
      initial={fadeIn ? { y: 20, opacity: 0 } : { opacity: 1 }}
      animate={fadeIn ? { y: 0, opacity: 1 } : { opacity: 1 }}
      transition={
        fadeIn ? { duration: 0.5, delay: fadeInDelay ?? 0 } : undefined
      }
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
