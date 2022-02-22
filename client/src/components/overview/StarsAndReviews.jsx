/* eslint-disable react/jsx-one-expression-per-line */
import axios from 'axios';
import React, { useContext, useState } from 'react';
import StarRating from 'react-ratings-declarative';
import { AppContext } from '../../Context';

export default function StarsAndReviews() {
  const context = useContext(AppContext);
  const [currentReviews, setCurrentReviews] = useState({});

  async function getCurrentReviews() {
    if (context.id !== undefined) {
      const { data } = await axios.get(`/api/reviews/meta?product_id=${context.id}`);
      setCurrentReviews(data.ratings);
    }
  }
  if (Object.keys(currentReviews).length === 0) {
    getCurrentReviews();
    return null;
  }
  function totalNumberRatings() {
    let sum = 0;
    for (const key in currentReviews) {
      sum += Number(currentReviews[key]);
    }
    return sum;
  }
  function currentStarRating() {
    const a = currentReviews[1];
    const b = currentReviews[2];
    const c = currentReviews[3];
    const d = currentReviews[4];
    const e = currentReviews[5];
    const r = totalNumberRatings();

    return (1 * a + 2 * b + 3 * c + 4 * d + 5 * e) / (r);
  }
  return (
    <div>

      <div className="review rating">
        <StarRating
          rating={currentStarRating()}
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
      </div>
      <div className="totals">
        <a
          href="#anchor!"
        >
          See all {totalNumberRatings()} reviews
        </a>
      </div>
    </div>
  );
}
