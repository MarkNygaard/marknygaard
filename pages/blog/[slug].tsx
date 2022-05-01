import Layout from 'components/Layout';
import React from 'react';
import { useRouter } from 'next/router';
import {
  getAllPostsWithSlug,
  getPost,
  getAllPosts,
  getAllPages,
} from '../../lib/api';
import ErrorPage from 'next/error';
import { StructuredText, Image } from 'react-datocms';
import { format } from 'date-fns';
import type { FileField, ImageBlockRecord } from 'lib/api';

export default function Page({ post, allPosts, allPages }) {
  const router = useRouter();

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
          <div className="sm:grid sm:grid-rows-1 sm:grid-cols-3 sm:gap-2 pb-4">
            <div className="text-2xl md:text-3xl lg:text-4xl font-light p-5 bg-pine-300 dark:bg-gray-800 dark:border-gray-800 h-full border-[1px] border-pine-300 items-center">
              {post.title}
            </div>
            <div className="flex sm:col-span-2 relative h-36 sm:h-60 lg:h-96 border-[1px] border-pine-300 dark:border-gray-800">
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image
                data={{
                  ...post.coverImage.responsiveImage,
                  title: post.coverImage.responsiveImage.title || undefined,
                  base64: post.coverImage.responsiveImage.base64 || undefined,
                  bgColor: post.coverImage.responsiveImage.bgColor || undefined,
                  alt: `Cover Image for ${post.title}`,
                }}
                className="object-cover"
                pictureClassName="object-cover"
              />
            </div>
          </div>
          <div className="flex">
            <div className="w-full lg:w-9/12">
              <div className="prose prose-img:m-0 dark:prose-invert dark:prose-pre:bg-gray-900 dark:prose-pre:text-gray-300 prose-pre:bg-gray-100 prose-pre:border-l-8 prose-pre:border-accent prose-pre:text-gray-700 prose-pre:text-xs">
                <StructuredText
                  data={post.content}
                  renderBlock={({ record }) => {
                    if (
                      record.__typename === 'ImageRecord' &&
                      (record as ImageBlockRecord).image &&
                      (record as ImageBlockRecord).image?.responsiveImage
                    ) {
                      return (
                        <div className="flex justify-center">
                          {/* eslint-disable-next-line jsx-a11y/alt-text */}
                          <Image
                            data={
                              (record.image as FileField).responsiveImage as any
                            }
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
                  {/* eslint-disable-next-line jsx-a11y/alt-text */}
                  <Image
                    data={
                      (post.author.picture as FileField).responsiveImage as any
                    }
                  />

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
