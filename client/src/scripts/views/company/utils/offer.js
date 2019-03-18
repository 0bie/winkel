import React from 'react';
import CompanyOffer from '../offer';
import {handleOrder} from '../../utils';

export default function handleCompanyOffer(handler, company) {
  return handler({
    context: {
      content: <CompanyOffer company={company} handleCompanyOffer={handleOrder} />,
      title: `${company.name} Offer Form`
    }
  });
}
