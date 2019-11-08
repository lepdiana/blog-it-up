import React from 'react';
import { withAuth, } from '../context/AuthProvider'
import {Route, Redirect} from 'react-router-dom'


function ProtectedRoute(props) {
  const {component: Component, ...rest} = props



  return (

    props.token ? 
      <Route {...rest} component={Component} />
      :
      <Redirect to='login' />
  );
};

export default withAuth(ProtectedRoute);