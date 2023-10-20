'use client';

import React from 'react';
import type { FileField } from 'infrastructure/generated/graphql';
import { Image } from 'react-datocms';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function ImageRecord({ details }: any) {
  return (
    <motion.div
      initial={details.fadeIn ? { y: 20, opacity: 0 } : { opacity: 1 }}
      animate={details.fadeIn ? { y: 0, opacity: 1 } : { opacity: 1 }}
      transition={details.fadeIn && { duration: 0.5, delay: 0.2 }}
      className="mx-auto md:mb-auto"
    >
      <div
        className={clsx(
          'relative mb-4 w-full overflow-hidden translate-z-0 md:mb-0',
          {
            'rounded-full': details.imageStyle === 'Round',
            'rounded-lg': details.imageStyle === 'Rounded Corners',
          }
        )}
      >
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image
          data={(details.image as FileField)?.responsiveImage as any}
          layout="fill"
          objectFit="cover"
          objectPosition="50% 50%"
          className={clsx('translate-z-0', {
            'rounded-full': details.imageStyle === 'Round',
            'rounded-lg': details.imageStyle === 'Rounded Corners',
          })}
        />
      </div>
    </motion.div>
  );
}
