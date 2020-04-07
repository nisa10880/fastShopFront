import React, { useEffect } from 'react';
import { Grid, Tooltip, Typography, Button } from '@material-ui/core';
import * as action from './actions';
import * as globalAction from '../App/actions';
import './Login.css';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import MailIcon from '@material-ui/icons/Mail';
import GTranslateIcon from '@material-ui/icons/GTranslate';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';

const validate = values => {
  const errors: any = {};
  if (!values.username) {
    errors.username = 'Required';
  }

  return errors;
};

const Login = props => {
  const { error, isAuthenticated }: any = useSelector(state => ({ error: state.user.error.message, isAuthenticated: state.user.isAuthenticated }));

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validate,
    onSubmit: async (values, actions) => {
      try {
        await dispatch(action.sendSignIn(values));
        dispatch(globalAction.sendCurrentUserInformation());
      } catch {}
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(push('/'));
    }
  }, []);

  const inputBorderColor = error.length !== 0 ? { borderColor: 'red' } : { borderColor: 'black' };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid justify="center" direction="column" alignItems="center" container>
        <div className="logo" />
        <div style={{ display: 'contents' }}>
          <input
            onChange={formik.handleChange}
            value={formik.values.username}
            style={inputBorderColor}
            className="input"
            type="text"
            placeholder="Enter Username"
            name="username"
            required
          />
          {formik.errors.username ? <div>{formik.errors.username}</div> : null}

          <input
            onChange={formik.handleChange}
            value={formik.values.password}
            style={inputBorderColor}
            className="input"
            type="password"
            placeholder="Enter Password"
            name="password"
            required
          />
          <Typography className="" variant="body1" gutterBottom>
            {error ? <div>{error}</div> : null}
          </Typography>
        </div>

        <Button type="submit" variant="contained" color="primary" className="submit-btn" style={{ borderRadius: 100, marginTop: 40 }}>
          Se connecter
        </Button>
        <Tooltip title="Utilser le login et mot passe ISEP">
          <Typography onClick={() => dispatch(push('/forget-password'))} className="" variant="caption" gutterBottom>
            Forget password
          </Typography>
        </Tooltip>

        <div className="col" style={{ width: '80%', marginTop: 30, marginBottom: 90 }}>
          <button className="fb btn" type="button">
            <FacebookIcon />
            <Typography variant="caption" gutterBottom>
              Login with Facebook
            </Typography>
          </button>
          <button className="google btn" type="button">
            <Typography variant="caption" gutterBottom>
              <GTranslateIcon />
              Login with Google
            </Typography>
          </button>
          <button className="twitter btn" type="button">
            <Typography variant="caption" gutterBottom>
              <TwitterIcon />
              Login with Twitter
            </Typography>
          </button>
          <button onClick={() => dispatch(push('/signup'))} type="button" className="mail btn">
            <Typography variant="caption" gutterBottom>
              <MailIcon />
              Login with Mail
            </Typography>
          </button>
        </div>
      </Grid>
    </form>
  );
};

export default Login;
