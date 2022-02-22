/* eslint-disable import/extensions */
import React, { useContext, useState } from 'react';
import { OverviewContext } from '../../Context';
import ProductImageModal from './ProductImageModal.jsx';

export default function CurrentStyleImages() {
  const {
    allStyles, currentStyle,
  } = useContext(OverviewContext);
  const [
    currentImage, setCurrentImage,
  ] = useState(0);
  if (allStyles !== undefined && currentStyle !== undefined && currentImage !== undefined) {
    return (
      <div className="mainImageDiv">
        <ProductImageModal path={currentStyle.photos[currentImage].url} />
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
