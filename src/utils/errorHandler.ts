import { setSnackbarMessage } from '../containers/Snackbar/actions';

const errorHandler = (dispatch, error) => {
  console.log(error.response.data);
  if (Array.isArray(error.response.data.message)) {
    dispatch(setSnackbarMessage(JSON.stringify(error.response.data.message[0].constraints)));
  } else {
    dispatch(setSnackbarMessage(JSON.stringify(error.response.data.message)));
  }
};

export default errorHandler;
