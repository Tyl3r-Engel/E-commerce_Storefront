/* eslint-disable import/extensions */
/* eslint-disable camelcase */
import React from 'react';
import ImageModal from './ImageModal.jsx';

export default function Review(input) {
  const { review } = input;
  const {
    review_id, rating, summary,
    recommend, response, body,
    date, reviewer_name, helpfulness, photos,
  } = review;
  const formatDate = (inputDate) => {
    const year = inputDate.getFullYear();

    let month = (1 + inputDate.getMonth()).toString();
    month = month.length > 1 ? month : `0${month}`;

    let day = inputDate.getDate().toString();
    day = day.length > 1 ? day : `0${day}`;

    return `${month}/${day}/${year}`;
  };

  return (
    <div className="review-container" key={review_id}>
      <div className="review rating">{rating}</div>
      <div className="review reviewerName">{`${reviewer_name},${formatDate(new Date(date))}`}</div>
      <div className="review summary"><strong>{summary}</strong></div>
      <div className="review body">
        {body}
        <br />
        {photos.length > 0
      && (
      <>
        {photos.map((photo) => <ImageModal photo={photo} />)}
      </>
      )}
      </div>
      <div className="review helpfulness">{helpfulness}</div>
      {recommend
      && <div className="review recommend">I recommend this product&#10003;</div>}
      {response
      && <div className="review response">{response}</div>}
      <br />
    </div>
  );
}
