import React from 'react';
import connect from '../../store/connect';

const MainPanel = ({content, title}) => (
  <main className="panel panel--main">
    <div className="panel-content">
      {title && <h1 className="panel-title">{title}</h1>}
      {content}
    </div>
  </main>
);

export default connect(MainPanel);
