const noticeIsVisible = false;
const noticeDuration = 5000; // ms
const initialState = {
  duration: noticeDuration,
  isVisible: noticeIsVisible
};

function defineAction(name) {
  return `app/modal/${name}`;
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case TOGGLE_NOTICE:
      return Object.assign({}, state, {
        isVisible: !state.isVisible,
        status: action.payload.status, // (success|error|warn)
        message: action.payload.message,
        duration: action.payload.duration || state.duration
      });
    default:
      return state;
  }
}

export function getNotice(state) {
  return state.notice;
}

export const TOGGLE_NOTICE = defineAction('TOGGLE_NOTICE');

export function toggleNotice(payload) {
  return {payload, type: TOGGLE_NOTICE};
}
