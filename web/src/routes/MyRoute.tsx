import React from 'react';
import { useAuth } from '../hooks/AuthContext';
import { RouteProps, Route, Redirect } from 'react-router-dom';

interface MyRouteProps extends RouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const MyRoute: React.FC<MyRouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={() => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect to={{ pathname: isPrivate ? '/' : '/dashboard' }} />
        );
      }}
    />
  );
};

export default MyRoute;
