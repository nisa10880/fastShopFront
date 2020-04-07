import React from "react";
import { Snackbar, SnackbarContent } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { closeSnackbar } from "../../Components/Snackbar/actions";
import { useDispatch } from "react-redux";

const CustomSnackbarContent = withStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    width: "100%",
    color: "white",
    height: 200,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
  }
})(SnackbarContent);

interface Props {
  open: boolean;
  message: any;
}

const CustomSnackbar = (props: Props) => {
  const dispatch = useDispatch();
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      style={{ width: "100%" }}
      open={props.open}
      autoHideDuration={4000}
      onClose={() => dispatch(closeSnackbar())}
    >
      <CustomSnackbarContent message={props.message} />
    </Snackbar>
  );
};

export default CustomSnackbar;
