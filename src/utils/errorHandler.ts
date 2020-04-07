import { setSnackbarMessage } from "../Components/Snackbar/actions";

const errorHandler = (dispatch, error) => {
  if (!error.response) {
    return dispatch(setSnackbarMessage("server error"));
  }

  if (Array.isArray(error.response.data.message)) {
    dispatch(
      setSnackbarMessage(
        JSON.stringify(error.response.data.message[0].constraints)
      )
    );
  } else {
    dispatch(setSnackbarMessage(JSON.stringify(error.response.data.message)));
  }
  console.log(error.response.data);
};

export default errorHandler;
