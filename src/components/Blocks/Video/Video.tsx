import { VideoRecord } from 'infrastructure/generated/graphql';
import React from 'react';
import { VideoPlayer } from 'react-datocms';

export default function VideoBlock({ id, video }: VideoRecord) {
  return (
    <div className='relative mx-auto aspect-square max-h-56 md:max-h-72'>
      <VideoPlayer key={id} data={video?.video as any} />
    </div>
  );
}
