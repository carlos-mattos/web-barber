import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import Routes from './src/routes/index';
import { NavigationContainer } from '@react-navigation/native';
import {
  RobotoSlab_400Regular,
  RobotoSlab_500Medium,
} from '@expo-google-fonts/roboto-slab';
import { useFonts } from 'expo-font';
import GlobalProvider from './src/hooks';

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    RobotoSlab_400Regular,
    RobotoSlab_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <NavigationContainer>
        <StatusBar
          barStyle='light-content'
          translucent
          backgroundColor='#312e38'
        />
        <GlobalProvider>
          <Routes />
        </GlobalProvider>
      </NavigationContainer>
    </>
  );
};

export default App;
