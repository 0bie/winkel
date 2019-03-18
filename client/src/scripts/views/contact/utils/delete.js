import React from 'react';
import DeleteContact from '../delete';
import {handleDeleteContact} from '../../utils';

export default function handleContactDelete(handler, contact) {
  return handler({
    context: {
      content: <DeleteContact contact={contact} handleDeleteContact={handleDeleteContact} />,
      title: `Delete ${contact.firstName} ${contact.lastName}`,
      ...contact
    }
  });
}
