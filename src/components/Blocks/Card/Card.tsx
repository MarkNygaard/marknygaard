import React from 'react';
import { SRCImage } from 'react-datocms';
import TextBlock from '@Blocks/Text/Text';
import type { CardRecord } from 'infrastructure/generated/graphql';
import { cn } from 'lib/utils';

export default function CardBlock({
  mobileColumns,
  tabletColumns,
  desktopColumns,
  gap,
  sections,
  height,
}: CardRecord) {
  const heightClass = height
    ? {
        Small: 'h-52',
        Medium: 'h-96',
        Large: 'h-132',
      }[height]
    : '';

  return (
    <div className='flex justify-center'>
      <div
        className={cn('grid', {
          [`grid-cols-${mobileColumns as String}`]: mobileColumns,
          [`md:grid-cols-${tabletColumns as String}`]: tabletColumns,
          [`xl:grid-cols-${desktopColumns as String}`]: desktopColumns,
          [`gap-${gap as String}`]: gap,
        })}
      >
        {sections.map((section) => {
          const commonClasses = cn('relative', {
            [`order-${section.mobilePosition as String}`]:
              section.mobilePosition,
            [`md:order-${section.tabletPosition as String}`]:
              section.tabletPosition,
            [`xl:order-${section.desktopPosition as String}`]:
              section.desktopPosition,
          });

          const renderContent = (section: any) => {
            switch (section.__typename) {
              case 'CardImageRecord':
                return <SRCImage data={section.image.responsiveImage} />;
              case 'CardTextRecord':
                return <TextBlock {...section} />;
              default:
                return null;
            }
          };

          return (
            <div
              key={section.id}
              className={cn(
                commonClasses,
                {
                  'flex shrink-0 self-center overflow-hidden object-fill':
                    section.__typename === 'CardImageRecord',
                  'flex justify-center overflow-hidden bg-gray-300 p-3':
                    section.__typename === 'CardTextRecord',
                },
                heightClass,
              )}
            >
              {renderContent(section)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
