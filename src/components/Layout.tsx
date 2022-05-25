import React from 'react';
import Footer from './Footer';
import Header from './Header';

export default function Layout({ children, allPages }) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black">
      <Header allPages={allPages} />
      <div className="flex-1 container mx-auto px-4 md:py-10 sm:pb-16 pb-6 standalone:pt-36 standalone:md:pt-6">
        <div className="max-w-5xl mx-auto">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
