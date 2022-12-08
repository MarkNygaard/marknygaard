import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import { Image } from 'react-datocms';

export default function FeaturedRecord({ details }) {
  return (
    <div className="py-4 pt-10">
      <div className="text-3xl mb-6 font-medium">Featured Posts</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-10 mb-4">
        {details.posts?.map((post) => {
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
                className="rounded-xl w-full h-full"
              >
                <div className="flex flex-col h-full bg-pine-50 dark:bg-gray-900 rounded-lg translate-z-0 font-light overflow-hidden border-[1px] border-pine-200 dark:border-gray-800 dark:hover:border-gray-700 hover:border-pine-300">
                  <div className="relative min-h-[135px] w-[312px]">
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <Image
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
            className="text-gray-500 dark:hover:text-gray-300 hover:text-gray-800 border-[1px] p-3 rounded-md border-pine-200 hover:border-gray-800 dark:hover:border-gray-700 dark:border-gray-800"
          >
            Read all posts -&gt;
          </motion.div>
        </Link>
      </div>
    </div>
  );
}
