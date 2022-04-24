import Layout from 'components/Layout';
import React from 'react';
import { useRouter } from 'next/router';
import {
  getAllPages,
  getAllPagesWithSlug,
  getPage,
  getAllPosts,
} from '../lib/api';
import ErrorPage from 'next/error';
import PageSection from 'components/PageSection';

export default function Page({ allPages, page, allPosts }) {
  const router = useRouter();

  if (!router.isFallback && !page?.slug) {
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
          <div className="text-4xl font-light pb-5">{page.name}</div>
          {page?.content.map((content, i) => {
            return <PageSection key={i} details={content} posts={allPosts} />;
          })}
        </>
      )}
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
