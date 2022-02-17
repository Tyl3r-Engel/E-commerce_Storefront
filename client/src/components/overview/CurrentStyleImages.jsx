import React, { useContext, useState } from 'react';
import { AppContext } from '../../Context';

export default function CurrentStyleImages() {
  const context = useContext(AppContext);
  return (
    <div>
      <img
        className="mainImage"
        src={context.results?.[0].photos[0].url}
        alt="woof"
      />
    </div>
  );
}
