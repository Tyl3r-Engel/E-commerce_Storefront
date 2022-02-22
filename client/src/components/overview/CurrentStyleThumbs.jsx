import React, { useContext } from 'react';
import { OverviewContext } from '../../Context';
// eslint-disable-next-line import/extensions
import IndividualStyleThumb from './IndividualStyleThumb.jsx';

export default function CurrentStyleThumbs() {
  const { allStyles } = useContext(OverviewContext);
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
