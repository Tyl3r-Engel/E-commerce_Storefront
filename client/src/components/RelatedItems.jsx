import React, { useState, useEffect } from 'react';
import Carousel from './Carousel.jsx';

export default function RelatedItems({ products, productId, setProductId }) {
  const [relatedProducts, setRelatedProducts] = useState();

  return (
    <div>
      <h1 style={{color: 'red', textAlign: 'center'}}>Over View</h1>

      <h2 style={{textAlign: 'center'}}>Related Items</h2>
      <Carousel 
        related={true}
        products={products}
        productId={productId}
        setProductId={setProductId}  
      />
      <h2 style={{textAlign: 'center'}}>Your Outfit</h2>
      <Carousel 
        related={false}
        products={products}
        productId={productId}
        setProductId={setProductId}  
      />

      <h1 style={{color: 'red', textAlign: 'center'}}>Reviews and Ratings</h1>
      <h1 style={{color: 'red', textAlign: 'center'}}>Questsions and Answers</h1>
    </div>
  )
}
