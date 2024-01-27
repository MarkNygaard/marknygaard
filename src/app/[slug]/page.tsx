import React from 'react';
import { toNextMetadata } from 'react-datocms';
import PageSection from 'components/PageModules';
import { PageBySlugDocument } from 'infrastructure/generated/graphql';
import queryDatoCMS from 'infrastructure/queryDatoCms';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

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
