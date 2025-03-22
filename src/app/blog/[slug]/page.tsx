import React from 'react';
import { toNextMetadata } from 'react-datocms';
import { Section } from '@Blocks/Section/Section';
import SectionMenu from '@Blocks/Section/SectionMenu';
import Comment from '@Primitives/Comment';
import ResponsiveImage from '@Primitives/ResponsiveImage';
// import ViewCounter from 'components/ViewCounter';
import { format } from 'date-fns';
import type { SectionRecord } from 'infrastructure/generated/graphql';
import { PostBySlugDocument } from 'infrastructure/generated/graphql';
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
  return (
    <article>
      <div className='pb-4 sm:grid sm:grid-cols-3 sm:grid-rows-1 sm:gap-2'>
        <div className='flex flex-col justify-between border-[1px] border-pine-300 bg-pine-300 p-5 text-2xl font-light dark:border-gray-800 dark:bg-gray-800 md:text-3xl lg:text-4xl'>
          <div>{data?.post.title}</div>
          <div>
            <div className='text-sm text-gray-600 dark:text-gray-500'>
              {format(new Date(data?.post.date), 'MMMM do, yyyy')}
            </div>
          </div>
        </div>
        <div className='relative flex aspect-[2/1.004] border-[1px] border-pine-300 dark:border-gray-800 sm:col-span-2'>
          {data.post.coverImage && (
            <ResponsiveImage coverImage={data.post.coverImage} />
          )}
        </div>
      </div>
      <div className='flex'>
        <div className='w-full md:w-9/12 md:pr-3'>
          {data.post?.section.map((FirstLevel) => {
            return (
              <Section key={FirstLevel.id} {...(FirstLevel as SectionRecord)} />
            );
          })}
          <Comment />
        </div>
        <aside className='hidden w-3/12 lg:block'>
          <div className='sticky top-24 space-y-2 divide-y dark:divide-gray-700'>
            {/* <div className="space-y-2 py-5 pl-2">
                  <div className="font-semibold">View Counter</div>
                  <div className="my-auto font-light">
                    <Suspense fallback={<div>Loading...</div>}>
                      <ViewCounter />
                    </Suspense>
                  </div>
                </div> */}
            <div className='py-5 pl-2 text-xl'>
              <div className='my-1 font-semibold'>Table of Contents</div>
              <SectionMenu post={data.post} />
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}
