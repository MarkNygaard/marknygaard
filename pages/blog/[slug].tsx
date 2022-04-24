import Layout from 'components/Layout';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  getAllPostsWithSlug,
  getPost,
  getAllPosts,
  getAllPages,
} from '../../lib/api';
import ErrorPage from 'next/error';
import { StructuredText } from 'react-datocms';
import { BlurImage } from 'components/BlurImage';
import { format } from 'date-fns';
import Image from 'next/image';
import cn from 'classnames';
import { StringifyOptions } from 'querystring';

export default function Page({ post, allPosts, allPages }) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout allPages={allPages}>
      {router.isFallback ? (
        <h1 className="m-12 text-center text-6xl font-semibold leading-tight tracking-tighter dark:text-gray-300 md:text-left md:text-7xl md:leading-none lg:text-8xl">
          Loading…
        </h1>
      ) : (
        <article>
          <div className="grid grid-cols-3 gap-2 pb-4">
            <div className="flex text-2xl md:text-3xl lg:text-4xl font-light p-5 bg-pine-300 dark:bg-gray-800 dark:border-gray-800 h-full border-[1px] border-pine-300 items-center">
              {post.title}
            </div>
            <div className="col-span-2 relative h-60 lg:h-96 border-[1px] border-pine-300 dark:border-gray-800">
              <BlurImage details={post.coverImage} />
            </div>
          </div>
          <div className="flex">
            <div className="w-full lg:w-9/12">
              <div className="prose dark:prose-invert dark:prose-pre:bg-gray-900 dark:prose-pre:text-gray-300 prose-pre:bg-gray-100 prose-pre:border-l-8 prose-pre:border-accent prose-pre:text-gray-700 prose-pre:text-xs">
                <StructuredText
                  data={post.content}
                  renderBlock={({ record }) => {
                    if (record.__typename === 'ImageRecord') {
                      interface record {
                        url: string;
                        width: string;
                        height: number;
                      }

                      return (
                        <div className="flex justify-center">
                          <Image
                            alt=""
                            src={(record.image as any)?.url}
                            width={(record.image as any)?.width}
                            height={(record.image as any)?.height}
                            quality={100}
                            className={cn(
                              'duration-700 ease-in-out dark:opacity-50',
                              isLoading
                                ? 'scale-110 blur-2xl grayscale'
                                : 'scale-100 blur-0 grayscale-0'
                            )}
                            onLoadingComplete={() => setLoading(false)}
                          />
                        </div>
                      );
                    }
                  }}
                />
              </div>
            </div>
            <aside className="divide-y space-y-2 hidden lg:block w-3/12">
              <div className="text-gray-500 text-sm py-5 pl-2">
                {format(new Date(post.date), 'MMMM do, yyyy')}
              </div>
              <div className="space-y-2 py-5 pl-2">
                <div className="font-semibold">Author</div>
                <div className="flex">
                  <div className="relative aspect-square h-12 w-12 overflow-hidden rounded-full">
                    <BlurImage details={post.author.picture} />1
                  </div>
                  <div className="my-auto px-4 font-light">
                    {post.author.name}
                  </div>
                </div>
              </div>
              <div className="space-y-2 py-5 pl-2">
                <div className="font-semibold">Category</div>
                <div>{post.category.name}</div>
              </div>
            </aside>
          </div>
        </article>
      )}
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const data = await getPost(params.slug);
  const allPosts = (await getAllPosts()) || [];
  const allPages = (await getAllPages()) || [];

  return {
    props: {
      post: {
        ...data?.post,
      },
      allPosts,
      allPages,
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();
  return {
    paths: allPosts?.map((post) => `/blog/${post.slug}`) || [],
    fallback: true,
  };
}
