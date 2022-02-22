import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import RelatedCard from './RelatedCard.jsx';
import OutfitCard from './OutfitCard.jsx';
import { RelatedItemsContext } from '../../Context.js';
// import ScrollMenu from 'react-horizontal-scroll-menu';

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
            ? products.map((product, index) => (
              <RelatedCard
                key={product.id}
                product={product}
                index={index}
              />
            )) : null}
          <RelatedCard />
        </div>
      </section>
    </RelatedItemsContext.Provider>
  );
}
