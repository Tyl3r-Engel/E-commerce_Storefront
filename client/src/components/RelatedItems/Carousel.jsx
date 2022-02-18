// eslint-disable-next-line import/extensions
import React, { useState, useEffect } from 'react';
import RelatedCard from './RelatedCard.jsx';
import OutfitCard from './OutfitCard.jsx';

export default function Carousel({
  products, related, productId, setProductId,
}) {
  return (
    <section className="carousel">
      <div className="cards-container">
        {products
          ? products.map((product, index) => (
            <RelatedCard
              key={productId}
              related
              product={product}
              productId={productId}
              setProductId={setProductId}
            />
          )) : null}
      </div>
    </section>
  );
}
