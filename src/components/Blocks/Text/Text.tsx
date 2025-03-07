'use client';

import React from 'react';
import { renderNodeRule, StructuredText } from 'react-datocms';
import ImageBlock from '@Blocks/Image/Image';
import MainHeading from '@Blocks/MainHeading/MainHeading';
import SyntaxHighlight from '@Primitives/SyntaxHighlight';
import clsx from 'clsx';
import { isCode } from 'datocms-structured-text-utils';
import { motion } from 'framer-motion';
import {
  ImageRecord,
  MainHeadingRecord,
  TextRecord,
} from 'infrastructure/generated/graphql';

export default function TextBlock({
  id,
  centerText,
  fadeIn,
  fadeInDelay,
  structuredText,
}: TextRecord) {
  return (
    <div
      className={clsx('align-center flex items-center overflow-hidden', {
        'justify-center': centerText,
      })}
    >
      <motion.article
        id={id}
        initial={fadeIn ? { y: 20, opacity: 0 } : { opacity: 1 }}
        animate={fadeIn ? { y: 0, opacity: 1 } : { opacity: 1 }}
        transition={fadeIn && { duration: 0.5, delay: fadeInDelay ?? 0 }}
        className='prose col-span-2 grow dark:prose-invert prose-h1:mb-1 prose-a:text-pine-600 hover:prose-a:text-pine-700 dark:prose-a:text-gray-500 dark:hover:prose-a:text-gray-400 md:pr-4'
      >
        <StructuredText
          data={structuredText as any}
          customNodeRules={[
            renderNodeRule(isCode, ({ node, key }) => {
              return (
                <SyntaxHighlight
                  key={key}
                  code={node.code}
                  language={node.language || 'unknown'}
                  highlightLines={node.highlight}
                  showLineNumbers={node.code.split(/\n/).length > 10}
                />
              );
            }),
          ]}
          renderBlock={({ record }: any) => {
            switch (record.__typename) {
              case 'ImageRecord': {
                const ImageRecord = record as ImageRecord;
                return <ImageBlock {...ImageRecord} />;
              }
              case 'MainHeadingRecord': {
                const MainHeadingRecord = record as MainHeadingRecord;
                return <MainHeading {...MainHeadingRecord} />;
              }
              default:
                return null;
            }
          }}
        />
      </motion.article>
    </div>
  );
}
