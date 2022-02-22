import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Rating } from 'react-simple-star-rating';
import { RelatedItemsContext } from '../../Context';
import { FaStar } from 'react-icons/fa';

export default function RelatedCard({ product }) {
  const [rating, setRating] = useState(0);
  const [allStyles, setAllStyles] = useState({});
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const context = useContext(RelatedItemsContext);

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

  Modal.setAppElement('#app');

  const handleRating = (rate) => {
    setRating(rate);
  };

  if (!product) return null;
  async function getStyles() {
    const { data } = await axios.get(`/api/products/${product.id}/styles`);
    setAllStyles(data);
  }

  if (Object.keys(allStyles).length === 0 && context !== undefined) {
    getStyles();
  }

  const handleRelatedCardClick = async () => {
    // await setProductId(productId);
    // document.getElementById('header').scrollIntoView();
    console.log(clicked);
  };

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <RelatedItemsContext.Provider>
      <div className="card-container" data-testid={`related-${product.id}`}>
        <button className="card-inner-container">
          <FaStar className="card-actionButton" onClick={() => openModal()} />
          <div className="card-item"><img className="card-image" src={allStyles.results?.[0].photos[0].url} /></div>
          <p className="card-item text category">{product.category.toUpperCase()}</p>
          <p className="card-item text name">{product.name}</p>
          <p className="card-item text price">${product.default_price}</p>
          <p className="card-item text rating"><Rating onClick={handleRating} ratingValue={rating} /></p>
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Comparison Modal"
        >
          <h2>Item Comparison</h2>
          <button className='card-comparison-closeButton' onClick={closeModal}>close</button>
          <div className='card-comparison-container'>
            <div>
              <div>Current Product</div>
              <img className="card-comparison-image" src={allStyles.results?.[0].photos[0].url} />
            </div>
            <div>
              <div>Characteristics</div>
              <p>blah</p>
              <p>blah</p>
              <p>blah</p>
            </div>
            <div>
              <div>Compared Product</div>
              <img className="card-comparison-image" src={context.results?.[0].photos[0].url} />
            </div>
          </div>
        </Modal>
      </div>
    </RelatedItemsContext.Provider>
  );
}
