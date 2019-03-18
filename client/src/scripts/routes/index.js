import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {asyncComponent} from '../utils';

/**
 * Explicitly define module paths for chunking
 * Reference: https://bit.ly/2Anj5rw https://bit.ly/2veB4dH
 */

const route1 = asyncComponent(() => import('./route-1'));
const route404 = asyncComponent(() => import('./route-404'));

export default function Routes() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        component={route1}
      />
      <Route component={route404} />
    </Switch>
  );
}
