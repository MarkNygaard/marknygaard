'use client';

import { Image, renderNodeRule, StructuredText } from 'react-datocms';
import MainHeading from 'components/MainHeading';
import SyntaxHighlight from 'components/SyntaxHighlight';
import { isCode } from 'datocms-structured-text-utils';
import { FileField, ImageRecord, MainHeadingRecord, SectionRecord } from 'infrastructure/generated/graphql';
import useSectionInView from 'lib/hooks/useSectionInView';

import { SecondSection } from './SecondSection';


export function Section({ name, description, section }: SectionRecord) {
  const { ref } = useSectionInView({
    sectionId: name as string,
  });

  return (
    <div ref={ref} id={name ?? ""} className="scroll-mt-[5vh]">
      {name && (
        <div className="mb-4 pt-4 text-2xl font-semibold text-gray-900 dark:border-gray-800 dark:text-gray-100">
          {name}
        </div>
      )}
      <div className="prose max-w-none pb-4 dark:prose-invert prose-pre:text-xs prose-img:m-0">
        <StructuredText
                data={description as any}
                renderBlock={({ record }: any) => {
                  switch (record.__typename) {
                    case 'ImageRecord': {
                      const ImageRecord = record as ImageRecord;
                      return (
                        <div className="flex justify-center">
                          <div className='relative dark:rounded-lg overflow-hidden translate-z-0'>
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
                      return (
                        <MainHeading record={MainHeadingRecord}></MainHeading>
                      );
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
        {section?.map((SecondLevel) => {
          return (
            <SecondSection
              key={SecondLevel.id}
              {...SecondLevel}
            ></SecondSection>
          );
        })}
      </div>
    </div>
  );
}
