import {connect} from 'react-redux';
import {
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
} from './utils';

/**
 * Pass mapping functions to
 * components called with `connect`
 */

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
);
