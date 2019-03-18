import React from 'react';
import NewCompany from '../new';
import {handleAddCompany} from '../../utils';

export default function handleCompanyAdd(handler) {
  return handler({
    context: {
      content: <NewCompany handleAddCompany={handleAddCompany} />,
      title: 'add a new company'
    }
  });
}
