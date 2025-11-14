import React from 'react';
import { SRCImage, StructuredText } from 'react-datocms';
import ImageBlock from '@Blocks/Image/Image';
import MainHeading from 'components/Blocks/MainHeading/MainHeading';
import type {
  ImageRecord,
  MainHeadingRecord,
  TextImageRecord,
} from 'infrastructure/generated/graphql';
import { cn } from 'lib/utils';

import TextImageAnimation from './TextImageAnimation';

export default function TextImageBlock({
  imageLocation,
  displayStyle,
  fadeInText,
  fadeInTextDelay,
  structuredText,
  fadeInImage,
  fadeInImageDelay,
  image,
  imageStyle,
}: TextImageRecord) {
  return (
    <div
      className={cn('mx-auto grid grid-cols-1 md:items-center', {
        'grid-template md:grid-cols-3':
          imageLocation === 'RIGHT' && displayStyle === '2x1',
        'grid-template-reverse sm:grid-cols-3':
          imageLocation === 'LEFT' && displayStyle === '2x1',
        'grid-template-1x1 sm:grid-cols-4':
          imageLocation === 'RIGHT' && displayStyle === '1x1',
        'grid-template-1x1-reverse sm:grid-cols-4':
          imageLocation === 'LEFT' && displayStyle === '1x1',
      })}
    >
      <TextImageAnimation
        fadeIn={fadeInText}
        fadeInDelay={fadeInTextDelay}
        className='grid-text prose dark:prose-invert prose-h1:mb-1 prose-a:text-pine-600 hover:prose-a:text-pine-700 dark:prose-a:text-gray-500 dark:hover:prose-a:text-gray-400 col-span-2 grow pr-4'
      >
        <StructuredText
          data={structuredText as any}
          renderBlock={({ record }: any) => {
            switch (record.__typename) {
              case 'ImageRecord': {
                const ImageRecord = record as ImageRecord;
                return <ImageBlock {...ImageRecord} />;
              }
              case 'MainHeadingRecord': {
                const MainHeadingRecord = record as MainHeadingRecord;
                return <MainHeading {...MainHeadingRecord} />;
              }
              default:
                return null;
            }
          }}
        />
      </TextImageAnimation>

      {image?.responsiveImage && (
        <TextImageAnimation
          fadeIn={fadeInImage}
          fadeInDelay={fadeInImageDelay}
          className={cn('grid-image mx-auto my-4 md:mb-auto', {
            'col-span-2': displayStyle === '1x1',
            'col-span-1': displayStyle === '2x1',
          })}
        >
          <div
            className={cn(
              'relative mb-4 aspect-square w-full translate-z-0 overflow-hidden md:mb-0',
              {
                'rounded-full': imageStyle === 'Round',
                'rounded-lg': imageStyle === 'Rounded Corners',
              },
            )}
          >
            <SRCImage data={image.responsiveImage} />
          </div>
        </TextImageAnimation>
      )}
    </div>
  );
}
