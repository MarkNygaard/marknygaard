import React from 'react';
import BlogRecord from './Sections/Blog/BlogRecord';
import FeaturedRecord from './Sections/Featured/FeaturedRecord';
import CardRecord from './Sections/Card/CardRecord';
import ImageRecord from './Sections/Image/ImageRecord';
import TextImageRecord from './Sections/TextImage/TextImageRecord';
import TextRecord from './Sections/Text/TextRecord';

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
  } else if (details.__typename === 'CardRecord') {
    return <CardRecord details={details} />;
  }
  return <></>;
}
