import React from 'react';
import GlobalProvider from './hooks';
import Routes from './routes';
import GlobalStyle from './styles/global';
import { BrowserRouter } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <GlobalProvider>
          <Routes />
        </GlobalProvider>

        <GlobalStyle />
      </BrowserRouter>
    </>
  );
};

export default App;
