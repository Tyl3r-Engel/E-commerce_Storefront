<<<<<<< HEAD
/* eslint-disable import/extensions */
=======
>>>>>>> newbranch
import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { AppContext } from '../Context';
<<<<<<< HEAD
import RelatedItems from './relatedItems/RelatedItems.jsx';
=======
import RelatedItems from './RelatedItems.jsx'
>>>>>>> newbranch

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
<<<<<<< HEAD
      <h1 style={{color:'red'}}>Product Overview</h1>
      {/* <h1>{JSON.stringify(currentProduct)}</h1> */}
      <RelatedItems
        productId={productId}
        setProductId={setProductId}
        currentProduct={currentProduct}
      />
      <h1 style={{color:'red'}}>Questions and Answers</h1>
      <h1 style={{color:'red'}}>Reviews and Ratings</h1>
=======
      <RelatedItems 
        products={currentProduct.data}
        setProduct={setCurrentProduct}
        productId={productId}
        setProductId={setProductId}  
      />
>>>>>>> newbranch
    </AppContext.Provider>
  );
}

export default App;
