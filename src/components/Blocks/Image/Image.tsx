'use client';

import React from 'react';
import { Image as DatoImage } from 'react-datocms';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import type { FileField, ImageRecord } from 'infrastructure/generated/graphql';

export default function ImageBlock({
  fadeIn,
  fadeInDelay,
  imageStyle,
  image,
}: ImageRecord) {
  return (
    <motion.div
      initial={fadeIn ? { y: 20, opacity: 0 } : { opacity: 1 }}
      animate={fadeIn ? { y: 0, opacity: 1 } : { opacity: 1 }}
      transition={fadeIn && { duration: 0.5, delay: fadeInDelay ?? 0 }}
      className='mx-auto md:mb-auto'
    >
      <div
        className={clsx(
          'relative mb-4 w-full overflow-hidden translate-z-0 md:mb-0',
          {
            'rounded-full': imageStyle === 'Round',
            'rounded-lg': imageStyle === 'Rounded Corners',
          },
        )}
      >
        <DatoImage
          data={(image as FileField)?.responsiveImage as any}
          className={clsx('mx-auto translate-z-0', {
            'rounded-full': imageStyle === 'Round',
            'rounded-lg': imageStyle === 'Rounded Corners',
          })}
        />
      </div>
    </motion.div>
  );
}
