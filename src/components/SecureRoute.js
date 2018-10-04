import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Auth from '../lib/Auth';
import Flash from '../lib/Flash';

const SecureRoute = ({ component: Component, ...rest }) => {
  if(Auth.isAuthenticated()) return <Route {...rest} component={Component} />;


  Flash.setMessage('danger', 'Not authorized');
  return <Redirect to="/login" />;
};

export default SecureRoute;
