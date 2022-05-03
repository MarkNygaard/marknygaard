import Layout from 'components/Layout';
import React from 'react';
import Head from 'next/head';
import { renderMetaTags } from 'react-datocms';
import { useRouter } from 'next/router';
import {
  getAllPages,
  getAllPagesWithSlug,
  getPage,
  getAllPosts,
} from '../lib/api';
import ErrorPage from 'next/error';
import PageSection from 'components/PageSection';

export default function Page({ allPages, page, allPosts, site }) {
  const router = useRouter();
  const metaTags = page.seo.concat(site.favicon);

  if (!router.isFallback && !page?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout allPages={allPages}>
      <Head>{renderMetaTags(metaTags)}</Head>
      <div className="text-4xl font-light pb-5">{page.name}</div>
      {page?.content.map((content, i) => {
        return <PageSection key={i} details={content} posts={allPosts} />;
      })}
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const data = await getPage(params.slug);
  const allPages = (await getAllPages()) || [];
  const allPosts = (await getAllPosts()) || [];

  return {
    props: {
      page: {
        ...data?.page,
      },
      site: {
        ...data?.site,
      },
      allPages,
      allPosts,
    },
  };
}

export async function getStaticPaths() {
  const allPages = await getAllPagesWithSlug();
  return {
    paths: allPages?.map((page) => `/${page.slug}`) || [],
    fallback: true,
  };
}
