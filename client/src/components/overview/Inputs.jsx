import React, { useContext } from 'react';
import { OverviewContext } from '../../Context';

export default function Inputs() {
  const { allStyles } = useContext(OverviewContext);
  return (
    <div>
      <div className="sizeQuantity">
        <select
          name="size"
          id="size"
        >
          <option value="xsmall">Extra Small</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
          <option value="xlarge">Extra Large</option>
          <option value="xxlarge">Extra Extra Large</option>
        </select>
        <select
          name="quantity"
          id="quantity"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
        </select>
      </div>
      <div className="addToCart">
        <button type="submit">Add to Cart</button>
      </div>
    </div>

  );
}
