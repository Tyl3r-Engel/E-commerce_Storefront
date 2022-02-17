/* eslint-disable import/extensions */
/* eslint-disable camelcase */
import React, { useState, useContext } from 'react';
import StarRating from 'react-ratings-declarative';
import axios from 'axios';
import ImageModal from './ImageModal.jsx';
import { AppContext } from '../../Context';

export default function Review(input) {
  const { review } = input;
  const {
    review_id, rating, summary,
    recommend, response, body,
    date, reviewer_name, helpfulness, photos,
  } = review;
  const [hasVoted, setHasVoted] = useState({ state: false, option: '' });
  const context = useContext(AppContext);

  const formatDate = (inputDate) => {
    const year = inputDate.getFullYear();

    let month = (1 + inputDate.getMonth()).toString();
    month = month.length > 1 ? month : `0${month}`;

    let day = inputDate.getDate().toString();
    day = day.length > 1 ? day : `0${day}`;

    return `${month}/${day}/${year}`;
  };

  const createBody = (rawBody) => {
    if (rawBody.length < 100) {
      return rawBody;
    }
    const showBody = rawBody.substring(0, 100);
    const moreBody = rawBody.substring(100);
    let showMoreRef;
    let showMoreButtonRef;

    return (
      <p style={{ display: 'inline' }}>
        {showBody}
        <button
          type="button"
          ref={(_showMoreButtonRef) => {
            (showMoreButtonRef = _showMoreButtonRef);
          }}
          style={{
            display: 'block',
          }}
          onClick={() => {
            showMoreRef.style.display = 'inline';
            showMoreButtonRef.style.display = 'none';
          }}
        >
          Show More
        </button>
        <span
          ref={(_showMoreRef) => {
            (showMoreRef = _showMoreRef);
          }}
          style={{ display: 'none' }}
        >
          {moreBody}
        </span>
      </p>
    );
  };

  const helpfulSubmit = (change) => {
    if (!change) {
      setHasVoted({ state: true, option: 'NO' });
      return;
    }

    async function wasHelpful() {
      const config = {
        url: `/api/reviews/${context.id}/helpful`,
        method: 'PUT',
      };
      await axios(config);
      setHasVoted({ state: true, option: 'YES' });
    }
    wasHelpful();
  };

  return (
    <div className="review-container" key={review_id}>

      <div className="review rating">
        <StarRating
          rating={rating}
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

      <div className="review reviewerName">{`${reviewer_name},`}</div>

      <div className="review date">{formatDate(new Date(date))}</div>

      <div className="review summary"><strong>{summary}</strong></div>

      <div className="review body">
        {createBody(body)}
        <br />
        {photos.length > 0
        && (
        <>
          {photos.map((photo) => <ImageModal key={photo.id} photo={photo} />)}
        </>
        )}
      </div>

      {response
      && (
      <div className="review response">
        Response from seller:
        {response}
      </div>
      )}

      {!hasVoted.state
        ? (
          <div className="review helpfulness">
            <p style={{ display: 'inline' }}>Was this review helpful?</p>
            <button type="button" style={{ display: 'inline' }} onClick={() => { helpfulSubmit(true); }}>YES</button>
            <div style={{ display: 'inline' }}>{`(${helpfulness})`}</div>
            <button type="button" style={{ display: 'inline' }} onClick={() => helpfulSubmit(false)}>NO</button>
          </div>
        ) : (
          <div className="review helpfulness">
            {hasVoted.option === 'YES'
              ? (
                <p style={{ display: 'inline' }}>
                  {`Was this review helpful? ${parseInt(helpfulness, 10) + 1}`}
                </p>
              ) : (
                <p style={{ display: 'inline' }}>
                  {`Was this review helpful? ${parseInt(helpfulness, 10)}`}
                </p>
              )}
          </div>
        )}

      {recommend
      && <div className="review recommend">I recommend this product&#10003;</div>}
      <br />
      <div style={{ backgroundColor: 'black', height: '4px' }} />
      <br />
    </div>
  );
}
