/* eslint-disable import/extensions */
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { RatingsContext } from '../../Context';
import AverageRatings from './AverageRating.jsx';
import BreakDown from './BreakDown.jsx';
import BreakDownFactors from './BreakDownFactors.jsx';

export default function Ratings() {
  const { productId, setCharacteristicsData } = useContext(RatingsContext);
  const [reviewsMetaData, setReviewsMetaData] = useState();

  const getMetaData = async (callback) => {
    const { data } = await axios.get(`/api/reviews/meta/?product_id=${productId}`);
    if (Object.keys(data.ratings).length === 0 && Object.keys(data.recommended).length === 0) {
      callback(() => data.characteristics);
      document.getElementsByClassName('ratings-summary').innerHTML = '';
      return;
    }
    setReviewsMetaData(data);
    callback(() => data.characteristics);
  };

  useEffect(() => {
    if (productId) {
      getMetaData(setCharacteristicsData);
    }
  }, [productId, setCharacteristicsData]);

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
            {/* eslint-disable-next-line no-nested-ternary */}
            {reviewsMetaData.recommended.true > 0 && reviewsMetaData.recommended.false > 0
              ? (
                Math.round(10 * (
                  parseInt(reviewsMetaData.recommended.true, 10)
                / (parseInt(reviewsMetaData.recommended.true, 10)
                + parseInt(reviewsMetaData.recommended.false, 10))
                ) * 10)
              ) : (
                reviewsMetaData.recommended.true > 0 ? (
                  100
                ) : (
                  0
                )
              )}
            % of reviews recommend this product
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
