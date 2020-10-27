import React from 'react';
import { StyleSheet } from 'react-native';
import { CustomHeader as Header } from '../components/Header';
import { UserForm } from '../components/UserForm';

export const EditProfileScreen = () => {
  return (
    <>
      <Header title='Edit Profile' />
      <UserForm buttonTitle='Save' />
    </>
  );
};

const styles = StyleSheet.create({});
