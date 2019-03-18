import React, {Fragment} from 'react';
import {Button, Modal, Notice} from '@0bie/pattern-lib-react';

export default function ErrorMessage({message, handler}) {
  return (
    <div className="error-boundary">
      <Modal
        preventClose
        title="Attention"
        classNames={['modal--error']}
        content={renderMessage(message, handler)}
      />
    </div>
  );
}

/* eslint-disable react/no-multi-comp */

function renderMessage(message, handler) {
  return (
    <Fragment>
      <Notice
        state="error"
        message={message}
        iconPosition="right"
        icon={{id: 'warning', size: 'sm', title: 'an error ocured'}}
      />
      {handler &&
        <Button
          size="xs"
          label="retry"
          onClick={handler}
          onKeyUp={handler}
          classNames={['btn--error', 'btn--full', 'btn--raised']}
        />}
    </Fragment>
  );
}
