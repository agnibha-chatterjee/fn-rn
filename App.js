import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from 'react-native-elements';
import { OTPScreen } from './src/screens/OTPScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ThemeProvider useDark={true}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='OTP' component={OTPScreen} />
          <Stack.Screen name='Dashboard' component={DashboardScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
