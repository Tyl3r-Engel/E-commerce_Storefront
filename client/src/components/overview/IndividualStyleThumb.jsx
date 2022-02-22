/* eslint-disable import/extensions */
import React, { useContext } from 'react';
import { OverviewContext } from '../../Context.js';

export default function IndividualStyleThumb(input) {
  const { style } = input;
  const { setCurrentStyle, currentStyle } = useContext(OverviewContext);
  return (
    <button
      className="modal-button"
      type="button"
      key={style.style_id}
      onClick={() => {
        setCurrentStyle(style);
      }}
    >
      {currentStyle?.style_id === style.style_id && (
        <img
          className="stylesCheckmark"
          src="https://w7.pngwing.com/pngs/715/17/png-transparent-computer-icons-check-mark-icon-design-material-miscellaneous-angle-text.png"
          alt="checkmark"
        />
      )}
      <img
        className="stylesThumbImg"
        src={style.photos[0].thumbnail_url}
        alt="thumbnail"
      />
    </button>
  );
}
