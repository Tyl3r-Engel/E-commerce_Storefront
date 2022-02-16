import React, { useState, useEffect } from 'react';
import Carousel from './Carousel.jsx';

export default function RelatedItems({ products, productId, setProductId }) {
  const [relatedProducts, setRelatedProducts] = useState();

  return (
    <div>
      <h1 style={{color: 'red'}}>Over View</h1>

      <h2>Related Items</h2>
      <Carousel 
        related={true}
        products={products}
        productId={productId}
        setProductId={setProductId}  
      />
      <h2>RelatedItems</h2>
      <Carousel 
        related={false}
        products={products}
        productId={productId}
        setProductId={setProductId}  
      />

      <h1 style={{color: 'red'}}>Reviews and Ratings</h1>
      <h1 style={{color: 'red'}}>Questsions and Answers</h1>
    </div>
  )
}
