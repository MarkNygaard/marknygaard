'use client';

import React, { useState } from 'react';
import nightOwl from 'prism-react-renderer/themes/nightOwl';
import nightOwlLight from 'prism-react-renderer/themes/nightOwlLight';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaRegClipboard, FaRegCopy } from 'react-icons/fa';
import clsx from 'clsx';
import { useMemo } from 'react';
import { useTheme } from 'next-themes';

export default function SyntaxHighlight({
  code,
  language,
  showLineNumbers,
  highlightLines = [],
}) {
  const linesCount = useMemo(() => {
    return code.split(/\r\n|\r|\n/).length;
  }, [code]);

  const { theme } = useTheme();
  const mapTheme = {
    light: nightOwlLight,
    dark: nightOwl,
  };

  const [isCopied, setIsCopied] = useState(false);

  return (
    <Highlight
      {...defaultProps}
      theme={mapTheme[theme]}
      code={code}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`group relative whitespace-pre-wrap ${className}`}
          style={style}
        >
          <CopyToClipboard
            onCopy={() => setIsCopied(true)}
            className="absolute top-0 right-0 mt-2 mr-2 p-2 rounded-md bg-[#FBFBFB]/80 dark:bg-[#011627]/80 dark:hover:bg-gray-50 dark:hover:text-gray-700 hover:bg-gray-200 hover:shadow-md text-xl"
            text={code}
          >
            <button type="button" aria-label="Copy to Clipboard">
              {isCopied ? <FaRegClipboard /> : <FaRegCopy />}
            </button>
          </CopyToClipboard>
          {tokens.map((line, i) => {
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
                {line.map((token, key) => (
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
