import React from 'react';
import RouteContainer from './routeContainer';
import View500 from '../views/500';
require('../../styles/routes/_route-error.scss');

export default function Route404() {
  return <RouteContainer mainContent={<View500 />} />;
}
