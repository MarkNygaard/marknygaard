'use client';

import React, { useEffect, useState } from 'react';
import { Highlight } from 'prism-react-renderer';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
// import { FaRegClipboard, FaRegCopy } from 'react-icons/fa';
import clsx from 'clsx';
import { useMemo } from 'react';
import { useTheme } from 'next-themes';

function usePrismTheme() {
  const lightCodeTheme = require('prism-react-renderer').themes.nightOwlLight;
  const darkCodeTheme = require('prism-react-renderer').themes.nightOwl;

  const { theme } = useTheme();
  const lightModeTheme = lightCodeTheme;
  const darkModeTheme = darkCodeTheme || lightModeTheme;
  const prismTheme = theme === 'light' ? lightModeTheme : darkModeTheme;

  const [finalTheme, setFinalTheme] = useState(prismTheme);

  useEffect(() => {
    setFinalTheme(prismTheme);
  }, [prismTheme]);

  return finalTheme;
}

export default function SyntaxHighlight({
  code,
  language,
  showLineNumbers,
  highlightLines = [],
}: {
  code: string;
  language: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
}) {
  const linesCount = useMemo(() => {
    return code.split(/\r\n|\r|\n/).length;
  }, [code]);

  const currentTheme = usePrismTheme();

  const [isCopied, setIsCopied] = useState(false);

  return (
    <Highlight theme={currentTheme} code={code} language={language}>
      {({
        className,
        style,
        tokens,
        getLineProps,
        getTokenProps,
      }: {
        className: any;
        style: any;
        tokens: any;
        getLineProps: any;
        getTokenProps: any;
      }) => (
        <pre
          className={`group relative whitespace-pre-wrap ${className}`}
          style={style}
        >
          {/* <CopyToClipboard
            onCopy={() => setIsCopied(true)}
            text={code}
            className="absolute top-0 right-0 mt-2 mr-2 p-2 rounded-md bg-[#FBFBFB]/80 dark:bg-[#011627]/80 dark:hover:bg-gray-50 dark:hover:text-gray-700 hover:bg-gray-200 hover:shadow-md text-xl"
          >
            <button type="button" aria-label="Copy to Clipboard">
              {isCopied ? <FaRegClipboard /> : <FaRegCopy />}
            </button>
          </CopyToClipboard> */}
          {tokens.map(({ line, i }: { line: any; i: number }) => {
            const lineProps = getLineProps({ line, key: i });
            return (
              <div
                key={i}
                {...lineProps}
                className={clsx(lineProps.className, {
                  ['bg-white']: highlightLines.includes(i),
                  [`before:content-[attr(data-line-number)] before:pr-3 before:opacity-20`]:
                    showLineNumbers,
                  showLineNumbers,
                })}
                data-line-number={`${i + 1}`.padStart(
                  linesCount.toString().length,
                  ' '
                )}
              >
                {line?.map(({ token, key }: { token: string; key: number }) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
}
