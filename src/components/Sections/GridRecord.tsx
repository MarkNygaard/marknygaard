import React from 'react';
import classNames from 'classnames';
import type { FileField } from 'lib/graphql';
import { Image } from 'react-datocms';
import TextRecord from './TextRecord';

export default function GridRecord({ details }) {
  return (
    <div className="flex justify-center">
      <div
        className={classNames('grid', {
          [`grid-cols-${details.mobileColumns as String}`]:
            details.mobileColumns,
          [`md:grid-cols-${details.tabletColumns as String}`]:
            details.tabletColumns,
          [`xl:grid-cols-${details.desktopColumns as String}`]:
            details.desktopColumns,
          [`gap-${details.gap as String}`]: details.gap,
        })}
      >
        {details.sections.map((section) => {
          return (
            <div
              key={section.id}
              className={classNames('relative', {
                [`order-${section.mobilePosition as String}`]:
                  section.mobilePosition,
                [`md:order-${section.tabletPosition as String}`]:
                  section.tabletPosition,
                [`xl:order-${section.desktopPosition as String}`]:
                  section.desktopPosition,
              })}
            >
              {section.__typename === 'GridImageRecord' ? (
                <div
                  key={section.id}
                  className={classNames(
                    'flex shrink-0 self-center overflow-hidden object-fill',
                    {
                      'h-52': details.height === 'Small',
                      'h-96': details.height === 'Medium',
                      'h-132': details.height === 'Large',
                    }
                  )}
                >
                  {/* eslint-disable-next-line jsx-a11y/alt-text */}
                  <Image
                    data={(section.image as FileField).responsiveImage as any}
                    pictureClassName="object-cover"
                  />
                </div>
              ) : section.__typename === 'GridTextRecord' ? (
                <div
                  className={classNames(
                    'bg-gray-300 overflow-hidden justify-center flex p-3',
                    {
                      'h-52': details.height === 'Small',
                      'h-96': details.height === 'Medium',
                      'h-132': details.height === 'Large',
                    }
                  )}
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
