import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="dark:text-900 bg-white transition-colors dark:bg-gray-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
