/* eslint-disable import/extensions */
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { RatingsContext } from '../../Context';
import AverageRatings from './AverageRating.jsx';
import BreakDown from './BreakDown.jsx';
import BreakDownFactors from './BreakDownFactors.jsx';

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
          <div className="recommendations">
            <span>
              {
                Math.round(10 * (
                  parseInt(reviewsMetaData.recommended.true, 10)
                / (parseInt(reviewsMetaData.recommended.true, 10)
                + parseInt(reviewsMetaData.recommended.false, 10))
                ) * 10)
              }
              % of reviews recommend this product
            </span>
          </div>
          <div className="breakDownFactors">
            <div>
              <BreakDownFactors reviewsMetaData={reviewsMetaData} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
