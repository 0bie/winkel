const initialState = {};

function defineAction(name) {
  return `app/product/${name}`;
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_PRODUCTS:
      return Object.assign(
        {},
        state,
        {...action.payload.products},
        {...action.payload.activeOffers}
      );
    default:
      return state;
  }
}

export function getProducts(state) {
  return state.product;
}

const SET_PRODUCTS = defineAction('SET_PRODUCTS');

export function setProducts(payload) {
  return {payload, type: SET_PRODUCTS};
}
