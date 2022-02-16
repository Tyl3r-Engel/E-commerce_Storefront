import React, { useState, useEffect } from 'react'
import RelatedCard from './RelatedCard.jsx';
import OutfitCard from './OutfitCard.jsx';

export default function Carousel({ products, related, productId, setProductId }) {

  return (
    <section className='carousel'>
      <div className='cards-container'>
        {products ? 
          products.map((product, index) => {
           return (<RelatedCard 
                    key={productId}
                    related={true}
                    product={product}
                    productId={productId}
                    setProductId={setProductId}  
                  />) 
          }) : null}
      </div>
    </section>
  );
}