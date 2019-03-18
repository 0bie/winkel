const flyoutIsOpen = false;
const initialState = {isOpen: flyoutIsOpen};

function defineAction(name) {
  return `app/flyout/${name}`;
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case INIT_FLYOUT:
      return Object.assign({}, state, {context: action.payload.context});
    case TOGGLE_FLYOUT:
      return Object.assign({}, state, {context: action.payload.context, isOpen: !state.isOpen});
    default:
      return state;
  }
}

export function getFlyout(state) {
  return state.flyout;
}

const INIT_FLYOUT = defineAction('INIT_FLYOUT');
const TOGGLE_FLYOUT = defineAction('TOGGLE_FLYOUT');

export function initFlyout(payload) {
  return {payload, type: INIT_FLYOUT};
}

export function toggleFlyout(payload) {
  return {payload, type: TOGGLE_FLYOUT};
}
