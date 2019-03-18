import React, {Fragment} from 'react';
import {ProductList, Sidebar} from '../components';
import connect from '../store/connect';
import {handleProductOrder} from './offer/utils';

const Offer = ({state, actions}) => {

  const {toggleFlyout} = actions.flyout;
  return (
    <Fragment>
      <header className="header--panel header--offer">
        <h3 className="title--panel">Offers</h3>
      </header>
      <div className="content--offer">
        <ProductList
          items={state.product && state.product.products}
          handleOrder={handleProductOrder.bind(null, toggleFlyout)}
        />
      </div>
      <Sidebar />
    </Fragment>
  );

};

export default connect(Offer);
