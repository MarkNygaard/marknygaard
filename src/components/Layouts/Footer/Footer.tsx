import React from 'react';
import Icon from 'components/Icons';

import FooterEmojiAnimation from './FooterEmojiAnimation';

export default function Footer() {
  return (
    <footer className='container mx-auto md:mb-10'>
      <div className='container mx-auto flex flex-col items-center space-y-4 bg-pine-300/80 pb-10 pt-12 font-extralight dark:border dark:border-gray-700/50 dark:bg-zinc-950/90 md:max-w-6xl md:rounded-sm'>
        <ul className='p-4'>
          <FooterEmojiAnimation />
        </ul>
        <ul className='flex p-4'>
          <li className='px-2'>
            <a
              href='https://www.linkedin.com/in/mnleth/'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-pine-600'
            >
              <Icon symbol='linkedin' />
            </a>
          </li>
          <li className='px-2'>
            <a
              href='https://www.facebook.com/mark.nygaard'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-pine-600'
            >
              <Icon symbol='facebook' />
            </a>
          </li>
          <li className='px-2'>
            <a
              href='https://github.com/MarkNygaard'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-pine-600'
            >
              <Icon symbol='github' />
            </a>
          </li>
          <li className='px-2'>
            <a
              href='mailto:mark.nygaard@hotmail.com'
              target='_self'
              rel='noopener noreferrer'
              className='hover:text-pine-600'
            >
              <Icon symbol='mail' />
            </a>
          </li>
        </ul>
        <ul>
          <li>
            &copy; {new Date().getFullYear()} Mark Nygaard. All rights reserved.
          </li>
        </ul>
      </div>
    </footer>
  );
}
