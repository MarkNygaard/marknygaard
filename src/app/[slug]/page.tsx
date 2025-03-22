import React from 'react';
import { toNextMetadata } from 'react-datocms';
import PageBlocks from '@Blocks/PageBlocks';
import RealTimePageBlocks from '@Blocks/RealTimePageBlocks';
import {
  AllPagesDocument,
  PageBySlugDocument,
  PageModelContentField,
  PostRecord,
} from 'infrastructure/generated/graphql';
import queryDatoCMS from 'infrastructure/queryDatoCms';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

export const dynamicParams = true;

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const data = await queryDatoCMS(AllPagesDocument);

  return data.allPages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const slug = (await params).slug;
  const data = await queryDatoCMS(PageBySlugDocument, { slug });

  const seoMetadata = toNextMetadata(data?.page?.seo || []);
  const canonicalUrl = `https://www.marknygaard.dk/${slug}`;

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
  const { isEnabled } = await draftMode();
  const slug = (await params).slug;
  const data = await queryDatoCMS(PageBySlugDocument, { slug }, isEnabled);

  if (!data?.page) notFound();

  return isEnabled ? (
    <RealTimePageBlocks
      initialData={data}
      token={process.env.DATOCMS_API_TOKEN || ''}
      query={PageBySlugDocument}
    />
  ) : (
    <PageBlocks
      blocks={data.page?.content as Array<PageModelContentField>}
      posts={data.allPosts as PostRecord[]}
    />
  );
}
