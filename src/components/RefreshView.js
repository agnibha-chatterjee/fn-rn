import React from 'react';
import {
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Text,
} from 'react-native';

export const RefreshView = ({
  onRefresh,
  refreshing,
  data,
  renderListItem,
  listKeyExtractor,
  reqSent,
  emptyText,
}) => {
  if (reqSent && data.length > 0) {
    return (
      <>
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
        <Text>{emptyText}</Text>
      </>
    );
  } else {
    return (
      <>
        <ActivityIndicator size='large' color='#222' />
      </>
    );
  }
};

RefreshView.defaultProps = {
  data: [],
  emptyText: '',
  headerTitle: '',
};

const styles = StyleSheet.create({});
