import React, { useContext } from 'react';
import { RatingsContext } from '../../Context';

export default function breakDownFactors(input) {
  const { characteristics } = input.reviewsMetaData;
  const { setCharacteristicsData } = useContext(RatingsContext);

  setCharacteristicsData(() => characteristics);
  return (
    <>
      {characteristics.Size
    && (
      <div className="factorBar-container">
        <p className="factorName">Size</p>
        <input
          type="range"
          min="1"
          max="5"
          value={characteristics.Size.value}
          className="factorBar"
          disabled
        />
        <p className="worstDec">A size too small</p>
        <p className="bestDec">A size too wide</p>
      </div>
    )}
      {characteristics.Width
    && (
      <div className="factorBar-container">
        <p className="factorName">Width</p>
        <input
          type="range"
          min="1"
          max="5"
          value={characteristics.Width.value}
          className="factorBar"
          disabled
        />
        <p className="worstDec">Too narrow</p>
        <p className="bestDec">Too Wide</p>
      </div>
    )}
      {characteristics.Comfort
    && (
      <div className="factorBar-container">
        <p className="factorName">Comfort</p>
        <input
          type="range"
          min="1"
          max="5"
          value={characteristics.Comfort.value}
          className="factorBar"
          disabled
        />
        <p className="worstDec">Uncomfortable</p>
        <p className="bestDec">Perfect</p>
      </div>
    )}
      {characteristics.Quality
    && (
      <div className="factorBar-container">
        <p className="factorName">Quality</p>
        <input
          type="range"
          min="1"
          max="5"
          value={characteristics.Quality.value}
          className="factorBar"
          disabled
        />
        <p className="worstDec">Poor</p>
        <p className="bestDec">Perfect</p>
      </div>
    )}
      {characteristics.Length
    && (
      <div className="factorBar-container">
        <p className="factorName">Length</p>
        <input
          type="range"
          min="1"
          max="5"
          value={characteristics.Length.value}
          className="factorBar"
          disabled
        />
        <p className="worstDec">Runs Short</p>
        <p className="bestDec">Runs Long</p>
      </div>
    )}
      {characteristics.Fit
    && (
      <div className="factorBar-container">
        <p className="factorName">Fit</p>
        <input
          type="range"
          min="1"
          max="5"
          value={characteristics.Fit.value}
          className="factorBar"
          disabled
        />
        <p className="worstDec">Runs tight</p>
        <p className="bestDec">Runs long</p>
      </div>
    )}
    </>
  );
}
