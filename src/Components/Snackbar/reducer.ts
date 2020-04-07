import ActionTypes from "../App/constants";

const initialState = {
  message: "",
  open: false
};

export const snackbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_SNACKBAR_MESSAGE:
      return {
        message: action.message,
        open: true
      };
    case ActionTypes.CLOSE_SNACKBAR:
      return {
        message: "",
        open: false
      };
    default:
      return state;
  }
};
export default snackbarReducer;
