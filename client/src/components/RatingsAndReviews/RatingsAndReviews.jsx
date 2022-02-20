/* eslint-disable import/extensions */
import axios from 'axios';
import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import ReactList from 'react-list';
import { AppContext, RatingsContext } from '../../Context';
import Ratings from './Ratings.jsx';
import Review from './Review.jsx';
import WriteReviewModal from './WriteReviewModal.jsx';

export default function RatingsAndReviews() {
  const context = useContext(AppContext);
  const [currentReviews, setCurrentReviews] = useState([]);
  const [listLength, setListLength] = useState(2);
  const [sortType, setSortType] = useState('relevant');
  const [starSort, setStarSort] = useState([]);
  const [characteristicsData, setCharacteristicsData] = useState({});
  const [newReviewModalOpen, setNewReviewModalOpen] = useState(false);

  const getCurrentReviews = async () => {
    const { data } = await axios.get(`/api/reviews/?product_id=${context.id}&sort=${sortType}&count=${500}`);
    setCurrentReviews(data.results);
  };

  const sortByStars = () => {
    const sortedByStars = currentReviews
      .filter((element) => starSort.includes(parseInt(element.rating, 10)));
    setCurrentReviews(sortedByStars);
  };

  useEffect(() => {
    if (context?.id) {
      getCurrentReviews();
      setListLength(2);
    }
  }, [context, sortType, starSort]);

  const addMoreReviews = () => {
    if (listLength + 2 > currentReviews.length) {
      setListLength((preListLength) => preListLength + 1);
      return;
    }
    setListLength((preListLength) => preListLength + 2);
  };

  const renderItem = (index, key) => (
    <div key={key}>
      <Review
        review={currentReviews[index]}
        sortType={sortType}
          // eslint-disable-next-line react/jsx-no-bind
        getCurrentReviews={getCurrentReviews}
      />
    </div>
  );

  if (starSort.length !== 0) {
    if (!currentReviews.every((element) => starSort.includes(parseInt(element.rating, 10)))) {
      sortByStars();
    }
  }

  const providerValue = useMemo(() => (
    {
      productId: context.id, setStarSort, starSort, setCharacteristicsData,
    }
  ), [context.id, setStarSort, starSort, setCharacteristicsData]);

  return (
    <div className="ratingsAndReviews-container">
      {newReviewModalOpen
      && (
        <WriteReviewModal
          characteristicsData={characteristicsData}
          newReviewModalOpen={newReviewModalOpen}
          setNewReviewModalOpen={setNewReviewModalOpen}
          productId={context.id}
        />
      )}
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
      <button type="button" onClick={() => { setNewReviewModalOpen(true); }}>Add A Review</button>
      <RatingsContext.Provider value={providerValue}>
        <Ratings />
      </RatingsContext.Provider>
    </div>
  );
}
