'use client';

import { SRCImage } from 'react-datocms';

type ResponsiveImageProps = { coverImage: any; priority?: boolean };

export default function ResponsiveImage({
  coverImage,
  priority = false,
}: ResponsiveImageProps) {
  return (
    <SRCImage
      priority={priority}
      data={{
        ...coverImage.mobile390,
        srcSet: `
          ${coverImage.mobile390.srcSet},
          ${coverImage.mobile430.srcSet},
          ${coverImage.tablet.srcSet},
          ${coverImage.desktop.srcSet}
        `,
        sizes: `${coverImage.mobile390.sizes},
          ${coverImage.mobile430.sizes},
          ${coverImage.tablet.sizes},
          ${coverImage.desktop.sizes}`,
      }}
    />
  );
}
