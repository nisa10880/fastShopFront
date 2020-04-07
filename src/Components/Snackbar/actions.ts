import ActionTypes from '../App/constants';

export const setSnackbarMessage = message => ({
  type: ActionTypes.SET_SNACKBAR_MESSAGE,
  message,
});

export const closeSnackbar = () => ({
  type: ActionTypes.CLOSE_SNACKBAR,
});
