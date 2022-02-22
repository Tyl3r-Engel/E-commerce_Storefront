/* eslint-disable import/extensions */
import axios from 'axios';
import React, {
  useContext, useState, useMemo, useEffect,
} from 'react';
import { AppContext, OverviewContext, StyleContext } from '../../Context';
import CurrentStyleImages from './CurrentStyleImages.jsx';
import CurrentStyleThumbs from './CurrentStyleThumbs.jsx';
import Inputs from './Inputs.jsx';
import SelectedStyleThumbs from './SelectedStyleThumbs.jsx';
import Features from './Features.jsx';
import StarsAndReviews from './StarsAndReviews.jsx';

export default function overview() {
  const [allStyles, setAllStyles] = useState({});
  const context = useContext(AppContext);
  const [currentStyle, setCurrentStyle] = useState();
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    setCurrentStyle(allStyles?.[0]);
  }, [allStyles]);
  async function getStyles() {
    console.log('this ran');
    const { data } = await axios.get(`/api/products/${context.id}/styles`);
    setAllStyles(data.results);
  }
  const providerValue = useMemo(() => (
    {
      allStyles, currentStyle, setCurrentStyle,
    }
  ), [allStyles, currentStyle, setCurrentStyle]);
  if (Object.keys(allStyles).length === 0 && context.id !== undefined) {
    console.log(allStyles, context.id);
    getStyles();
  } else {
    return (
      <OverviewContext.Provider value={providerValue}>
        <StyleContext.Provider value={[currentImage, setCurrentImage]}>
          <div className="mainDiv">
            <div className="image-container">
              <CurrentStyleImages />
            </div>
            <div className="productThumbsDiv">
              <SelectedStyleThumbs />
            </div>
            <div className="stylesThumbsDiv">
              <CurrentStyleThumbs />
            </div>
            <div className="dropdowns">
              <Inputs />
            </div>
            <div className="features">
              <Features />
            </div>
            <div className="starsAndReviews">
              <StarsAndReviews />
            </div>
            <div className="category">
              {context.category}
            </div>
            <div className="name">
              {context.name}
            </div>
            <div className="currentStyle">
              {'STYLE > '}
              {currentStyle?.name}
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
        </StyleContext.Provider>
      </OverviewContext.Provider>
    );
  }
  return (null);
}

// images at products/id/styles
// data.results[0].photos[0].thumbnailurl
