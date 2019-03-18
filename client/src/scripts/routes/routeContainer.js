import React, {Component} from 'react';
import {Notice} from '@0bie/pattern-lib-react';
import {MainPanel, MenuPanel} from '../components/panels';
import {getNoticeIcon} from '../utils';
import connect from '../store/connect';

class RouteContainer extends Component {

  render() {
    const {
      state,
      mainContent,
      menuContent,
      handleMenuItem
    } = this.props;
    return (
      <div className="route-container">
        {menuContent && <MenuPanel items={menuContent} handleMenuItem={handleMenuItem} />}
        {mainContent && <MainPanel content={mainContent} />}
        {(state.notice && state.notice.status) &&
            <div className="notice-container">
              <Notice
                iconPosition="right"
                state={state.notice.status}
                message={state.notice.message}
                icon={getNoticeIcon(state.notice.status)}
              />
            </div>}
      </div>
    );
  }

}

export default connect(RouteContainer);
