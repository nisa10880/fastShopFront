import * as serviceWorker from "./serviceWorker";

import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

// Import all the third party stuff
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import history from "./utils/history";
// Import root app

import configureStore from "./configureStore";
import axios from "axios";

import jwt_decode from "jwt-decode";
import { setAuthToken, setCurrentUser } from "./containers/Login/actions";
import { push } from "connected-react-router";

import App from "./containers/App";

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById("root") as HTMLElement;

if (localStorage.access_token) {
  setAuthToken(localStorage.access_token);
  const decoded = jwt_decode(localStorage.access_token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    localStorage.removeItem("access_token");
    setAuthToken(false);
    store.dispatch(setCurrentUser({}));
    store.dispatch(push("/login"));
  }
}

// axios.defaults.baseURL = 'http://192.168.0.16:3001/';
if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "http://localhost:3001/";
}
if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL = "https://letsgo-backend.herokuapp.com/";
}

const render = (Component = App) => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Component history={history} />
      </ConnectedRouter>
    </Provider>,
    MOUNT_NODE
  );
};

render(App);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
