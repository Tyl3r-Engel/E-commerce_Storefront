import React from 'react';
import StarRating from 'react-ratings-declarative';

export default function AverageRatings(input) {
  const { reviewsMetaData } = input;
  let count = 0;
  let numberOfReviews = 0;
  const ratingValues = Object.values(reviewsMetaData.ratings);
  for (let i = 0; i < ratingValues.length; i += 1) {
    for (let j = parseInt(ratingValues[i], 10); j > 0; j -= 1) {
      // console.log('j -->', j, 'i -->', i + 1);
      count += (i + 1);
    }
    numberOfReviews += parseInt(ratingValues[i], 10);
  }
  const average = (count / numberOfReviews);
  return (
    <>
      <h1>
        <strong>
          {Math.round(10 * average) / 10}
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
