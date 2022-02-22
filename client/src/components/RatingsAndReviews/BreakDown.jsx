/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext } from 'react';
import { RatingsContext } from '../../Context';

export default function BreakDown(input) {
  const { reviewsMetaData } = input;
  const { setStarSort, starSort } = useContext(RatingsContext);
  const ratingValues = Object.values(reviewsMetaData.ratings);
  let numberOfReviews = 0;
  for (let i = 0; i < ratingValues.length; i += 1) {
    numberOfReviews += parseInt(ratingValues[i], 10);
  }

  return (
    <div key="breakDown">
      {starSort.length !== 0
      && (
        <>
          <button type="button" style={{ display: 'block' }} onClick={() => setStarSort([])}>Clear</button>
          {
          starSort.map((element, index) => (
            <>
              {/* eslint-disable-next-line react/no-array-index-key */}
              <h3 key={index} className="starSortTags">
                {
                `has been selected ${element}`
                }
              </h3>
            </>
          ))
        }
        </>
      )}
      <br />
      <span
        className="progressBars"
        onClick={() => setStarSort((prev) => {
          if (prev.includes(5)) {
            const toBePop = prev;
            const index = toBePop.indexOf(5);
            toBePop.splice(index, 1);
            return [...toBePop];
          }
          return [...prev, 5];
        })}
      >
        {'5 Star: '}
        <progress value={parseInt(ratingValues[4], 10)} max={numberOfReviews} />
      </span>
      <br />
      <span
        className="progressBars"
        onClick={() => setStarSort((prev) => {
          if (prev.includes(4)) {
            const toBePop = prev;
            const index = toBePop.indexOf(4);
            toBePop.splice(index, 1);
            return [...toBePop];
          }
          return [...prev, 4];
        })}
      >
        {'4 Star: '}
        <progress value={parseInt(ratingValues[3], 10)} max={numberOfReviews} />
      </span>
      <br />
      <span
        className="progressBars"
        onClick={() => setStarSort((prev) => {
          if (prev.includes(3)) {
            const toBePop = prev;
            const index = toBePop.indexOf(3);
            toBePop.splice(index, 1);
            return [...toBePop];
          }
          return [...prev, 3];
        })}
      >
        {'3 Star: '}
        <progress value={parseInt(ratingValues[2], 10)} max={numberOfReviews} />
      </span>
      <br />
      <span
        className="progressBars"
        onClick={() => setStarSort((prev) => {
          if (prev.includes(2)) {
            const toBePop = prev;
            const index = toBePop.indexOf(2);
            toBePop.splice(index, 1);
            return [...toBePop];
          }
          return [...prev, 2];
        })}
      >
        {'2 Star: '}
        <progress value={parseInt(ratingValues[1], 10)} max={numberOfReviews} />
      </span>
      <br />
      <span
        className="progressBars"
        onClick={() => setStarSort((prev) => {
          if (prev.includes(1)) {
            const toBePop = prev;
            const index = toBePop.indexOf(1);
            toBePop.splice(index, 1);
            return [...toBePop];
          }
          return [...prev, 1];
        })}
      >
        {'1 Star: '}
        <progress value={parseInt(ratingValues[0], 10)} max={numberOfReviews} />
      </span>
    </div>
  );
}
