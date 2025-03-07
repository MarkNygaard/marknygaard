import React from 'react';
import { Image as DatoImage } from 'react-datocms';
import CardSpotlight from '@Primitives/CardSpotlight';
import clsx from 'clsx';
import { format } from 'date-fns';
import { BlogRecord, PostRecord } from 'infrastructure/generated/graphql';
import NextLink from 'next/link';

interface BlogBlockProps extends BlogRecord {
  posts: PostRecord[];
}

export default function BlogBlock({ id, imageBoolean, posts }: BlogBlockProps) {
  return (
    <div key={id} className='mx-auto max-w-5xl'>
      {posts?.map((post: PostRecord) => (
        <NextLink key={post.id} href={`/blog/${post.slug}`}>
          <CardSpotlight>
            <div
              className={clsx('hidden w-full overflow-hidden', {
                'col-span-2 sm:flex': imageBoolean === true,
              })}
            >
              {post.coverImage && post.coverImage.responsiveImage && (
                <DatoImage
                  className='object-cover dark:opacity-90'
                  pictureClassName='object-cover'
                  data={{
                    ...post.coverImage.responsiveImage,
                    title: post.coverImage.responsiveImage.title || undefined,
                    base64: post.coverImage.responsiveImage.base64 || undefined,
                    bgColor:
                      post.coverImage.responsiveImage.bgColor || undefined,
                    alt: `Cover Image for ${post.title}`,
                  }}
                />
              )}
            </div>
            <div
              className={clsx(
                'col-span-5 p-2 font-medium text-black dark:text-white',
                {
                  'sm:col-span-3': imageBoolean === true,
                },
              )}
            >
              <div className='flex h-full flex-col space-y-2 p-4'>
                <div className='text-xl font-semibold'>{post.title}</div>
                <div className='grow text-sm font-normal'>{post.excerpt}</div>
                <div className='text-xs font-light text-pine-700 dark:text-gray-600'>
                  {format(new Date(post.date), 'MMMM do, yyyy')}
                </div>
              </div>
            </div>
          </CardSpotlight>
        </NextLink>
      ))}
    </div>
  );
}
