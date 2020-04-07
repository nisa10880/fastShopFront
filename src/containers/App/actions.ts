import Axios from 'axios';
import ActionTypes from './constants';
import errorHandler from '../../utils/errorHandler';

export const sendCurrentUserInformation = () => {
  return async dispatch => {
    try {
      const response = await Axios.get('/auth/user-information');
      dispatch(setCurrentUserInformation(response.data));
      console.log(response.data);
    } catch (error) {
      errorHandler(dispatch, error);
    }
  };
};

export const setCurrentUserInformation = decoded => {
  return {
    type: ActionTypes.SET_CURRENT_USER_INFORMATION,
    payload: decoded,
  };
};
