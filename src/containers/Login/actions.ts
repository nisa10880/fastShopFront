import ActionTypes from '../App/constants';
import Axios from 'axios';
import { push } from 'connected-react-router';
import jwt_decode from 'jwt-decode';
import errorHandler from '../../utils/errorHandler';

export const sendSignIn = loginInfomartions => {
  return async dispatch => {
    try {
      const response = await Axios.post('/auth/signin', loginInfomartions);
      const access_token = response.data.access_token;
      localStorage.setItem('access_token', access_token);
      setAuthToken(access_token);
      const decoded = jwt_decode(access_token);
      dispatch(setCurrentUser(decoded));
      dispatch(push('/'));
    } catch (error) {
      errorHandler(dispatch, error);
    }
  };
};

export const signInError = data => {
  return {
    type: ActionTypes.SIGN_IN_ERROR,
    payload: data,
  };
};

export const setAuthToken = token => {
  if (token) {
    Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete Axios.defaults.headers.common['Authorization'];
  }
};

export const setCurrentUser = decoded => {
  return {
    type: ActionTypes.SET_CURRENT_USER,
    payload: decoded,
  };
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem('access_token');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  dispatch(push('/login'));
};
