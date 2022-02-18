/* eslint-disable import/extensions */
import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { AppContext } from './Context';
import Overview from './components/overview/Overview.jsx';

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
      {/* <h1>{currentProduct?.name}</h1> */}
      <Overview />
    </AppContext.Provider>
  );
}

export default App;
