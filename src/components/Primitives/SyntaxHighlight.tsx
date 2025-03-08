'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { CopyButton } from '@Primitives/CopyButton';
import { cn } from 'lib/utils';
import { useTheme } from 'next-themes';
import { Highlight, Language } from 'prism-react-renderer';

function usePrismTheme() {
  const lightCodeTheme = require('prism-react-renderer').themes.nightOwlLight;
  const darkCodeTheme = require('prism-react-renderer').themes.nightOwl;

  const { theme } = useTheme();
  const lightModeTheme = lightCodeTheme;
  const darkModeTheme = darkCodeTheme || lightModeTheme;
  const prismTheme = theme === 'light' ? lightModeTheme : darkModeTheme;

  const [finalTheme, setFinalTheme] = useState<typeof prismTheme | null>(null);

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
  const linesCount = useMemo(() => code.split(/\r\n|\r|\n/).length, [code]);

  const currentTheme = usePrismTheme();
  const [hydratedStyle, setHydratedStyle] =
    useState<React.CSSProperties | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setHydratedStyle(currentTheme?.plain ?? {});
    setIsHydrated(true);
  }, [currentTheme]);

  return (
    <Highlight
      theme={currentTheme || { plain: {}, styles: [] }}
      code={code}
      language={language}
    >
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`group relative whitespace-pre-wrap ${className}`}
          style={hydratedStyle ?? {}}
        >
          <CopyButton value={code} />
          {tokens.map((line, i) => {
            const lineProps = getLineProps({ line, key: i });
            return (
              <div
                key={i}
                className={cn(lineProps.className, {
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
                  <span
                    key={key}
                    {...getTokenProps({ token })}
                    style={isHydrated ? getTokenProps({ token }).style : {}} // Avoid mismatch
                  />
                ))}
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
}
