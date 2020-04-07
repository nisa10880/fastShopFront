import React, { useEffect, useState } from "react";
import {
  Grid,
  Tooltip,
  Typography,
  Button,
  TextField,
  InputAdornment
} from "@material-ui/core";
import * as action from "./actions";
import * as globalAction from "../App/actions";
import "./Login.css";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import MailIcon from "@material-ui/icons/Mail";
import GTranslateIcon from "@material-ui/icons/GTranslate";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { withStyles } from "@material-ui/core/styles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";

const validate = values => {
  const errors: any = {};
  if (!values.username) {
    errors.username = "Required";
  }

  return errors;
};

const LoginWithButton = props => (
  <Button
    variant="contained"
    color="primary"
    startIcon={props.icon}
    style={{
      borderRadius: 8,
      marginTop: 8,
      width: 330,
      height: 48,
      backgroundColor: props.color
    }}
    onClick={props.onClick}
  >
    {props.children}
  </Button>
);

const CustomLoginInput = withStyles({
  root: {
    width: 300,
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: `100px`
      }
    }
  }
})(TextField);

const Login = props => {
  const { error, isAuthenticated }: any = useSelector(state => ({
    error: state.user.error.message,
    isAuthenticated: state.user.isAuthenticated
  }));

  const [values, setValues] = useState({
    showPassword: false
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    validate,
    onSubmit: async (values, actions) => {
      try {
        await dispatch(action.sendSignIn(values));
        dispatch(globalAction.sendCurrentUserInformation());
      } catch {}
    }
  });

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(push("/"));
    }
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid justify="center" direction="column" alignItems="center" container>
        <div className="logo" />
        <div style={{ display: "contents" }}>
          <CustomLoginInput
            onChange={formik.handleChange}
            value={formik.values.username}
            variant="outlined"
            margin="normal"
            required
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />

          <CustomLoginInput
            id="standard-adornment-password"
            type={values.showPassword ? "text" : "password"}
            onChange={formik.handleChange}
            value={formik.values.password}
            name="password"
            label="Password"
            variant="outlined"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          {/* {formik.errors.username ? <div>{formik.errors.username}</div> : null} 

          <Typography className="" variant="body1" gutterBottom>
            {error ? <div>{error}</div> : null}
          </Typography>*/}
        </div>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<Visibility />}
          style={{ borderRadius: 100, marginTop: 40, width: 300, height: 48 }}
        >
          Se connecter
        </Button>

        <Tooltip title="Utilser le login et mot passe ISEP">
          <Typography
            onClick={() => dispatch(push("/forget-password"))}
            className=""
            variant="caption"
            gutterBottom
          >
            Forget password
          </Typography>
        </Tooltip>

        <LoginWithButton icon={<FacebookIcon />} color="blue">
          Login with Facebook
        </LoginWithButton>
        <LoginWithButton icon={<GTranslateIcon />} color="orange">
          Login with Google
        </LoginWithButton>
        <LoginWithButton icon={<TwitterIcon />} color="cyan">
          Login with Twitter
        </LoginWithButton>
        <LoginWithButton
          icon={<MailIcon />}
          color="black"
          onClick={() => dispatch(push("/signup"))}
        >
          Login with Mail
        </LoginWithButton>
      </Grid>
    </form>
  );
};

export default Login;
