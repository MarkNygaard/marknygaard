import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import NextLink from 'next/link';
import cn from 'classnames';
import Icon from './Icon';
import MobileMenu from './MobileMenu';

function NavItem({ href, text }) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <NextLink href={href}>
      <a
        className={cn(
          isActive
            ? 'font-base text-pine-900 dark:text-gray-200'
            : 'font-light text-pine-800 dark:text-gray-400',
          'hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-md hover:bg-pine-100 dark:hover:bg-gray-900 transition-all'
        )}
      >
        <span className="capsize">{text}</span>
      </a>
    </NextLink>
  );
}

export default function Header({ allPages }) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  return (
    <div className="px-2 container mx-auto">
      <div className="py-6 max-w-5xl mx-auto">
        {/* <Head>{renderMetaTags(metaTags)}</Head> */}

        <div className="flex">
          <div className="flex flex-1 -ml-3">
            <MobileMenu allPages={allPages} />
            {allPages?.map((page) => {
              return (
                <NavItem
                  key={page.id}
                  href={`/${page.slug}`}
                  text={page.name}
                />
              );
            })}
          </div>
          <button
            aria-label="Toggle Dark Mode"
            type="button"
            className="flex items-center justify-center hover:font-bold transition-all rounded-md hover:bg-pine-100 p-1 sm:px-3 sm:py-2 dark:hover:bg-gray-900"
            onClick={() =>
              setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
            }
          >
            {mounted && (
              <div>
                {resolvedTheme === 'dark' ? (
                  <Icon symbol="sun" />
                ) : (
                  <Icon symbol="moon" />
                )}
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
