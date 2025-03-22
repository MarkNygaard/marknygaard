'use client';

import { useQuerySubscription } from 'react-datocms/use-query-subscription';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import {
  PageBySlugQuery,
  PageBySlugQueryVariables,
  PageModelContentField,
  PostRecord,
} from 'infrastructure/generated/graphql';

import PageBlocks from './PageBlocks';

export default function RealTimePageBlocks({
  slug,
  initialData,
  token,
  query,
}: {
  readonly slug: string;
  readonly initialData: PageBySlugQuery;
  readonly query: TypedDocumentNode<PageBySlugQuery, PageBySlugQueryVariables>;
  readonly token: string;
}) {
  const { data } = useQuerySubscription({
    query,
    token,
    initialData,
    preview: true,
    ...(slug && { variables: { slug } }),
  });

  if (!data?.page) return <></>;

  return (
    <PageBlocks
      blocks={data.page?.content as Array<PageModelContentField>}
      posts={data.allPosts as PostRecord[]}
    />
  );
}
