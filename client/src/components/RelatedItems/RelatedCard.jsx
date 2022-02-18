import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-modal';
import { Rating } from 'react-simple-star-rating';

export default function RelatedCard({
  product, related, productId, setProductId,
}) {
  const [rating, setRating] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState({});

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleRelatedCardClick = async () => {
    await setProductId(productId);
    document.getElementById('header').scrollIntoView();
  };

  async function getProductPhoto() {
    const { data } = await axios.get('api/products/styles');
    setCurrentPhoto({ data });
  }

  return (
    <div className="card-container" data-testid={`related-${product.id}`}>
      {/* <CompareModal /> */}
      <div className="card-inner-container" onClick={() => handleRelatedCardClick()}>
        <div className="card-item">
          <img loading="lazy" className="card-image" alt="related-card" src="https://media.istockphoto.com/vectors/default-placeholder-fitness-trainer-in-a-tshirt-vector-id981306362?s=612x612" />
        </div>
        <div className="card-item text category">{product.category.toUpperCase()}</div>
        <div className="card-item text name">
          {product.name}
        </div>
        <div className="card-item text price">
          <p>
            $
            {product.default_price}
          </p>
        </div>
        <div className="card-item text rating">
          <Rating onClick={handleRating} ratingValue={rating} />
        </div>
      </div>
    </div>
  );
}
