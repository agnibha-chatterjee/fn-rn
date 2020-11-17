import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Text, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'react-native-elements';
import { Context as UserContext } from '../contexts/user-context';
import { LoggedInRoutes } from './logged-in-routes';
import { LoggedOutRoutes } from './logged-out-routes';
import firebase from './firebase-config';

export const RootNavigationStack = () => {
  const { checkAuthState, state } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      checkAuthState(user, () => setLoading(false));
    });
  }, []);
  console.log(state);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size='large' color='#222' />
        <Text>Checking your login state</Text>
      </View>
    );
  }

  return (
    <ThemeProvider>
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

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
