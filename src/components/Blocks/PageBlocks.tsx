import React from 'react';
import BlogBlock from '@Blocks/Blog/Blog';
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
            return <TextImageBlock key={block.id} {...block} />;
          case 'TextRecord':
            return <TextBlock key={block.id} {...block} />;
          case 'ImageRecord':
            return <ImageBlock key={block.id} {...block} />;
          case 'BlogRecord':
            return <BlogBlock key={block.id} {...block} posts={posts} />;
          case 'FeaturedRecord':
            return <FeaturedBlock key={block.id} {...block} />;
          case 'CardRecord':
            return <CardBlock key={block.id} {...block} />;
          case 'GridRecord':
            return <GridBlock key={block.id} {...block} />;
          default:
            return <></>;
        }
      })}
    </>
  );
}
