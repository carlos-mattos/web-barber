import { AuthProvider } from './AuthContext';
import { ToastProvider } from './ToastContext';
import React from 'react';

const GlobalProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
  );
};

export default GlobalProvider;
