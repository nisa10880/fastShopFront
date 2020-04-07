import ActionTypes from '../App/constants';
import { ContainerState, ContainerActions } from './types';

// The initial state of the App
export const initialState: ContainerState = {
  event: {},
};

// Take this container's state (as a slice of root state), this container's actions and return new state
function eventReducer(state: ContainerState = initialState, action: ContainerActions): ContainerState {
  switch (action.type) {
    default:
      return state;
  }
}

export default eventReducer;
