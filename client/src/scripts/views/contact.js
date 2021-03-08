import React, {Fragment} from 'react';
import {Button} from '@0bie/pattern-lib-react';
import connect from '../store/connect';
import {ContactCard, Sidebar}from '../components';
import {
  handleContactAdd,
  handleContactEdit,
  handleContactDelete,
  handleContactMessage
} from './contact/utils';
import {sortObjects} from '../utils';
import ContactPlaceholder from '../components/placeholder/contacts';

const Contact = ({state, actions}) => {

  const {contacts} = state.contact;
  const {toggleFlyout} = actions.flyout;
  contacts && sortObjects(contacts, 'firstName');
  return (
    <Fragment>
      <header className="header--panel header--contact">
        <h3 className="title--panel">Contacts</h3>
        <div className="contact-add">
          <Button
            size="xs"
            label="new contact"
            classNames={['btn--primary']}
            onClick={handleContactAdd.bind(null, toggleFlyout)}
          />
        </div>
      </header>
      <div className="content--contact">
        {contacts.length > 0 && contacts.map((contact) =>
          <ContactCard
            user={contact}
            key={contact.id}
            handleEdit={handleContactEdit.bind(null, toggleFlyout, contact)}
            handleDelete={handleContactDelete.bind(null, toggleFlyout, contact)}
            handleMessage={handleContactMessage.bind(null, toggleFlyout, contact)}
          />)}
        {contacts.length === 0 &&
          <ContactPlaceholder />}
      </div>
      <Sidebar />
    </Fragment>
  );

};

export default connect(Contact);
