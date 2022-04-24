import Link from 'next/link';
import React from 'react';

export default function FeaturedRecord({ details, posts }) {
  // const featuredNumber: any = allPages[0]?.content.map((test) => {
  //   return test.__typename === 'FeaturedRecord' ? test.featuredNumber : null;
  // });
  const featuredPosts = posts.slice(0, 3);

  return (
    <div className="space-y-8 py-4 pt-10">
      <div className="text-3xl font-bold">Featured Posts</div>
      <div className="grid grid-cols-3 gap-10">
        {featuredPosts?.map((post) => {
          return (
            <div
              key={post.id}
              className="border-2 border-black dark:border-gray-700 rounded-lg p-4"
            >
              {post.title}
            </div>
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
