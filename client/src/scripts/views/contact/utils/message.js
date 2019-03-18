import React from 'react';
import MessageContact from '../message';
import {handleMessageContact} from '../../utils';

export default function handleContactMessage(handler, contact) {
  return handler({
    context: {
      content: <MessageContact contact={contact} handleMessageContact={handleMessageContact} />,
      title: `Message ${contact.firstName} ${contact.lastName}`,
      ...contact
    }
  });
}
