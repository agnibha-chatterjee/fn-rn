import React, { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { RefreshView } from '../components/RefreshView';
import axios from '../config/axios';
import { Context as UserContext } from '../contexts/user-context';

export const HistoryScreen = () => {
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
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchUserHistory(_id);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchUserHistory(_id);
  }, []);

  const listKeyExtractor = (item) => item.request._id;

  const renderListItem = ({ item }) => {
    const {
      request: { title, requestType, completed },
    } = item;
    return (
      <ListItem bottomDivider>
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
      headerTitle='History'
      onRefresh={onRefresh}
      refreshing={refreshing}
      data={history}
      renderListItem={renderListItem}
      listKeyExtractor={listKeyExtractor}
    />
  );
};

const styles = StyleSheet.create({});
