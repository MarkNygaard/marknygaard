import React from 'react';
import { draftMode } from 'next/headers';

import MainHeading from 'components/MainHeading';
import SyntaxHighlight from 'components/SyntaxHighlight';
import ViewCounter from 'components/ViewCounter';
import { toNextMetadata } from 'react-datocms';

import type {
  FileField,
  ImageRecord,
  MainHeadingRecord,
} from 'infrastructure/generated/graphql';
import { StructuredText, Image, renderNodeRule } from 'react-datocms';
import { isCode } from 'datocms-structured-text-utils';
import { format } from 'date-fns';
import Comment from 'components/Comment';
import queryDatoCMS from 'infrastructure/queryDatoCms';
import { PostBySlugDocument } from 'infrastructure/genrated/graphql';
import { notFound } from 'next/navigation';
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
  const data = await queryDatoCMS(PostBySlugDocument, { slug }, isEnabled);

  return toNextMetadata(data?.post?.seo || []);
}

export default async function Page({ params: { slug } }: Params) {
  const { isEnabled } = draftMode();

  const data = await queryDatoCMS(PostBySlugDocument, { slug }, isEnabled);

  if (!data?.post) notFound();
  return (
    <>
      <article>
        <div className="pb-4 sm:grid sm:grid-cols-3 sm:grid-rows-1 sm:gap-2">
          <div className="h-full items-center border-[1px] border-pine-300 bg-pine-300 p-5 text-2xl font-light dark:border-gray-800 dark:bg-gray-800 md:text-3xl lg:text-4xl">
            {data?.post.title}
          </div>
          <div className="relative flex h-36 border-[1px] border-pine-300 dark:border-gray-800 sm:col-span-2 sm:h-60 lg:h-96">
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image
              data={data.post.coverImage?.responsiveImage as any}
              className="object-cover"
              pictureClassName="object-cover"
            />
          </div>
        </div>
        <div className="flex">
          <div className="w-full pr-3 lg:w-9/12">
            <div className="prose max-w-none pb-4 dark:prose-invert prose-pre:text-xs prose-img:m-0">
              <StructuredText
                data={data?.post.content}
                renderBlock={({ record }: any) => {
                  switch (record.__typename) {
                    case 'ImageRecord':
                      const ImageRecord = record as ImageRecord;
                      return (
                        <div className="flex justify-center">
                          {/* eslint-disable-next-line jsx-a11y/alt-text */}
                          <Image
                            data={
                              (ImageRecord.image as FileField)
                                .responsiveImage as any
                            }
                          />
                        </div>
                      );
                    case 'MainHeadingRecord':
                      const MainHeadingRecord = record as MainHeadingRecord;
                      return (
                        <MainHeading record={MainHeadingRecord}></MainHeading>
                      );
                  }
                }}
                customNodeRules={[
                  renderNodeRule(isCode, ({ node, key }) => {
                    return (
                      <SyntaxHighlight
                        key={key}
                        code={node.code}
                        language={node.language || 'unknown'}
                        highlightLines={node.highlight}
                        showLineNumbers={node.code.split(/\n/).length > 10}
                      />
                    );
                  }),
                ]}
              />
            </div>
            <Comment />
          </div>
          <aside className="hidden w-3/12 space-y-2 divide-y lg:block">
            <div className="py-5 pl-2 text-sm text-gray-500">
              {format(new Date(data?.post.date), 'MMMM do, yyyy')}
            </div>
            <div className="space-y-2 py-5 pl-2">
              <div className="font-semibold">Author</div>
              <div className="flex">
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image
                  data={
                    (data?.post.author?.picture as FileField)
                      .responsiveImage as any
                  }
                />
                <div className="my-auto px-4 font-light">
                  {data?.post.author?.name}
                </div>
              </div>
            </div>
            <div className="space-y-2 py-5 pl-2">
              <div className="font-semibold">Category</div>
              <div className="my-auto font-light">
                {data?.post.category?.name}
              </div>
            </div>
            <div className="space-y-2 py-5 pl-2">
              <div className="font-semibold">View Counter</div>
              <div className="my-auto font-light">
                <ViewCounter slug={data?.post.slug as string} />
              </div>
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}
