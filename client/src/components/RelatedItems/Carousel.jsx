import React, { useState, useEffect, useContext } from 'react';
// import { BiLeftArrow, BiRightArrow } from 'react-icons';
import axios from 'axios';
import RelatedCard from './RelatedCard.jsx';
import OutfitCard from './OutfitCard.jsx';
import { AppContext } from '../../Context.js';

export default function Carousel() {
  // const [relatedProduct, setRelatedProduct] = useState({});
  // const [relatedProductsStyle, setRelatedProductsStyle] = useState({});
  const { relatedProducts } = useContext(AppContext);

  // async function getRelatedProductStyle(newProduct) {
  //   const { data } = await axios.get(`api/products/${newProduct}/styles`);
  //   setRelatedProductsStyle(data);
  // }

  // async function getRelatedProduct(newProduct) {
  //   const { data } = await axios.get(`api/products/${newProduct}`);
  //   setRelatedProduct(data);
  // }

  // getRelatedProduct(productId);
  // getRelatedProductStyle(productId);

  // const [currentPos, setCurrentPos] = useState(0);
  // const [length, setLength] = useState(0);
  // const [related, setRelated] = useState(true);
  // const [scrollable, setScrollable] = useState({right: false, left: false});
  // const products = context;

  // set varibles to determine scrollability
  // useEffect(() => {
  //   if (related) {
  //     setLength(products.length);
  //   } else {
  //     setLength(Object.keys(products).length);
  //   }
  //   setCurrentPos(0);
  // }, [products]);

  // check to see if arrow buttons appear
  // useEffect(() => {
  //   let buffer = related ? 3 : 2;
  //   if (currentPos === 0 && currentPos + buffer >= length) {
  //     setScrollable({left: false, right: false});
  //   } else if (currentPos === 0 && currentPos + buffer < length) {
  //     setScrollable({left: false, right: true});
  //   } else if (currentPos !== 0 && currentPos + buffer >= length) {
  //     setScrollable({right: false, left: true});
  //   } else {
  //     setScrollable({right: true, left: true});
  //   }
  // }, [currentPos, length]);

  // const nextCard = () => {
  //   setCurrentPos(currentPos >= length - 1 ? length - 1 : currentPos + 1);
  // };

  // const prevCard = () => {
  //   setCurrentPos(currentPos <= 0 ? 0 : currentPos - 1);
  // };

  if (!relatedProducts) return 'no data';
  if (!Array.isArray(relatedProducts)) return 'fetching data';

  return (
    <section className="carousel">
      {/* <div>
        {scrollable.left
          ? <button className="left-arrow" onClick={prevCard} />
          : null}
      </div> */}
      <div className="cards-container">
        {relatedProducts
          ? relatedProducts.map((product) => (
            <RelatedCard
              product={product}
              key={product}
            />
          )) : null}
      </div>
      {/* <div>
        {scrollable.right
          ? <button className="right-arrow" onClick={nextCard} />
          : null}
      </div> */}
    </section>
  );
}
