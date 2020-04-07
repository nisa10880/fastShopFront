import ActionTypes from '../App/constants';
import { ContainerState, ContainerActions } from './types';
import isEmpty from '../../utils/isEmpty';

// The initial state of the App
export const initialState: ContainerState = {
  error: { message: [] },
  isAuthenticated: false,
  user: { addresses: [] },
};

// Take this container's state (as a slice of root state), this container's actions and return new state
function loginReducer(state: ContainerState = initialState, action: ContainerActions): ContainerState {
  switch (action.type) {
    case ActionTypes.SIGN_IN_ERROR:
      return { ...state, error: action.payload };
    case ActionTypes.SIGN_UP_ERROR:
      return { ...state, error: action.payload };
    case ActionTypes.ACTIVATE_ACCOUNT_ERROR:
      return { ...state, error: action.payload };
    case ActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    default:
      return state;
  }
}

export default loginReducer;
