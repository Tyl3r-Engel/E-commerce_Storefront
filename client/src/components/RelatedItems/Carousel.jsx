import React, { useState, useEffect, useContext } from 'react';
import RelatedCard from './RelatedCard.jsx';
import OutfitCard from './OutfitCard.jsx';
import { RelatedItemsContext } from '../../Context.js';
// import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/fa';
import axios from 'axios';

export default function Carousel() {
  const [allStyles, setAllStyles] = useState({});
  // const [currentPos, setCurrentPos] = useState(0);
  // const [length, setLength] = useState(0);
  // const [related, setRelated] = useState(true);
  // const [scrollable, setScrollable] = useState({right: false, left: false});
  const context = useContext(RelatedItemsContext);
  const products = context;

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
        {/* <div>
          {scrollable.left ?
            <MdArrowBackIos className='left-arrow' onClick={prevCard}/>
            : null
          }
        </div> */}
        <div className="cards-container">
          {products
            ? products.map((product) => (
              <RelatedCard
                product={product}
                key={product.id}
              />
            )) : null}
          <RelatedCard />
        </div>
        {/* <div>
          {scrollable.right ?
            <MdArrowForwardIos className='right-arrow' onClick={nextCard}/>
            : null
          }
        </div> */}
      </section>
    </RelatedItemsContext.Provider>
  );
}
