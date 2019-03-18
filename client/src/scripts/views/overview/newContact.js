import React, {Fragment} from 'react';
import {Button, Input} from '@0bie/pattern-lib-react';

export default function NewContact({title, handleAddContact}) {
  return (
    <Fragment>
      <header className="panel-header">
        <h3 className="title-text">{title}</h3>
      </header>
      <form id="contact_add" className="panel-form">
        <div className="panel-input mb--sm">
          <label className="input-label">first name</label>
          <Input
            name="firstName"
            size="xs"
            placeholder="John"
            classNames={['input--full']}
          />
        </div>
        <div className="panel-input mb--sm">
          <label className="input-label">last name</label>
          <Input
            name="lastName"
            size="xs"
            placeholder="Doe"
            classNames={['input--full']}
          />
        </div>
        <div className="panel-input mb--sm">
          <label className="input-label">email</label>
          <Input
            name="email"
            size="xs"
            classNames={['input--full']}
            placeholder="john.doe@mail.com"
          />
        </div>
        <div className="panel-action">
          <Button
            size="xs"
            label="create contact"
            onClick={handleAddContact}
            classNames={['btn--primary', 'btn--raised']}
          />
        </div>
      </form>
    </Fragment>
  );
}
