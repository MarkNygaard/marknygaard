'use client';

import React from 'react';
import { renderNodeRule, StructuredText } from 'react-datocms';
import ImageBlock from '@ui/Image/ImageRecord';
import MainHeading from '@ui/MainHeading/MainHeading';
import clsx from 'clsx';
import SyntaxHighlight from 'components/SyntaxHighlight';
import { isCode } from 'datocms-structured-text-utils';
import { motion } from 'framer-motion';
import {
  ImageRecord,
  MainHeadingRecord,
} from 'infrastructure/generated/graphql';

export default function TextRecord({ details }: any) {
  return (
    <div
      id={details.id}
      className={clsx('align-center flex items-center overflow-hidden', {
        'justify-center': details.centerText,
      })}
    >
      <motion.article
        id={details.id}
        initial={details.fadeIn ? { y: 20, opacity: 0 } : { opacity: 1 }}
        animate={details.fadeIn ? { y: 0, opacity: 1 } : { opacity: 1 }}
        transition={details.fadeIn && { duration: 0.5 }}
        className='prose col-span-2 grow dark:prose-invert prose-h1:mb-1 prose-a:text-pine-600 hover:prose-a:text-pine-700 dark:prose-a:text-gray-500 dark:hover:prose-a:text-gray-400 md:pr-4'
      >
        <StructuredText
          data={details.structuredText}
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
