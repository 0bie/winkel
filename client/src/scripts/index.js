import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {store, history} from './store';
import {ConnectedRouter} from 'connected-react-router';

import App from './app';
require('../styles/index.scss');

/**
 * Add sprite to the `document`
 */

const xhr = new XMLHttpRequest();
xhr.open('GET', 'assets/sprite.svg');
xhr.onreadystatechange = () => {
  if (xhr.readyState === 4) {
    document.getElementById('sprite').innerHTML = xhr.responseText;
  }
};
xhr.send();

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
