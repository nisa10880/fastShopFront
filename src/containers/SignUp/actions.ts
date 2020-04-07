import ActionTypes from '../App/constants';
import Axios from 'axios';
import { push } from 'connected-react-router';
import jwt_decode from 'jwt-decode';
import errorHandler from '../../utils/errorHandler';

export const sendSignUp = userData => {
  return async dispatch => {
    try {
      const response = await Axios.post(`/auth/signup`, userData);
      dispatch(signUp(response.data));
      console.log(response);
      dispatch(signUpError({ message: [] }));
    } catch (error) {
      errorHandler(dispatch, error);

      dispatch(signUpError(error.response.data));
    }
  };
};

export const signUp = data => {
  return {
    type: ActionTypes.SIGN_UP_SUCCESS,
    payload: data,
  };
};

export const signUpError = data => {
  return {
    type: ActionTypes.SIGN_UP_ERROR,
    payload: data,
  };
};

export const sendActivateAccount = userData => {
  return async dispatch => {
    try {
      const response = await Axios.post(`/auth/activate-account`, userData);
      const access_token = response.data.access_token;
      localStorage.setItem('access_token', access_token);
      setAuthToken(access_token);
      const decoded = jwt_decode(access_token);
      dispatch(setCurrentUser(decoded));
      dispatch(push('/'));
    } catch (error) {
      errorHandler(dispatch, error);

      dispatch(activateAccountError(error.response.data));

      console.log(error);
    }
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

export const acctivateAccountSuccess = data => {
  return {
    type: ActionTypes.ACTIVATE_ACCOUNT_SUCCES,
    payload: data,
  };
};

export const activateAccountError = data => {
  return {
    type: ActionTypes.ACTIVATE_ACCOUNT_ERROR,
    payload: data,
  };
};
