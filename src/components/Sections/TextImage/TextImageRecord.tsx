import React from 'react';
import { StructuredText, Image } from 'react-datocms';
import type { FileField } from 'lib/graphql';
import cn from 'classnames';
import MainHeading from 'components/MainHeading';
import { motion } from 'framer-motion';

export default function TextImageRecord({ details }) {
  return (
    <div
      className={cn(
        'mx-auto flex max-w-6xl flex-col-reverse sm:flex-row md:items-center',
        {
          'sm:flex-row': details.imageLocation === 'RIGHT',
          'sm:flex-row-reverse': details.imageLocation === 'LEFT',
        }
      )}
    >
      <motion.article
        initial={details.fadeInText ? { y: 20, opacity: 0 } : { opacity: 1 }}
        animate={details.fadeInText ? { y: 0, opacity: 1 } : { opacity: 1 }}
        transition={details.fadeInText && { duration: 0.5 }}
        className="grow prose dark:prose-invert pr-4 prose-h1:mb-1 prose-a:text-pine-600 hover:prose-a:text-pine-700 dark:prose-a:text-gray-500 dark:hover:prose-a:text-gray-400"
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
          className="mx-auto md:mb-auto"
        >
          <div
            className={cn(
              'relative aspect-square h-44 mb-4 md:mb-0 lg:h-72 w-full overflow-hidden translate-z-0',
              {
                'rounded-full': details.imageStyle === 'Round',
                'rounded-xl': details.imageStyle === 'Rounded Corners',
              }
            )}
          >
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image
              data={(details.image as FileField)?.responsiveImage as any}
              className={cn('translate-z-0', {
                'rounded-full': details.imageStyle === 'Round',
                'rounded-xl': details.imageStyle === 'Rounded Corners',
              })}
            />
          </div>
        </motion.div>
      ) : null}
    </div>
  );
}
