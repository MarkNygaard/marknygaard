import React from 'react';
import Alert from './Alert';
import Footer from './Footer';
import Header from './Header';

export default function Layout({
  children,
  allPages,
  preview,
}: {
  preview: boolean;
  children: React.ReactNode;
  allPages: any;
}) {
  return (
    <div
      style={{ WebkitTapHighlightColor: 'transparent' }}
      className="flex min-h-screen flex-col bg-white dark:bg-black"
    >
      {preview ? <Alert preview={preview} /> : null}
      <Header allPages={allPages} />
      <div className="container mx-auto flex-1 px-4 pb-6 sm:pb-16 md:py-10 standalone:pt-36 standalone:md:pt-6">
        <div className="mx-auto max-w-7xl">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
