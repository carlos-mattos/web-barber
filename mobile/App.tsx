import 'react-native-gesture-handler';
import React from 'react';
import { View, StatusBar } from 'react-native';
import Routes from './src/routes';
import { NavigationContainer } from '@react-navigation/native';
import {
  RobotoSlab_400Regular,
  RobotoSlab_500Medium,
} from '@expo-google-fonts/roboto-slab';
import { useFonts } from 'expo-font';

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
        <StatusBar barStyle='light-content' translucent />
        <Routes />
      </NavigationContainer>
    </>
  );
};

export default App;
