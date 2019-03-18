/**
 * Merge state and actions
 * Before passing into connect
 * see: https://github.com/reduxjs/react-redux/issues/324
 */

export default function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...ownProps,
    state: stateProps,
    actions: dispatchProps
  };
}
