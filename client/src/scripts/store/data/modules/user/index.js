const initialState = {};

function defineAction(name) {
  return `app/user/${name}`;
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_USER:
      return Object.assign({}, state, {...action.payload.user});
    case EDIT_USER:
      return Object.assign({}, state, {...action.payload});
    default:
      return state;
  }
}

export function getUser(state) {
  return state.user;
}

export const SET_USER = defineAction('SET_USER');
export const EDIT_USER = defineAction('EDIT_USER');

export function setUser(payload) {
  return {payload, type: SET_USER};
}

export function editUser(payload) {
  return {payload, type: EDIT_USER};
}
