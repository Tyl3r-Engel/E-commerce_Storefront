import React, { useContext, useState } from 'react';
import { OverviewContext } from '../../Context';
import IndividualStyleThumb from './IndividualStyleThumb.jsx';

export default function CurrentStyleThumbs() {
  const { allStyles, currentStyle, setCurrentStyle } = useContext(OverviewContext);
  if (Object.keys(allStyles).length !== 0) {
    return (
      <div>
        <div className="stylesThumbsInd">
          {allStyles.map((style) => (
            <IndividualStyleThumb style={style} key={Math.random() * 1000} />
          ))}
        </div>
      </div>
    );
  }
  return (
    null
  );
}
