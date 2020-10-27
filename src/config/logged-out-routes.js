import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MapScreen } from '../screens/MapScreen';
import { OTPScreen } from '../screens/OTPScreen';
import { RegistrationScreen } from '../screens/RegistrationScreen';

const Stack = createStackNavigator();

export const LoggedOutRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Login' component={OTPScreen} />
      <Stack.Screen name='Registration' component={RegistrationScreen} />
      <Stack.Screen
        name='Map'
        options={{ headerTitle: 'Choose your location' }}
        component={MapScreen}
      />
    </Stack.Navigator>
  );
};
