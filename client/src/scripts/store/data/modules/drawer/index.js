const drawerIsOpen = false;
const initialState = {isOpen: drawerIsOpen};

function defineAction(name) {
  return `app/drawer/${name}`;
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case INIT_DRAWER:
      return Object.assign({}, state, {context: action.payload.context});
    case TOGGLE_DRAWER:
      return Object.assign({}, state, {context: action.payload.context, isOpen: !state.isOpen});
    default:
      return state;
  }
}

export function getDrawer(state) {
  return state.drawer;
}

export const INIT_DRAWER = defineAction('INIT_DRAWER');
export const TOGGLE_DRAWER = defineAction('TOGGLE_DRAWER');

export function initDrawer(payload) {
  return {payload, type: INIT_DRAWER};
}

export function toggleDrawer(payload) {
  return {payload, type: TOGGLE_DRAWER};
}
