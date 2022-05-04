import { GraphQLClient } from 'graphql-request';
import { getSdk } from 'lib/graphql';

// let endpoint = "https://graphql.datocms.com";

// if (process.env.NEXT_DATOCMS_ENVIRONMENT) {
//   endpoint += `/environments/${process.env.NEXT_DATOCMS_ENVIRONMENT}`;
// }

// if (preview) {
//   endpoint += `/preview`;
// }

export const DATOCMS_ENDPOINT = 'https://graphql.datocms.com';

export const DATOCMS_HEADERS = {
  Authorization: process.env.NEXT_DATOCMS_API_TOKEN!,
};

export const client = new GraphQLClient(DATOCMS_ENDPOINT, {
  headers: DATOCMS_HEADERS,
});

export const sdk = getSdk(client);
