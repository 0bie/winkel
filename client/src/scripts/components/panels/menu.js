import React from 'react';
import {Icon} from '@0bie/pattern-lib-react';
import {getClassName} from '../../utils';
import connect from '../../store/connect';

const MenuPanel = ({state, actions, items, handleMenuItem}) => (
  <aside className={`drawer ${state.drawer && getClassName(state.drawer.isOpen)}`}>
    <div
      className="drawer-overlay"
      onClick={actions.drawer.toggleDrawer.bind(null, {context: state.drawer.context})}
    />
    <nav className="panel panel--menu">
      <ul>
        {items.map((item) =>
          <li key={item.id} className="panel-item">
            <a
              href={item.link}
              onClick={handleMenuItem}
              data-content={item.id}
            >
              <Icon
                size="sm"
                id={item.icon}
                classNames={['vert--mid', 'mr--sm']}
              />
              <span className="panel-text">{item.title}</span>
            </a>
          </li>)}
      </ul>
    </nav>
  </aside>
);

export default connect(MenuPanel);
