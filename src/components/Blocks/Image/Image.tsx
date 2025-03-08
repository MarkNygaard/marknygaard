'use client';

import React from 'react';
import { SRCImage } from 'react-datocms';
import { motion } from 'framer-motion';
import type { ImageRecord } from 'infrastructure/generated/graphql';
import { cn } from 'lib/utils';

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
        className={cn(
          'relative mb-4 w-full overflow-hidden translate-z-0 md:mb-0',
          {
            'rounded-full': imageStyle === 'Round',
            'rounded-lg': imageStyle === 'Rounded Corners',
          },
        )}
      >
        {image?.responsiveImage && <SRCImage data={image.responsiveImage} />}
      </div>
    </motion.div>
  );
}
