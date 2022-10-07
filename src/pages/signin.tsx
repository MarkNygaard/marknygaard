import React from 'react';
import { signIn } from 'next-auth/react';
import Comments from 'components/Comments';

export default function signin() {
  return (
    <div>
      <Comments />
    </div>
  );
}
