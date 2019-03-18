import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import connect from './store/connect';
import api from './data/api';

import Routes from './routes';
import {Navigation} from './components';

class App extends Component {

  async componentDidMount() {
    let {user} = this.props.state.user;
    try {
      if (!user) {
        user = await api.getUser();
      }
    }
    catch(error) {
      console.error(error); // eslint-disable-line no-console
    }
    const {user: {setUser}} = this.props.actions;
    setUser({user: user.data.data.me});
  }

  handleMenuPanel = (evt) => {
    const key = evt.keyCode || evt.which;
    if (evt.type === 'keyup' && key !== 13) return null;
    if (evt.type === 'keyup' && key === 13) evt.preventDefault();
    const {drawer} = this.props.actions;
    drawer.toggleDrawer({context: 'main'});
  }

  render() {
    return (
      <Router>
        <div className="main">
          <Navigation handleMenuPanel={this.handleMenuPanel} />
          <Routes />
        </div>
      </Router>
    );
  }

}

export default connect(App);
