import React, { useContext } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Context as UserContext } from '../contexts/user-context';

export const DashboardScreen = () => {
  const { state } = useContext(UserContext);
  return (
    <>
      <Text style={styles.name}>Hello {state.firstName}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  name: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 30,
  },
});
