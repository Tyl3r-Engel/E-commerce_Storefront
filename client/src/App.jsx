/* eslint-disable import/extensions */
import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { AppContext } from './Context';
import RatingsAndReviews from './components/RatingsAndReviews/RatingsAndReviews.jsx';

function App() {
  const [currentProduct, setCurrentProduct] = useState({});
  async function getInitProduct() {
    const { data } = await axios.get('/api/products/44388');
    setCurrentProduct(data);
  }
  if (Object.keys(currentProduct).length === 0) {
    getInitProduct();
  }

  return (
    <AppContext.Provider value={currentProduct}>
      <RatingsAndReviews />
    </AppContext.Provider>
  );
}

export default App;
