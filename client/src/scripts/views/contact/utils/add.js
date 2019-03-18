import React from 'react';
import NewContact from '../new';
import {handleAddContact} from '../../utils';

export default function handleContactAdd(handler) {
  return handler({
    context: {
      content: <NewContact handleAddContact={handleAddContact} />,
      title: 'create a new contact'
    }
  });
}
