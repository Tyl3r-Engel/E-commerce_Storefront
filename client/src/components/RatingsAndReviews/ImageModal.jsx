/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';

export default function ImageModal(input) {
  const { photo } = input;
  const { id, url } = photo;
  const [isClicked, setIsClicked] = useState(false);

  return (
    <>
      {isClicked
        ? (
          <div className="modal-container">
            <img
              className="image"
              key={id}
              src={url}
              onClick={() => setIsClicked((prev) => !prev)}
              alt="n/a"
            />
            <button
              className="imageButton"
              type="button"
              onClick={() => setIsClicked((prev) => !prev)}
            >
              close
            </button>
          </div>
        ) : (
          <img
            key={id}
            src={url}
            onClick={() => setIsClicked((prev) => !prev)}
            alt="n/a"
            width="50"
            height="50"
            style={{ padding: '3px' }}
          />
        )}
    </>
  );
}
