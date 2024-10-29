import { toNextMetadata } from 'react-datocms';
import PageBlocks from '@Blocks/PageBlocks';
import {
  HomePageDocument,
  PageModelContentField,
  PostRecord,
} from 'infrastructure/generated/graphql';
import queryDatoCMS from 'infrastructure/queryDatoCms';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

export async function generateMetadata(): Promise<Metadata> {
  const { isEnabled } = await draftMode();
  const data = await queryDatoCMS(HomePageDocument, {}, isEnabled);

  return toNextMetadata(data?.page?.seo || []);
}

export default async function Home() {
  const { isEnabled } = await draftMode();

  const data = await queryDatoCMS(HomePageDocument, {}, isEnabled);

  if (!data?.page) notFound();
  return (
    <PageBlocks
      blocks={data.page?.content as Array<PageModelContentField>}
      posts={data.allPosts as PostRecord[]}
    />
  );
}
