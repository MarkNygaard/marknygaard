import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';

export default function FeaturedRecord({ details }) {
  return (
    <div className="space-y-8 py-4 pt-10">
      <div className="text-3xl font-bold">Featured Posts</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-10">
        {details.posts?.map((post) => {
          return (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <a
                className={classNames(
                  'transform hover:scale-[1.01] transition-all rounded-xl w-full p-1'
                )}
              >
                <div className="flex flex-col justify-between h-full bg-pine-300 dark:bg-gray-900 rounded-lg p-4 font-light">
                  {post.title}
                </div>
              </a>
            </Link>
          );
        })}
      </div>
      <div>
        <Link href="/blog/">
          <a className="text-gray-500 dark:hover:text-gray-300 hover:text-gray-800">
            Read all posts -&gt;
          </a>
        </Link>
      </div>
    </div>
  );
}
