import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { AppContext } from './Context';
import Overview from './components/overview/Overview.jsx';
import RelatedItems from './components/RelatedItems/RelatedItems.jsx';
import Questions from './components/QuestionsAndAnswers/Questions.jsx';
import RatingsAndReviews from './components/RatingsAndReviews/RatingsAndReviews.jsx';

function App() {
  const [currentProduct, setCurrentProduct] = useState({});
  const [currentProducts, setCurrentProducts] = useState({});
  const [productId, setProductId] = useState(44388);

  async function getInitProduct() {
    const { data } = await axios.get('/api/products/44388');
    setCurrentProduct(data);
  }

  async function getInitProductArray() {
    const { data } = await axios.get('/api/products');
    setCurrentProducts({ data });
  }

  if (Object.keys(currentProduct).length === 0) {
    getInitProduct();
    getInitProductArray();
  }

  return (
    <AppContext.Provider value={currentProduct}>
      <Overview />
      <RelatedItems
        products={currentProducts.data}
        setProduct={setCurrentProduct}
        productId={productId}
        setProductId={setProductId}
      />
      <Questions />
      <RatingsAndReviews />
    </AppContext.Provider>
  );
}

export default App;
