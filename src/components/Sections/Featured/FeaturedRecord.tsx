'use client';

import React from 'react';
import { Image } from 'react-datocms';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function FeaturedRecord({ details }: any) {
  return (
    <div className="py-4 pt-10">
      <div className="mb-6 text-3xl font-medium">Featured Posts</div>
      <div className="mb-4 grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-10">
        {details.posts?.map((post: any) => {
          return (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="h-full pb-2 md:pb-0"
            >
              <motion.div
                whileHover={{
                  y: -5,
                  boxShadow: '0 5px 10px -1px rgb(0 0 0 / 0.1)',
                }}
                className="h-full w-full rounded-xl"
              >
                <div className="flex h-full flex-col overflow-hidden rounded-lg border-[1px] border-pine-200 bg-pine-50 font-light translate-z-0 hover:border-pine-300 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700">
                  <div className="relative min-h-[135px]">
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <Image
                      priority
                      layout="fill"
                      objectFit="cover"
                      objectPosition="50% 50%"
                      data={{
                        ...post.coverImage?.responsiveImage,
                        title:
                          post.coverImage?.responsiveImage.title || undefined,
                        base64:
                          post.coverImage?.responsiveImage.base64 || undefined,
                        bgColor:
                          post.coverImage?.responsiveImage.bgColor || undefined,
                        alt: `Cover Image for ${post.title}`,
                      }}
                    />
                  </div>
                  <p className="p-4">{post.title}</p>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>
      <div className="w-40">
        <Link href="/blog/">
          <motion.div
            whileHover={{
              y: -2,
              boxShadow: '0 5px 10px -1px rgb(0 0 0 / 0.1)',
            }}
            className="rounded-md border-[1px] border-pine-200 p-3 text-gray-500 hover:border-gray-800 hover:text-gray-800 dark:border-gray-800 dark:hover:border-gray-700 dark:hover:text-gray-300"
          >
            Read all posts -&gt;
          </motion.div>
        </Link>
      </div>
    </div>
  );
}
