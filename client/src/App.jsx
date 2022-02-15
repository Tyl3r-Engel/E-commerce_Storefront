import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { AppContext } from './Context';
import Questions from './Questions And Answers/Questions.jsx';

function App() {
  const [currentProduct, setCurrentProduct] = useState({});
  async function getInitProduct() {
    const { data } = await axios.get('/api/products/44388');
    setCurrentProduct({ data });
  }
  if (Object.keys(currentProduct).length === 0) {
    getInitProduct();
  }

  return (
    <AppContext.Provider value={currentProduct}>
      <h1>Overview</h1>
      <h1>Related Items & Comparison</h1>
      <h1>Questions & Answers</h1>
      <Questions />
      <h1>Ratings & Reviews</h1>
    </AppContext.Provider>
  );
}

export default App;
