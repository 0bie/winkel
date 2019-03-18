import React from 'react';
import RouteContainer from './routeContainer';
import View404 from '../views/404';
require('../../styles/routes/_route-error.scss');

export default function Route404() {
  return <RouteContainer mainContent={<View404 />} />;
}
