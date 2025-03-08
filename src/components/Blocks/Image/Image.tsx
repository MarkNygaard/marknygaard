import React from 'react';
import { SRCImage } from 'react-datocms';
import type { ImageRecord } from 'infrastructure/generated/graphql';
import { cn } from 'lib/utils';

import ImageAnimation from './ImageAnimation';

export default function ImageBlock({
  fadeIn,
  fadeInDelay,
  imageStyle,
  image,
}: ImageRecord) {
  return (
    <ImageAnimation
      fadeIn={fadeIn}
      fadeInDelay={fadeInDelay}
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
    </ImageAnimation>
  );
}
