import ActionTypes from "../App/constants";

// The initial state of the App
export const initialState = {
  products: [],
  productsCount: 0,
  loaded: false
};

// Take this container's state (as a slice of root state), this container's actions and return new state
function productListReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SEARCH_EVENTS:
      return {
        products: action.payload,
        productsCount: action.productsCount,
        loaded: true
      };
    default:
      return state;
  }
}

export default productListReducer;
