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

  async function getCurrentReviews(sortType, count) {
    const { data } = await axios.get(`/api/reviews/?product_id=${context.id}&sort=${sortType}&count=${count}`);
    setCurrentReviews(data.results);
  }

  useEffect(() => {
    if (context?.id) {
      getCurrentReviews('newest', 10);
    }
  }, [context]);

  function addMoreReviews() {
    setListLength((preListLength) => preListLength + 2);
  }

  function renderItem(index, key) {
    return (
      <div key={key}>
        <Review review={currentReviews[index]} />
      </div>
    );
  }

  return (
    <>
      {currentReviews.length !== 0
      && (
      <div style={{ overflow: 'auto', maxHeight: 200 }}>
        <ReactList
          // eslint-disable-next-line react/jsx-no-bind
          itemRenderer={renderItem}
          length={listLength}
          type="simple"
        />
      </div>
      )}
      {listLength < currentReviews.length
      && <button type="button" onClick={addMoreReviews}>More Reviews</button>}
    </>
  );
}
