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
import { PostByCategoryDocument } from 'lib/graphql';
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
import { Utterances } from 'utterances-react-component';

export default function Category({
  subscription,
  preview,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const { data } = useQuerySubscription(subscription);
  const { site, allPages, allPosts, category } = data;
  const metaTags = category?.seo.concat(site.favicon);

  const { theme } = useTheme();
  const mapTheme = {
    light: 'github-light',
    dark: 'github-dark',
  };

  if (!router.isFallback && !category?.slug) {
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
          {allPosts.map((post, index) => {
            return <div key={index}>{post.title}</div>;
          })}
        </>
      )}
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: await sdk
      .AllCategoriesSlugs()
      .then((data) =>
        data.allCategories.map((category: any) => `/blog/${category.slug}`)
      ),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
  preview = false,
}: GetStaticPropsContext<{ slug: string }>) => {
  const graphqlRequest = {
    query: PostByCategoryDocument.loc?.source.body!,
    initialData: await sdk.PostByCategory({
      category: params?.slug ?? '',
    }),
    preview,
    variables: {
      category: params?.slug,
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
