import React, { useState } from 'react';
import Card from '../components/Card';
import { StyleSheet, FlatList, Text as RNText } from 'react-native';
import { Text, ListItem, Avatar, BottomSheet } from 'react-native-elements';
import { useRoute } from '@react-navigation/native';

export const HistoryItemScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const details = useRoute().params;
  const { users, request } = details;

  const list = [
    {
      title: 'Accept',
      containerStyle: { backgroundColor: 'darkgreen' },
      titleStyle: { color: 'white' },
      onPress: () => console.log('FROM INSIDE', selectedId),
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
        }}>
        <Avatar source={{ uri: profilePicture }} rounded size='medium' />
        <ListItem.Content>
          <ListItem.Title>{firstName}</ListItem.Title>
          <ListItem.Subtitle>{contactNumber}</ListItem.Subtitle>
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
