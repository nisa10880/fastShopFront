//import ActionTypes from '../App/constants';
import Axios from 'axios';
import { push } from 'connected-react-router';
import errorHandler from '../../utils/errorHandler';

export const sendChangePassword = (password, passwordResetToken) => {
  return async dispatch => {
    try {
      const response = await Axios.post(`/auth/reset-password${passwordResetToken}`, password);
      console.log(response);
      dispatch(push('/login'));
    } catch (error) {
      errorHandler(dispatch, error);
    }
  };
};
