import ActionTypes from '../App/constants';
import Axios from 'axios';
import errorHandler from '../../utils/errorHandler';

export const sendResetPassword = mail => {
  return async dispatch => {
    try {
      const response = await Axios.post(`/auth/reset-password-request`, mail);
      console.log(response);
      dispatch(signUpError({ message: [] }));
    } catch (error) {
      dispatch(signUpError(error.response.data));
      errorHandler(dispatch, error);
    }
  };
};

export const signUpError = data => {
  return {
    type: ActionTypes.SIGN_UP_ERROR,
    payload: data,
  };
};
