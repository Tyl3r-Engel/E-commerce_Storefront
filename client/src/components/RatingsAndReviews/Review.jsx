import React from 'react';

export default function Review(input) {
  const { review } = input;
  const {
    review_id, rating, summary,
    recommend, response, body,
    date, reviewer_name, helpfulness, photos,
  } = review;

  return (
    <div>
      <div>{rating}</div>
      <div>{`${reviewer_name},${new Date(date)}`}</div>
      <div>{summary}</div>
      <div>{body}</div>
      <div>{helpfulness}</div>
      {recommend
      && <div>{recommend}</div>}
      {response
      && <div>{response}</div>}
    </div>
  );
}
