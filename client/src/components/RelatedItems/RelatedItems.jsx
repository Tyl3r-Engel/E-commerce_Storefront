import React, { useContext } from 'react';
import { RelatedItemsContext } from '../../Context.js';
import Carousel from './Carousel.jsx';

export default function RelatedItems() {
  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Related Items</h2>
      <Carousel />
      <h2 style={{ textAlign: 'center' }}>Your Outfit</h2>
      <Carousel />
    </div>
  );
}
