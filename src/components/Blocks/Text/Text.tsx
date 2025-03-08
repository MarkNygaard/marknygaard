import React from 'react';
import { StructuredText } from 'react-datocms';
import ImageBlock from '@Blocks/Image/Image';
import MainHeading from '@Blocks/MainHeading/MainHeading';
import {
  ImageRecord,
  MainHeadingRecord,
  TextRecord,
} from 'infrastructure/generated/graphql';
import { cn } from 'lib/utils';

import TextAnimation from './TextAnimation';

export default function TextBlock({
  id,
  centerText,
  fadeIn,
  fadeInDelay,
  structuredText,
}: TextRecord) {
  return (
    <div
      className={cn('align-center flex items-center overflow-hidden', {
        'justify-center': centerText,
      })}
    >
      <TextAnimation
        id={id}
        fadeIn={fadeIn}
        fadeInDelay={fadeInDelay}
        className='prose col-span-2 grow dark:prose-invert prose-h1:mb-1 prose-a:text-pine-600 hover:prose-a:text-pine-700 dark:prose-a:text-gray-500 dark:hover:prose-a:text-gray-400 md:pr-4'
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
      </TextAnimation>
    </div>
  );
}
