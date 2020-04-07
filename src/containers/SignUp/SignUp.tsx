import React, { useState } from "react";
import {
  Grid,
  withStyles,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  MobileStepper,
  Typography
} from "@material-ui/core";
import * as action from "./actions";
import RadioGender from "./RadioGender";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";

export enum UserSexe {
  M = "M",
  F = "F",
  Other = "Other"
}

export enum UserRole {
  user = "user",
  admin = "admin"
}

interface State {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  mail: string;
  imgUrl: string;
  phone_number: number;
  age: number;
  sexe: UserSexe;
  user_type: UserRole;
  activated: boolean;
  about: string;
  activation_code: number;

  showPassword: boolean;

  currentStep: number;
}

const validate = values => {
  const errors: any = {};
  if (values.username.length < 5) {
    errors.username = "Required";
  }
  if (!values.last_name) {
    errors.last_name = "Required";
  }
  if (!values.age) {
    errors.age = "Required";
  }
  if (!values.sexe) {
    errors.sexe = "Required";
  }

  return errors;
};

const Input = withStyles({
  root: {
    margin: 8,
    width: 300,
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: `100px`
      }
    }
  }
})(TextField);

const SignUp = props => {
  const { error }: any = useSelector(state => ({
    error: state.user.error.message
  }));

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      username: "",
      password: "",
      mail: "",
      imgUrl: "",
      phone_number: 0,
      age: 0,
      sexe: UserSexe.M,
      user_type: UserRole.user,
      activated: false,
      about: "",
      activation_code: 0
    },
    validate,
    enableReinitialize: true,
    onSubmit: async (values, actions) => {
      try {
        await dispatch(action.sendSignUp(values));
        setCurrentStep(currentStep + 1);
      } catch {}
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handleSubmitVerify = e => {
    e.preventDefault();
    const userData = {
      username: formik.values.username,
      activation_code: formik.values.activation_code
    };
    dispatch(action.sendActivateAccount(userData));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const _next = () => {
    setCurrentStep(currentStep + 1);
  };

  const _prev = () => {
    setCurrentStep(currentStep - 1);
  };

  let errorMessage;

  let passwordError = false;

  if (Array.isArray(error)) {
    errorMessage = (
      <div style={{ marginBottom: 100 }}>
        {" "}
        {error.map(err => {
          if (err.property === "password") {
            passwordError = true;
          }
          return Object.keys(err.constraints).map((key, index) => (
            <Typography key={key} variant="body1">
              {err.constraints[key]}
            </Typography>
          ));
        })}
      </div>
    );
  }

  return (
    <Grid
      justify="center"
      direction="column"
      alignItems="center"
      container
      style={{ marginTop: 50 }}
    >
      <form
        onSubmit={formik.handleSubmit}
        style={{ marginBottom: 100, display: "contents" }}
      >
        {currentStep === 0 ? (
          <>
            <Input
              onChange={formik.handleChange}
              value={formik.values.first_name}
              type="text"
              label="first name"
              name="first_name"
              variant="outlined"
              required
            />
            <Input
              onChange={formik.handleChange}
              value={formik.values.last_name}
              type="text"
              label="last name"
              name="last_name"
              variant="outlined"
              required
            />
            <Input
              onChange={formik.handleChange}
              value={formik.values.username}
              style={{ borderColor: formik.errors.username ? "red" : "green" }}
              type="text"
              label="username"
              name="username"
              variant="outlined"
              required
            />
            <Input
              onChange={formik.handleChange}
              value={formik.values.age}
              type="text"
              label="age"
              variant="outlined"
              name="age"
              required
            />
            <RadioGender
              onChange={formik.handleChange}
              value={formik.values.sexe}
            />
          </>
        ) : null}

        {currentStep === 1 ? (
          <>
            <Input
              onChange={formik.handleChange}
              type="text"
              label="mail"
              value={formik.values.mail}
              name="mail"
              variant="outlined"
              required
            />
            <Input
              onChange={formik.handleChange}
              value={formik.values.phone_number}
              type="text"
              label="phone number"
              name="phone_number"
              variant="outlined"
              required
            />
            <Input
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
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
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="submit-btn"
              style={{ borderRadius: 100, marginTop: 40 }}
            >
              Send
            </Button>
            {errorMessage}
          </>
        ) : null}
      </form>

      <form
        onSubmit={handleSubmitVerify}
        style={{ marginBottom: 100, display: "contents" }}
      >
        {currentStep === 2 ? (
          <>
            <Input
              onChange={formik.handleChange}
              value={formik.values.activation_code}
              type="text"
              placeholder="activation_code"
              name="activation_code"
              variant="outlined"
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="submit-btn"
              style={{ borderRadius: 100, marginTop: 40 }}
            >
              Verify
            </Button>
          </>
        ) : null}
      </form>

      <MobileStepper
        variant="dots"
        steps={3}
        position="static"
        activeStep={currentStep}
        style={{ position: "fixed", bottom: 80 }}
        nextButton={
          <Button size="small" onClick={_next} disabled={currentStep === 2}>
            Next
            {<KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={_prev} disabled={currentStep === 0}>
            {<KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
    </Grid>
  );
};

export default SignUp;
