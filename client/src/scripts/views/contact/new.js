import React, {Fragment} from 'react';
import {Button, Input} from '@0bie/pattern-lib-react';
import connect from '../../store/connect';

const NewContact = ({actions, handleAddContact}) => {

  return (
    <Fragment>
      <form id="contact_add" className="panel-form">
        <div className="panel-input mb--sm">
          <label className="input-label">first name</label>
          <Input
            size="xs"
            name="firstName"
            classNames={['input--full']}
          />
        </div>
        <div className="panel-input mb--sm">
          <label className="input-label">last name</label>
          <Input
            size="xs"
            name="lastName"
            classNames={['input--full']}
          />
        </div>
        <div className="panel-input mb--sm">
          <label className="input-label">email</label>
          <Input
            size="xs"
            name="email"
            classNames={['input--full']}
          />
        </div>
        <div className="panel-input mb--sm">
          <label className="input-label">role</label>
          <Input
            size="xs"
            name="role"
            classNames={['input--full']}
          />
        </div>
        <div className="panel-input mb--sm">
          <label className="input-label">biography</label>
          <Input
            rows="15"
            cols="20"
            size="xs"
            name="bio"
            type="textField"
            inputClassNames={['input--note']}
            classNames={['input--full']}
          />
        </div>
        <div className="panel-action">
          <Button
            size="xs"
            label="create contact"
            onClick={handleAddContact.bind(null, actions)}
            classNames={['btn--primary', 'btn--raised', 'btn--full']}
          />
        </div>
      </form>
    </Fragment>
  );

};

export default connect(NewContact);
