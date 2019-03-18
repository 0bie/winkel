import React, {Fragment} from 'react';
import {Button, Input} from '@0bie/pattern-lib-react';
import connect from '../../store/connect';
import {renderSelectOptions} from './utils';
import {sortObjects} from '../../utils';

const NewMessage = ({title, state, handleMessageContact}) => {
  const {contacts} = state.contact && state.contact;
  contacts && sortObjects(contacts, 'firstName');
  return (
    <Fragment>
      <header className="panel-header">
        <h3 className="title-text">{title}</h3>
      </header>
      <form id="contact_message" className="panel-form">
        <div className="input-row">
          <div className="panel-input mb--sm">
            <label className="input-label">subject</label>
            <Input
              size="xs"
              name="subject"
              id="input_new_note"
              placeholder="Message Subject"
              classNames={['input--full']}
            />
          </div>
          <div className="panel-input mb--sm">
            <label className="input-label">contact</label>
            <select name="id" className="input input--xs input--full" required>
              <option value="">Choose a contact</option>
              {(contacts && contacts.length > 0) && contacts.map(renderSelectOptions)}
            </select>
          </div>
        </div>
        <div className="panel-input mb--xs">
          <Input
            rows="6"
            cols="20"
            size="xs"
            name="text"
            type="textField"
            classNames={['input--full']}
            inputClassNames={['input--note']}
            placeholder="Compose a new message..."
          />
        </div>
        <div className="panel-action">
          <Button
            size="xs"
            label="send message"
            onClick={handleMessageContact}
            classNames={['btn--primary', 'btn--raised']}
          />
        </div>
      </form>
    </Fragment>
  );
};

export default connect(NewMessage);
