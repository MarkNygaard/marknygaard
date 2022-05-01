import React from 'react';
import BlogRecord from './Sections/BlogRecord';
import FeaturedRecord from './Sections/FeaturedRecord';
import GridRecord from './Sections/GridRecord';
import ImageRecord from './Sections/ImageRecord';
import TextImageRecord from './Sections/TextImageRecord';
import TextRecord from './Sections/TextRecord';

export default function PageSection({ details, posts }) {
  if (details.__typename === 'TextImageRecord') {
    return <TextImageRecord details={details} />;
  } else if (details.__typename === 'TextRecord') {
    return <TextRecord details={details} />;
  } else if (details.__typename === 'ImageRecord') {
    return <ImageRecord details={details} />;
  } else if (details.__typename === 'BlogRecord') {
    return <BlogRecord details={details} posts={posts} />;
  } else if (details.__typename === 'FeaturedRecord') {
    return <FeaturedRecord details={details} />;
  } else if (details.__typename === 'GridRecord') {
    return <GridRecord details={details} />;
  }
  return <></>;
}
