import React from 'react';
import StarRating from 'react-ratings-declarative';

export default function AverageRatings(input) {
  const { reviewsMetaData } = input;
  let count = 0;
  let numberOfReviews = 0;
  const ratingValues = Object.values({
    5: reviewsMetaData.ratings['5'] || 0,
    4: reviewsMetaData.ratings['4'] || 0,
    3: reviewsMetaData.ratings['3'] || 0,
    2: reviewsMetaData.ratings['2'] || 0,
    1: reviewsMetaData.ratings['1'] || 0,
  });
  for (let i = 0; i < ratingValues.length; i += 1) {
    for (let j = parseInt(ratingValues[i], 10); j > 0; j -= 1) {
      count += (i + 1);
    }
    numberOfReviews += parseInt(ratingValues[i], 10);
  }

  const average = (Math.round(10 * (count / numberOfReviews)) / 10);
  return (
    <>
      <h1>
        <strong>
          {average}
        </strong>
      </h1>

      <StarRating
        rating={average}
        widgetRatedColors="gold"
        widgetDimensions="15px"
        widgetSpacings="4px"
      >
        <StarRating.Widget />
        <StarRating.Widget />
        <StarRating.Widget />
        <StarRating.Widget />
        <StarRating.Widget />
      </StarRating>
    </>
  );
}
