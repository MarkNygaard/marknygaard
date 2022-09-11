import { GraphQLClient } from 'graphql-request';
import { getSdk } from 'lib/graphql';

export const DATOCMS_ENDPOINT =
  process.env.NODE_ENV == 'production'
    ? 'https://graphql.datocms.com'
    : 'https://graphql.datocms.com/preview';

export const DATOCMS_HEADERS = {
  Authorization: process.env.DATOCMS_API_TOKEN!,
};

export const client = new GraphQLClient(DATOCMS_ENDPOINT, {
  headers: DATOCMS_HEADERS,
});

export const sdk = getSdk(client);
