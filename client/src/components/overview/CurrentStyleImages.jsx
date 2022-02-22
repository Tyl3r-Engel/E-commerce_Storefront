import React, { useContext, useState } from 'react';
import { OverviewContext, StyleContext } from '../../Context';

export default function CurrentStyleImages() {
  const {
    allStyles, currentStyle,
  } = useContext(OverviewContext);
  const [
    currentImage, setCurrentImage,
  ] = useState(0);
  console.log(currentImage);
  if (allStyles !== undefined && currentStyle !== undefined && currentImage !== undefined) {
    return (
      <div className="mainImageDiv">
        <img
          className="mainImage"
          src={currentStyle.photos[currentImage].url}
          alt="woof"
        />
        {currentImage > 0 && (
        <div className="leftButton">
          <button
            type="button"
            onClick={() => setCurrentImage((previous) => previous - 1)}
          >
            ←
          </button>
        </div>
        )}
        {currentImage < 5 && (
        <div className="rightButton">
          <button
            type="button"
            onClick={() => setCurrentImage((previous) => previous + 1)}
          >
            →
          </button>
        </div>
        )}
      </div>
    );
  }
  return (
    null
  );
}
