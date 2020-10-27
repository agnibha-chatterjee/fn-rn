import React, { useContext } from 'react';
import { StyleSheet, Text } from 'react-native';
import { CustomHeader as Header } from '../components/Header';
import { CustomLeftComponent } from '../components/HeaderLeftComponent';
import { Context as UserContext } from '../contexts/user-context';

export const DashboardScreen = () => {
  const { state } = useContext(UserContext);
  return (
    <>
      <Header title='Dashboard' leftComponent={CustomLeftComponent} />
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
