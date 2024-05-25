'use client';

import { Image, renderNodeRule, StructuredText } from 'react-datocms';
import MainHeading from 'components/MainHeading';
import SyntaxHighlight from 'components/SyntaxHighlight';
import { isCode } from 'datocms-structured-text-utils';
import {
  FileField,
  ImageRecord,
  MainHeadingRecord,
  SectionRecord,
} from 'infrastructure/generated/graphql';
import useSectionInView from 'lib/hooks/useSectionInView';

import { ThirdSection } from './ThirdSection';

export function SecondSection({ name, description, section }: SectionRecord) {
  const { ref } = useSectionInView({
    sectionId: name as string,
  });

  return (
    <div ref={ref} id={name ?? ''} className='scroll-mt-[5vh]'>
      <div className='py-2 text-2xl font-medium text-gray-900 dark:text-gray-200'>
        {name}
      </div>
      <div className='prose max-w-none break-words pb-4 dark:prose-invert prose-pre:text-xs prose-img:m-0'>
        <StructuredText
          data={description as any}
          renderBlock={({ record }: any) => {
            switch (record.__typename) {
              case 'ImageRecord': {
                const ImageRecord = record as ImageRecord;
                return (
                  <div className='flex justify-center'>
                    <div className='relative overflow-hidden translate-z-0 dark:rounded-lg'>
                      {/* eslint-disable-next-line jsx-a11y/alt-text */}
                      <Image
                        data={
                          (ImageRecord.image as FileField)
                            .responsiveImage as any
                        }
                      />
                    </div>
                  </div>
                );
              }
              case 'MainHeadingRecord': {
                const MainHeadingRecord = record as MainHeadingRecord;
                return <MainHeading record={MainHeadingRecord}></MainHeading>;
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
      {section?.map((ThirdLevel: any) => {
        return (
          <ThirdSection key={ThirdLevel.id} {...ThirdLevel}></ThirdSection>
        );
      })}
    </div>
  );
}
