import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { DashboardScreen } from '../screens/DashboardScreen';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { HistoryScreen } from '../screens/HistoryScreen';
import { EditProfileScreen } from '../screens/EditProfileScreen';
import { DiscoverScreen } from '../screens/DiscoverScreen';
import { MapScreen } from '../screens/MapScreen';
import { RequestScreen } from '../screens/RequestScreen';

const Tab = createBottomTabNavigator();
const EditProfileStack = createStackNavigator();
const HistoryStack = createStackNavigator();
const DashboardStack = createStackNavigator();

const EditProfileStackScreen = () => {
  return (
    <EditProfileStack.Navigator>
      <EditProfileStack.Screen
        name='Edit Profile'
        component={EditProfileScreen}
        options={{ header: () => null }}
      />
      <EditProfileStack.Screen
        name='Map'
        options={{ headerTitle: 'Choose your location' }}
        component={MapScreen}
      />
    </EditProfileStack.Navigator>
  );
};

const HistoryStackScreen = () => {
  return (
    <HistoryStack.Navigator headerMode='none'>
      <HistoryStack.Screen name='History' component={HistoryScreen} />
    </HistoryStack.Navigator>
  );
};

const DashboardStackScreen = () => {
  return (
    <DashboardStack.Navigator headerMode='none'>
      <DashboardStack.Screen name='Dashboard' component={DashboardScreen} />
      <DashboardStack.Screen name='Request' component={RequestScreen} />
    </DashboardStack.Navigator>
  );
};

export const LoggedInRoutes = () => {
  const getTabBarVisibility = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';

    if (routeName === 'Map') {
      return false;
    }

    return true;
  };
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Dashboard'
        options={{
          tabBarIcon: () => (
            <MaterialIcons name='dashboard' size={24} color='black' />
          ),
        }}
        component={DashboardStackScreen}
      />
      <Tab.Screen
        name='Discover'
        options={{
          tabBarIcon: () => (
            <FontAwesome5 name='globe' size={24} color='black' />
          ),
        }}
        component={DiscoverScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <MaterialIcons name='history' size={24} color='black' />
          ),
        }}
        name='History'
        component={HistoryStackScreen}
      />
      <Tab.Screen
        options={({ route }) => ({
          tabBarVisible: getTabBarVisibility(route),
          tabBarIcon: () => (
            <MaterialIcons name='edit' size={24} color='black' />
          ),
        })}
        name='Edit'
        component={EditProfileStackScreen}
      />
    </Tab.Navigator>
  );
};
