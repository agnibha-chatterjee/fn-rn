import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const DashboardScreen = ({ loading, firebaseUser }) => {
  if (!loading && !firebaseUser) {
    return (
      <View>
        <Text>Fetching details.....</Text>
      </View>
    );
  }
  return (
    <View>
      <Text>Dashboard Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
