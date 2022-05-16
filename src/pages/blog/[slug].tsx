import React from 'react';
import Head from 'next/head';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';

import Layout from 'components/Layout';
import SyntaxHighlight from 'components/SyntaxHighlight';

import { sdk } from 'lib/datocms';
import { PostBySlugDocument } from 'lib/graphql';
import type { InferGetStaticPropsType } from 'next';
import type { FileField, ImageRecord } from 'lib/graphql';
import {
  QueryListenerOptions,
  renderMetaTags,
  useQuerySubscription,
  StructuredText,
  Image,
  renderNodeRule,
} from 'react-datocms';
import { isCode } from 'datocms-structured-text-utils';
import { format } from 'date-fns';
import MainHeading from 'components/MainHeading';

export default function Page({
  subscription,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const { data } = useQuerySubscription(subscription);
  const { site, post, allPages } = data;
  const metaTags = post?.seo.concat(site.favicon);

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
        <>
          <Head>{renderMetaTags(metaTags)}</Head>
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
                    bgColor:
                      post.coverImage.responsiveImage.bgColor || undefined,
                    alt: `Cover Image for ${post.title}`,
                  }}
                  className="object-cover"
                  pictureClassName="object-cover"
                />
              </div>
            </div>
            <div className="flex">
              <div className="w-full lg:w-9/12 pr-3">
                <div className="prose prose-img:m-0 dark:prose-invert prose-pre:text-xs max-w-none pb-4">
                  <StructuredText
                    data={post.content}
                    renderBlock={({ record }) => {
                      if (
                        record.__typename === 'ImageRecord' &&
                        (record as ImageRecord).image &&
                        (record as ImageRecord).image?.responsiveImage
                      ) {
                        return (
                          <div className="flex justify-center">
                            {/* eslint-disable-next-line jsx-a11y/alt-text */}
                            <Image
                              data={
                                (record.image as FileField)
                                  .responsiveImage as any
                              }
                            />
                          </div>
                        );
                      } else if (record.__typename === 'MainHeadingRecord') {
                        return <MainHeading record={record}></MainHeading>;
                      }
                    }}
                    customNodeRules={[
                      renderNodeRule(isCode, ({ node, key }) => {
                        return (
                          <SyntaxHighlight
                            key={key}
                            code={node.code}
                            language={node.language || 'unknown'}
                            highlightLines={node.highlight}
                            showLineNumbers={node.code.split(/\n/).length > 10}
                          />
                        );
                      }),
                    ]}
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
                        (post.author.picture as FileField)
                          .responsiveImage as any
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
        </>
      )}
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: await sdk
      .AllPostsSlugs()
      .then((data) => data.allPosts.map((post: any) => `/blog/${post.slug}`)),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ slug: string }>) => {
  const graphqlRequest = {
    query: PostBySlugDocument.loc?.source.body!,
    initialData: await sdk.PostBySlug({ slug: params?.slug ?? '' }),
    variables: {
      slug: params?.slug,
    },
  };

  const subscription: QueryListenerOptions<any, any> = {
    ...graphqlRequest,
    enabled: false,
  };

  return {
    props: {
      subscription,
    },
  };
};
