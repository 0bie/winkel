import React from 'react';
import {Notice} from '@0bie/pattern-lib-react';
import {ProductItem} from './index';

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
      <li className="list-empty">
        <Notice message="There are no products available." />
      </li>
    );
  }
}
