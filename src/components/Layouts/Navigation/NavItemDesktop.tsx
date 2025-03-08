'use client';

import React from 'react';
import { cn } from 'lib/utils';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavItemDesktop({
  href,
  text,
}: {
  href: string;
  text: string;
}) {
  const path = usePathname();
  const isActive = path === href;

  return (
    <NextLink
      href={href}
      className={cn(
        isActive
          ? 'active border-red-500 text-pine-900 transition dark:text-gray-200'
          : 'text-pine-600 transition-all duration-300 ease-out hover:text-pine-900 hover:ease-in dark:text-gray-500 dark:hover:text-gray-100',
        'underlined h-fit text-base font-light',
      )}
    >
      <span className='capsize'>{text}</span>
    </NextLink>
  );
}
