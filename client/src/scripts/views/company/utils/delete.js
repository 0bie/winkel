import React from 'react';
import DeleteCompany from '../delete';
import {handleDeleteCompany} from '../../utils';

export default function handleCompanyDelete(handler, company) {
  return handler({
    context: {
      content: <DeleteCompany company={company} handleDeleteCompany={handleDeleteCompany} />,
      title: `Delete ${company.name}`,
      ...company
    }
  });
}
