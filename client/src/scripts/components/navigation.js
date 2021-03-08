import React, {Fragment} from 'react';
import {Avatar, Button} from '@0bie/pattern-lib-react';
import Logo from './logo';
import connect from '../store/connect';

const Navigation = ({state, handleMenuPanel}) => {
  return (
    <Fragment>
      <nav className="navigation-container">
        <Logo logoText="winkel" />
        <ul className="navigation">
          <li className="navigation-item">
            <Avatar
              size="sm"
              user={{firstName: state.user.firstName, lastName: state.user.lastName, image: state.user.image}}
              classNames={['mr--xs', 'vert--mid']}
            />
          </li>
          <li className="navigation-item">
            <a href="#">sign out</a>
          </li>
          <li className="navigation-item">
            <Button
              size="sm"
              tabIndex="0"
              onClick={handleMenuPanel.bind(null, state.drawer.context)}
              classNames={['btn--menu']}
            >
              <div className="icon icon--menu vert--mid">
                <span className="bar" />
              </div>
            </Button>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

export default connect(Navigation);
