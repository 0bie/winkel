import React from 'react';
import {Button} from '@0bie/pattern-lib-react';
import connect from '../store/connect';
import {getClassName} from '../utils';

const Sidebar = ({state, actions}) => {

  const {context} = state.flyout;
  return (
    <div className={`sidebar-container ${state.flyout && getClassName(state.flyout.isOpen)}`}>
      <div className="sidebar">
        <header className="sidebar-header">
          <h3 className="sidebar-title">{context && context.title}</h3>
          <div className="sidebar-action">
            <Button
              size="xs"
              classNames={['btn--link']}
              icon={{id: 'x1', size: 'sm', title: 'close sidebar'}}
              onClick={actions.flyout.toggleFlyout.bind(null, {context})}
            />
          </div>
        </header>
        <section className="sidebar-content">
          {context && context.content}
        </section>
      </div>
      <div
        className="sidebar-overlay"
        onClick={actions.flyout.toggleFlyout.bind(null, {context})}
      />
    </div>
  );

};

export default connect(Sidebar);
