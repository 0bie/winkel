import React from 'react';
import {displayGreeting} from '../../utils';

export default function Greeting({name}) {
  return (
    <h3 className="title--panel">
      {displayGreeting(name)}
    </h3>
  );
}
