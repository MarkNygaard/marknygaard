import React from 'react';
import { renderNodeRule, StructuredText } from 'react-datocms';
import ColumnBlock from '@Blocks/Column/Column';
import ImageBlock from '@Blocks/Image/Image';
import MainHeading from '@Blocks/MainHeading/MainHeading';
import TextImageBlock from '@Blocks/TextImage/TextImage';
import VideoBlock from '@Blocks/Video/Video';
import SyntaxHighlight from '@Primitives/SyntaxHighlight';
import { isCode } from 'datocms-structured-text-utils';
import {
  ColumnRecord,
  ImageRecord,
  MainHeadingRecord,
  SectionRecord,
  TextImageRecord,
  VideoRecord,
} from 'infrastructure/generated/graphql';

import SectionClient from './SectionClient';

interface SectionProps extends SectionRecord {
  level?: number;
}

export function Section({
  id,
  name,
  description,
  section,
  level = 0,
}: SectionProps) {
  // Define an indentation style based on the level
  const indentationStyle = {
    paddingLeft: `${level > 0 ? 15 : 0}px`,
  };

  // Define heading size based on the level
  const headingSizes = [
    'text-2xl',
    'text-xl',
    'text-lg',
    'text-base',
    'text-sm',
  ];
  const headingSize = headingSizes[level] || 'text-2xl';

  return (
    <SectionClient
      id={id}
      name={name}
      level={level}
      indentationStyle={indentationStyle}
    >
      {name && (
        <div
          className={`mb-2 pt-4 font-semibold text-gray-900 dark:border-gray-800 dark:text-gray-100 ${headingSize}`}
        >
          {name}
        </div>
      )}
      <div className='prose max-w-none break-words pb-2 dark:prose-invert prose-pre:text-xs prose-img:m-0'>
        <StructuredText
          data={description as any}
          renderBlock={({ record }: any) => {
            switch (record.__typename) {
              case 'ImageRecord':
                return <ImageBlock {...(record as ImageRecord)} />;
              case 'MainHeadingRecord':
                return <MainHeading {...(record as MainHeadingRecord)} />;
              case 'TextImageRecord':
                return <TextImageBlock {...(record as TextImageRecord)} />;
              case 'VideoRecord':
                return <VideoBlock {...(record as VideoRecord)} />;
              case 'ColumnRecord':
                return <ColumnBlock {...(record as ColumnRecord)} />;
              default:
                return null;
            }
          }}
          customNodeRules={[
            renderNodeRule(isCode, ({ node, key }) => (
              <SyntaxHighlight
                key={key}
                code={node.code}
                language={node.language || 'unknown'}
                highlightLines={node.highlight}
                showLineNumbers={node.code.split(/\n/).length > 10}
              />
            )),
          ]}
        />
      </div>
      <div>
        {section?.map((nestedSection) => (
          <Section
            key={nestedSection.id}
            {...nestedSection}
            level={level + 1}
          />
        ))}
      </div>
    </SectionClient>
  );
}
