'use client';

import React, { useEffect, useState } from 'react';
import { useMemo } from 'react';
import { CopyButton } from '@Primitives/CopyButton';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { Highlight, Language } from 'prism-react-renderer';

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
  language: Language;
  showLineNumbers?: boolean;
  highlightLines?: number[];
}) {
  const linesCount = useMemo(() => {
    return code.split(/\r\n|\r|\n/).length;
  }, [code]);

  const currentTheme = usePrismTheme();

  return (
    <Highlight theme={currentTheme} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`group relative whitespace-pre-wrap ${className}`}
          style={style}
        >
          <CopyButton value={code} />
          {tokens.map((line, i) => {
            const lineProps = getLineProps({ line, key: i });
            return (
              <div
                key={i}
                className={clsx(lineProps.className, {
                  ['bg-white']: highlightLines.includes(i),
                  [`before:pr-3 before:opacity-20 before:content-[attr(data-line-number)]`]:
                    showLineNumbers,
                  showLineNumbers,
                })}
                data-line-number={`${i + 1}`.padStart(
                  linesCount.toString().length,
                  ' ',
                )}
              >
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
}
