import '../styles/globals.css';
import { Inter } from 'next/font/google';
import clsx from 'clsx';
import { Providers } from 'components/Providers';
import Footer from 'components/Footer';
import Header from 'components/Header';
import queryDatoCMS from 'infrastructure/queryDatoCms';
import { AllPagesDocument } from 'infrastructure/genrated/graphql';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await queryDatoCMS(AllPagesDocument);

  return (
    <html lang="en">
      <body
        style={{ WebkitTapHighlightColor: 'transparent' }}
        className={clsx(
          'flex min-h-screen flex-col dark:text-900 bg-white transition-colors dark:bg-black',
          inter.className
        )}
      >
        <Providers>
          <Header allPages={data.allPages} />
          <main className="container mx-auto flex-1 px-4 pb-6 sm:pb-16 md:py-10 standalone:pt-36 standalone:md:pt-6">
            <div className="mx-auto max-w-7xl">{children}</div>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
