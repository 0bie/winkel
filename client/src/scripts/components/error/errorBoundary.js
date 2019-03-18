import React, {Component} from 'react';
import ErrorMessage from './errorMessage';

/* eslint-disable */

export default class ErrorBoundary extends Component {

  state = {
    hasError: false
  }

  static getDerivedStateFromError(error) {
    return {hasError: true};
  }

  componentDidCatch(error, info) {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      console.error('Error: ', error);
      console.error('ErrorInfo: ', JSON.stringify(info));
    }
  }

  render() {
    const {message, handler} = this.props;
    if (this.state.hasError) {
      return <ErrorMessage message={message} handler={handler} />;
    }
    return this.props.children;
  }

}
