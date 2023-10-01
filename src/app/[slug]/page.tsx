import React from 'react';
import PageSection from 'components/PageSection';
import { toNextMetadata } from 'react-datocms';

import queryDatoCMS from 'infrastructure/queryDatoCms';
import { PageBySlugDocument } from 'infrastructure/generated/graphql';
import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import { Metadata } from 'next';

type Params = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params: { slug },
}: Params): Promise<Metadata> {
  const { isEnabled } = draftMode();
  const data = await queryDatoCMS(PageBySlugDocument, { slug }, isEnabled);

  return toNextMetadata(data?.page?.seo || []);
}

export default async function Page({ params: { slug } }: Params) {
  const { isEnabled } = draftMode();
  const data = await queryDatoCMS(PageBySlugDocument, { slug }, isEnabled);

  if (!data?.page) notFound();
  return (
    <>
      {data?.page.content.map((content: any, i: any) => {
        return <PageSection key={i} details={content} posts={data.allPosts} />;
      })}
    </>
  );
}
