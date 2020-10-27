import React from 'react';
import { StyleSheet } from 'react-native';
import { CustomHeader as Header } from '../components/Header';
import { RequestForm } from '../components/RequestForm';

export const RequestScreen = () => {
  return (
    <>
      <Header title='New Request/Offering' />
      <RequestForm />
    </>
  );
};

const styles = StyleSheet.create({});
