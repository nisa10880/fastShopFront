import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const PrivateRoute = ({ component, auth, ...rest }) => {
  const ComponentToRender = component;

  return <Route {...rest} render={props => (auth ? <ComponentToRender {...props} /> : <Redirect to={{ pathname: '/login' }} />)} />;
};

const mapStateToProps = (state, ownProps) => ({ auth: state.user.isAuthenticated });

export default withRouter(connect(mapStateToProps)(PrivateRoute));
