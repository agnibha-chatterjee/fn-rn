import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DashboardScreen } from '../screens/DashboardScreen';
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import { HistoryScreen } from '../screens/HistoryScreen';
import { EditProfileScreen } from '../screens/EditProfileScreen';
import { RequestScreen } from '../screens/Request';

const Tab = createBottomTabNavigator();

export const LoggedInRoutes = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Dashboard'
        options={{
          tabBarIcon: () => (
            <MaterialIcons name='dashboard' size={24} color='black' />
          ),
        }}
        component={DashboardScreen}
      />
      <Tab.Screen
        name='Request'
        options={{
          tabBarIcon: () => (
            <Octicons name='request-changes' size={24} color='black' />
          ),
        }}
        component={RequestScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <MaterialIcons name='history' size={24} color='black' />
          ),
        }}
        name='History'
        component={HistoryScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <MaterialIcons name='edit' size={24} color='black' />
          ),
        }}
        name='Edit'
        component={EditProfileScreen}
      />
    </Tab.Navigator>
  );
};
