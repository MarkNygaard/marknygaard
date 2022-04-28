import React from 'react';
import { StructuredText, Image } from 'react-datocms';
import type { FileField } from 'lib/api';

export default function TextImageRecord({ details }) {
  if (details.imageLocation === 'RIGHT') {
    return (
      <div className="mx-auto flex max-w-6xl flex-col-reverse sm:flex-row md:items-center">
        <article className="grow prose dark:prose-invert pr-4 prose-h1:mb-1 prose-a:text-pine-600 hover:prose-a:text-pine-700 dark:prose-a:text-gray-500 dark:hover:prose-a:text-gray-400">
          <StructuredText data={details.structuredText} />
        </article>
        <div className="mx-auto md:mb-auto">
          {details.imageStyle === 'Round' ? (
            <div className="relative aspect-square h-44 mb-4 md:mb-0 lg:h-72 w-full overflow-hidden rounded-full">
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image
                data={(details.image as FileField).responsiveImage as any}
              />
            </div>
          ) : details.imageStyle === 'Square' ? (
            <div className="relative aspect-square h-44 lg:h-72 w-full overflow-hidden">
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image
                data={(details.image as FileField).responsiveImage as any}
              />
            </div>
          ) : details.imageStyle === 'Rounded Corners' ? (
            <div className="relative aspect-square h-44 lg:h-72 w-full overflow-hidden">
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image
                data={(details.image as FileField).responsiveImage as any}
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  } else {
    return (
      <div className="mx-auto flex max-w-6xl flex-col md:flex-row md:items-center">
        <div className="mx-auto md:mb-auto">
          {details.imageStyle === 'Round' ? (
            <div className="relative aspect-square h-44 lg:h-72 w-full overflow-hidden rounded-full">
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image
                data={(details.image as FileField).responsiveImage as any}
              />
            </div>
          ) : details.imageStyle === 'Square' ? (
            <div className="relative aspect-square h-44 lg:h-72 w-full overflow-hidden">
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image
                data={(details.image as FileField).responsiveImage as any}
              />
            </div>
          ) : details.imageStyle === 'Rounded Corners' ? (
            <div className="relative aspect-square h-44 lg:h-72 w-full overflow-hidden">
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image
                data={(details.image as FileField).responsiveImage as any}
              />
            </div>
          ) : null}
        </div>
        <article className="grow prose dark:prose-invert pr-4 prose-h1:mb-1 prose-a:text-pine-600 hover:prose-a:text-pine-800">
          <StructuredText data={details.structuredText} />
        </article>
      </div>
    );
  }
}
