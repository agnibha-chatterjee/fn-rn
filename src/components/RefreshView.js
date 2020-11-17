import React from 'react';
import {
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { Text } from 'react-native-elements';

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
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Text h4 h4Style={styles.h4}>
          {emptyText}
        </Text>
      </ScrollView>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  h4: {
    textAlign: 'center',
  },
});
