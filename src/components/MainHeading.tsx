import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function MainHeading({ record }) {
  return (
    <div>
      <h1>{record.title}</h1>
      <ReactMarkdown className="prose">{record.subtitle}</ReactMarkdown>
    </div>
  );
}
