import React from 'react';
import image from '../../../assets/error/error.svg';
import {Link} from 'react-router-dom';

const errorImage = () => ({
  __html: image
});

export default function View404() {
  return (
    <div className="route--error">
      <div className="content-error">
        <h1 className="title-error">404</h1>
        <h2 className="mb--xs">Sorry, page not found!</h2>
        <p className="text-error">
          The page you were looking for does not exist. You may have mistyped
          the address or the page may have moved.
        </p>
        <Link to="/" tabIndex="0" className="btn btn--md btn--redirect">
          <span>Go to Homepage</span>
        </Link>
      </div>
      {<div className="image-error" dangerouslySetInnerHTML={errorImage()} />}
    </div>
  );
}
