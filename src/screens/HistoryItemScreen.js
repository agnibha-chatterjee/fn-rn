import React from 'react';
import Card from '../components/Card';
import { StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

export const HistoryItemScreen = () => {
  const details = useRoute().params;
  return (
    <>
      <Card details={details} />
    </>
  );
};

const styles = StyleSheet.create({});
