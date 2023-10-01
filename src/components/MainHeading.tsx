import React from 'react';

export default function MainHeading({ record }: any) {
  return (
    <div>
      <h1 className="font-semibold">{record.title}</h1>
      <div
        className="prose prose-lg prose-h1:mb-1 prose-a:text-pine-600 hover:prose-a:text-pine-700 dark:prose-invert dark:prose-a:text-gray-500 dark:hover:prose-a:text-gray-400"
        dangerouslySetInnerHTML={{ __html: record.subtitle }}
      />
    </div>
  );
}
