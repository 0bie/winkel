import React from 'react';
import EditContact from '../edit';
import {handleEditContact} from '../../utils';

export default function handleContactEdit(handler, contact) {
  return handler({
    context: {
      content: <EditContact contact={contact} handleEditContact={handleEditContact} />,
      title: `Edit ${contact.firstName} ${contact.lastName}`,
      ...contact
    }
  });
}
