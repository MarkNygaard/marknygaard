import React from 'react';
import { toNextMetadata } from 'react-datocms';
import PageBlocks from '@Blocks/PageBlocks';
import {
  PageBySlugDocument,
  PageModelContentField,
  PostRecord,
} from 'infrastructure/generated/graphql';
import queryDatoCMS from 'infrastructure/queryDatoCms';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

export const dynamic = 'force-static';

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const slug = (await params).slug;
  const { isEnabled } = await draftMode();
  const data = await queryDatoCMS(PageBySlugDocument, { slug }, isEnabled);

  const seoMetadata = toNextMetadata(data?.page?.seo || []);
  const canonicalUrl = `https://www.marknygaard.dk/${slug}`;

  return {
    ...seoMetadata,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function Page({ params }: Params) {
  const slug = (await params).slug;
  const { isEnabled } = await draftMode();
  const data = await queryDatoCMS(PageBySlugDocument, { slug }, isEnabled);

  if (!data?.page) notFound();
  return (
    <PageBlocks
      blocks={data.page?.content as Array<PageModelContentField>}
      posts={data.allPosts as PostRecord[]}
    />
  );
}
