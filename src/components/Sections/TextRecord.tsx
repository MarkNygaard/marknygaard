import React from 'react';
import { StructuredText, renderNodeRule } from 'react-datocms';
import { isCode } from 'datocms-structured-text-utils';
import SyntaxHighlight from 'components/SyntaxHighlight';

export default function TextRecord({ details }) {
  return (
    <div
      id={details.id}
      className="align-center flex items-center justify-center p-5 overflow-hidden"
    >
      <div className="prose prose-gray sm:w-full">
        <StructuredText
          data={details.structuredText}
          customNodeRules={[
            renderNodeRule(isCode, ({ node, key }) => {
              return (
                <SyntaxHighlight
                  key={key}
                  code={node.code}
                  language={node.language || 'unknown'}
                  highlightLines={node.highlight}
                  showLineNumbers={node.code.split(/\n/).length > 10}
                />
              );
            }),
          ]}
        />
      </div>
    </div>
  );
}
