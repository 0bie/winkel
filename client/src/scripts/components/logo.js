import React from 'react';
import {Icon} from '@0bie/pattern-lib-react';
import {Link} from 'react-router-dom';

export default function Logo() {
  return (
    <h1 className="logo">
      <Link to="/">
        <Icon
          size="lg"
          id="cart1"
          title="logo"
          classNames={['vert--mid', 'mr--xs']}
        />
        <span className="logo-text vert--mid">
          <span>w</span>inkel
        </span>
      </Link>
    </h1>
  );
}
