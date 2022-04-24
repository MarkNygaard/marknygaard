import React from 'react';
import { BlurImage } from '../BlurImage';

export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ImageRecord({ details }) {
  return (
    <div className="py-20 px-10">
      <div className="flex justify-center">
        <div className="relative aspect-square h-32 w-full overflow-hidden rounded-lg">
          <BlurImage details={details.image} />
        </div>
      </div>
    </div>
  );
}
