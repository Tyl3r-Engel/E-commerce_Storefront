import React, { useContext, useState } from 'react';
import { OverviewContext } from '../../Context';
import IndvidualProductThumb from './IndividualProductThumb.jsx';

export default function SelectedStyleThumbs() {
  const { currentStyle } = useContext(OverviewContext);
  if (currentStyle !== undefined) {
    return (
      <div>
        {currentStyle.photos.map((photo, index) => (
          <IndvidualProductThumb photo={photo} index={index} key={Math.random() * 1000} />
        ))}
      </div>
    );
  }
  return (
    null
  );
}
