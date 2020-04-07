import React, { useState } from 'react';
import { Grid, Button, Typography } from '@material-ui/core';
import * as action from './actions';
import { useDispatch, useSelector } from 'react-redux';

interface State {
  mail: string;
}

const ChangePassword = props => {
  const { error }: any = useSelector(state => ({ error: state.user.error.message }));

  const [state, setState] = useState({
    mail: '',
  });

  const dispatch = useDispatch();

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(action.sendResetPassword({ mail: state.mail }));
  };

  let borderColor = {};
  let errorMessage = '';
  if (error[0]) {
    borderColor = { borderColor: 'red' };
    errorMessage = error[0].property;
  }

  return (
    <Grid justify="center" direction="column" alignItems="center" container style={{ marginTop: 50 }}>
      <form onSubmit={handleSubmit} style={{ marginBottom: 100, display: 'contents' }}>
        <input
          onChange={handleChange('mail')}
          style={borderColor}
          className="input"
          type="text"
          placeholder="Enter Mail"
          value={state.mail}
          name="mail"
          required
        />
        <Button type="submit" variant="contained" color="primary" className="submit-btn" style={{ borderRadius: 100, marginTop: 40 }}>
          Send Mail
        </Button>

        <Typography className="" variant="body1" gutterBottom>
          {' '}
          {errorMessage}{' '}
        </Typography>
      </form>
    </Grid>
  );
};

export default ChangePassword;
