import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { MapScreen } from '../screens/MapScreen';
import { OTPScreen } from '../screens/OTPScreen';
import { RegistrationScreen } from '../screens/RegistrationScreen';
import { MaterialIcons } from '@expo/vector-icons';

const Stack = createStackNavigator();

export const LoggedOutRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Login' component={OTPScreen} />
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
  );
};
