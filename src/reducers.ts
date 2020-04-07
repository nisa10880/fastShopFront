/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import history from "./utils/history";
import globalReducer from "./containers/App/reducer";

import snackbarReducer from "./Components/Snackbar/reducer";

import loginReducer from "./containers/Login/reducer";

import productListReducer from "./containers/HomePage/reducer";

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    global: globalReducer,
    user: loginReducer,
    snackbarReducer: snackbarReducer,
    productListReducer: productListReducer,
    router: connectRouter(history),
    ...injectedReducers
  });

  return rootReducer;
}
