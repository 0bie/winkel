import React from 'react';
import connect from '../store/connect';
import Overview from './overview';

const Home = () => (
  <div className="home-content">
    <Overview />
  </div>
);

export default connect(Home);
