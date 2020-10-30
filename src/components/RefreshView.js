import React from 'react';
import {
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Text,
} from 'react-native';
import { CustomHeader as Header } from './Header';

export const RefreshView = ({
  headerTitle,
  onRefresh,
  refreshing,
  data,
  renderListItem,
  listKeyExtractor,
  reqSent,
}) => {
  if (reqSent && data.length > 0) {
    return (
      <>
        <Header title={headerTitle} />
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={data}
          renderItem={renderListItem}
          keyExtractor={listKeyExtractor}
        />
      </>
    );
  } else if (reqSent && !data.length) {
    return (
      <>
        <Header title={headerTitle} />
        <Text>You have made no requests</Text>
      </>
    );
  } else {
    return (
      <>
        <Header title={headerTitle} />
        <ActivityIndicator size='large' color='#222' />
      </>
    );
  }
};

const styles = StyleSheet.create({});
