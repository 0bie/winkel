import React from 'react';
import {ProductItem} from './index';
import ProductPlaceholder from './placeholder/productItem';

export default function ProductList({items, handleOrder}) {

  return (
    <ul className="cardlist">
      {renderEmptyList(items)}
      {items && items.map((item) =>
        <ProductItem
          {...item}
          key={item.id}
          handler={handleOrder && handleOrder.bind(null, item)}
        />)}
    </ul>
  );

}

function renderEmptyList(items) {
  if (!items || !items.length > 0) {
    return (
      <ul className="cardlist">
        {[...new Array(8)].map((_, index) => (
          <ProductPlaceholder key={index} />
        ))}
      </ul>
    );
  }
}
