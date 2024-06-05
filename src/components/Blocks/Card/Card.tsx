import React from 'react';
import { Image } from 'react-datocms';
import TextBlock from '@Blocks/Text/Text';
import clsx from 'clsx';
import type { CardRecord, FileField } from 'infrastructure/generated/graphql';

export default function CardBlock({
  mobileColumns,
  tabletColumns,
  desktopColumns,
  gap,
  sections,
  height,
}: CardRecord) {
  return (
    <div className='flex justify-center'>
      <div
        className={clsx('grid', {
          [`grid-cols-${mobileColumns as String}`]: mobileColumns,
          [`md:grid-cols-${tabletColumns as String}`]: tabletColumns,
          [`xl:grid-cols-${desktopColumns as String}`]: desktopColumns,
          [`gap-${gap as String}`]: gap,
        })}
      >
        {sections.map((section: any) => {
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
                      'h-52': height === 'Small',
                      'h-96': height === 'Medium',
                      'h-132': height === 'Large',
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
                      'h-52': height === 'Small',
                      'h-96': height === 'Medium',
                      'h-132': height === 'Large',
                    },
                  )}
                >
                  <TextBlock {...section} />
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
