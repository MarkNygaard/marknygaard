'use client';

import React from 'react';
import { Image } from 'react-datocms';
import clsx from 'clsx';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import NextLink from 'next/link';

export default function BlogRecord({
  details,
  posts,
}: {
  details: any;
  posts: any;
}) {
  return (
    <div className="mx-auto max-w-5xl">
      {posts.map((post: any) => {
        return (
          <NextLink key={post.id} href={`/blog/${post.slug}`}>
            <motion.div
              whileHover={{
                y: -5,
                boxShadow: '0 2px 10px -1px rgb(0 0 0 / 0.1)',
                transition: { duration: 0.1, type: 'spring', mass: 0.1 },
              }}
              className="group my-6 grid grid-cols-5 overflow-hidden rounded-lg border-[1px] border-pine-200 bg-pine-50 translate-z-0 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800"
            >
              <div
                className={clsx('hidden h-44 w-full overflow-hidden', {
                  'col-span-2 sm:flex': details.imageBoolean === true,
                })}
              >
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image
                  pictureClassName="object-cover"
                  data={{
                    ...post.coverImage.responsiveImage,
                    title: post.coverImage.responsiveImage.title || undefined,
                    base64: post.coverImage.responsiveImage.base64 || undefined,
                    bgColor:
                      post.coverImage.responsiveImage.bgColor || undefined,
                    alt: `Cover Image for ${post.title}`,
                  }}
                />
              </div>
              <div
                className={clsx(
                  'col-span-5 p-2 font-medium text-black dark:text-white',
                  {
                    'sm:col-span-3': details.imageBoolean === true,
                  }
                )}
              >
                <div className="flex h-full flex-col space-y-2 p-4">
                  <div className="text-xl font-semibold">{post.title}</div>
                  <div className="grow text-sm font-normal">{post.excerpt}</div>
                  <div className="text-xs font-light text-pine-700 dark:text-gray-600">
                    {format(new Date(post.date), 'MMMM do, yyyy')}
                  </div>
                </div>
              </div>
            </motion.div>
          </NextLink>
        );
      })}
    </div>
  );
}
