import ActionTypes from "../App/constants";

// The initial state of the App
export const initialState = {
  products: [],
  productsCount: 0,
  loaded: false,
  productInBasket: []
};

// Take this container's state (as a slice of root state), this container's actions and return new state
function productListReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SEARCH_EVENTS:
      return {
        ...state,
        products: action.payload,
        productsCount: action.productsCount,
        loaded: true
      };

    case ActionTypes.ADD_PRODUCT_TO_BASKET:
      return {
        ...state,
        productInBasket: state.productInBasket.concat(action.payload)
      };
    default:
      return state;
  }
}

export default productListReducer;
