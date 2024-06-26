'use client';

import { Spinner } from '@Primitives/Spinner';
import { BlogPageSkeleton } from '@Skeletons/PageSkeletons';
import { usePathname } from 'next/navigation';

export default function Loading() {
  const pathname = usePathname();

  if (pathname === '/blog') {
    return <BlogPageSkeleton />;
  } else {
    return (
      <div className='flex h-center w-full items-center justify-center text-xl dark:text-gray-400'>
        <Spinner />
        <p>Loading...</p>
      </div>
    );
  }
}
