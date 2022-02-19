/* eslint-disable import/extensions */
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { RatingsContext } from '../../Context';
import AverageRatings from './AverageRating.jsx';
import BreakDown from './BreakDown.jsx';

export default function Ratings() {
  const { productId } = useContext(RatingsContext);
  const [reviewsMetaData, setReviewsMetaData] = useState();

  const getMetaData = async () => {
    const { data } = await axios.get(`/api/reviews/meta/?product_id=${productId}`);
    setReviewsMetaData(data);
  };

  useEffect(() => {
    if (productId) {
      getMetaData();
    }
  }, [productId]);

  return (
    <div>
      {reviewsMetaData
      && (
        <div className="ratings-container">
          <div className="ratings-summary">
            <AverageRatings reviewsMetaData={reviewsMetaData} />
          </div>
          <div className="breakDown">
            <BreakDown reviewsMetaData={reviewsMetaData} />
          </div>
        </div>
      )}
    </div>
  );
}
