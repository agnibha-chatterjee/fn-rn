import React, { useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ListItem, Avatar } from 'react-native-elements';
import { RefreshView } from '../components/RefreshView';
import axios from '../config/axios';
import { Context as UserContext } from '../contexts/user-context';

export const DiscoverScreen = () => {
  const navigation = useNavigation();
  const {
    state: { _id },
  } = useContext(UserContext);
  const [requests, setRequests] = useState([]);
  const [reqSent, setReqSent] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNearbyRequests = async (_id) => {
    try {
      const res = await axios(`/requests/${_id}`, {
        method: 'get',
        headers: { _id },
      });
      setReqSent(true);
      setRequests(res.data);
    } catch (error) {
      Alert.alert('Error fetching requests. Please try again!');
      setReqSent(true);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setReqSent(false);
    fetchNearbyRequests(_id);
    setRefreshing(false);
    setReqSent(true);
  };

  useEffect(() => {
    fetchNearbyRequests(_id);
  }, []);

  const listKeyExtractor = (item) => item.request._id;

  console.log(requests);

  const renderListItem = ({ item }) => {
    const {
      request: { title, requestType, completed },
    } = item;
    return (
      <ListItem
        bottomDivider
        onPress={() => navigation.navigate('HistoryItem', { ...item.request })}>
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
      data={requests}
      renderListItem={renderListItem}
      listKeyExtractor={listKeyExtractor}
      emptyText="Looks like the place you're in is deserted"
    />
  );
};
