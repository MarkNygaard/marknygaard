'use client';

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
import useSectionInView from 'lib/hooks/useSectionInView';

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
  const { ref } = useSectionInView({
    sectionId: name as string,
  });

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
    <div
      key={id}
      ref={ref}
      id={name ?? ''}
      className='scroll-mt-[9vh]'
      style={indentationStyle}
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
              case 'ImageRecord': {
                const ImageRecord = record as ImageRecord;
                return <ImageBlock {...ImageRecord} />;
              }
              case 'MainHeadingRecord': {
                const MainHeadingRecord = record as MainHeadingRecord;
                return <MainHeading {...MainHeadingRecord} />;
              }
              case 'TextImageRecord': {
                const TextImageRecord = record as TextImageRecord;
                return <TextImageBlock {...TextImageRecord} />;
              }
              case 'VideoRecord': {
                const VideoRecord = record as VideoRecord;
                return <VideoBlock {...VideoRecord} />;
              }
              case 'ColumnRecord': {
                const ColumnRecord = record as ColumnRecord;
                return <ColumnBlock {...ColumnRecord} />;
              }
              default:
                return null;
            }
          }}
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
        />
      </div>
      <div>
        {section?.map((nestedSection) => {
          return (
            <Section
              key={nestedSection.id}
              {...nestedSection}
              level={level + 1}
            />
          );
        })}
      </div>
    </div>
  );
}
