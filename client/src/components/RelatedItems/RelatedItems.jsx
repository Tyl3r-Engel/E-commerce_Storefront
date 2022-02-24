import React, { useState, useEffect, useContext } from 'react';
import Carousel from './Carousel.jsx';
import { AppContext } from '../../Context';

export default function RelatedItems() {
  const [outfits, setOutfits] = useState([]);
  const { currentProduct } = useContext(AppContext);

  // create useState for savedOutfits
  // set 'JSON.parse(window.localStorage.getItem('myThreads')' to be the initial value
  // useEffect watches over savedOutfits
  // make add/delete in carousel using setSavedOutfits

  useEffect(() => {
    const savedOutfits = JSON.parse(window.localStorage.getItem('myThreads'));
    savedOutfits ? setOutfits(savedOutfits) : null;
  }, [currentProduct.id]);

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Related Items</h2>
      <Carousel
        related
      />
      <h2 style={{ textAlign: 'center' }}>Your Outfit</h2>
      <Carousel
        related={false}
        outfitProducts={outfits}
        setOutfits={setOutfits}
      />
    </div>
  );
}
