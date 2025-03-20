'use client';

import { SRCImage } from 'react-datocms';

interface ResponsiveImageData {
  __typename?: 'ResponsiveImage';
  src: string;
  srcSet: string;
  width: any;
  height: any;
  alt?: string | null;
  title?: string | null;
  sizes: string;
  bgColor?: string | null;
}

interface FileField {
  __typename?: 'FileField';
  mobile390?: ResponsiveImageData | null;
  mobile430?: ResponsiveImageData | null;
  tablet?: ResponsiveImageData | null;
  desktop?: ResponsiveImageData | null;
}

export default function ResponsiveImage({
  coverImage,
  priority = false,
}: {
  coverImage: FileField;
  priority?: boolean;
}) {
  // Use the first available responsive image
  const responsiveImage =
    coverImage.desktop ||
    coverImage.tablet ||
    coverImage.mobile430 ||
    coverImage.mobile390;

  if (!responsiveImage) {
    return null;
  }

  const baseSrc = responsiveImage.src;

  // Define different sizes for different breakpoints
  const srcSet = `
    ${baseSrc}&w=356&h=178 356w,
    ${baseSrc}&w=396&h=198 396w,
    ${baseSrc}&w=486&h=243 486w,
    ${baseSrc}&w=678&h=339 678w
  `;

  return (
    <SRCImage
      priority={priority}
      data={{
        ...responsiveImage,
        srcSet,
        sizes: `
          (max-width: 390px) 356px,
          (max-width: 430px) 396px,
          (max-width: 820px) 486px,
          678px
        `,
      }}
    />
  );
}
