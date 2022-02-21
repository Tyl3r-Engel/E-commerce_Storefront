import React, { useState, useContext } from 'react';
import RelatedCard from './RelatedCard.jsx';
import OutfitCard from './OutfitCard.jsx';
import { RelatedItemsContext } from '../../Context.js';
import axios from 'axios';

export default function Carousel() {
  const [allStyles, setAllStyles] = useState({});
  const context = useContext(RelatedItemsContext);
  const products = context;

  if (!products) return 'no data';
  if (!Array.isArray(products)) return 'not an array';

  async function getStyles() {
    const { data } = await axios.get(`/api/products/${44388}/styles`);
    setAllStyles(data);
  }

  if (Object.keys(allStyles).length === 0 && context !== undefined) {
    getStyles();
  }

  return (
    <RelatedItemsContext.Provider value={allStyles}>
      <section className="carousel">
        <div className="cards-container">
          {products
            ? products.map((product) => (
              <RelatedCard
                product={product}
                // key={productId}
                // related
                // product={product}
                // productId={productId}
                // setProductId={setProductId}
              />
            )) : null}
          <RelatedCard />
        </div>
      </section>
    </RelatedItemsContext.Provider>
  );
}

// { products, related, productId, setProductId }

// key={product.id}
// related
// product={product}
// productId={product.id}
