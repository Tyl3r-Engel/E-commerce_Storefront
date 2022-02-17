import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-modal';
import { Rating } from 'react-simple-star-rating';

export default function RelatedCard({ product, related, productId, setProductId }) {

  const [rating, setRating] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleRating = (rate) => {
    setRating(rate)
    // other logic
  }

  return (
    <div className='card-container' data-testid={`related-${product.id}`}>
      <CompareModal />
      <div className='card-inner-container'onClick={() => console.log('clicked')}>
        <div className='card-item'>
          <img loading='lazy' className='card-image' alt='related-card' src={'https://media.istockphoto.com/vectors/default-placeholder-fitness-trainer-in-a-tshirt-vector-id981306362?s=612x612'}></img>
        </div>
        <div className='card-item text category'>{product.category.toUpperCase()}</div>
        <div className='card-item text name'>{product.name}</div>
          <div className='card-item text price'>
            <p>${product.default_price}</p>
          </div>
        <div className='card-item text rating'>
          <Rating onClick={handleRating} ratingValue={rating} />
        </div>
      </div>
    </div>
  )
}
