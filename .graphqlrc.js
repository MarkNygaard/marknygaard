require('@next/env').loadEnvConfig('.');

module.exports = {
  schema: {
    'https://graphql.datocms.com': {
      headers: {
        Authorization: process.env.DATOCMS_API_TOKEN,
      },
    },
  },
  documents: 'src/**/**/*.gql',
  extensions: {
    codegen: {
      overwrite: true,
      generates: {
        'src/lib/graphql.ts': {
          plugins: [
            'typescript',
            'typescript-graphql-request',
            'typescript-operations',
          ],
          config: {
            dedupeFragments: true,

            pureMagicComment: true,
            exportFragmentSpreadSubTypes: true,
            namingConvention: 'keep',
          },
        },
      },
    },
  },
};
