import React from 'react';
import ToastContainer from './components/ToastContainer';
import { AuthProvider } from './hooks/AuthContext';
import SignIn from './pages/SignIn';
import GlobalStyle from './styles/global';

const App: React.FC = () => {
  return (
    <>
      <AuthProvider>
        <SignIn />
      </AuthProvider>

      <ToastContainer />

      <GlobalStyle />
    </>
  );
};

export default App;
