import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MapScreen } from '../screens/MapScreen';
import { OTPScreen } from '../screens/OTPScreen';
import { RegistrationScreen } from '../screens/RegistrationScreen';
import { CustomHeader as Header } from '../components/Header';
import { CommonLeftComponent } from '../components/HeaderLeftComponent';

const Stack = createStackNavigator();

export const LoggedOutRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Login'
        options={{ header: () => null }}
        component={OTPScreen}
      />
      <Stack.Screen
        name='Registration'
        options={{
          header: () => (
            <Header title='Register' leftComponent={CommonLeftComponent} />
          ),
        }}
        component={RegistrationScreen}
      />
      <Stack.Screen
        name='Map'
        options={{
          header: () => (
            <Header
              title='Choose your location'
              leftComponent={CommonLeftComponent}
            />
          ),
        }}
        component={MapScreen}
      />
    </Stack.Navigator>
  );
};
