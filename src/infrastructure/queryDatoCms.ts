import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { print } from 'graphql';

export default async function queryDatoCMS<
  TResult = unknown,
  TVariables = Record<string, any>,
>(
  document: TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables,
  isDraft?: boolean,
): Promise<[TResult | null, Error | null]> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Exclude-Invalid': 'true',
    Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
  };

  if (isDraft) headers['X-Include- Drafts'] = 'true';

  try {
    const res = await fetch('https://graphql.datocms.com/', {
      cache:
        process.env.ENVIRONMENT === 'Development' ? 'no-store' : 'force-cache',
      next: { tags: ['datocms'] },
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: print(document),
        variables,
      }),
    });

    const json = await res.json();

    if (!res.ok) {
      console.error('Network error while querying DatoCMS:', {
        status: res.status,
        statusText: res.statusText,
        body: json,
      });
      return [null, new Error(`Fetch failed: ${res.statusText}`)];
    }

    if (json.errors) {
      console.error('GraphQL errors from DatoCMS:', json.errors);
      return [null, new Error('GraphQL errors occurred')];
    }

    if (!json.data) {
      console.error('No data returned from DatoCMS:', json);
      return [null, new Error('No data returned')];
    }

    return [json.data, null];
  } catch (error) {
    console.error('Unexpected error while querying DatoCMS:', error);
    return [null, error as Error];
  }
}
