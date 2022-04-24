import React from 'react';
import { StructuredText } from 'react-datocms';

export default function TextRecord({ details }) {
  return (
    <article className="grow prose dark:prose-invert pr-4 prose-h1:mb-1 prose-a:text-pine-600 hover:prose-a:text-pine-700 dark:hover:prose-a:text-pine-500">
      <StructuredText data={details.structuredText} />
    </article>
  );
}
