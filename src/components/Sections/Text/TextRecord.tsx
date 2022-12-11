import React from 'react';
import { StructuredText, renderNodeRule } from 'react-datocms';
import { isCode } from 'datocms-structured-text-utils';
import SyntaxHighlight from 'components/SyntaxHighlight';
import MainHeading from 'components/MainHeading';
import cn from 'classnames';
import { motion } from 'framer-motion';

export default function TextRecord({ details }) {
  return (
    <div
      id={details.id}
      className={cn('align-center flex items-center overflow-hidden', {
        'justify-center': details.centerText,
      })}
    >
      <motion.article
        id={details.id}
        initial={details.fadeIn ? { y: 20, opacity: 0 } : { opacity: 1 }}
        animate={details.fadeIn ? { y: 0, opacity: 1 } : { opacity: 1 }}
        transition={details.fadeIn && { duration: 0.5 }}
        className="prose prose-lg col-span-2 grow pr-4 prose-h1:mb-1 prose-a:text-pine-600 hover:prose-a:text-pine-700 dark:prose-invert dark:prose-a:text-gray-500 dark:hover:prose-a:text-gray-400"
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
          renderBlock={({ record }) => {
            if (record.__typename === 'MainHeadingRecord') {
              return <MainHeading record={record}></MainHeading>;
            }
            return null;
          }}
        />
      </motion.article>
    </div>
  );
}
