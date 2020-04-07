import React, { useState } from 'react';
import { Grid, Button, IconButton, InputAdornment, OutlinedInput, Typography } from '@material-ui/core';
import * as action from './actions';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useSelector, useDispatch } from 'react-redux';

const ChangePassword = props => {
  const { error, passwordResetToken }: any = useSelector(state => ({
    error: state.user.error.message,
    passwordResetToken: state.router.location.search,
  }));
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState({ password: '' });

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(action.sendChangePassword({ password: state.password }, passwordResetToken));
  };

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  let passwordError = false;
  let errorMessage;
  if (error[0]) {
    passwordError = true;
  }

  if (Array.isArray(error)) {
    errorMessage = (
      <div style={{ marginBottom: 100 }}>
        {' '}
        {error.map(error => {
          if (error.property === 'password') {
            passwordError = true;
          }
          return Object.keys(error.constraints).map((key, index) => (
            <Typography key={key} variant="body1">
              {error.constraints[key]}
            </Typography>
          ));
        })}
      </div>
    );
  }

  return (
    <Grid justify="center" direction="column" alignItems="center" container style={{ marginTop: 50 }}>
      <form onSubmit={handleSubmit} style={{ marginBottom: 100, display: 'contents' }}>
        <OutlinedInput
          className="input"
          placeholder="password"
          id="outlined-adornment-password"
          style={{ borderRadius: 100 }}
          type={showPassword ? 'text' : 'password'}
          value={state.password}
          error={passwordError}
          onChange={handleChange('password')}
          name="password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          labelWidth={70}
        />

        <Button type="submit" variant="contained" color="primary" className="submit-btn" style={{ borderRadius: 100, marginTop: 40 }}>
          Change Password
        </Button>
        {errorMessage}
      </form>
    </Grid>
  );
};

export default ChangePassword;
