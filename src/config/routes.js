import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'react-native-elements';
import { Context as UserContext } from '../contexts/user-context';
import { LoggedInRoutes } from './logged-in-routes';
import { LoggedOutRoutes } from './logged-out-routes';
import firebase from './firebase-config';

export const RootNavigationStack = () => {
  const { checkAuthState, state } = useContext(UserContext);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      checkAuthState(user);
    });
  }, []);
  console.log(state);
  return (
    <ThemeProvider useDark={true}>
      <NavigationContainer>
        {state.authenticated && state.registered ? (
          <LoggedInRoutes />
        ) : (
          <LoggedOutRoutes />
        )}
      </NavigationContainer>
    </ThemeProvider>
  );
};
