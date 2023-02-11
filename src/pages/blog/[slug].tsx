import React from 'react';
import Head from 'next/head';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { useTheme } from 'next-themes';

import Layout from 'components/Layout';
import MainHeading from 'components/MainHeading';
import SyntaxHighlight from 'components/SyntaxHighlight';
import ViewCounter from 'components/ViewCounter';

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
import Giscus, { Repo, Theme } from '@giscus/react';

export default function Page({
  subscription,
  preview,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const { data } = useQuerySubscription(subscription);
  const { site, post, allPages } = data;
  const metaTags = post?.seo.concat(site.favicon);

  const { theme } = useTheme();
  const mapTheme = {
    light: 'github-light',
    dark: 'github-dark',
  };

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout preview={preview} allPages={allPages}>
      {router.isFallback ? (
        <h1 className="m-12 text-center text-6xl font-semibold leading-tight tracking-tighter dark:text-gray-300 md:text-left md:text-7xl md:leading-none lg:text-8xl">
          Loading…
        </h1>
      ) : (
        <>
          <Head>{renderMetaTags(metaTags)}</Head>
          <article>
            <div className="pb-4 sm:grid sm:grid-cols-3 sm:grid-rows-1 sm:gap-2">
              <div className="h-full items-center border-[1px] border-pine-300 bg-pine-300 p-5 text-2xl font-light dark:border-gray-800 dark:bg-gray-800 md:text-3xl lg:text-4xl">
                {post?.title}
              </div>
              <div className="relative flex h-36 border-[1px] border-pine-300 dark:border-gray-800 sm:col-span-2 sm:h-60 lg:h-96">
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image
                  data={{
                    ...post.coverImage?.responsiveImage,
                    title: post.coverImage.responsiveImage?.title || undefined,
                    base64:
                      post.coverImage.responsiveImage?.base64 || undefined,
                    bgColor:
                      post.coverImage.responsiveImage?.bgColor || undefined,
                    alt: `Cover Image for ${post?.title}`,
                  }}
                  className="object-cover"
                  pictureClassName="object-cover"
                />
              </div>
            </div>
            <div className="flex">
              <div className="w-full pr-3 lg:w-9/12">
                <div className="prose max-w-none pb-4 prose-pre:text-xs prose-img:m-0 dark:prose-invert">
                  <StructuredText
                    data={post?.content}
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
                <div>
                  <Giscus
                    key={theme}
                    repo={process.env.NEXT_PUBLIC_GISCUS_REPO as Repo}
                    repoId={process.env.NEXT_PUBLIC_GISCUS_REPO_ID}
                    category="General"
                    categoryId="DIC_kwDOHWhC584CUJH4"
                    mapping="pathname"
                    reactionsEnabled="0"
                    emitMetadata="0"
                    theme={theme as Theme}
                  />
                </div>
              </div>
              <aside className="hidden w-3/12 space-y-2 divide-y lg:block">
                <div className="py-5 pl-2 text-sm text-gray-500">
                  {format(new Date(post?.date), 'MMMM do, yyyy')}
                </div>
                <div className="space-y-2 py-5 pl-2">
                  <div className="font-semibold">Author</div>
                  <div className="flex">
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <Image
                      data={
                        (post.author?.picture as FileField)
                          .responsiveImage as any
                      }
                    />
                    <div className="my-auto px-4 font-light">
                      {post.author?.name}
                    </div>
                  </div>
                </div>
                <div className="space-y-2 py-5 pl-2">
                  <div className="font-semibold">Category</div>
                  <div className="my-auto font-light">
                    {post.category?.name}
                  </div>
                </div>
                <div className="space-y-2 py-5 pl-2">
                  <div className="font-semibold">View Counter</div>
                  <div className="my-auto font-light">
                    <ViewCounter slug={post?.slug} />
                  </div>
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
  preview = false,
}: GetStaticPropsContext<{ slug: string }>) => {
  const graphqlRequest = {
    query: PostBySlugDocument.loc?.source.body!,
    initialData: await sdk.PostBySlug({ slug: params?.slug ?? '' }),
    preview,
    variables: {
      slug: params?.slug,
    },
  };

  const subscription: QueryListenerOptions<any, any> = preview
    ? {
        ...graphqlRequest,
        token: process.env.DATOCMS_API_TOKEN!,
        enabled: true,
      }
    : {
        ...graphqlRequest,
        enabled: false,
      };

  return {
    props: {
      preview,
      subscription,
    },
  };
};
