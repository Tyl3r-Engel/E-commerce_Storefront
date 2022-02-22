/* eslint-disable react/jsx-one-expression-per-line */
import React, { useContext } from 'react';
import { AppContext } from '../../Context';

export default function Features() {
  const context = useContext(AppContext);
  if (context.features !== undefined) {
    return (context.features.map((feature) => (
      <div key={Math.random() * 1000}>
        ✓ {feature.feature} : {feature.value}
      </div>
    )));
  }
  return (null);
}
