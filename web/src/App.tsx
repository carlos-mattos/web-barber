import React from 'react';
import { AuthProvider } from './context/AuthContext';
import SignIn from './pages/SignIn';
import GlobalStyle from './styles/global';

const App: React.FC = () => {
  return (
    <>
      <AuthProvider>
        <SignIn />
      </AuthProvider>
      <GlobalStyle />
    </>
  );
};

export default App;
