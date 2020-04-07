import React, { useState } from 'react';
import { Grid, Button, IconButton, InputAdornment, OutlinedInput, MobileStepper, Typography } from '@material-ui/core';
import * as action from './actions';
import RadioGender from './RadioGender';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';

export enum UserSexe {
  M = 'M',
  F = 'F',
  Other = 'Other',
}

export enum UserRole {
  user = 'user',
  admin = 'admin',
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
    errors.username = 'Required';
  }
  if (!values.last_name) {
    errors.last_name = 'Required';
  }
  if (!values.age) {
    errors.age = 'Required';
  }
  if (!values.sexe) {
    errors.sexe = 'Required';
  }

  return errors;
};

const SignUp = props => {
  const { error }: any = useSelector(state => ({ error: state.user.error.message }));

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      username: '',
      password: '',
      mail: '',
      imgUrl: '',
      phone_number: 0,
      age: 0,
      sexe: UserSexe.M,
      user_type: UserRole.user,
      activated: false,
      about: '',
      activation_code: 0,
    },
    validate,
    enableReinitialize: true,
    onSubmit: async (values, actions) => {
      try {
        await dispatch(action.sendSignUp(values));
        setCurrentStep(currentStep + 1);
      } catch {}
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handleSubmitVerify = e => {
    e.preventDefault();
    const userData = { username: formik.values.username, activation_code: formik.values.activation_code };
    dispatch(action.sendActivateAccount(userData));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
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
        {' '}
        {error.map(err => {
          if (err.property === 'password') {
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
    <Grid justify="center" direction="column" alignItems="center" container style={{ marginTop: 50 }}>
      <form onSubmit={formik.handleSubmit} style={{ marginBottom: 100, display: 'contents' }}>
        {currentStep === 0 ? (
          <>
            <input
              onChange={formik.handleChange}
              className="input"
              type="text"
              placeholder="first_name"
              value={formik.values.first_name}
              name="first_name"
              required
            />
            <input
              onChange={formik.handleChange}
              className="input"
              type="text"
              placeholder="last_name"
              value={formik.values.last_name}
              name="last_name"
              required
            />
            <input
              onChange={formik.handleChange}
              style={{ borderColor: formik.errors.username ? 'red' : 'green' }}
              className="input"
              type="text"
              placeholder="username"
              value={formik.values.username}
              name="username"
              required
            />
            <input onChange={formik.handleChange} className="input" type="text" placeholder="age" value={formik.values.age} name="age" required />
            <RadioGender onChange={formik.handleChange} value={formik.values.sexe} />
          </>
        ) : null}

        {currentStep === 1 ? (
          <>
            <input onChange={formik.handleChange} className="input" type="text" placeholder="mail" value={formik.values.mail} name="mail" required />
            <input
              onChange={formik.handleChange}
              className="input"
              type="text"
              placeholder="phone_number"
              value={formik.values.phone_number}
              name="phone_number"
              required
            />
            <OutlinedInput
              className="input"
              placeholder="password"
              id="outlined-adornment-password"
              style={{ borderRadius: 100 }}
              type={showPassword ? 'text' : 'password'}
              value={formik.values.password}
              error={passwordError}
              onChange={formik.handleChange}
              name="password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
            <OutlinedInput
              className="input"
              placeholder="password"
              id="outlined-adornment-password-confirm"
              style={{ borderRadius: 100 }}
              type={showPassword ? 'text' : 'password'}
              value={formik.values.password}
              error={passwordError}
              onChange={formik.handleChange}
              name="password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
            <Button type="submit" variant="contained" color="primary" className="submit-btn" style={{ borderRadius: 100, marginTop: 40 }}>
              Send
            </Button>
            {errorMessage}
          </>
        ) : null}
      </form>

      <form onSubmit={handleSubmitVerify} style={{ marginBottom: 100, display: 'contents' }}>
        {currentStep === 2 ? (
          <>
            <input
              onChange={formik.handleChange}
              className="input"
              type="text"
              placeholder="activation_code"
              value={formik.values.activation_code}
              name="activation_code"
              required
            />
            <Button type="submit" variant="contained" color="primary" className="submit-btn" style={{ borderRadius: 100, marginTop: 40 }}>
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
        style={{ position: 'fixed', bottom: 80 }}
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
