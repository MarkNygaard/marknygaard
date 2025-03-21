import React from 'react';
import ResponsiveImage from '@Primitives/ResponsiveImage';
import { FeaturedRecord } from 'infrastructure/generated/graphql';
import { cn } from 'lib/utils';
import Link from 'next/link';

export default function FeaturedBlock({
  fadeIn,
  fadeInDelay,
  posts,
}: FeaturedRecord) {
  return (
    <div
      className={cn('py-4 pt-10', fadeIn && 'animate-fade-in-up opacity-0')}
      style={fadeInDelay ? { animationDelay: `${fadeInDelay}s` } : undefined}
    >
      <div className='mb-6 text-3xl font-medium'>Featured Posts</div>

      <div className='mb-4 grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-10'>
        {posts?.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className='mx-auto h-full w-fit pb-2 md:pb-0'
          >
            <div className='h-full w-full rounded-xl transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-md'>
              <div className='flex h-full flex-col overflow-hidden rounded-lg border-[1px] border-pine-200 bg-pine-50 font-light translate-z-0 hover:border-pine-300 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700'>
                <ResponsiveImage coverImage={post.coverImage} />
                <p className='p-4'>{post.title}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className='w-40'>
        <Link href='/blog/'>
          <div className='rounded-md border-[1px] border-pine-200 p-3 text-gray-500 transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:border-gray-800 hover:text-gray-800 hover:shadow-md dark:border-gray-800 dark:hover:border-gray-700 dark:hover:text-gray-300'>
            Read all posts -&gt;
          </div>
        </Link>
      </div>
    </div>
  );
}
