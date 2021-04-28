import React from 'react';
import GlobalProvider from './hooks';
import SignIn from './pages/SignIn';
import GlobalStyle from './styles/global';

const App: React.FC = () => {
  return (
    <>
      <GlobalProvider>
        <SignIn />
      </GlobalProvider>

      <GlobalStyle />
    </>
  );
};

export default App;
