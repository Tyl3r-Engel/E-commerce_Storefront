import React, { useState, useContext } from 'react';
import Carousel from './Carousel.jsx';

export default function RelatedItems({ products, productId, setProductId }) {
  const [relatedProducts, setRelatedProducts] = useState();

  console.log('products', products);

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Related Items</h2>
      <Carousel
        related
        products={products}
        productId={productId}
        setProductId={setProductId}

      />
      <h2 style={{ textAlign: 'center' }}>Your Outfit</h2>
      <Carousel
        related={false}
        products={products}
        productId={productId}
        setProductId={setProductId}
      />
    </div>
  );
}
