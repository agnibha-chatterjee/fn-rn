import React, { useContext, useState } from 'react';
import Card from '../components/Card';
import { StyleSheet, FlatList, Text as RNText, Alert } from 'react-native';
import { Text, ListItem, Avatar, BottomSheet } from 'react-native-elements';
import { useRoute } from '@react-navigation/native';
import axios from '../config/axios';
import { Context as UserContext } from '../contexts/user-context';

export const HistoryItemScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const { state } = useContext(UserContext);
  const details = useRoute().params;
  const { users, request } = details;

  const acceptUser = async () => {
    try {
      const res = await axios.patch(
        `/requests/${request._id}/respond/${selectedId}`,
        {
          headers: {
            _id: state._id,
          },
        }
      );
      if (res.data.success) {
        Alert.alert('Successful!');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('We ran into an error! Please try again.');
    }
    setIsVisible(false);
  };

  const list = [
    {
      title: 'Accept',
      containerStyle: { backgroundColor: 'darkgreen' },
      titleStyle: { color: 'white' },
      onPress: acceptUser,
    },
    {
      title: 'Cancel',
      containerStyle: { backgroundColor: 'firebrick' },
      titleStyle: { color: 'white' },
      onPress: () => setIsVisible(false),
    },
  ];

  const listKeyExtractor = (item) => item._id;

  const renderListItem = ({ item }) => {
    const { _id, firstName, contactNumber, profilePicture } = item;
    return (
      <ListItem
        bottomDivider
        onPress={() => {
          setIsVisible(true);
          setSelectedId(_id);
        }}
        disabled={request.acceptedUser ? true : false}>
        <Avatar source={{ uri: profilePicture }} rounded size='medium' />
        <ListItem.Content>
          <ListItem.Title>{firstName}</ListItem.Title>
          <ListItem.Subtitle>{contactNumber}</ListItem.Subtitle>
          {request.acceptedUser === _id ? <RNText>Accepted user</RNText> : null}
        </ListItem.Content>
        <ListItem.Chevron color='black' />
      </ListItem>
    );
  };

  return (
    <>
      <Card details={request} />
      {users.length ? (
        <>
          <RNText style={styles.title}>Users who have responded</RNText>
          <FlatList
            style={styles.list}
            keyExtractor={listKeyExtractor}
            data={users}
            renderItem={renderListItem}
          />
          <BottomSheet isVisible={isVisible}>
            {list.map((l, i) => (
              <ListItem
                key={i}
                containerStyle={l.containerStyle}
                onPress={l.onPress}>
                <ListItem.Content>
                  <ListItem.Title style={l.titleStyle}>
                    {l.title}
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))}
          </BottomSheet>
        </>
      ) : (
        <Text h4 h4Style={styles.empty}>
          No one has responded LOL!
        </Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  empty: {
    textAlign: 'center',
    marginTop: 25,
  },
  title: {
    fontSize: 16,
    marginLeft: 18,
    marginTop: 25,
    marginBottom: -10,
  },
  list: {
    margin: 15,
  },
});
