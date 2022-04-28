import React from 'react';
import GridContent from './GridContent';

export default function GridRecord({ details }) {
  return (
    <div>
      {details.gap === '0' ? (
        <>
          {details.columns === '1' ? (
            <div className="grid grid-cols-1">
              <GridContent details={details} />
            </div>
          ) : details.columns === '2' ? (
            <div className="grid grid-cols-2">
              <GridContent details={details} />
            </div>
          ) : details.columns === '3' ? (
            <div className="grid grid-cols-3">
              <GridContent details={details} />
            </div>
          ) : details.columns === '4' ? (
            <div className="grid grid-cols-4">
              <GridContent details={details} />
            </div>
          ) : null}
        </>
      ) : details.gap === '2' ? (
        <>
          {details.columns === '1' ? (
            <div className="grid grid-cols-1 gap-2">
              <GridContent details={details} />
            </div>
          ) : details.columns === '2' ? (
            <div className="grid grid-cols-2 gap-2">
              <GridContent details={details} />
            </div>
          ) : details.columns === '3' ? (
            <div className="grid grid-cols-3 gap-2">
              <GridContent details={details} />
            </div>
          ) : details.columns === '4' ? (
            <div className="grid grid-cols-4 gap-2">
              <GridContent details={details} />
            </div>
          ) : null}
        </>
      ) : details.gap === '4' ? (
        <>
          {details.columns === '1' ? (
            <div className="grid grid-cols-1 gap-4">
              <GridContent details={details} />
            </div>
          ) : details.columns === '2' ? (
            <div className="grid grid-cols-2 gap-4">
              <GridContent details={details} />
            </div>
          ) : details.columns === '3' ? (
            <div className="grid grid-cols-3 gap-4">
              <GridContent details={details} />
            </div>
          ) : details.columns === '4' ? (
            <div className="grid grid-cols-4 gap-4">
              <GridContent details={details} />
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
