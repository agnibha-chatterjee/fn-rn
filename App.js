import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import { Provider as UserProvider } from './src/contexts/user-context';
import { OTPScreen } from './src/screens/OTPScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { RegistrationScreen } from './src/screens/RegistrationScreen';
import { MapScreen } from './src/screens/MapScreen';
import { MaterialIcons } from '@expo/vector-icons';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ThemeProvider useDark={true}>
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {/* <Stack.Screen name='OTP' component={OTPScreen} />
            <Stack.Screen name='Dashboard' component={DashboardScreen} /> */}
            <Stack.Screen name='Registration' component={RegistrationScreen} />
            <Stack.Screen
              name='Map'
              options={({ navigation }) => ({
                headerTitle: 'Choose your location',
                headerRight: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name='done' size={24} color='black' />
                  </TouchableOpacity>
                ),
              })}
              component={MapScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </ThemeProvider>
  );
}
