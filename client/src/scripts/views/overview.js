import React from 'react';
import connect from '../store/connect';
import {handleAddContact, handleMessageContact} from './utils';
import {
  Offer,
  Greeting,
  Statistics,
  QuickActions
} from './overview/';

const Overview = ({state, actions}) => {

  const productData = state.product.products;
  const activeOffers = productData && [...productData].splice(0, 4);

  return (
    <div className="overview">
      <header className="header--panel">
        {state.user && <Greeting name={state.user.firstName} />}
      </header>
      <Statistics />
      <Offer title="active offers" products={activeOffers} />
      <QuickActions
        title="quick actions"
        handleAddContact={handleAddContact.bind(null, actions)}
        handleMessageContact={handleMessageContact.bind(null, actions)}
      />
    </div>
  );

};

export default connect(Overview);
