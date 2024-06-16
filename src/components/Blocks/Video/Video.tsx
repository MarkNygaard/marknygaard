import { VideoRecord } from 'infrastructure/generated/graphql';
import React from 'react';
import { VideoPlayer } from 'react-datocms';

export default function VideoBlock({ id, video }: VideoRecord) {
  return (
    <div
      className='mx-auto h-full max-h-[500px] max-w-full md:max-h-[800px] lg:max-h-[1000px]'
      style={{ aspectRatio: video?.video?.width / video?.video?.height }}
    >
      <div className='h-full max-h-full'>
        <VideoPlayer
          key={id}
          data={video?.video as any}
          style={{
            height: '100%',
          }}
        />
      </div>
    </div>
  );
}
