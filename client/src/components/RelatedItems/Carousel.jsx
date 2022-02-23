import React, { useState, useEffect, useContext } from 'react';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft, MdAddToPhotos } from 'react-icons/md';
import RelatedCard from './RelatedCard.jsx';
import OutfitCard from './OutfitCard.jsx';
import { AppContext } from '../../Context.js';

export default function Carousel({ related, setOutfits, outfitProducts }) {
  // const [relatedProduct, setRelatedProduct] = useState({});
  // const [relatedProductsStyle, setRelatedProductsStyle] = useState({});
  const { currentProduct, relatedProducts } = useContext(AppContext);

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

  const [currentPos, setCurrentPos] = useState(0);
  const [length, setLength] = useState(0);
  const [scrollable, setScrollable] = useState({ right: false, left: false });

  // set varibles to determine scrollability
  useEffect(() => {
    if (related) {
      setLength(relatedProducts.length);
    } else {
      setLength(Object.keys(relatedProducts).length);
    }
    setCurrentPos(0);
  }, [relatedProducts]);

  // check to see if arrow buttons appear
  useEffect(() => {
    const buffer = related ? 3 : 2;
    if (currentPos === 0 && currentPos + buffer >= length) {
      setScrollable({ left: false, right: false });
    } else if (currentPos === 0 && currentPos + buffer < length) {
      setScrollable({ left: false, right: true });
    } else if (currentPos !== 0 && currentPos + buffer >= length) {
      setScrollable({ right: false, left: true });
    } else {
      setScrollable({ right: true, left: true });
    }
  }, [currentPos, length]);

  const nextCard = () => {
    setCurrentPos(currentPos >= length - 1 ? length - 1 : currentPos + 1);
  };

  const prevCard = () => {
    setCurrentPos(currentPos <= 0 ? 0 : currentPos - 1);
  };

  const getDefaultStyle = (prod) => {
    prod.styles.results.forEach((style) => {
      if (style['default?'] === true) {
        return style;
      }
    });
    return prod.styles.results[0];
  };

  const saveOutfit = () => {
    if (!allOutfits) {
      const allOutfits = [currentProduct];
    } else {
      allOutfits.push(currentProduct);
    }
    setOutfits(allOutfits);
    window.localStorage.setItem('myThreads', JSON.stringify(allOutfits));
  };

  const deleteOutfit = (id) => {
    const allOutfits = { ...relatedProducts };
    delete allOutfits[id];
    setOutfits(allOutfits);
    window.localStorage.removeItem('myThreads');
    window.localStorage.setItem('myThreads', JSON.stringify(allOutfits));
  };

  if (!relatedProducts) return 'no data';
  if (!Array.isArray(relatedProducts)) return 'fetching data';

  return (
    <section className="carousel" data-testid="carousel-1">
      <div>
        {scrollable.left
          ? <MdKeyboardArrowLeft className="left-arrow" onClick={prevCard} />
          : null}
      </div>
      <div className="cards-container">
        { length !== 0 && related && relatedProducts
          ? relatedProducts.map((product, index) => (
            index >= currentPos || currentPos + 2 >= length
              ? (
                <RelatedCard
                  key={product.id}
                  product={product}
                  related
                />
              )
              : null
          ))
          : null}
        {!related
          ? (
            <div className="empty-card" onClick={() => saveOutfit()}>
              <h2>Add to Outfit</h2>
              <MdAddToPhotos id="add-outfit-btn" />
            </div>
          )
          : null }
        { length !== 0 && !related && outfitProducts
          ? Object.values(outfitProducts).map((product, index) => (
            index >= currentPos || currentPos + 1 >= length
              ? (
                <OutfitCard
                  key={product.id}
                  outfitProducts={outfitProducts}
                  related={false}
                  getDefaultStyle={getDefaultStyle}
                  deleteOutfit={deleteOutfit}
                />
              )
              : null
          ))
          : null}
      </div>
      <div>
        {scrollable.right
          ? <MdKeyboardArrowRight className="right-arrow" onClick={nextCard} />
          : null}
      </div>
    </section>
  );
}
