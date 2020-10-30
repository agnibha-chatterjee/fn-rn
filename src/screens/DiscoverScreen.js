import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { RefreshView } from '../components/RefreshView';

export const DiscoverScreen = () => {
  return (
    <RefreshView headerTitle='Discover'>
      <Text>Discover screen</Text>
    </RefreshView>
  );
};

const styles = StyleSheet.create({});
