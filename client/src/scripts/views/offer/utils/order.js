import React from 'react';
import ProductOrder from '../order';
import {handleOrder} from '../../utils';

export default function handleProductOrder(handler, product) {
  return handler({
    context: {
      content: <ProductOrder product={product} handleProductOrder={handleOrder} />,
      title: `Order ${product.name}`
    }
  });
}
