import React from 'react';
import { StructuredText } from 'react-datocms';

export default function TextRecord({ details }) {
  return (
    <div
      id={details.id}
      className="align-center flex items-center justify-center p-5 overflow-hidden"
    >
      <div className="prose prose-gray sm:w-full">
        <StructuredText data={details.structuredText} />
      </div>
    </div>
  );
}
