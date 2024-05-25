import React from 'react';
import { toNextMetadata } from 'react-datocms';
import { Image } from 'react-datocms';
import { Section } from '@Modules/BlogSections/Section';
import CategoryMenu from 'components/CategoryMenu';
import Comment from 'components/Comment';
// import ViewCounter from 'components/ViewCounter';
import { format } from 'date-fns';
import type { SectionRecord } from 'infrastructure/generated/graphql';
import { PostBySlugDocument } from 'infrastructure/generated/graphql';
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
  const data = await queryDatoCMS(PostBySlugDocument, { slug }, isEnabled);

  return toNextMetadata(data?.post?.seo || []);
}

export default async function Page({ params: { slug } }: Params) {
  const { isEnabled } = draftMode();

  const data = await queryDatoCMS(PostBySlugDocument, { slug }, isEnabled);

  if (!data?.post) notFound();
  return (
    <article>
      <div className='pb-4 sm:grid sm:grid-cols-3 sm:grid-rows-1 sm:gap-2'>
        <div className='flex flex-col justify-between border-[1px] border-pine-300 bg-pine-300 p-5 text-2xl font-light dark:border-gray-800 dark:bg-gray-800 md:text-3xl lg:text-4xl'>
          <div>{data?.post.title}</div>
          <div>
            <div className='text-sm text-gray-500'>
              {format(new Date(data?.post.date), 'MMMM do, yyyy')}
            </div>
          </div>
        </div>
        <div className='relative flex h-36 border-[1px] border-pine-300 dark:border-gray-800 sm:col-span-2 sm:h-60 lg:h-96'>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image
            data={data.post.coverImage?.responsiveImage as any}
            className='object-cover'
            pictureClassName='object-cover'
          />
        </div>
      </div>
      <div className='flex'>
        <div className='w-9/12 pr-3'>
          {data.post?.section.map((FirstLevel) => {
            return (
              <Section key={FirstLevel.id} {...(FirstLevel as SectionRecord)} />
            );
          })}
          <Comment />
        </div>
        <aside className='hidden w-3/12 lg:block'>
          <div className='sticky top-20 space-y-2 divide-y dark:divide-gray-700'>
            {/* <div className="space-y-2 py-5 pl-2">
                  <div className="font-semibold">View Counter</div>
                  <div className="my-auto font-light">
                    <Suspense fallback={<div>Loading...</div>}>
                      <ViewCounter />
                    </Suspense>
                  </div>
                </div> */}
            <div className='space-y-2 py-5 pl-2 text-xl'>
              <div className='mb-4 font-semibold'>Table of Contents</div>
              <CategoryMenu post={data.post} />
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}
