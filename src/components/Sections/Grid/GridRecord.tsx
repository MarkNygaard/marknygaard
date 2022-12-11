import PageSection from 'components/PageSection';
import React from 'react';
import cn from 'classnames';

export default function GridRecord({ details }) {
  return (
    <div
      className={cn(
        'relative mx-auto mb-24 mt-16 grid max-w-7xl grid-cols-4 gap-x-4 md:grid md:grid-cols-8 lg:mb-48 lg:grid lg:grid-cols-12 lg:gap-x-6',
        {
          hidden: details.showOnMobile === false,
          'md:hidden': details.showOnTablet === false,
          'lg:hidden': details.showOnDesktop === false,
        }
      )}
    >
      {console.log(details)}
      {details?.sections.map((section, i) => {
        return (
          <div
            key={i}
            className={`col-span-${section.spanMobile} md:col-span-${section.spanTablet} lg:col-span-${section.spanDesktop}`}
          >
            {console.log(section)}
            {section?.content.map((content: any, i: any) => {
              return <PageSection key={i} details={content} posts={content} />;
            })}
          </div>
        );
      })}
    </div>
  );
}
