import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';

const CustomAppBar = props => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.toolbar}>
      <Toolbar variant="dense">
        <IconButton edge="start" aria-label="menu" onClick={() => history.goBack()}>
          <ArrowBackIcon
            style={{
              width: 24,
              height: 24,
            }}
          />
        </IconButton>

        <NotificationsNoneIcon
          style={{
            right: 8,
            position: 'fixed',
            width: 24,
            height: 24,
            color: 'rgba(0, 0, 0, 0.54)',
          }}
        />
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles(theme => ({
  toolbar: {
    boxShadow: 'none',
    backgroundColor: '#ffffff00',
  },
}));

export default CustomAppBar;
