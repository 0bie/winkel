import React from 'react';
import image from '../../../assets/error/error.svg';
import {Link} from 'react-router-dom';

const errorImage = () => ({
  __html: image
});

export default function View500() {
  return (
    <div className="route--error">
      <div className="content-error">
        <h1 className="title-error">500</h1>
        <h2 className="mb--xs">Something went wrong!</h2>
        <p className="text-error">There was a problem on our end. Please try again later.</p>
        <Link to="/" tabIndex="0" className="btn btn--md btn--redirect">
          <span>Go to Homepage</span>
        </Link>
      </div>
      {<div className="image-error" dangerouslySetInnerHTML={errorImage()} />}
    </div>
  );
}
