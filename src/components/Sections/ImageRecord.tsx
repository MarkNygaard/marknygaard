import React from 'react';
import type { FileField } from 'lib/graphql';
import { Image } from 'react-datocms';

export default function ImageRecord({ details }) {
  return (
    <div className="py-20 px-10">
      <div className="flex justify-center">
        <div className="relative aspect-square h-32 w-full overflow-hidden rounded-lg">
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image data={(details.image as FileField).responsiveImage as any} />
        </div>
      </div>
    </div>
  );
}
