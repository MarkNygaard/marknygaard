import React from 'react';
import { StructuredText, Image } from 'react-datocms';
import type { FileField } from 'lib/graphql';
import classNames from 'classnames';
import MainHeading from 'components/MainHeading';
import { motion } from 'framer-motion';

export default function TextImageRecord({ details }) {
  return (
    <div
      className={classNames(
        'mx-auto flex max-w-6xl flex-col-reverse sm:flex-row md:items-center',
        {
          'sm:flex-row': details.imageLocation === 'RIGHT',
          'sm:flex-row-reverse': details.imageLocation === 'LEFT',
        }
      )}
    >
      <motion.article
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
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
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto md:mb-auto"
        >
          <div
            className={classNames(
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
              className={classNames('translate-z-0', {
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
