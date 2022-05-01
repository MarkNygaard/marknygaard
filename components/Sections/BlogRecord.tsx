import React from 'react';
import { format } from 'date-fns';
import NextLink from 'next/link';
import { Image } from 'react-datocms';
import classNames from 'classnames';

export default function BlogRecord({ details, posts }) {
  return (
    <div>
      <div>
        <div>
          {posts.map((post) => {
            return (
              <NextLink key={post.id} href={`/blog/${post.slug}`}>
                <a className="group my-4 border-[1px] hover:bg-pine-300 bg-pine-50 dark:bg-gray-900 dark:border-gray-800 dark:hover:bg-gray-800 duration-500 border-pine-200 shadow-sm grid grid-cols-5 rounded-lg overflow-hidden">
                  <div
                    className={classNames(
                      'hidden h-44 w-full overflow-hidden',
                      {
                        'sm:flex col-span-2': details.imageBoolean === true,
                      }
                    )}
                  >
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <Image
                      pictureClassName="object-cover"
                      data={{
                        ...post.coverImage.responsiveImage,
                        title:
                          post.coverImage.responsiveImage.title || undefined,
                        base64:
                          post.coverImage.responsiveImage.base64 || undefined,
                        bgColor:
                          post.coverImage.responsiveImage.bgColor || undefined,
                        alt: `Cover Image for ${post.title}`,
                      }}
                    />
                  </div>
                  <div
                    className={classNames(
                      'p-2 col-span-5 font-medium text-black dark:text-white',
                      {
                        'sm:col-span-3': details.imageBoolean === true,
                      }
                    )}
                  >
                    <div className="flex flex-col h-full space-y-2 p-4">
                      <div className="text-xl font-semibold">{post.title}</div>
                      <div className="text-sm font-normal grow">
                        {post.excerpt}
                      </div>
                      <div className="text-xs font-light text-pine-700 dark:text-gray-600">
                        {format(new Date(post.date), 'MMMM do, yyyy')}
                      </div>
                    </div>
                  </div>
                </a>
              </NextLink>
            );
          })}
        </div>
      </div>
    </div>
  );
}
