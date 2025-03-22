import React from 'react';
import { toNextMetadata } from 'react-datocms';
import {
  AllPostsDocument,
  PostBySlugDocument,
} from 'infrastructure/generated/graphql';
import queryDatoCMS from 'infrastructure/queryDatoCMS';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import BlogPostContent from './BlogPostContent';
import RealTimeBlogPost from './RealTimeBlogPost';

export const dynamicParams = true;

export async function generateStaticParams() {
  const data = await queryDatoCMS(AllPostsDocument);

  return data.allPosts.map((page) => ({
    slug: page.slug,
  }));
}

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const slug = (await params).slug;
  const data = await queryDatoCMS(PostBySlugDocument, { slug });

  const seoMetadata = toNextMetadata(data?.post?.seo || []);
  const canonicalUrl = `https://www.marknygaard.dk/blog/${slug}`;

  return {
    ...seoMetadata,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
    },
  };
}

export default async function Page({ params }: Params) {
  const slug = (await params).slug;
  const { isEnabled } = await draftMode();

  const data = await queryDatoCMS(PostBySlugDocument, { slug }, isEnabled);

  if (!data?.post) notFound();

  return isEnabled ? (
    <RealTimeBlogPost
      slug={slug}
      initialData={data}
      token={process.env.DATOCMS_API_TOKEN || ''}
      query={PostBySlugDocument}
    />
  ) : (
    <BlogPostContent data={data} />
  );
}
