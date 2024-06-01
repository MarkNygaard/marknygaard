'use client';

import React from 'react';
import { Image, StructuredText } from 'react-datocms';
import clsx from 'clsx';
import MainHeading from 'components/MainHeading';
import { motion } from 'framer-motion';
import type {
  FileField,
  TextImageRecord,
} from 'infrastructure/generated/graphql';

export default function TextImage({
  imageLocation,
  displayStyle,
  fadeInText,
  structuredText,
  fadeInImage,
  image,
  imageStyle,
}: TextImageRecord) {
  return (
    <div
      className={clsx('mx-auto grid grid-cols-1 md:items-center', {
        'grid-template sm:grid-cols-3':
          imageLocation === 'RIGHT' && displayStyle === '2x1',
        'grid-template-reverse sm:grid-cols-3':
          imageLocation === 'LEFT' && displayStyle === '2x1',
        'grid-template-1x1 sm:grid-cols-4':
          imageLocation === 'RIGHT' && displayStyle === '1x1',
        'grid-template-1x1-reverse sm:grid-cols-4':
          imageLocation === 'LEFT' && displayStyle === '1x1',
      })}
    >
      <motion.article
        initial={fadeInText ? { y: 20, opacity: 0 } : { opacity: 1 }}
        animate={fadeInText ? { y: 0, opacity: 1 } : { opacity: 1 }}
        transition={fadeInText && { duration: 0.5 }}
        className='grid-text prose col-span-2 grow pr-4 dark:prose-invert prose-h1:mb-1 prose-a:text-pine-600 hover:prose-a:text-pine-700 dark:prose-a:text-gray-500 dark:hover:prose-a:text-gray-400'
      >
        <StructuredText
          data={structuredText as any}
          renderBlock={({ record }) => {
            if (record.__typename === 'MainHeadingRecord') {
              return <MainHeading record={record}></MainHeading>;
            }
            return null;
          }}
        />
      </motion.article>
      {((image as FileField)?.responsiveImage as any) ? (
        <motion.div
          initial={fadeInImage ? { y: 20, opacity: 0 } : { opacity: 1 }}
          animate={fadeInImage ? { y: 0, opacity: 1 } : { opacity: 1 }}
          transition={fadeInImage && { duration: 0.5, delay: 0.2 }}
          className={clsx('grid-image mx-auto my-4 md:mb-auto', {
            'col-span-2': displayStyle === '1x1',
            'col-span-1': displayStyle === '2x1',
          })}
        >
          <div
            className={clsx(
              'relative mb-4 aspect-square w-full overflow-hidden translate-z-0 md:mb-0',
              {
                'rounded-full': imageStyle === 'Round',
                'rounded-lg': imageStyle === 'Rounded Corners',
              },
            )}
          >
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image
              data={(image as FileField)?.responsiveImage as any}
              className={clsx('translate-z-0', {
                'rounded-full': imageStyle === 'Round',
                'rounded-lg': imageStyle === 'Rounded Corners',
              })}
            />
          </div>
        </motion.div>
      ) : null}
    </div>
  );
}
