import React from 'react';
import TextRecord from './TextRecord';
import type { FileField } from 'lib/api';
import { Image } from 'react-datocms';

export default function GridContent(props) {
  return (
    <>
      {props.details.sections.map((section) => {
        return (
          <div key={section.id} className="relative">
            {section.__typename === 'ImageRecord' ? (
              <div className="block h-96 shrink-0 self-center overflow-hidden object-fill">
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image
                  data={(section.image as FileField).responsiveImage as any}
                />
              </div>
            ) : section.__typename === 'TextRecord' ? (
              <div className="h-96 bg-gray-300">
                <TextRecord details={section} />
              </div>
            ) : (
              <></>
            )}
          </div>
        );
      })}
    </>
  );
}
