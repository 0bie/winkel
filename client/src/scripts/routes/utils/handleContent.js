import React from 'react';
import {Home, Contact, Company, Offer, Setting} from '../../views';
import {withErrorBoundary} from '../../utils';

export default function handleContent(content, errorCallback) {
  switch (content) {
    case 'overview':
      return withErrorBoundary(
        <Home />,
        {message: 'An error occurred while loading overview. Try again.'},
        errorCallback
      );
    case 'contacts':
      return withErrorBoundary(
        <Contact />,
        {message: 'An error occurred while loading contacts. Try again.'},
        errorCallback
      );
    case 'companies':
      return withErrorBoundary(
        <Company />,
        {message: 'An error occurred while loading companies. Try again.'},
        errorCallback
      );
    case 'offers':
      return withErrorBoundary(
        <Offer />,
        {message: 'An error occurred while loading offers. Try again.'},
        errorCallback
      );
    case 'settings':
      return withErrorBoundary(
        <Setting />,
        {message: 'An error occurred while loading setting. Try again.'},
        errorCallback
      );
    default:
      return withErrorBoundary(
        <Home />,
        {message: 'An error occurred while loading overview. Try again.'},
        errorCallback
      );
  }
}
