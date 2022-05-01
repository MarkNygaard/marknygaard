import React from 'react';
import classNames from 'classnames';
import type { FileField } from 'lib/api';
import { Image } from 'react-datocms';
import TextRecord from './TextRecord';

export default function GridRecord({ details }) {
  return (
    <div>
      <div
        className={classNames('grid', {
          [`grid-cols-${details.columns}`]: details.columns,
          [`gap-${details.gap}`]: details.gap,
          'w-1/2': details.fullWidth === false,
        })}
      >
        {details.sections.map((section) => {
          return (
            <div key={section.id} className="relative h-">
              {section.__typename === 'ImageRecord' ? (
                <div
                  className={classNames(
                    'block shrink-0 self-center overflow-hidden object-fill',
                    {
                      'h-52': details.height === 'Small',
                      'h-96': details.height === 'Medium',
                      'h-[33rem]': details.height === 'Large',
                    }
                  )}
                >
                  {/* eslint-disable-next-line jsx-a11y/alt-text */}
                  <Image
                    data={(section.image as FileField).responsiveImage as any}
                  />
                </div>
              ) : section.__typename === 'TextRecord' ? (
                <div
                  className={classNames('bg-gray-300', {
                    'h-52': details.height === 'Small',
                    'h-96': details.height === 'Medium',
                    'h-[33rem]': details.height === 'Large',
                  })}
                >
                  <TextRecord details={section} />
                </div>
              ) : (
                <></>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
