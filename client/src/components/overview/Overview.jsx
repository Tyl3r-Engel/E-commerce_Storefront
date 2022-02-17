/* eslint-disable import/extensions */
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AppContext } from '../../Context';
import CurrentStyleImages from './CurrentStyleImages.jsx';

export default function overview() {
  const [styles, setStyles] = useState({});
  const context = useContext(AppContext);
  async function getStyles() {
    const { data } = await axios.get(`/api/products/${context.id}/styles`);
    setStyles(data);
  }
  if (Object.keys(styles).length === 0 && context.id !== undefined) {
    getStyles();
  }
  return (
    <div className="mainDiv">
      <div className="image-container">
        <AppContext.Provider value={styles}>
          <CurrentStyleImages />
        </AppContext.Provider>
      </div>
      <div className="category">
        {context.category}
      </div>
      <div className="name">
        {context.name}
      </div>
      <div className="price">
        $
        {context.default_price}
      </div>
      <div className="slogan">
        {context.slogan}
      </div>
      <div className="description">
        {context.description}
      </div>
    </div>
  );
}

// images at products/id/styles
// data.results[0].photos[0].thumbnailurl
