import React from 'react';
import BlogRecord from '@Blocks/Blog/Blog';
import CardBlock from '@Blocks/Card/Card';
import FeaturedBlock from '@Blocks/Featured/Featured';
import GridBlock from '@Blocks/Grid/Grid';
import ImageBlock from '@Blocks/Image/Image';
import TextBlock from '@Blocks/Text/Text';
import TextImageBlock from '@Blocks/TextImage/TextImage';
import {
  PageModelContentField,
  PostRecord,
} from 'infrastructure/generated/graphql';

type Props = {
  blocks: Array<PageModelContentField>;
  posts: PostRecord[];
};

export default function PageBlocks({ blocks, posts }: Readonly<Props>) {
  return (
    <>
      {blocks?.map((block) => {
        switch (block.__typename) {
          case 'TextImageRecord':
            return <TextImageBlock {...block} />;
          case 'TextRecord':
            return <TextBlock {...block} />;
          case 'ImageRecord':
            return <ImageBlock {...block} />;
          case 'BlogRecord':
            return <BlogRecord {...block} posts={posts} />;
          case 'FeaturedRecord':
            return <FeaturedBlock {...block} />;
          case 'CardRecord':
            return <CardBlock {...block} />;
          case 'GridRecord':
            return <GridBlock {...block} />;
          default:
            return <></>;
        }
      })}
    </>
  );
}
