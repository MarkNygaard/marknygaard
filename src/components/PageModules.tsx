import React from 'react';
import ImageBlock from '@ui/Image/ImageRecord';

import BlogRecord from './Modules/Blog/BlogRecord';
import CardRecord from './Modules/Card/CardRecord';
import FeaturedRecord from './Modules/Featured/FeaturedRecord';
import GridRecord from './Modules/Grid/GridRecord';
import TextRecord from './Modules/Text/TextRecord';
import TextImageRecord from './Modules/TextImage/TextImageRecord';

export default function PageSection({
  details,
  posts,
}: {
  details: any;
  posts: any;
}) {
  if (details.__typename === 'TextImageRecord') {
    return <TextImageRecord {...details} />;
  } else if (details.__typename === 'TextRecord') {
    return <TextRecord details={details} />;
  } else if (details.__typename === 'ImageRecord') {
    return <ImageBlock {...details} />;
  } else if (details.__typename === 'BlogRecord') {
    return <BlogRecord details={details} posts={posts} />;
  } else if (details.__typename === 'FeaturedRecord') {
    return <FeaturedRecord details={details} />;
  } else if (details.__typename === 'CardRecord') {
    return <CardRecord details={details} />;
  } else if (details.__typename === 'GridRecord') {
    return <GridRecord {...details} />;
  }
  return <></>;
}
