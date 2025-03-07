import React from 'react';
import ImageBlock from '@Blocks/Image/Image';
import TextBlock from '@Blocks/Text/Text';
import VideoBlock from '@Blocks/Video/Video';
import {
  ColumnRecord,
  ImageRecord,
  VideoRecord,
} from 'infrastructure/generated/graphql';

export default function ColumnBlock({ id, column1, column2 }: ColumnRecord) {
  let column1Content;
  switch (column1?.__typename) {
    case 'TextRecord':
      column1Content = <TextBlock {...column1} />;
      break;
    case 'ImageRecord':
      column1Content = <ImageBlock {...(column1 as ImageRecord)} />;
      break;
    case 'VideoRecord':
      column1Content = <VideoBlock {...(column1 as VideoRecord)} />;
      break;
    default:
      column1Content = <></>;
      break;
  }

  let column2Content;
  switch (column2?.__typename) {
    case 'TextRecord':
      column2Content = <TextBlock {...column2} />;
      break;
    case 'ImageRecord':
      column2Content = <ImageBlock {...(column2 as ImageRecord)} />;
      break;
    case 'VideoRecord':
      column2Content = <VideoBlock {...(column2 as VideoRecord)} />;
      break;
    default:
      column2Content = <></>;
      break;
  }

  return (
    <div key={id} className='flex flex-col md:flex-row'>
      <div className='md:w-1/2'>{column1Content}</div>
      <div className='md:w-1/2'>{column2Content}</div>
    </div>
  );
}
