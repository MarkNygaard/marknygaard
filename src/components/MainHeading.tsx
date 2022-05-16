import React from 'react';

export default function MainHeading({ record }) {
  return (
    <div>
      <h1>{record.title}</h1>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: record.subtitle }}
      />
    </div>
  );
}
