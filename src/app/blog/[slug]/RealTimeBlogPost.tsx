'use client';

import { useQuerySubscription } from 'react-datocms/use-query-subscription';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import {
  PostBySlugQuery,
  PostBySlugQueryVariables,
} from 'infrastructure/generated/graphql';

import BlogPostContent from './BlogPostContent';

export default function RealTimeBlogPost({
  slug,
  initialData,
  token,
  query,
}: {
  readonly slug: string;
  readonly initialData: PostBySlugQuery;
  readonly token: string;
  readonly query: TypedDocumentNode<PostBySlugQuery, PostBySlugQueryVariables>;
}) {
  const { data } = useQuerySubscription({
    query,
    token,
    initialData,
    preview: true,
    variables: { slug },
  });

  if (!data?.post) return <></>;

  return <BlogPostContent data={data} />;
}
