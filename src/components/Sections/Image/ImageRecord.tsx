import React from 'react';
import type { FileField } from 'lib/graphql';
import { Image } from 'react-datocms';
import { motion } from 'framer-motion';
import cn from 'classnames';

export default function ImageRecord({ details }) {
  return (
    <motion.div
      initial={details.fadeIn ? { y: 20, opacity: 0 } : { opacity: 1 }}
      animate={details.fadeIn ? { y: 0, opacity: 1 } : { opacity: 1 }}
      transition={details.fadeIn && { duration: 0.5, delay: 0.2 }}
      className="mx-auto md:mb-auto"
    >
      <div
        className={cn(
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
          className={cn('translate-z-0', {
            'rounded-full': details.imageStyle === 'Round',
            'rounded-lg': details.imageStyle === 'Rounded Corners',
          })}
        />
      </div>
    </motion.div>
  );
}
