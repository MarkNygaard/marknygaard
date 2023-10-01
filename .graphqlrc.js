require('@next/env').loadEnvConfig('.');

module.exports = {
  schema: {
    'https://graphql.datocms.com': {
      headers: {
        Authorization: process.env.DATOCMS_READONLY_API_TOKEN,
      },
    },
  },
  documents: 'src/**/**/*.gql',
  extensions: {
    codegen: {
      overwrite: true,
      generates: {
        'src/infrastructure/genrated/graphql.ts': {
          plugins: [
            'typescript',
            'typed-document-node',
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
