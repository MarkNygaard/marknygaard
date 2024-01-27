import React from 'react';
import clsx from 'clsx';
import PageSection from 'components/PageModules';
import { GridFragmentFragment } from 'infrastructure/generated/graphql';

export default function GridRecord({
  showOnMobile,
  showOnTablet,
  showOnDesktop,
  sections,
}: GridFragmentFragment) {
  return (
    <div
      className={clsx(
        'relative mx-auto grid max-w-7xl grid-cols-4 gap-x-4 md:grid md:grid-cols-8 lg:mb-48 lg:grid lg:grid-cols-12 lg:gap-x-6',
        {
          hidden: showOnMobile === false,
          'md:hidden': showOnTablet === false,
          'lg:hidden': showOnDesktop === false,
        }
      )}
    >
      {sections?.map((section, i) => {
        return (
          <div
            key={i}
            className={`col-span-${section.spanMobile} md:col-span-${section.spanTablet} lg:col-span-${section.spanDesktop}`}
          >
            {section?.content.map((content, i) => {
              return <PageSection key={i} details={content} posts={content} />;
            })}
          </div>
        );
      })}
    </div>
  );
}
