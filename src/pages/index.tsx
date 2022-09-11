import React from 'react';
import Head from 'next/head';

import Layout from '../components/Layout';
import PageSection from 'components/PageSection';

import { sdk } from 'lib/datocms';
import { HomePageDocument } from 'lib/graphql';
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import {
  useQuerySubscription,
  renderMetaTags,
  QueryListenerOptions,
} from 'react-datocms';

export default function Home({
  subscription,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const {
    data: { site, page, allPages, allPosts },
  } = useQuerySubscription(subscription);
  const metaTags = page.seo.concat(site.favicon);

  return (
    <Layout preview={subscription.enabled ?? false} allPages={allPages}>
      <Head>{renderMetaTags(metaTags)}</Head>
      {page?.content.map((content: any, i: any) => {
        return <PageSection key={i} details={content} posts={allPosts} />;
      })}
    </Layout>
  );
}

export const getStaticProps = async ({ preview }: GetStaticPropsContext) => {
  const subscription: QueryListenerOptions<any, any> = preview
    ? {
        enabled: true,
        query: HomePageDocument.loc?.source.body!,
        initialData: await sdk.HomePage(),
        token: process.env.DATOCMS_API_TOKEN!,
        environment: process.env.NEXT_DATOCMS_ENVIRONMENT || undefined,
      }
    : {
        enabled: false,
        query: HomePageDocument.loc?.source.body!,
        initialData: await sdk.HomePage(),
      };

  return {
    props: {
      subscription,
    },
  };
};
