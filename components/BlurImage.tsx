import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from './Sections/ImageRecord';

export function BlurImage({ details }) {
  const [isLoading, setLoading] = useState(true);

  return (
    <Image
      alt=""
      src={details.url}
      layout="fill"
      objectFit="cover"
      quality={100}
      className={cn(
        'duration-700 ease-in-out group-hover:opacity-70 dark:opacity-50 dark:group-hover:opacity-70',
        isLoading
          ? 'scale-110 blur-2xl grayscale'
          : 'scale-100 blur-0 grayscale-0'
      )}
      onLoadingComplete={() => setLoading(false)}
    />
  );
}
