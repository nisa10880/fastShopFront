/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 */

enum ActionTypes {
  SEARCH_EVENTS = "SEARCH_EVENTS",
  ADD_MORE_EVENTS = "ADD_MORE_EVENTS",
  FETCH_EVENT = "FETCH_EVENT",
  LOADED_EVENTS = "LOADED_EVENTS",

  SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS",
  SIGN_UP_ERROR = "SIGN_UP_ERROR",

  SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS",
  SIGN_IN_ERROR = "SIGN_IN_ERROR",

  SET_CURRENT_USER = "SET_CURRENT_USER",

  ACTIVATE_ACCOUNT_SUCCES = "ACTIVATE_ACCOUNT_SUCCESS",
  ACTIVATE_ACCOUNT_ERROR = "ACTIVATE_ACCOUNT_ERROR",

  SET_CURRENT_USER_INFORMATION = "SET_CURRENT_USER_INFORMATION",

  SET_CURRENT_ADDRESS = "SET_CURRENT_ADDRESS",

  SET_SNACKBAR_MESSAGE = "SET_SNACKBAR_MESSAGE",
  CLOSE_SNACKBAR = "CLOSE_SNACKBAR",

  ADD_PRODUCT_TO_BASKET = "ADD_PRODUCT_TO_BASKET"
}

export default ActionTypes;
