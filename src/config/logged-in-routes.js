import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { DashboardScreen } from '../screens/DashboardScreen';
import { MaterialIcons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { HistoryScreen } from '../screens/HistoryScreen';
import { HistoryItemScreen } from '../screens/HistoryItemScreen';
import { EditProfileScreen } from '../screens/EditProfileScreen';
import { DiscoverScreen } from '../screens/DiscoverScreen';
import { MapScreen } from '../screens/MapScreen';
import { RequestScreen } from '../screens/RequestScreen';
import { CustomHeader as Header } from '../components/Header';
import {
  CustomLeftComponentDashboard,
  CommonLeftComponent,
} from '../components/HeaderLeftComponent';
import { CustomRightComponent } from '../components/HeaderRightComponent';

const Tab = createBottomTabNavigator();
const EditProfileStack = createStackNavigator();
const HistoryStack = createStackNavigator();
const DashboardStack = createStackNavigator();
const DiscoverStack = createStackNavigator();

const EditProfileStackScreen = () => {
  return (
    <EditProfileStack.Navigator
      screenOptions={{
        header: () => <Header title='Edit Profile' />,
      }}>
      <EditProfileStack.Screen
        name='Edit Profile'
        component={EditProfileScreen}
      />
      <EditProfileStack.Screen
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
    </EditProfileStack.Navigator>
  );
};

const DiscoverStackScreen = () => {
  return (
    <DiscoverStack.Navigator
      screenOptions={{
        header: () => <Header title='Discover' />,
      }}>
      <DiscoverStack.Screen name='Discover' component={DiscoverScreen} />
    </DiscoverStack.Navigator>
  );
};

const HistoryStackScreen = () => {
  return (
    <HistoryStack.Navigator
      screenOptions={{
        header: () => <Header title='History' />,
      }}>
      <HistoryStack.Screen name='History' component={HistoryScreen} />
      <HistoryStack.Screen
        name='HistoryItem'
        options={({ route }) => ({
          header: () => (
            <Header
              title={route.params.title}
              leftComponent={CommonLeftComponent}
            />
          ),
        })}
        component={HistoryItemScreen}
      />
    </HistoryStack.Navigator>
  );
};

const DashboardStackScreen = () => {
  return (
    <DashboardStack.Navigator
      screenOptions={{
        header: () => (
          <Header
            title='Dashboard'
            leftComponent={CustomLeftComponentDashboard}
            rightComponent={CustomRightComponent}
          />
        ),
      }}>
      <DashboardStack.Screen name='Dashboard' component={DashboardScreen} />
      <DashboardStack.Screen
        options={{
          header: () => (
            <Header
              title='New Request/Offering'
              leftComponent={CommonLeftComponent}
            />
          ),
        }}
        name='Request'
        component={RequestScreen}
      />
      <DashboardStack.Screen
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
    </DashboardStack.Navigator>
  );
};

export const LoggedInRoutes = () => {
  const getTabBarVisibility = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route);

    if (routeName === 'Map') {
      return false;
    }

    return true;
  };
  return (
    <Tab.Navigator tabBarOptions={{ keyboardHidesTabBar: true }}>
      <Tab.Screen
        name='Dashboard'
        options={({ route }) => ({
          tabBarVisible: getTabBarVisibility(route),
          tabBarIcon: () => (
            <MaterialIcons name='dashboard' size={24} color='black' />
          ),
        })}
        component={DashboardStackScreen}
      />
      <Tab.Screen
        name='Discover'
        options={{
          tabBarIcon: () => (
            <FontAwesome5 name='globe' size={24} color='black' />
          ),
        }}
        component={DiscoverStackScreen}
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
            <FontAwesome name='user-circle-o' size={24} color='black' />
          ),
        })}
        name='Profile'
        component={EditProfileStackScreen}
      />
    </Tab.Navigator>
  );
};
