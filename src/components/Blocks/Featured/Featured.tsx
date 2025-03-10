import React from 'react';
import ResponsiveImage from '@Primitives/ResponsiveImage';
import { FeaturedRecord } from 'infrastructure/generated/graphql';
import Link from 'next/link';

import FeaturedAnimation from './FeaturedAnimation';

export default function FeaturedBlock({
  fadeIn,
  fadeInDelay,
  posts,
}: FeaturedRecord) {
  return (
    <FeaturedAnimation
      fadeIn={fadeIn}
      fadeInDelay={fadeInDelay}
      className='py-4 pt-10'
    >
      <div className='mb-6 text-3xl font-medium'>Featured Posts</div>
      <div className='mb-4 grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-10'>
        {posts?.map((post: any) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className='h-full pb-2 md:pb-0'
          >
            <FeaturedAnimation
              whileHover={{
                y: -5,
                boxShadow: '0 5px 10px -1px rgb(0 0 0 / 0.1)',
              }}
              className='h-full w-full rounded-xl'
            >
              <div className='flex h-full flex-col overflow-hidden rounded-lg border-[1px] border-pine-200 bg-pine-50 font-light translate-z-0 hover:border-pine-300 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700'>
                <div className='relative'>
                  <ResponsiveImage
                    mobile390={post.coverImage.mobile390}
                    mobile430={post.coverImage.mobile430}
                    tablet={post.coverImage.tablet}
                    desktop={post.coverImage.desktop}
                  />
                </div>
                <p className='p-4'>{post.title}</p>
              </div>
            </FeaturedAnimation>
          </Link>
        ))}
      </div>
      <div className='w-40'>
        <Link href='/blog/'>
          <FeaturedAnimation
            whileHover={{
              y: -2,
              boxShadow: '0 5px 10px -1px rgb(0 0 0 / 0.1)',
            }}
            className='rounded-md border-[1px] border-pine-200 p-3 text-gray-500 hover:border-gray-800 hover:text-gray-800 dark:border-gray-800 dark:hover:border-gray-700 dark:hover:text-gray-300'
          >
            Read all posts -&gt;
          </FeaturedAnimation>
        </Link>
      </div>
    </FeaturedAnimation>
  );
}
