import React from 'react';
import { StructuredText, Image } from 'react-datocms';
import type { FileField } from 'lib/graphql';
import cn from 'classnames';
import MainHeading from 'components/MainHeading';
import { motion } from 'framer-motion';

export default function TextImageRecord({ details }) {
  return (
    <div
      className={cn('mx-auto grid max-w-6xl grid-cols-1 md:items-center', {
        'grid-template sm:grid-cols-3':
          details.imageLocation === 'RIGHT' && details.displayStyle === '2x1',
        'grid-template-reverse sm:grid-cols-3':
          details.imageLocation === 'LEFT' && details.displayStyle === '2x1',
        'grid-template-1x1 sm:grid-cols-4':
          details.imageLocation === 'RIGHT' && details.displayStyle === '1x1',
        'grid-template-1x1-reverse sm:grid-cols-4':
          details.imageLocation === 'LEFT' && details.displayStyle === '1x1',
      })}
    >
      <motion.article
        initial={details.fadeInText ? { y: 20, opacity: 0 } : { opacity: 1 }}
        animate={details.fadeInText ? { y: 0, opacity: 1 } : { opacity: 1 }}
        transition={details.fadeInText && { duration: 0.5 }}
        className="grid-text prose prose-xl col-span-2 grow pr-4 prose-h1:mb-1 prose-a:text-pine-600 hover:prose-a:text-pine-700 dark:prose-invert dark:prose-a:text-gray-500 dark:hover:prose-a:text-gray-400"
      >
        <StructuredText
          data={details.structuredText}
          renderBlock={({ record }) => {
            if (record.__typename === 'MainHeadingRecord') {
              return <MainHeading record={record}></MainHeading>;
            }
            return null;
          }}
        />
      </motion.article>
      {((details.image as FileField)?.responsiveImage as any) ? (
        <motion.div
          initial={details.fadeInImage ? { y: 20, opacity: 0 } : { opacity: 1 }}
          animate={details.fadeInImage ? { y: 0, opacity: 1 } : { opacity: 1 }}
          transition={details.fadeInImage && { duration: 0.5, delay: 0.2 }}
          className={cn('grid-image mx-auto md:mb-auto', {
            'col-span-2': details.displayStyle === '1x1',
            'col-span-1': details.displayStyle === '2x1',
          })}
        >
          <div
            className={cn(
              'relative mb-4 aspect-square h-44 w-full overflow-hidden translate-z-0 md:mb-0 lg:h-72',
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
      ) : null}
    </div>
  );
}
