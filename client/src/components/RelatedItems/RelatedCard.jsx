import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Rating } from 'react-simple-star-rating';
import { FaStar } from 'react-icons/fa';
import { AppContext } from '../../Context';

Modal.setAppElement('#app');
export default function RelatedCard({ product }) {
  const [rating, setRating] = useState(85);
  const [relatedProduct, setRelatedProduct] = useState({});
  const [relatedProductsStyle, setRelatedProductsStyle] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);
  const { currentProduct, setProductId } = useContext(AppContext);

  async function getRelatedProductStyle(newProduct) {
    const { data } = await axios.get(`api/products/${newProduct}/styles`);
    setRelatedProductsStyle(data);
  }

  async function getRelatedProduct(newProduct) {
    const { data } = await axios.get(`api/products/${newProduct}`);
    setRelatedProduct(data);
  }

  useEffect(() => {
    getRelatedProduct(product);
    getRelatedProductStyle(product);
  }, [product]);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="card-container" data-testid={`related-${relatedProduct.id}`}>
      <button className="card-inner-container">
        <FaStar className="card-actionButton" onClick={() => openModal()} />
        <div className="card-item" onClick={() => setProductId(relatedProduct.id)}><img className="card-image" src={relatedProductsStyle.results?.[0].photos[0].url} /></div>
        <p className="card-item text category" onClick={() => setProductId(relatedProduct.id)}>{relatedProduct.category}</p>
        <p className="card-item text name" onClick={() => setProductId(relatedProduct.id)}>{relatedProduct.name}</p>
        <p className="card-item text price" onClick={() => setProductId(relatedProduct.id)}>
          $
          {relatedProduct.default_price}
        </p>
        <p className="card-item text rating"><Rating onClick={handleRating} ratingValue={rating} /></p>
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Comparison Modal"
      >
        <h2>Item Comparison</h2>
        <button className="card-comparison-closeButton" onClick={closeModal}>close</button>
        <div className="card-comparison-container">
          <div>
            <div>Current Product</div>
          </div>
          <div>
            <div>Characteristics</div>
            <p>blah</p>
            <p>blah</p>
            <p>blah</p>
          </div>
          <div>
            <div>Compared Product</div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
