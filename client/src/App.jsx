/* eslint-disable import/extensions */
import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { AppContext, RelatedItemsContext } from './Context';
import Overview from './components/overview/Overview.jsx';
import RelatedItems from './components/RelatedItems/RelatedItems.jsx';
import Questions from './components/QuestionsAndAnswers/Questions.jsx';
import RatingsAndReviews from './components/RatingsAndReviews/RatingsAndReviews.jsx';

function App() {
  const [currentProduct, setCurrentProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState(44388);
  const [productId, setProductId] = useState(44388);

  async function getProduct(newProductId) {
    const { data } = await axios.get(`/api/products/${newProductId}`);
    setCurrentProduct(data);
  }

  async function getRelatedProducts() {
    const { data } = await axios.get(`api/products/${productId}/related`);
    setRelatedProducts(data);
  }

  useEffect(() => {
    getProduct(productId);
    getRelatedProducts(productId);
  }, [productId]);

  const appProvider = useMemo(() => (
    {
      productId, setProductId, currentProduct, relatedProducts, getRelatedProducts,
    }
  ), [productId, setProductId, currentProduct, relatedProducts, getRelatedProducts]);

  return (
    <AppContext.Provider value={appProvider}>
      <Overview />
      <RelatedItems />
      <Questions />
      <RatingsAndReviews />
    </AppContext.Provider>
  );
}

export default App;
