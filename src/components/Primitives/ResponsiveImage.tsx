'use client';

import { useEffect, useState } from 'react';
import { SRCImage } from 'react-datocms';

type ResponsiveImageProps = {
  coverImage: any;
  priority?: boolean;
};

export default function ResponsiveImage({
  coverImage,
  priority = false,
}: ResponsiveImageProps) {
  const [imageData, setImageData] = useState(coverImage.mobile390);

  useEffect(() => {
    const updateImage = () => {
      if (window.innerWidth <= 390) {
        setImageData(coverImage.mobile390);
      } else if (window.innerWidth <= 430) {
        setImageData(coverImage.mobile430);
      } else if (window.innerWidth <= 820) {
        setImageData(coverImage.tablet);
      } else {
        setImageData(coverImage.desktop);
      }
    };

    updateImage();
    window.addEventListener('resize', updateImage);
    return () => window.removeEventListener('resize', updateImage);
  }, [
    coverImage.mobile390,
    coverImage.mobile430,
    coverImage.tablet,
    coverImage.desktop,
  ]);

  return <SRCImage priority={priority} data={imageData} />;
}
