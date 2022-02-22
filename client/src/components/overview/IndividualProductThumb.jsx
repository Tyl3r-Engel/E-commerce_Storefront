import React, { useContext } from 'react';
import { StyleContext } from '../../Context';

export default function IndvidualProductThumb(input) {
  const { photo, index } = input;
  const { currentImage } = useContext(StyleContext);
  if (currentImage === index) {
    return (
      <img
        key={index}
        style={{ opacity: 0.2 }}
        className="productThumbsImg"
        src={photo.url}
        alt="otherThumb"
      />
    );
  }
  return (
    <img
      key={index}
      className="productThumbsImg"
      src={photo.url}
      alt="otherThumb"
    />
  );
}
