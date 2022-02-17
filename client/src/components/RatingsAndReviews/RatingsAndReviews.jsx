/* eslint-disable import/extensions */
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import ReactList from 'react-list';
import { AppContext } from '../../Context';
import Review from './Review.jsx';

export default function RatingsAndReviews() {
  const context = useContext(AppContext);
  const [currentReviews, setCurrentReviews] = useState([]);
  const [listLength, setListLength] = useState(2);
  // use a useref to implement line 16 because the helpful
  // or not transfers to the corresponding position in a different sort
  const [sortType, setSortType] = useState('relevant');

  async function getCurrentReviews() {
    const { data } = await axios.get(`/api/reviews/?product_id=${context.id}&sort=${sortType}&count=${500}`);
    // setCurrentReviews([]);
    setCurrentReviews(data.results);
  }

  useEffect(() => {
    if (context?.id) {
      getCurrentReviews();
      setListLength(2);
    }
  }, [context, sortType]);

  function addMoreReviews() {
    setListLength((preListLength) => preListLength + 2);
  }

  const renderItem = (index, key) => (
    <div key={key}>
      <Review review={currentReviews[index]} />
    </div>
  );

  return (
    <div className="ratingsAndReviews-container">
      {currentReviews.length !== 0
      && (
        <>
          <span className="reviews-sortedBy">
            {`${currentReviews.length} reviews, sorted by `}
            <form style={{ display: 'inline' }}>
              <select onChange={(event) => setSortType(event.target.value)}>
                <option value="relevant">Relevant</option>
                <option value="newest">Newest</option>
                <option value="helpful">Helpful</option>
              </select>
            </form>
          </span>

          <div className="reviewList">
            <ReactList
              // eslint-disable-next-line react/jsx-no-bind
              itemRenderer={renderItem}
              length={listLength}
              type="simple"
            />
          </div>

          {listLength < currentReviews.length
          && <button type="button" onClick={addMoreReviews}>More Reviews</button>}
        </>
      )}
      <button type="button">Add A Review</button>
    </div>
  );
}
