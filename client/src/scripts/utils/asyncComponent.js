import React, {Component} from 'react';
import {Spinner} from '@0bie/pattern-lib-react';

/**
 * Asynchronously render a component
 * @param {function} getComponent - Callback that imports a given component
 * @returns {function} React component
 */

export default function asyncComponent(getComponent) {

  class AsyncComponent extends Component {
    state = {
      component: null
    }
    async componentDidMount() {
      const {default: component} = await getComponent();
      this.setState(() => ({
        component
      }));
    }
    render() {
      const Component = this.state.component;
      return Component ? <Component {...this.props} /> : <Spinner size="xxl" classNames={['spinner--default']} />;
    }
  }
  return AsyncComponent;

}
