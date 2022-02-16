import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { AppContext } from '../Context';
import RelatedItems from './RelatedItems.jsx'

function App() {
  const [currentProduct, setCurrentProduct] = useState({});
  const [productId, setProductId] = useState(44388);

  async function getInitProduct() {
    const { data } = await axios.get('/api/products');
    setCurrentProduct({ data });
  }

  if (Object.keys(currentProduct).length === 0) {
    getInitProduct();
  }

  return (
    <AppContext.Provider value={currentProduct}>
      <RelatedItems 
        products={currentProduct.data}
        setProduct={setCurrentProduct}
        productId={productId}
        setProductId={setProductId}  
      />
    </AppContext.Provider>
  );
}

export default App;
