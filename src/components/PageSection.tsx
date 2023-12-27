import React from 'react';

import BlogRecord from './Sections/Blog/BlogRecord';
import CardRecord from './Sections/Card/CardRecord';
import FeaturedRecord from './Sections/Featured/FeaturedRecord';
import GridRecord from './Sections/Grid/GridRecord';
import ImageRecord from './Sections/Image/ImageRecord';
import TextRecord from './Sections/Text/TextRecord';
import TextImageRecord from './Sections/TextImage/TextImageRecord';

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
    return <ImageRecord details={details} />;
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
