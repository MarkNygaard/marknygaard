import React from 'react';
import { MainHeadingRecord } from 'infrastructure/generated/graphql';

export default function MainHeading({ title, subtitle }: MainHeadingRecord) {
  return (
    <div>
      <h1 className='text-4xl font-medium'>{title}</h1>
      {subtitle && (
        <div
          className='prose dark:prose-invert prose-h1:mb-1 prose-a:text-pine-600 hover:prose-a:text-pine-700 dark:prose-a:text-gray-500 dark:hover:prose-a:text-gray-400'
          dangerouslySetInnerHTML={{ __html: subtitle }}
        />
      )}
    </div>
  );
}
