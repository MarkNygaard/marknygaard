import React from 'react';
import { Image } from 'react-datocms';
import clsx from 'clsx';
import type { FileField } from 'infrastructure/generated/graphql';

import TextRecord from '../Text/TextRecord';

export default function CardRecord({ details }: any) {
  return (
    <div className='flex justify-center'>
      <div
        className={clsx('grid', {
          [`grid-cols-${details.mobileColumns as String}`]:
            details.mobileColumns,
          [`md:grid-cols-${details.tabletColumns as String}`]:
            details.tabletColumns,
          [`xl:grid-cols-${details.desktopColumns as String}`]:
            details.desktopColumns,
          [`gap-${details.gap as String}`]: details.gap,
        })}
      >
        {details.sections.map((section: any) => {
          return (
            <div
              key={section.id}
              className={clsx('relative', {
                [`order-${section.mobilePosition as String}`]:
                  section.mobilePosition,
                [`md:order-${section.tabletPosition as String}`]:
                  section.tabletPosition,
                [`xl:order-${section.desktopPosition as String}`]:
                  section.desktopPosition,
              })}
            >
              {section.__typename === 'CardImageRecord' ? (
                <div
                  key={section.id}
                  className={clsx(
                    'flex shrink-0 self-center overflow-hidden object-fill',
                    {
                      'h-52': details.height === 'Small',
                      'h-96': details.height === 'Medium',
                      'h-132': details.height === 'Large',
                    },
                  )}
                >
                  {/* eslint-disable-next-line jsx-a11y/alt-text */}
                  <Image
                    data={(section.image as FileField).responsiveImage as any}
                    pictureClassName='object-cover'
                  />
                </div>
              ) : section.__typename === 'CardTextRecord' ? (
                <div
                  className={clsx(
                    'flex justify-center overflow-hidden bg-gray-300 p-3',
                    {
                      'h-52': details.height === 'Small',
                      'h-96': details.height === 'Medium',
                      'h-132': details.height === 'Large',
                    },
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
