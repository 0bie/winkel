import React from 'react';
import {ErrorBoundary} from '../components/error';

/**
 * Nest a component within an error boundary
 * to catch errors and prevent the app from getting unmounted
 * @param {function} component - The component
 * @param {object} error - The error message
 * @param {function} callback - Callback handler for retry action (Optional)
 * @returns {object} A component nested within `<ErrorBoundary>`
 */

export default function withErrorBoundary(component, error, callback) {
  return (
    <ErrorBoundary message={error.message} handler={callback}>
      {component}
    </ErrorBoundary>
  );
}
