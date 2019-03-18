import React, {Fragment} from 'react';
import NewMessage from './newMessage';
import NewContact from './newContact';

export default function QuickActions({title, handleAddContact, handleMessageContact}) {

  return (
    <Fragment>
      {title &&
          <h4 className="overview-title">
            <span className="title-text">{title}</span>
          </h4>}
      <div className="overview-actions">
        <ul className="overview-panel">
          <li className="panel-item">
            <NewMessage title="new message" handleMessageContact={handleMessageContact} />
          </li>
          <li className="panel-item">
            <NewContact title="new contact" handleAddContact={handleAddContact} />
          </li>
        </ul>
      </div>
    </Fragment>
  );

}
