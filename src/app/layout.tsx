import DesktopNavigation from '@Modules/Navigation/DesktopNavigation';
import MobileNavigation from '@Modules/Navigation/MobileNavigation';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import clsx from 'clsx';
import Footer from 'components/Footer';
import { Providers } from 'components/Providers';
import { AllPagesDocument } from 'infrastructure/generated/graphql';
import queryDatoCMS from 'infrastructure/queryDatoCms';
import { Inter } from 'next/font/google';
import { draftMode } from 'next/headers';

import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = draftMode();
  const { allPages } = await queryDatoCMS(AllPagesDocument, {}, isEnabled);

  return (
    <html lang='en'>
      <body
        style={{ WebkitTapHighlightColor: 'transparent' }}
        className={clsx(
          'flex min-h-screen flex-col bg-white transition-colors dark:bg-black dark:text-gray-200',
          inter.className,
        )}
      >
        <Providers>
          <DesktopNavigation allPages={allPages} />
          <MobileNavigation allPages={allPages} />
          <main className='container mx-auto flex-1 px-4 pb-6 sm:pb-16 md:py-10 standalone:pt-36 standalone:md:pt-6'>
            <div className='mx-auto max-w-5xl'>{children}</div>
          </main>
          <Footer />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
