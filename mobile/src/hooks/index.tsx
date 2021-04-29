import { AuthProvider } from './AuthContext';
import React from 'react';

const GlobalProvider: React.FC = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default GlobalProvider;
