import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../pages/Dashboard';
import Appointment from '../pages/Appointment';
import Profile from '../pages//Profile';
import CreateAppointment from '../pages/CreateAppointment';

const Auth = createStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#312e38' },
      }}
    >
      <Auth.Screen name='Dashboard' component={Dashboard} />
      <Auth.Screen name='Appointment' component={Appointment} />
      <Auth.Screen name='Profile' component={Profile} />
      <Auth.Screen name='CreateAppointment' component={CreateAppointment} />
    </Auth.Navigator>
  );
};

export default AppRoutes;
