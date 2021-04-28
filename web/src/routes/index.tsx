import React from 'react';
import { Switch } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import MyRoute from './MyRoute';

const Routes: React.FC = () => {
  return (
    <Switch>
      <MyRoute path="/" exact component={SignIn} />
      <MyRoute path="/signup" component={SignUp} />
      <MyRoute path="/dashboard" component={Dashboard} isPrivate />
    </Switch>
  );
};

export default Routes;
