import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import { OTPScreen } from '../screens/OTPScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { RegistrationScreen } from '../screens/RegistrationScreen';
import { MapScreen } from '../screens/MapScreen';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import firebase from './firebase-config';
import { Context as UserContext } from '../contexts/user-context';

const Stack = createStackNavigator();

export const RootNavigationStack = () => {
  const { state } = useContext(UserContext);
  console.log(state);
  return (
    <ThemeProvider useDark={true}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Dashboard'
            options={{
              headerRight: () => (
                <TouchableOpacity
                  onPress={async () => {
                    await firebase.auth().signOut();
                  }}>
                  <MaterialCommunityIcons
                    name='logout'
                    size={24}
                    color='black'
                  />
                </TouchableOpacity>
              ),
            }}
            component={DashboardScreen}
          />
          <Stack.Screen name='OTP' component={OTPScreen} />
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
    </ThemeProvider>
  );
};
