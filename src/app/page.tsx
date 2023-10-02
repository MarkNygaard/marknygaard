import PageSection from 'components/PageSection';
import { notFound } from 'next/navigation';
import { HomePageDocument } from 'infrastructure/generated/graphql';
import queryDatoCMS from 'infrastructure/queryDatoCms';
import { draftMode } from 'next/headers';
import { Metadata } from 'next';
import { toNextMetadata } from 'react-datocms';

export async function generateMetadata(): Promise<Metadata> {
  const { isEnabled } = draftMode();
  const data = await queryDatoCMS(HomePageDocument, {}, isEnabled);

  return toNextMetadata(data?.page?.seo || []);
}

export default async function Home() {
  const { isEnabled } = draftMode();

  const data = await queryDatoCMS(HomePageDocument, {}, isEnabled);

  if (!data?.page) notFound();
  return (
    <>
      {data.page?.content.map((content: any, i: any) => {
        return <PageSection key={i} details={content} posts={data.allPosts} />;
      })}
    </>
  );
}
