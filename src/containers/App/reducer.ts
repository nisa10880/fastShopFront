import { ContainerState, ContainerActions } from './types';
import ActionTypes from './constants';

// The initial state of the App
export const initialState: ContainerState = {
  loading: true,
  error: false,
  currentUser: {
    id_user: 'a',
    username: 'nidhal93',
    first_name: 'Nidhal',
    last_name: 'Sabbah',
    sexe: 'M',
    age: 23,
    imgUrl: 'https://pbs.twimg.com/profile_images/1034542012534407168/qblLbry-_400x400.jpg',
    about: 'je suis un grand joueur de jeux video',
    events: [],
    participants: [],
    favorites: [],
    opinions: [],
    addresses: [{ name: '' }],
  },
  currentAddress: {},
  userData: {
    repos: [],
  },
};

// Take this container's state (as a slice of root state), this container's actions and return new state
function appReducer(state: ContainerState = initialState, action: ContainerActions): ContainerState {
  switch (action.type) {
    case ActionTypes.SET_CURRENT_USER_INFORMATION:
      return { ...state, currentUser: action.payload, loading: false };
    case ActionTypes.SET_CURRENT_ADDRESS:
      return {
        ...state,
        currentAddress: state.currentUser.addresses.find(address => address.id_address === action.payload) || state.currentAddress,
      };
    default:
      return state;
  }
}

export default appReducer;
