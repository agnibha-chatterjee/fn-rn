import React, { useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ListItem, Avatar } from 'react-native-elements';
import { RefreshView } from '../components/RefreshView';
import axios from '../config/axios';
import { Context as UserContext } from '../contexts/user-context';

export const HistoryScreen = () => {
  const navigation = useNavigation();
  const {
    state: { _id },
  } = useContext(UserContext);
  const [history, setHistory] = useState([]);
  const [reqSent, setReqSent] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchUserHistory = async (_id) => {
    try {
      const res = await axios(`/requests/history/${_id}`, {
        method: 'get',
        headers: { _id },
      });
      setReqSent(true);
      setHistory(res.data);
    } catch (error) {
      Alert.alert('Error fetching your history. Please try again!');
      setReqSent(true);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchUserHistory(_id);
    setRefreshing(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchUserHistory(_id);
    });
    return unsubscribe;
  }, [navigation]);

  const listKeyExtractor = (item) => item.request._id;

  const renderListItem = ({ item }) => {
    const {
      request: { title, requestType, completed },
    } = item;
    return (
      <ListItem
        bottomDivider
        onPress={() =>
          navigation.navigate('HistoryItem', {
            ...item,
          })
        }>
        <Avatar
          rounded
          icon={
            completed
              ? { name: 'check-circle', color: 'green', type: 'font-awesome' }
              : {
                  name: 'times-circle',
                  color: 'firebrick',
                  type: 'font-awesome',
                }
          }
        />
        <ListItem.Content>
          <ListItem.Title>{title}</ListItem.Title>
          <ListItem.Subtitle>{requestType}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron color='black' />
      </ListItem>
    );
  };

  return (
    <RefreshView
      reqSent={reqSent}
      onRefresh={onRefresh}
      refreshing={refreshing}
      data={history}
      renderListItem={renderListItem}
      listKeyExtractor={listKeyExtractor}
      emptyText="Looks like you've made no requests so far"
    />
  );
};
