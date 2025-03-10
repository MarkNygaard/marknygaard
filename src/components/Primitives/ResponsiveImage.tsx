'use client';

import { useEffect, useState } from 'react';
import { SRCImage } from 'react-datocms';

type ResponsiveImageProps = {
  mobile390: any;
  mobile430: any;
  tablet: any;
  desktop: any;
  priority?: boolean;
};

export default function ResponsiveImage({
  mobile390,
  mobile430,
  tablet,
  desktop,
  priority = false,
}: ResponsiveImageProps) {
  const [imageData, setImageData] = useState(mobile390);

  useEffect(() => {
    const updateImage = () => {
      if (window.innerWidth <= 390) {
        setImageData(mobile390);
      } else if (window.innerWidth <= 430) {
        setImageData(mobile430);
      } else if (window.innerWidth <= 820) {
        setImageData(tablet);
      } else {
        setImageData(desktop);
      }
    };

    updateImage();
    window.addEventListener('resize', updateImage);
    return () => window.removeEventListener('resize', updateImage);
  }, [mobile390, mobile430, tablet, desktop]);

  return <SRCImage priority={priority} data={imageData} />;
}
