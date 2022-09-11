import React from 'react';
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';

import Layout from 'components/Layout';
import PageSection from 'components/PageSection';

import { sdk } from 'lib/datocms';
import { PageBySlugDocument } from 'lib/graphql';
import {
  QueryListenerOptions,
  renderMetaTags,
  useQuerySubscription,
} from 'react-datocms';

export default function Page({
  subscription,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const { data } = useQuerySubscription(subscription);
  const { site, page, allPages, allPosts } = data;
  const metaTags = page?.seo.concat(site.favicon);

  if (!router.isFallback && !page?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout preview={subscription.enabled ?? false} allPages={allPages}>
      {router.isFallback ? (
        <h1 className="m-12 text-center text-6xl font-semibold leading-tight tracking-tighter dark:text-gray-300 md:text-left md:text-7xl md:leading-none lg:text-8xl">
          Loading…
        </h1>
      ) : (
        <>
          <Head>{renderMetaTags(metaTags)}</Head>
          <div className="text-4xl font-light pb-5">{page.name}</div>
          {page?.content.map((content: any, i: any) => {
            return <PageSection key={i} details={content} posts={allPosts} />;
          })}
        </>
      )}
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: await sdk
      .AllPagesSlugs()
      .then((data) => data.allPages.map((page: any) => `/${page.slug}`)),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
  preview = false,
}: GetStaticPropsContext<{ slug: string }>) => {
  const graphqlRequest = {
    query: PageBySlugDocument.loc?.source.body!,
    initialData: await sdk.PageBySlug({ slug: params?.slug ?? '' }),
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
      subscription,
    },
  };
};
