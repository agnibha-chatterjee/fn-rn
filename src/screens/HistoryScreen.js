import React, { useContext, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { CustomHeader as Header } from '../components/Header';
import { Context as UserContext } from '../contexts/user-context';

export const HistoryScreen = () => {
  const { state } = useContext(UserContext);
  useEffect(() => {
    console.log('FROM HISTORY', state._id);
  });
  return (
    <>
      <Header title='History' />
    </>
  );
};

const styles = StyleSheet.create({});
