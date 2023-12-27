import React from 'react';
import clsx from 'clsx';
import { PageRecord } from 'infrastructure/generated/graphql';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

function NavItem({ href, text }: { href: string; text: string }) {
  const path = usePathname();
  const isActive = path === href;

  return (
    <NextLink
      href={href}
      className={clsx(
        isActive
          ? 'active border-pine-900 text-pine-900 transition dark:text-gray-100'
          : 'text-pine-600 transition-all duration-300 ease-out hover:text-pine-900 hover:ease-in dark:text-gray-500 dark:hover:text-gray-100',
        'font-base underlined hidden p-1 sm:mx-5 sm:my-3 md:inline-block md:text-base lg:text-lg'
      )}
    >
      <span className="capsize">{text}</span>
    </NextLink>
  );
}

export default function DesktopNavigation({ allPages }: any) {
  return (
    <div className="-ml-3 md:flex flex-1 md:flex-initial hidden">
      {allPages?.map((page: PageRecord) => {
        return (
          <NavItem
            key={page.id}
            href={`/${page.slug}`}
            text={page.name as string}
          />
        );
      })}
    </div>
  );
}
